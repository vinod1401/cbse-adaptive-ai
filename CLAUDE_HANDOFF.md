# CBSE Adaptive AI — Complete Handoff Document
> **For AI assistants (Claude, Gemini, etc.):** Read this entire file before making any changes.

---

## 1. PROJECT OVERVIEW

**App Name:** CBSE Adaptive AI
**Purpose:** Adaptive practice platform for Class 8 CBSE students using IRT (Item Response Theory) to adjust question difficulty based on student performance.
**Live URL (Vercel):** `https://cbse-adaptive-ai-2.vercel.app`
**GitHub:** `https://github.com/vinod1401/cbse-adaptive-ai.git` (branch: `main`)
**Local Path:** `C:\Users\Vinod Kumar Sharma\Desktop\cbse-adaptive-ai`
**Local Dev Port:** `4000` — run with `npm start` after build

---

## 2. TECH STACK

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI / Tutor | Google Gemini API (gemini-2.0-flash) |
| Persistent Store | Upstash Redis (Vercel) / disk JSON (local) |
| Hosting | Vercel (auto-deploy on git push to main) |
| Math Rendering | KaTeX (via MathRenderer component) |

---

## 3. ENVIRONMENT VARIABLES (Vercel Dashboard)

Go to: Vercel → Project → Settings → Environment Variables

| Variable | Purpose | Notes |
|----------|---------|-------|
| `UPSTASH_REDIS_REST_URL` | Redis DB URL | `https://nearby-hedgehog-292916.upstash.io` |
| `UPSTASH_REDIS_REST_TOKEN` | Redis auth token | NO quotes around value! |
| `GEMINI_API_KEY` | Google Gemini API key | Starts with AIza... |
| `ADMIN_PIN_HASH` | bcrypt hash of admin PIN | PIN is `1234` |
| `HMAC_SECRET` | Student session signing | Any random string |

**CRITICAL WARNING:** After changing any env var in Vercel, you MUST click Redeploy.
If `/api/debug` shows `"HTTP_ERR_401"` — the Redis token is wrong or has quotes around it.

**Local:** No `.env.local` needed. Local mode uses disk (data/student-records.json).

---

## 4. FILE STRUCTURE

```
cbse-adaptive-ai/
├── src/
│   ├── app/
│   │   ├── page.tsx                    Home page
│   │   ├── layout.tsx                  Root layout
│   │   ├── globals.css
│   │   ├── admin/page.tsx              Admin dashboard (PIN: 1234)
│   │   ├── practice/page.tsx           Student practice UI
│   │   └── api/
│   │       ├── adaptive/route.ts       GET: next question (IRT)
│   │       ├── admin/auth/route.ts     POST: admin PIN verify
│   │       ├── debug/route.ts          GET: Redis state check
│   │       ├── student/
│   │       │   ├── records/route.ts    GET/DELETE: student records
│   │       │   └── sync/route.ts       POST: save student attempt
│   │       └── tutor/route.ts          POST: Gemini AI explanation
│   ├── components/
│   │   └── MathRenderer.tsx            KaTeX math rendering
│   └── lib/
│       ├── question-bank.ts            ALL QUESTIONS (server-only!)
│       ├── topics-metadata.ts          Topic info for UI (client-safe)
│       ├── irt-engine.ts               IRT adaptive algorithm
│       ├── student-records-store.ts    Redis/disk data store
│       ├── student-session.ts          Session + BASELINE_ROSTER (10 demo students)
│       ├── server-session-store.ts     In-memory session cache
│       ├── profile-signer.ts           HMAC session signing
│       ├── admin-auth.ts               Admin PIN verification
│       ├── firebase.ts                 Client-side API fetch helpers
│       └── gemini.ts                   Gemini AI integration
├── data/
│   └── student-records.json            Local disk store only
├── CLAUDE_HANDOFF.md                   This file
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## 5. CRITICAL RULES (Do not break these)

1. **NEVER import `question-bank.ts` in any client component** — it throws a security error by design.
2. **Always update BOTH files when adding a topic:**
   - `question-bank.ts` — with full questions and answers
   - `topics-metadata.ts` — with same topic but `itemCount: N` instead of `items: [...]`
3. **PowerShell does NOT support `&&`** — use separate commands.
4. **Run `npx tsc --noEmit` before building** — catches syntax errors early.
5. **After Vercel env var changes → must Redeploy** — changes don't apply automatically.

---

## 6. HOW THE APP WORKS

### Student Practice Flow:
```
Student → /practice → select subject → select topic
  → GET /api/adaptive?topicId=X&sessionId=Y
      → IRT picks question based on student ability (theta)
      → Returns question text + 4 options (NO correct answer)
  → Student answers
  → POST /api/student/sync
      → HMAC signature validated
      → IRT updates theta
      → Saved to Redis: SET record:{id} + SADD to ID set
  → Next question based on updated ability
