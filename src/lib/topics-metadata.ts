// ============================================================================
// CBSE CLASS 8 CURRICULUM TOPICS METADATA (CLIENT-SAFE)
// Strictly excludes questions, answer keys, explanations, and misconceptions
// Prevents any question exposure in client browser bundles.
// ============================================================================

export interface ConceptTopic {
  id: string;
  subject: string;
  chapter: string;
  title: string;
  subtopics: string[];
  description: string;
  microTheory: string;
  icon: string;
  color: string;
  itemCount: number;
}

export const TOPICS_METADATA: ConceptTopic[] = [
  {
    "id": "rational-numbers",
    "subject": "Mathematics",
    "chapter": "Chapter 1: Rational Numbers",
    "title": "Operations on Rational Numbers",
    "subtopics": [
      "Addition & Subtraction",
      "Multiplication & Reciprocals",
      "Additive Inverse",
      "Density Property"
    ],
    "description": "Arithmetic operations, closure/commutative/associative laws, and inverses.",
    "icon": "Calculator",
    "color": "indigo",
    "microTheory": "A rational number is expressible as $\\frac{p}{q}$ ($p, q \\in \\mathbb{Z}, q \\neq 0$). Additive inverse of $\\frac{a}{b}$ is $-\\frac{a}{b}$. Multiplicative inverse (reciprocal) is $\\frac{b}{a}$. Division by 0 is not defined.",
    "itemCount": 17
  },
  {
    "id": "linear-equations",
    "subject": "Mathematics",
    "chapter": "Chapter 2: Linear Equations in One Variable",
    "title": "Solving Linear Equations in One Variable",
    "subtopics": [
      "Transposition Method",
      "Equations with Variables on Both Sides",
      "Age & Ratio Word Problems",
      "Cross-Multiplication"
    ],
    "description": "Algebraic equations of degree 1 with real-world applications.",
    "icon": "Variable",
    "color": "emerald",
    "microTheory": "A linear equation in one variable is of the form $ax + b = c$ ($a \\neq 0$). When moving terms across the equals sign, '+' becomes '-', and '$\\times$' becomes '$\\div$'.",
    "itemCount": 17
  },
  {
    "id": "quadrilaterals",
    "subject": "Mathematics",
    "chapter": "Chapter 3: Understanding Quadrilaterals",
    "title": "Polygons & Special Quadrilaterals",
    "subtopics": [
      "Angle Sum Property",
      "Exterior Angle Sum (360°)",
      "Parallelogram Properties",
      "Rhombus, Rectangle & Square"
    ],
    "description": "Convex/concave polygons, regular n-gons, and properties of parallelograms, rhombuses, and kites.",
    "icon": "Sigma",
    "color": "amber",
    "microTheory": "Sum of interior angles of an $n$-gon is $(n-2) \\times 180^\\circ$. Exterior angle sum of any convex polygon is always $360^\\circ$. In a parallelogram, opposite sides and angles are equal, and diagonals bisect each other.",
    "itemCount": 17
  },
  {
    "id": "squares-and-square-roots",
    "subject": "Mathematics",
    "chapter": "Chapter 5: Squares and Square Roots",
    "title": "Squares, Square Roots & Division Algorithm",
    "subtopics": [
      "Properties of Squares & 2n Gap",
      "Repeated Subtraction & Factorisation",
      "Divisibility & Smallest Multiplier/Divisor",
      "Long Division Method & Approximations",
      "Fractions, Decimals & Word Problems"
    ],
    "description": "Properties of perfect squares, prime factorisation tests, long division algorithm, and decimal roots.",
    "icon": "Square",
    "color": "sky",
    "microTheory": "A square number is $n^2 = n \\times n$. It always has an odd number of factors and unit digit in $\\{0, 1, 4, 5, 6, 9\\}$. Between $n^2$ and $(n+1)^2$, there are $2n$ non-square numbers. Sum of first $n$ odd numbers is $n^2$. Square roots are found via prime factorisation, repeated subtraction, or the long division algorithm.",
    "itemCount": 17
  },
  {
    "id": "algebraic-identities",
    "subject": "Mathematics",
    "chapter": "Chapter 9: Algebraic Expressions & Identities",
    "title": "Standard Algebraic Identities",
    "subtopics": [
      "$(a+b)^2$",
      "$(a-b)^2$",
      "$a^2 - b^2$",
      "$(x+a)(x+b)$"
    ],
    "description": "Binomial expansions, factorisation shortcuts, and polynomial products.",
    "icon": "Calculator",
    "color": "rose",
    "microTheory": "Standard Identities: (1) $(a+b)^2 = a^2 + 2ab + b^2$, (2) $(a-b)^2 = a^2 - 2ab + b^2$, (3) $(a+b)(a-b) = a^2 - b^2$, (4) $(x+a)(x+b) = x^2 + (a+b)x + ab$.",
    "itemCount": 17
  },
  {
    "id": "crop-production",
    "subject": "Science",
    "chapter": "Chapter 1: Crop Production & Management",
    "title": "Agricultural Practices & Soil Management",
    "subtopics": [
      "Kharif vs Rabi Crops",
      "Soil Preparation & Ploughing",
      "Manures vs Fertilizers",
      "Drip & Sprinkler Irrigation",
      "Storage & Protection"
    ],
    "description": "Agricultural steps: ploughing, sowing, organic manure, modern irrigation, weeding, and granary storage.",
    "icon": "Atom",
    "color": "emerald",
    "microTheory": "Kharif crops (paddy, maize) are sown in the rainy season (June-Sept). Rabi crops (wheat, gram, mustard) are sown in winter (Oct-March). Drip irrigation delivers water drop-by-drop to roots, minimizing water loss.",
    "itemCount": 17
  },
  {
    "id": "microorganisms",
    "subject": "Science",
    "chapter": "Chapter 2: Microorganisms: Friend and Foe",
    "title": "Microbial World & Disease Pathogens",
    "subtopics": [
      "Bacteria, Fungi, Protozoa & Viruses",
      "Fermentation & Pasteurization",
      "Nitrogen Cycle & Rhizobium",
      "Antibiotics & Vaccines"
    ],
    "description": "Classification of microbes, beneficial roles in food and agriculture, and common infectious diseases.",
    "icon": "Atom",
    "color": "cyan",
    "microTheory": "Microorganisms are classified into 4 major groups: Bacteria, Fungi, Protozoa, and Algae. Viruses reproduce only inside host cells. Rhizobium in root nodules fixes atmospheric nitrogen. Pasteurization preserves milk without boiling away nutrients.",
    "itemCount": 17
  },
  {
    "id": "force-pressure",
    "subject": "Science",
    "chapter": "Chapter 11: Force and Pressure",
    "title": "Forces, Pressure & Hydraulics",
    "subtopics": [
      "Contact vs Non-contact Forces",
      "Net Resultant Force",
      "Pressure Formula (P = F/A)",
      "Liquid & Atmospheric Pressure"
    ],
    "description": "Types of forces, balanced/unbalanced effects, and liquid pressure increasing with depth.",
    "icon": "Zap",
    "color": "blue",
    "microTheory": "Force is a push or pull measured in Newtons (N). Pressure is force acting per unit area: $P = \\frac{F}{A}$ ($1\\text{ Pa} = 1\\text{ N/m}^2$). Liquids exert pressure on container walls and pressure increases with depth ($P = h \\rho g$). Atmospheric pressure is measured with a barometer.",
    "itemCount": 17
  },
  {
    "id": "sound-vibrations",
    "subject": "Science",
    "chapter": "Chapter 13: Sound",
    "title": "Vibrations, Pitch, Amplitude & Audible Range",
    "subtopics": [
      "Origin of Sound (Vibrations)",
      "Loudness vs Amplitude",
      "Frequency & Pitch (Hertz)",
      "Human Hearing (20 Hz - 20,000 Hz)",
      "Noise Pollution"
    ],
    "description": "Mechanical sound propagation, wave amplitude, pitch frequency, human ear anatomy, and decibel limits.",
    "icon": "Zap",
    "color": "indigo",
    "microTheory": "Sound requires a material medium to propagate and cannot travel through a vacuum. Frequency $f = \\frac{\\text{oscillations}}{\\text{time}}$ (Hz). Audible range is 20 Hz to 20,000 Hz. Loudness is proportional to $Amplitude^2$. Pitch is determined by frequency.",
    "itemCount": 17
  },
  {
    "id": "english-tenses",
    "subject": "English",
    "chapter": "Grammar: Tenses & Aspects",
    "title": "Mastery of Present, Past and Future Tenses",
    "subtopics": [
      "Simple vs Continuous",
      "Perfect & Perfect Continuous",
      "Subject-Verb Agreement",
      "Time Markers (Since/For)"
    ],
    "description": "Expressing habitual, progressive, and completed actions with temporal accuracy.",
    "icon": "BookOpen",
    "color": "sky",
    "microTheory": "Present Perfect connects past actions to the present ('has/have + V3'). Past Perfect expresses the earlier of two completed past actions ('had + V3'). Use 'since' for specific starting points (since 2018) and 'for' for durations (for 6 years).",
    "itemCount": 17
  },
  {
    "id": "active-passive",
    "subject": "English",
    "chapter": "Grammar: Active and Passive Voice",
    "title": "Active and Passive Voice Transformation",
    "subtopics": [
      "Subject-Object Inversion",
      "Tense Preservation Rules",
      "Interrogative & Imperative Voice",
      "Modal Verb Transformations"
    ],
    "description": "Converting transitive clauses from agent-focused to recipient-focused constructions.",
    "icon": "BookOpen",
    "color": "teal",
    "microTheory": "Only transitive verbs (having an object) can be transformed into passive voice. Rule: Object becomes Subject + appropriate form of 'be' + Past Participle (V3) + by + Agent. Imperative commands use: 'Let + object + be + V3'.",
    "itemCount": 17
  },
  {
    "id": "trade-to-territory",
    "subject": "Social Science",
    "chapter": "History: Chapter 2: From Trade to Territory",
    "title": "From Trade to Territory: Company Power",
    "subtopics": [
      "Battle of Plassey (1757)",
      "Battle of Buxar & Diwani (1765)",
      "Subsidiary Alliance System",
      "Doctrine of Lapse & Rani Channamma"
    ],
    "description": "Transformation of the English East India Company from commercial mercantile traders into territorial imperial rulers.",
    "icon": "Globe2",
    "color": "amber",
    "microTheory": "1757 Battle of Plassey was the first major British military victory in India. In 1765, the Mughal Emperor granted Diwani (revenue collection rights) of Bengal. Lord Wellesley introduced the Subsidiary Alliance; Lord Dalhousie introduced the Doctrine of Lapse.",
    "itemCount": 17
  },
  {
    "id": "indian-constitution",
    "subject": "Social Science",
    "chapter": "Civics: Chapter 1: The Indian Constitution",
    "title": "The Indian Constitution & Secularism",
    "subtopics": [
      "Dr. B.R. Ambedkar & Drafting",
      "Federalism & 3 Levels",
      "Separation of Powers",
      "Fundamental Rights (Articles 14-32)",
      "Secularism & Preamble"
    ],
    "description": "Foundational pillars of Indian democracy, rule of law, minority protection, and universal adult suffrage.",
    "icon": "Globe2",
    "color": "purple",
    "microTheory": "The Constitution of India came into effect on 26 January 1950. Key features include Federalism, Parliamentary Government, Separation of Powers (Legislature, Executive, Judiciary), and Fundamental Rights (Right to Constitutional Remedies Article 32 is the 'heart and soul'). Secularism ensures the State promotes no single religion.",
    "itemCount": 17
  },
  {
    "id": "hindi-sandhi-samas",
    "subject": "Hindi",
    "chapter": "व्याकरण: संधि एवं समास",
    "title": "संधि एवं समास (Sandhi & Samas)",
    "subtopics": [
      "स्वर संधि (दीर्घ, गुण, वृद्धि, यण, अयादि)",
      "विसर्ग एवं व्यंजन संधि",
      "तत्पुरुष एवं कर्मधारय समास",
      "द्विगु, द्वन्द्व एवं बहुव्रीहि समास"
    ],
    "description": "दो वर्णों के मेल से होने वाले विकार (संधि) एवं शब्दों के संक्षिप्तिकरण (समास) का संपूर्ण अध्ययन।",
    "icon": "Languages",
    "color": "rose",
    "microTheory": "दो वर्णों के मेल से उत्पन्न विकार को संधि कहते हैं। दो या दो से अधिक शब्दों के सार्थक मेल से नया संक्षिप्त शब्द बनाने की प्रक्रिया को समास कहते हैं। बहुव्रीहि में अन्य पद प्रधान होता है, अव्ययीभाव में पूर्व पद अव्यय होता है।",
    "itemCount": 17
  },
  {
    "id": "hindi-shabd-vichar",
    "subject": "Hindi",
    "chapter": "व्याकरण: शब्द-विचार एवं मुहावरे",
    "title": "उपसर्ग, प्रत्यय एवं शब्द-भंडार",
    "subtopics": [
      "उपसर्ग एवं प्रत्यय",
      "तत्सम एवं तद्भव शब्द",
      "पर्यायवाची एवं विलोम शब्द",
      "मुहावरे एवं लोकोक्तियाँ"
    ],
    "description": "शब्दांशों का प्रयोग, शब्द निर्माण, लोकोक्ति-मुहावरा भावार्थ तथा मानक वर्तनी का अभ्यास।",
    "icon": "Languages",
    "color": "red",
    "microTheory": "वे शब्दांश जो किसी शब्द के प्रारंभ में जुड़कर अर्थ बदल दें, 'उपसर्ग' कहलाते हैं। जो अंत में जुड़ते हैं, वे 'प्रत्यय' कहलाते हैं। संस्कृत के मूल शब्द 'तत्सम' और परिवर्तित रूप 'तद्भव' कहलाते हैं।",
    "itemCount": 17
  },
  {
    "id": "sanskrit-sandhi",
    "subject": "Sanskrit",
    "chapter": "रुचिरा भाग-3: सन्धि-प्रकरणम्",
    "title": "सन्धि-प्रकरणम् (Sandhi in Sanskrit)",
    "subtopics": [
      "दीर्घ स्वरसन्धिः (अकः सवर्णे दीर्घः)",
      "गुणसन्धिः (आद्गुणः)",
      "वृद्धि एवं यण्सन्धिः (वृद्धिरेचि, इको यणचि)",
      "अयादि एवं पूर्वरूप सन्धिः"
    ],
    "description": "पाणिनीय-व्याकरण नियमानुसारं संस्कृत-स्वरसन्धयः, विसर्गसन्धिः तथा पदानां शुद्ध-विच्छेदः।",
    "icon": "Scroll",
    "color": "orange",
    "microTheory": "वर्णानां परस्परं विकृतियुक्तं मेलनं 'सन्धिः' कथ्यते। दीर्घसन्धौ समानस्वरयोः दीर्घः भवति (अ+अ=आ)। गुणसन्धौ अ+इ=ए, अ+उ=ओ भवति। यणसन्धौ इ/उ स्थाने य्/व् आदेशः भवति।",
    "itemCount": 17
  },
  {
    "id": "sanskrit-shabd-dhatu",
    "subject": "Sanskrit",
    "chapter": "रुचिरा भाग-3: रूपाणि",
    "title": "शब्दरूपाणि एवं धातुरूपाणि (Noun & Verb Forms)",
    "subtopics": [
      "बालक / लता / फल / मुनि शब्दरूपाणि",
      "अस्मद् / युष्मद् सर्वनाम रूपाणि",
      "पठ्, गम्, लिख्, कृ धातवः",
      "लट्, लृट्, लङ्, लोट्, विधिलिङ् लकाराः"
    ],
    "description": "विभक्ति-वचन ज्ञानम्, लट् (वर्तमान), लृट् (भविष्यत्) तथा लङ् (भूतकाल) लकाराणाम् अभ्यासः।",
    "icon": "Scroll",
    "color": "amber",
    "microTheory": "संस्कृत भाषायां त्रीणि वचनानि तथा त्रयः पुरुषाः भवन्ति। लट् लकारः वर्तमाने, लृट् लकारः भविष्यति, लङ् लकारः भूते, लोट् आज्ञायां तथा विधिलिङ् चाहिए-अर्थे प्रयुज्यते।",
    "itemCount": 17
  },
  {
    "id": "sanskrit-pratyaya",
    "subject": "Sanskrit",
    "chapter": "रुचिरा भाग-3: प्रत्ययाः एवं कारकाणि",
    "title": "प्रत्ययाः एवं कारकाणि (Suffixes & Cases)",
    "subtopics": [
      "क्त्वा एवं ल्यप् प्रत्ययाः",
      "तुमुन् प्रत्ययः",
      "कारक-विभक्तयः",
      "उपपद विभक्तयः (सह, नमः, विना, परितः)"
    ],
    "description": "कृदन्त प्रत्ययाणां प्रयोगः, उपपद-विभक्ति नियमाः तथा कारक-संज्ञा ज्ञानम्।",
    "icon": "Scroll",
    "color": "yellow",
    "microTheory": "'क्त्वा' प्रत्ययः करके अर्थे भवति (पठित्वा = पढ़कर)। यदि धातोः पूर्वम् उपसर्गः स्यात्, तर्हि क्त्वा स्थाने 'ल्यप्' भवति (आगत्य = आकर)। 'तुमुन्' के लिए अर्थे भवति (गन्तुम् = जाने के लिए)। सह योगे तृतीया, नमः योगे चतुर्थी विभक्तिः भवति।",
    "itemCount": 17
  },
  {
    "id": "computer-networks",
    "subject": "Computer Science",
    "chapter": "Chapter 1: Computer Networking Concepts",
    "title": "Networking Concepts & Internet Protocols",
    "subtopics": [
      "LAN, MAN, WAN & PAN",
      "Topologies: Star, Bus, Ring, Mesh",
      "Switches, Routers & Modems",
      "Transmission Media (Fiber, UTP)",
      "MAC Address & IP Protocols"
    ],
    "description": "Architecture of interconnected computers, data transmission channels, topologies, and network hardware.",
    "icon": "Laptop",
    "color": "cyan",
    "microTheory": "LAN covers small geographic areas like labs; WAN spans countries. In Star topology, all devices connect to a central switch. Fiber optics carry data as pulses of light with zero electromagnetic interference. MAC address is a 48-bit permanent hardware address; IP address is 32-bit logical address.",
    "itemCount": 17
  },
  {
    "id": "cyber-security",
    "subject": "Computer Science",
    "chapter": "Chapter 2: Cyber Safety & Information Security",
    "title": "Cyber Threats, Security & Digital Footprints",
    "subtopics": [
      "Malware: Viruses, Worms, Trojans, Ransomware",
      "Phishing & Social Engineering",
      "Two-Factor Authentication (2FA)",
      "Digital Footprints & Privacy",
      "IT Act, 2000"
    ],
    "description": "Safeguarding personal data, identifying online scams, digital hygiene, and Indian cyber jurisprudence.",
    "icon": "ShieldCheck",
    "color": "emerald",
    "microTheory": "Malware includes destructive software like viruses, self-replicating worms, trojans, and ransomware. Phishing is deceptive attempts to steal passwords via spoofed links. Two-Factor Authentication (2FA) adds a second verification layer. The Information Technology Act, 2000 governs cyber law in India.",
    "itemCount": 17
  },
  {
    "id": "python-basics",
    "subject": "Computer Science",
    "chapter": "Chapter 3: Introduction to Python Programming",
    "title": "Python Fundamentals & Computational Logic",
    "subtopics": [
      "Variables & Data Types (int, float, str, bool)",
      "Arithmetic & Floor Division (//, %)",
      "Conditionals (if-elif-else)",
      "Loops (for, while, range)",
      "Lists & Operations"
    ],
    "description": "Core syntax, data types, control flow structures, loops, and list manipulation in Python 3.",
    "icon": "Laptop",
    "color": "indigo",
    "microTheory": "Python is a readable, interpreted language. Comments use #. Data types include int, float, str, bool, list. The `//` operator performs floor division; `%` gives remainder. Loops use `for item in range(start, stop)` where stop is exclusive. Indentation defines code blocks.",
    "itemCount": 17
  },
  {
    "id": "html-web-basics",
    "subject": "Computer Science",
    "chapter": "Chapter 4: HTML5 Web Page Authoring",
    "title": "HTML5 Structure, Tags & Hyperlinks",
    "subtopics": [
      "Document Structure (DOCTYPE, head, body)",
      "Headings (h1-h6) & Paragraphs (p)",
      "Links (<a href>) & Images (<img src>)",
      "Lists (<ol>, <ul>, <li>)",
      "Tables (table, tr, td, th)"
    ],
    "description": "Building responsive modern webpages using semantic HTML5 markup tags, links, multimedia, and tables.",
    "icon": "Laptop",
    "color": "teal",
    "microTheory": "HTML (HyperText Markup Language) structures web content. `<!DOCTYPE html>` declares HTML5. Anchor tag `<a href='URL'>` creates hyperlinks. `<img>` embeds images using `src` and accessibility `alt`. Lists are `<ol>` (ordered/numbered) and `<ul>` (unordered/bulleted). Tables use `<table>`, `<tr>` (row), and `<td>` (data cell).",
    "itemCount": 17
  }
];

export function getTopicById(id: string): ConceptTopic | undefined {
  return TOPICS_METADATA.find((c) => c.id === id);
}

export function getAllTopics(): ConceptTopic[] {
  return TOPICS_METADATA;
}

export function getSubjects(): string[] {
  return [
    "Mathematics",
    "Science",
    "English",
    "Social Science",
    "Hindi",
    "Sanskrit",
    "Computer Science"
  ];
}

export function getTopicsBySubject(subject: string): ConceptTopic[] {
  return TOPICS_METADATA.filter((c) => c.subject.toLowerCase() === subject.toLowerCase());
}
