# Pragati AI — CBSE Class 8 Adaptive Learning Platform

An enterprise-grade, Next-Gen **Adaptive Learning Platform** engineered with **Item Response Theory (IRT Rasch Psychometrics)**, **KaTeX Math Formula Rendering**, and an intelligent **Google Gemini Socratic AI Tutor** — designed to operate **100% on Zero-Cost Free Tiers**.

---

## 🌟 Highlights & Key Innovations

1. **Psychometric Adaptive Engine (IRT Rasch Model):**
   - Replaces naive 2-up/2-down streaks with continuous mathematical ability estimation $\theta \in [-3.0, +3.0]$.
   - Uses **Fisher Information Maximization** ($I(\theta) = a^2 P(1-P)$) to select questions exactly matching the student's Zone of Proximal Development (ZPD).
   - Dynamic step cooling ($\Delta \theta \propto \frac{1}{\sqrt{N+1}}$) protects against wild rating swings caused by random lucky guesses.

2. **Anti-Cheat Server-Side Grading:**
   - Client payloads contain only problem statements, formulas, and shuffled options.
   - `correctAnswer` is verified **strictly server-side** in Next.js Server Actions / API routes. Inspection of browser memory or network traffic reveals zero answers.

3. **Google Gemini Socratic AI Tutor (`@google/genai`):**
   - Integrates Google's state-of-the-art **Gemini 3.8 Flash** model via Google AI Studio's generous **Free Tier (1,500 requests/day, ₹0)**.
   - Operates on Socratic principles: generates progressive conceptual clues (Hint 1 $\rightarrow$ Hint 2 $\rightarrow$ Hint 3) without spoiling the final answer.
   - Performs **Distractor & Misconception Analysis** to diagnose why a student made a specific mistake (e.g. sign flip error during transposition).

4. **Crisp Mathematical Typography (KaTeX):**
   - Renders fractions ($\frac{p}{q}$), radicals ($\sqrt{x}$), exponents ($x^2$), and algebraic equations with instant zero-lag client rendering.

5. **Duolingo-Style Gamification & Engagement:**
   - Daily Streaks (🔥), XP progression, Level Badges, and celebratory particle confetti.

---

## 🚀 1-Minute Local Setup

### Prerequisites
- Node.js 18+ or 20+ installed on your computer.

### Step 1: Install Dependencies
Open terminal in the project directory:
```bash
cd "C:\Users\Vinod Kumar Sharma\Desktop\cbse-adaptive-ai"
npm install
```

### Step 2: (Optional) Configure Free Gemini AI Key
Create a `.env.local` file:
```bash
copy .env.local.example .env.local
```
Add your free Gemini API key from [Google AI Studio](https://aistudio.google.com/):
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*(Note: If omitted, the app gracefully falls back to built-in smart conceptual hints so it always works out of the box!)*

### Step 3: Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ 100% Free Cloud Deployment (Vercel)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository and configure the following Environment Variables:
   - `GEMINI_API_KEY`: Your Google AI Studio Gemini API key.
   - `AUTH_SECRET`: Random 32-character secret for teacher session HMAC (`openssl rand -base64 32`).
   - `PROFILE_SIGN_SECRET`: Random 32-character secret for student profile anti-tamper signatures.
   - `TEACHER_ADMIN_PIN`: Admin PIN for teacher dashboard (default: `1234`).
   - *(Optional for multi-instance distributed serverless)*:
     - `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN`: 1-click free Upstash Redis database via Vercel Storage tab (zero-cost tier).
4. Click **"Deploy"**.
5. Your app is live at a global HTTPS URL (e.g. `https://cbse-adaptive-ai-2.vercel.app`) with **₹0/month lifetime cost**!

---

## 📐 Mathematical Model (IRT Rasch Calibration)

$$\text{Probability of Correct Response: } P(u=1 \mid \theta, b) = \frac{1}{1 + e^{-(\theta - b)}}$$

$$\text{Fisher Information: } I(\theta) = P(1 - P)$$

$$\text{Bayesian Ability Update: } \theta_{t+1} = \theta_t + \frac{u_t - P}{\sqrt{N_t + 1}}$$

$$\text{Mastery Percentage: } M(\theta) = \frac{1}{1 + e^{-1.1\theta}} \times 100\%$$