```

### Admin Panel Flow:
```
Teacher → /admin → PIN: 1234
  → GET /api/student/records
      → Redis: check cbse_all_cleared flag
      → If not seeded → seed 10 baseline students
      → Return all records
  → View table: name, topic, score%, attempts, time
  → Delete individual or all students
  → Reset Demo → wipes Redis + re-seeds baseline
```

---

## 7. HOW TO ADD A NEW TOPIC

### Step 1 — Add to question-bank.ts

Open: `src/lib/question-bank.ts`
Find the last `}` before `];` at end of file and add a comma + new topic:

```typescript
  // ... last existing topic ends here
  },  // <-- make sure comma is here
  {
    "id": "your-topic-id",          // kebab-case, must be unique
    "subject": "Mathematics",       // Must match: Mathematics, Science, English,
                                    // Social Science, Hindi, Sanskrit, Computer Science
    "chapter": "Chapter X: Name",
    "title": "Display Title",
    "subtopics": ["Sub1", "Sub2", "Sub3"],
    "description": "One line description.",
    "icon": "Calculator",           // Any Lucide React icon name
    "color": "indigo",              // Tailwind color: indigo, emerald, amber, sky, rose, violet, cyan, teal
    "microTheory": "Key concepts with $LaTeX$ math...",
    "items": [
      {
        "id": "xx-1",              // unique ID, format: shortname-number
        "topicId": "your-topic-id",
        "difficulty": -2.0,        // -2.5 (easiest) to +2.5 (hardest)
        "text": "Question text here?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Option A",   // Must EXACTLY match one option string
        "explanation": "Why A is correct...",
        "misconceptions": {
          "Option B": "Why B is wrong...",
          "Option C": "Why C is wrong..."
        }
      }
      // Recommended: 15-20 items with good difficulty spread
    ]
  }
```

**IRT Difficulty Guide:**
- `-2.5 to -1.5` — Very Easy (recognition level)
- `-1.5 to -0.5` — Easy (direct application)
- `-0.5 to +0.5` — Medium (standard problems)
- `+0.5 to +1.5` — Hard (multi-step problems)
- `+1.5 to +2.5` — Very Hard (advanced/tricky)

### Step 2 — Add to topics-metadata.ts

Open: `src/lib/topics-metadata.ts`
Find the last `}` before `];` and add:

```typescript
  },  // <-- comma after last existing topic
  {
    "id": "your-topic-id",          // SAME id as question-bank.ts
    "subject": "Mathematics",       // SAME subject
    "chapter": "Chapter X: Name",   // SAME chapter
    "title": "Display Title",       // SAME title
    "subtopics": ["Sub1", "Sub2", "Sub3"],  // SAME subtopics
    "description": "One line description.",
    "icon": "Calculator",
    "color": "indigo",
    "microTheory": "Key concepts...",
    "itemCount": 20                 // Number of items you added (NOT items array)
  }
```

### Step 3 — Verify, Build, Deploy

```bash
# Check types
npx tsc --noEmit

# Build
npm run build

# Stage files
git add src/lib/question-bank.ts src/lib/topics-metadata.ts

