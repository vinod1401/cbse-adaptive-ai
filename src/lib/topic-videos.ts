// ============================================================================
// TOPIC VIDEO LESSONS (CLIENT-SAFE)
// One YouTube lesson per topic. To embed a specific video, paste its link or
// 11-character ID into `youtube` — it then plays inside the app. Topics without
// a `youtube` value show a button that opens a YouTube search for `searchQuery`.
// ============================================================================

export interface TopicVideo {
  /** YouTube link (watch / youtu.be / shorts / embed) or bare video ID. */
  youtube?: string;
  /** Fallback search used when no specific video is set. */
  searchQuery: string;
}

export const TOPIC_VIDEOS: Record<string, TopicVideo> = {
  "rational-numbers": { searchQuery: "CBSE Class 8 Maths Chapter 1 Rational Numbers full explanation" },
  "linear-equations": { searchQuery: "CBSE Class 8 Maths Linear Equations in One Variable full explanation" },
  "quadrilaterals": { searchQuery: "CBSE Class 8 Maths Understanding Quadrilaterals full explanation" },
  "squares-and-square-roots": { searchQuery: "CBSE Class 8 Maths Squares and Square Roots full explanation" },
  "algebraic-identities": { searchQuery: "CBSE Class 8 Maths Algebraic Expressions and Identities full explanation" },
  "ratio-proportion": { searchQuery: "CBSE Class 8 Maths Direct and Inverse Proportions full explanation" },
  "crop-production": { searchQuery: "CBSE Class 8 Science Crop Production and Management full explanation" },
  "microorganisms": { searchQuery: "CBSE Class 8 Science Microorganisms Friend and Foe full explanation" },
  "force-pressure": { searchQuery: "CBSE Class 8 Science Force and Pressure full explanation" },
  "sound-vibrations": { searchQuery: "CBSE Class 8 Science Sound full chapter explanation" },
  "light-mirrors": { searchQuery: "CBSE Class 8 Science Light Mirrors and Lenses reflection full explanation" },
  "english-tenses": { searchQuery: "Class 8 English Grammar Tenses present past future explanation" },
  "active-passive": { searchQuery: "Class 8 English Grammar Active and Passive Voice explanation" },
  "trade-to-territory": { searchQuery: "CBSE Class 8 History From Trade to Territory full explanation" },
  "indian-constitution": { searchQuery: "CBSE Class 8 Civics The Indian Constitution and Secularism explanation" },
  "colonial-era-in-india": { searchQuery: "CBSE Class 8 History Colonialism in India economic drain explanation" },
  "hindi-sandhi-samas": { searchQuery: "कक्षा 8 हिंदी व्याकरण संधि और समास" },
  "hindi-shabd-vichar": { searchQuery: "कक्षा 8 हिंदी व्याकरण उपसर्ग प्रत्यय" },
  "sanskrit-sandhi": { searchQuery: "कक्षा 8 संस्कृत व्याकरण सन्धि प्रकरण" },
  "sanskrit-shabd-dhatu": { searchQuery: "कक्षा 8 संस्कृत शब्द रूप धातु रूप" },
  "sanskrit-pratyaya": { searchQuery: "कक्षा 8 संस्कृत प्रत्यय और कारक" },
  "computer-networks": { searchQuery: "Class 8 Computer Science Computer Networks and Internet explained" },
  "cyber-security": { searchQuery: "Class 8 Computer Cyber Security threats and digital footprint explained" },
  "python-basics": { searchQuery: "Python basics for class 8 students in Hindi" },
  "html-web-basics": { searchQuery: "HTML basics tags and hyperlinks for class 8 students" },
};

/** Extracts the 11-character video ID from a YouTube URL or bare ID. */
export function parseYouTubeId(input?: string): string | null {
  if (!input) return null;
  const value = input.trim();
  if (/^[\w-]{11}$/.test(value)) return value;
  const match = value.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  return match ? match[1] : null;
}

export function getTopicVideo(topicId: string, topicTitle?: string): TopicVideo {
  return (
    TOPIC_VIDEOS[topicId] ?? {
      searchQuery: `CBSE Class 8 ${topicTitle ?? topicId} explanation`,
    }
  );
}

export function getYouTubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

/** Interactive 3D labs available for a topic. */
export const TOPIC_LABS: Record<string, string> = {
  "light-mirrors": "/lab/light",
};