# Commit (use simple message, avoid & and special chars in PowerShell)
git commit -m "add topic-name chapter questions"

# Push (Vercel auto-deploys in ~2-3 min)
git push origin main
```

---

## 8. REDIS OPERATIONS REFERENCE

The store is in `src/lib/student-records-store.ts`.

| Function | What it does |
|----------|-------------|
| `getAllStudentRecords()` | Returns all records. Seeds baseline if first time. Returns [] if cleared. |
| `saveStudentRecord(record)` | Saves/updates one student. Clears the "all cleared" flag. |
| `deleteStudentRecord(id)` | Removes one student from Redis. |
| `clearAllStudentRecords()` | Sets cbse_all_cleared=1. Returns [] on next load. |
| `resetToBaselineRoster()` | Wipes everything + seeds 10 demo students. |

**Redis Keys:**
```
cbse_student_record_ids     SET     All student IDs
record:{studentId}          STRING  JSON student record
cbse_all_cleared            STRING  "1" if teacher cleared all
cbse_seeded                 STRING  "1" after first seed
```

---

## 9. DEBUG ENDPOINT

`GET https://cbse-adaptive-ai-2.vercel.app/api/debug`

```json
{
  "redis_enabled": true,
  "kv_url_set": true,
  "kv_token_set": true,
  "cbse_all_cleared": null,       // "HTTP_ERR_401" = token broken!
  "cbse_seeded": "1",
  "record_ids_count": 12,
  "record_ids": ["student-aadvik-...", ...]
}
```

Use this to diagnose Redis issues before touching anything else.

---

## 10. ADMIN PANEL FEATURES

URL: `https://cbse-adaptive-ai-2.vercel.app/admin`
PIN: `1234`

| Feature | Description |
|---------|-------------|
| Student Table | Shows name, topic, score%, questions, last attempt time |
| Delete Student | Removes permanently from Redis |
| Clear All | Wipes all records (sets cleared flag) |
| Reset Demo | Clears + re-seeds 10 baseline students |
| Topic Report | Click student row → topic-wise performance breakdown |

---

## 11. BASELINE ROSTER (10 Demo Students)

Defined in `src/lib/student-session.ts` as `BASELINE_ROSTER`.
These students are seeded to Redis when admin loads the panel for the first time.

Students: Aadvik, Priya Sharma, Rahul Verma, Ananya Singh, Arjun Patel,
Meera Nair, Vikram Gupta, Sanya Kapoor, Rishi Malhotra, Kavya Reddy

Each has pre-set: topicId, score%, ability (theta), responses[], lastAttemptTimestamp.

---

## 12. KNOWN ISSUES AND THEIR FIXES

| Issue | Cause | Fix |
|-------|-------|-----|
| Data not deleting | Redis token was wrong (401) | Fix token in Vercel, Redeploy |
| Baseline students reappear after delete | cbse_seeded not cleared on "Clear All" | clearAllStudentRecords() now deletes cbse_seeded |
| New topic not showing in UI | Added to question-bank but not topics-metadata | Update both files |
| TypeScript error after adding topic | Missing comma or closing brace | Run npx tsc --noEmit, fix the reported line |
| Build fails | Syntax error in question-bank.ts | Check JSON structure carefully |
| "HTTP_ERR_401" in /api/debug | Wrong token or token has quotes | Edit UPSTASH_REDIS_REST_TOKEN in Vercel (no quotes) → Redeploy |
| Student data not persisting on Vercel | Old disk-based code | Now Redis-first (fixed) |

---

## 13. LOCAL DEVELOPMENT COMMANDS

```bash
# Install
npm install

# Dev server (port 3000, hot reload)
npm run dev

# Production build
npm run build

# Run production build (LAN accessible, port 4000)
npx next start -H 0.0.0.0 -p 4000

# Type check only (fast, no build)
npx tsc --noEmit
```

---

## 14. GIT WORKFLOW

```bash
# Check what changed
git status
git diff src/lib/question-bank.ts

# Stage specific files
git add src/lib/question-bank.ts
git add src/lib/topics-metadata.ts

# Commit with simple message (avoid special chars in PowerShell)
git commit -m "your message here"

# Push to Vercel (auto-deploys)
git push origin main

# Check last commits
git log --oneline -5
```

---

## 15. STUDENT PERFORMANCE RECORD SCHEMA

```typescript
interface StudentPerformanceRecord {
  studentId: string;              // "student-{name}-{timestamp}"
  studentName: string;            // Shown in admin panel
  topicId: string;                // e.g. "ratio-proportion"
  topicTitle: string;
  subject: string;
  totalAttempted: number;
  totalCorrect: number;
  scorePercentage: number;        // 0-100
  currentAbility: number;         // IRT theta, -3 to +3
  lastAttemptTime: string;        // "5 minutes ago" (relative)
  lastAttemptTimestamp: number;   // Unix ms (for accurate relative time)
  responses: IRTResponse[];       // Full answer history
}
```

---

## 16. CURRENT TOPICS (25 total as of Oct 2026)

### Mathematics (6 topics)
- `rational-numbers` — Ch.1: Operations on Rational Numbers (17 items)
- `linear-equations` — Ch.2: Linear Equations in One Variable (17 items)
- `quadrilaterals` — Ch.3: Polygons & Special Quadrilaterals (17 items)
- `squares-and-square-roots` — Ch.5: Squares, Roots & Division Algorithm (32 items)
- `algebraic-identities` — Ch.9: Standard Algebraic Identities (17 items)
- `ratio-proportion` — Ch.8: Ratio, Proportion & Direct/Inverse Variation (20 items)

### Science (5 topics)
- `crop-production` — Ch.1: Agricultural Practices & Soil Management (17 items)
- `microorganisms` — Ch.2: Microbial World & Disease Pathogens (17 items)
- `force-pressure` — Ch.11: Forces, Pressure & Hydraulics (17 items)
- `sound-vibrations` — Ch.13: Vibrations, Pitch, Amplitude (17 items)
- `light-mirrors` — Ch.10: Light: Mirrors, Reflection & Lenses (35 items)

### English (2 topics)
- `english-tenses` — Grammar: Tenses & Aspects (17 items)
- `active-passive` — Grammar: Active and Passive Voice (17 items)

### Social Science (3 topics)
- `trade-to-territory` — History Ch.2: From Trade to Territory (17 items)
- `indian-constitution` — Civics Ch.1: The Indian Constitution (17 items)
- `colonial-era-in-india` — History Ch.4: The Colonial Era in India (32 items)

### Hindi (2 topics)
- `hindi-sandhi-samas` — Sandhi & Samas (17 items)
- `hindi-shabd-vichar` — Upsarg, Pratyay & Shabd-Bhandar (17 items)

### Sanskrit (3 topics)
- `sanskrit-sandhi` — Sandhi-Prakaranam (17 items)
- `sanskrit-shabd-dhatu` — Shabd-Roop & Dhatu-Roop (17 items)
- `sanskrit-pratyaya` — Pratyaya & Kaarak (17 items)

### Computer Science (4 topics)
- `computer-networks` — Networking Concepts & Protocols (17 items)
- `cyber-security` — Cyber Threats & Safety (17 items)
- `python-basics` — Python Fundamentals & Logic (17 items)
- `html-web-basics` — HTML5 Structure & Tags (17 items)

---

## 17. QUICK DIAGNOSTIC CHECKLIST

When something is broken, check in this order:

1. `https://cbse-adaptive-ai-2.vercel.app/api/debug` — Redis status
2. Vercel Dashboard → Deployments → Check if latest deploy succeeded
3. Vercel Dashboard → Functions → Check runtime logs for errors
4. Local: `npm run dev` → reproduce issue locally
5. `npx tsc --noEmit` — TypeScript errors?
6. `git log --oneline -3` — Did latest commit push?

---

*Document created: October 2026*
*App by: Vinod Kumar Sharma*
*Admin PIN: 1234 | Upstash DB: cbse-ai | GitHub: vinod1401*
