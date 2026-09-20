// ============================================================================
// CBSE CLASS 8 COMPREHENSIVE ADAPTIVE QUESTION BANK
// Subjects (7 Core): Mathematics, Science, English, Social Science, Hindi, Sanskrit, Computer Science
// Psychometric IRT Calibrated Difficulty parameters (b: -2.5 to +2.5)
// Total Questions: 374 Calibrated Items across 22 Curriculum Topics
// ============================================================================

import { IRTItem } from "./irt-engine";

if (typeof window !== "undefined") {
  throw new Error("SECURITY VIOLATION: question-bank.ts is strictly server-only and cannot be imported in client-side bundles.");
}

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
  items: IRTItem[];
}

export const CONCEPT_BANK: ConceptTopic[] = [
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
    "items": [
      {
        "id": "rn-1",
        "topicId": "rational-numbers",
        "difficulty": -2.2,
        "text": "Which of the following is a rational number?",
        "options": [
          "$\\sqrt{3}$",
          "$\\pi$",
          "$\\sqrt{7}$",
          "$\\frac{3}{7}$"
        ],
        "correctAnswer": "$\\frac{3}{7}$",
        "explanation": "A rational number can be written as p/q where p, q are integers and q != 0. 3/7 satisfies this. The others are irrational.",
        "misconceptions": {
          "$\\pi$": "Pi is irrational because its decimal expansion is non-terminating and non-repeating."
        }
      },
      {
        "id": "rn-2",
        "topicId": "rational-numbers",
        "difficulty": -1.8,
        "text": "What is the additive inverse of $-\\frac{7}{11}$?",
        "options": [
          "$\\frac{11}{7}$",
          "$-\\frac{11}{7}$",
          "$\\frac{7}{11}$",
          "$-1$"
        ],
        "correctAnswer": "$\\frac{7}{11}$",
        "explanation": "The additive inverse of -x is +x because (-x) + x = 0. Thus, additive inverse of -7/11 is 7/11.",
        "misconceptions": {
          "$-\\frac{11}{7}$": "That is the reciprocal (multiplicative inverse), not the additive inverse."
        }
      },
      {
        "id": "rn-3",
        "topicId": "rational-numbers",
        "difficulty": -1.4,
        "text": "What is the multiplicative identity for rational numbers?",
        "options": [
          "$1$",
          "Any rational number",
          "$-1$",
          "$0$"
        ],
        "correctAnswer": "$1$",
        "explanation": "1 is the multiplicative identity because any rational number multiplied by 1 remains unchanged (a/b * 1 = a/b).",
        "misconceptions": {
          "$0$": "0 is the additive identity (a + 0 = a), not the multiplicative identity."
        }
      },
      {
        "id": "rn-4",
        "topicId": "rational-numbers",
        "difficulty": -1,
        "text": "Which rational number has NO reciprocal (multiplicative inverse)?",
        "options": [
          "$0$",
          "$\\frac{1}{2}$",
          "$1$",
          "$-1$"
        ],
        "correctAnswer": "$0$",
        "explanation": "0 has no reciprocal because 1/0 is undefined in mathematics.",
        "misconceptions": {
          "$-1$": "The reciprocal of -1 is -1 itself, so it does exist."
        }
      },
      {
        "id": "rn-5",
        "topicId": "rational-numbers",
        "difficulty": -0.6,
        "text": "Find the value of: $-\\frac{3}{8} + \\frac{1}{4}$",
        "options": [
          "$-\\frac{2}{12}$",
          "$-\\frac{2}{4}$",
          "$-\\frac{1}{8}$",
          "$\\frac{1}{8}$"
        ],
        "correctAnswer": "$-\\frac{1}{8}$",
        "explanation": "LCM of 8 and 4 is 8. 1/4 = 2/8. So (-3 + 2)/8 = -1/8.",
        "misconceptions": {
          "$-\\frac{2}{12}$": "Never add denominators directly! Always find a common denominator first."
        }
      },
      {
        "id": "rn-6",
        "topicId": "rational-numbers",
        "difficulty": -0.2,
        "text": "Calculate: $\\left(-\\frac{5}{6}\\right) \\times \\left(-\\frac{3}{10}\\right)$",
        "options": [
          "$\\frac{15}{60}$",
          "$\\frac{1}{4}$",
          "$-\\frac{1}{4}$",
          "$-\\frac{8}{16}$"
        ],
        "correctAnswer": "$\\frac{1}{4}$",
        "explanation": "Multiplying two negatives gives a positive: (-5 * -3)/(6 * 10) = 15/60 = 1/4.",
        "misconceptions": {
          "$-\\frac{1}{4}$": "The product of two negative rational numbers is always positive."
        }
      },
      {
        "id": "rn-7",
        "topicId": "rational-numbers",
        "difficulty": 0.2,
        "text": "Compute: $\\left(-\\frac{4}{9}\\right) \\div \\left(\\frac{8}{15}\\right)$",
        "options": [
          "$-\\frac{32}{135}$",
          "$\\frac{5}{6}$",
          "$-\\frac{6}{5}$",
          "$-\\frac{5}{6}$"
        ],
        "correctAnswer": "$-\\frac{5}{6}$",
        "explanation": "Division is multiplication by the reciprocal: (-4/9) * (15/8) = -60/72 = -5/6.",
        "misconceptions": {
          "$-\\frac{32}{135}$": "Did you multiply the numerators and denominators without taking the reciprocal?"
        }
      },
      {
        "id": "rn-8",
        "topicId": "rational-numbers",
        "difficulty": 0.6,
        "text": "Find a rational number lying exactly halfway between $\\frac{1}{4}$ and $\\frac{1}{2}$.",
        "options": [
          "$\\frac{2}{6}$",
          "$\\frac{3}{8}$",
          "$\\frac{5}{8}$",
          "$\\frac{1}{3}$"
        ],
        "correctAnswer": "$\\frac{3}{8}$",
        "explanation": "Halfway point = (1/4 + 1/2) / 2 = (1/4 + 2/4) / 2 = (3/4) / 2 = 3/8.",
        "misconceptions": {
          "$\\frac{2}{6}$": "Adding numerators and denominators (1+1)/(4+2) = 2/6 is incorrect fraction addition."
        }
      },
      {
        "id": "rn-9",
        "topicId": "rational-numbers",
        "difficulty": 0.9,
        "text": "Which property is illustrated by: $\\frac{2}{3} + \\left(-\\frac{5}{7}\\right) = \\left(-\\frac{5}{7}\\right) + \\frac{2}{3}$?",
        "options": [
          "Commutative property of addition",
          "Closure property",
          "Associative property of addition",
          "Distributive property"
        ],
        "correctAnswer": "Commutative property of addition",
        "explanation": "Changing the order of addends (a + b = b + a) demonstrates the commutative property of addition.",
        "misconceptions": {
          "Associative property of addition": "Associative property involves grouping three or more numbers with brackets: (a+b)+c = a+(b+c)."
        }
      },
      {
        "id": "rn-10",
        "topicId": "rational-numbers",
        "difficulty": 1.2,
        "text": "Using the distributive property, calculate: $\\frac{7}{5} \\times \\left(-\\frac{3}{12}\\right) + \\frac{7}{5} \\times \\frac{5}{12}$",
        "options": [
          "$\\frac{7}{30}$",
          "$-\\frac{7}{30}$",
          "$\\frac{14}{60}$",
          "$\\frac{7}{12}$"
        ],
        "correctAnswer": "$\\frac{7}{30}$",
        "explanation": "Factor out 7/5: (7/5) * [(-3/12) + (5/12)] = (7/5) * (2/12) = (7/5) * (1/6) = 7/30.",
        "misconceptions": {
          "$\\frac{7}{12}$": "Did you forget to multiply by 7/5 after combining the brackets?"
        }
      },
      {
        "id": "rn-11",
        "topicId": "rational-numbers",
        "difficulty": 1.5,
        "text": "If the product of two rational numbers is $-\\frac{16}{9}$ and one of the numbers is $-\\frac{4}{3}$, find the other.",
        "options": [
          "$\\frac{4}{3}$",
          "$-\\frac{3}{4}$",
          "$-\\frac{4}{3}$",
          "$\\frac{64}{27}$"
        ],
        "correctAnswer": "$\\frac{4}{3}$",
        "explanation": "Other number = (-16/9) / (-4/3) = (-16/9) * (-3/4) = 48/36 = 4/3.",
        "misconceptions": {
          "$-\\frac{4}{3}$": "Dividing a negative number by a negative number yields a positive quotient."
        }
      },
      {
        "id": "rn-12",
        "topicId": "rational-numbers",
        "difficulty": 1.7,
        "text": "A 24-metre-long rope is cut into equal pieces of length $2\\frac{2}{5}$ metres each. How many pieces are obtained?",
        "options": [
          "15",
          "10",
          "8",
          "12"
        ],
        "correctAnswer": "10",
        "explanation": "2 2/5 = 12/5. Number of pieces = 24 / (12/5) = 24 * (5/12) = 2 * 5 = 10 pieces.",
        "misconceptions": {
          "12": "Check division: 24 divided by 12/5 equals 10, not 12."
        }
      },
      {
        "id": "rn-13",
        "topicId": "rational-numbers",
        "difficulty": 1.9,
        "text": "How many rational numbers exist between any two distinct rational numbers?",
        "options": [
          "Finite number",
          "Only 10",
          "Only 1",
          "Infinitely many"
        ],
        "correctAnswer": "Infinitely many",
        "explanation": "By the density property of rational numbers, between any two rational numbers there exist infinitely many rational numbers.",
        "misconceptions": {
          "Finite number": "Unlike integers, rational numbers are dense; you can always take midpoints indefinitely."
        }
      },
      {
        "id": "rn-14",
        "topicId": "rational-numbers",
        "difficulty": 2.1,
        "text": "Find three rational numbers between $\\frac{1}{3}$ and $\\frac{1}{2}$ with common denominator 24.",
        "options": [
          "$\\frac{8}{24}, \\frac{11}{24}, \\frac{13}{24}$",
          "$\\frac{7}{24}, \\frac{8}{24}, \\frac{9}{24}$",
          "$\\frac{9}{24}, \\frac{10}{24}, \\frac{11}{24}$",
          "$\\frac{12}{24}, \\frac{13}{24}, \\frac{14}{24}$"
        ],
        "correctAnswer": "$\\frac{9}{24}, \\frac{10}{24}, \\frac{11}{24}$",
        "explanation": "1/3 = 8/24 and 1/2 = 12/24. Rational numbers between 8/24 and 12/24 are 9/24, 10/24, and 11/24.",
        "misconceptions": {
          "$\\frac{7}{24}, \\frac{8}{24}, \\frac{9}{24}$": "7/24 is less than 8/24 (1/3), so it lies outside the range."
        }
      },
      {
        "id": "rn-15",
        "topicId": "rational-numbers",
        "difficulty": 2.3,
        "text": "From a ribbon of length $7\\frac{1}{2}\\text{ m}$, two pieces of lengths $2\\frac{1}{4}\\text{ m}$ and $3\\frac{1}{3}\\text{ m}$ are cut off. What is the length of the remaining ribbon?",
        "options": [
          "$2\\frac{1}{12}\\text{ m}$",
          "$1\\frac{5}{12}\\text{ m}$",
          "$2\\frac{1}{4}\\text{ m}$",
          "$1\\frac{11}{12}\\text{ m}$"
        ],
        "correctAnswer": "$1\\frac{11}{12}\\text{ m}$",
        "explanation": "Total cut = 9/4 + 10/3 = (27 + 40)/12 = 67/12 m. Remaining = 15/2 - 67/12 = 90/12 - 67/12 = 23/12 = 1 11/12 m.",
        "misconceptions": {
          "$2\\frac{1}{12}\\text{ m}$": "Check common denominator calculation: 90/12 - 67/12 = 23/12 = 1 11/12."
        }
      },
      {
        "id": "rn-16",
        "topicId": "rational-numbers",
        "difficulty": 2.4,
        "text": "If $x = \\frac{1}{3}$ and $y = -\\frac{3}{4}$, verify whether $|x + y| \\le |x| + |y|$ (Triangle inequality). What are the values of $|x + y|$ and $|x| + |y|$?",
        "options": [
          "$|x + y| = \\frac{13}{12}$ and $|x| + |y| = \\frac{5}{12}$",
          "$|x + y| = \\frac{5}{12}$ and $|x| + |y| = \\frac{13}{12}$",
          "$|x + y| = -\\frac{5}{12}$ and $|x| + |y| = \\frac{13}{12}$",
          "$|x + y| = 1$ and $|x| + |y| = 1$"
        ],
        "correctAnswer": "$|x + y| = \\frac{5}{12}$ and $|x| + |y| = \\frac{13}{12}$",
        "explanation": "x + y = 4/12 - 9/12 = -5/12, so |x+y| = 5/12. |x| + |y| = 1/3 + 3/4 = 4/12 + 9/12 = 13/12. Since 5/12 <= 13/12, it holds true.",
        "misconceptions": {
          "$|x + y| = -\\frac{5}{12}$": "Absolute value is always non-negative; |-5/12| = +5/12."
        }
      },
      {
        "id": "rn-17",
        "topicId": "rational-numbers",
        "difficulty": 2.5,
        "text": "Evaluate: $\\left(-\\frac{2}{3}\\right)^3 \\times \\left(-\\frac{3}{2}\\right)^2 \\div \\left(-\\frac{1}{6}\\right)$",
        "options": [
          "$-1$",
          "$\\frac{1}{4}$",
          "$-4$",
          "$4$"
        ],
        "correctAnswer": "$4$",
        "explanation": "(-2/3)^3 = -8/27. (-3/2)^2 = 9/4. Product = (-8/27) * (9/4) = -2/3. Now (-2/3) / (-1/6) = (-2/3) * (-6/1) = +4.",
        "misconceptions": {
          "$-4$": "(-2/3) divided by (-1/6) involves two negative numbers, resulting in positive +4."
        }
      }
    ]
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
    "items": [
      {
        "id": "le-1",
        "topicId": "linear-equations",
        "difficulty": -2.1,
        "text": "Solve for $x$: $x - 2 = 7$",
        "options": [
          "$5$",
          "$9$",
          "$-9$",
          "$-5$"
        ],
        "correctAnswer": "$9$",
        "explanation": "Transposing -2 to the RHS: x = 7 + 2 = 9.",
        "misconceptions": {
          "$5$": "When transposing -2 across the equals sign, its sign changes from - to +."
        }
      },
      {
        "id": "le-2",
        "topicId": "linear-equations",
        "difficulty": -1.7,
        "text": "Solve for $x$: $3x = 21$",
        "options": [
          "$7$",
          "$24$",
          "$18$",
          "$63$"
        ],
        "correctAnswer": "$7$",
        "explanation": "Divide both sides by 3: x = 21 / 3 = 7.",
        "misconceptions": {
          "$18$": "3x means 3 multiplied by x, not 3 added to x."
        }
      },
      {
        "id": "le-3",
        "topicId": "linear-equations",
        "difficulty": -1.3,
        "text": "Solve for $y$: $\\frac{y}{5} = 10$",
        "options": [
          "$2$",
          "$50$",
          "$15$",
          "$5$"
        ],
        "correctAnswer": "$50$",
        "explanation": "Multiply both sides by 5: y = 10 * 5 = 50.",
        "misconceptions": {
          "$2$": "To undo division by 5, you multiply by 5 (not divide)."
        }
      },
      {
        "id": "le-4",
        "topicId": "linear-equations",
        "difficulty": -0.9,
        "text": "Solve for $y$: $2y + 9 = 4$",
        "options": [
          "$-5$",
          "$-\\frac{5}{2}$",
          "$\\frac{5}{2}$",
          "$-\\frac{13}{2}$"
        ],
        "correctAnswer": "$-\\frac{5}{2}$",
        "explanation": "2y = 4 - 9 = -5 => y = -5/2.",
        "misconceptions": {
          "$\\frac{5}{2}$": "4 - 9 equals -5, not +5."
        }
      },
      {
        "id": "le-5",
        "topicId": "linear-equations",
        "difficulty": -0.4,
        "text": "Solve: $5x + 9 = 5 + 3x$",
        "options": [
          "$-2$",
          "$-7$",
          "$2$",
          "$7$"
        ],
        "correctAnswer": "$-2$",
        "explanation": "Transpose 3x to LHS: 5x - 3x = 5 - 9 => 2x = -4 => x = -2.",
        "misconceptions": {
          "$2$": "5 - 9 is -4, so 2x = -4 gives x = -2."
        }
      },
      {
        "id": "le-6",
        "topicId": "linear-equations",
        "difficulty": 0,
        "text": "Solve for $z$: $4z + 3 = 6 + 2z$",
        "options": [
          "$3$",
          "$1$",
          "$\\frac{3}{2}$",
          "$-\\frac{3}{2}$"
        ],
        "correctAnswer": "$\\frac{3}{2}$",
        "explanation": "4z - 2z = 6 - 3 => 2z = 3 => z = 3/2.",
        "misconceptions": {
          "$3$": "Remember to divide 3 by the coefficient of z, which is 2."
        }
      },
      {
        "id": "le-7",
        "topicId": "linear-equations",
        "difficulty": 0.4,
        "text": "Two numbers are in the ratio $5:3$. If they differ by 18, what are the numbers?",
        "options": [
          "$60$ and $42$",
          "$50$ and $32$",
          "$40$ and $22$",
          "$45$ and $27$"
        ],
        "correctAnswer": "$45$ and $27$",
        "explanation": "Let numbers be 5x and 3x. 5x - 3x = 18 => 2x = 18 => x = 9. Numbers are 5*9 = 45 and 3*9 = 27.",
        "misconceptions": {
          "$50$ and $32$": "50 and 32 have a difference of 18, but their ratio is 25:16, not 5:3."
        }
      },
      {
        "id": "le-8",
        "topicId": "linear-equations",
        "difficulty": 0.8,
        "text": "Solve: $8x + 4 = 3(x - 1) + 7$",
        "options": [
          "$0$",
          "$2$",
          "$1$",
          "$-1$"
        ],
        "correctAnswer": "$0$",
        "explanation": "Expand RHS: 8x + 4 = 3x - 3 + 7 = 3x + 4. 8x - 3x = 4 - 4 => 5x = 0 => x = 0.",
        "misconceptions": {
          "$1$": "4 - 4 is 0, and 0 divided by 5 is 0."
        }
      },
      {
        "id": "le-9",
        "topicId": "linear-equations",
        "difficulty": 1.1,
        "text": "Solve: $\\frac{x}{3} + 1 = \\frac{7}{15}$",
        "options": [
          "$-\\frac{8}{5}$",
          "$-\\frac{2}{5}$",
          "$-\\frac{22}{15}$",
          "$\\frac{8}{5}$"
        ],
        "correctAnswer": "$-\\frac{8}{5}$",
        "explanation": "x/3 = 7/15 - 1 = 7/15 - 15/15 = -8/15. x = 3 * (-8/15) = -8/5.",
        "misconceptions": {
          "$\\frac{8}{5}$": "7/15 - 1 is negative (-8/15), so multiplying by 3 gives -8/5."
        }
      },
      {
        "id": "le-10",
        "topicId": "linear-equations",
        "difficulty": 1.4,
        "text": "The sum of three consecutive integers is 51. What is the smallest of these integers?",
        "options": [
          "17",
          "16",
          "15",
          "18"
        ],
        "correctAnswer": "16",
        "explanation": "Let integers be x, x+1, x+2. Sum: 3x + 3 = 51 => 3x = 48 => x = 16. Consecutive numbers are 16, 17, 18.",
        "misconceptions": {
          "17": "17 is the middle integer, not the smallest."
        }
      },
      {
        "id": "le-11",
        "topicId": "linear-equations",
        "difficulty": 1.7,
        "text": "Sahil's mother is 3 times as old as Sahil. After 5 years their ages will add up to 66 years. Find Sahil's present age.",
        "options": [
          "14 years",
          "15 years",
          "12 years",
          "16 years"
        ],
        "correctAnswer": "14 years",
        "explanation": "Sahil = x, Mother = 3x. In 5 years: (x+5) + (3x+5) = 66 => 4x + 10 = 66 => 4x = 56 => x = 14.",
        "misconceptions": {
          "12 years": "Did you forget to add 5 years to BOTH Sahil and his mother (total +10 years)?"
        }
      },
      {
        "id": "le-12",
        "topicId": "linear-equations",
        "difficulty": 1.9,
        "text": "Solve the equation: $\\frac{m - 1}{2} - \\frac{m - 2}{3} = 1$",
        "options": [
          "$6$",
          "$8$",
          "$7$",
          "$5$"
        ],
        "correctAnswer": "$5$",
        "explanation": "Multiply by LCM 6: 3(m - 1) - 2(m - 2) = 6 => 3m - 3 - 2m + 4 = 6 => m + 1 = 6 => m = 5."
      },
      {
        "id": "le-13",
        "topicId": "linear-equations",
        "difficulty": 2.1,
        "text": "The perimeter of a rectangular swimming pool is 154 m. Its length is 2 m more than twice its breadth. What are the length and breadth?",
        "options": [
          "Length = 56 m, Breadth = 21 m",
          "Length = 50 m, Breadth = 27 m",
          "Length = 52 m, Breadth = 25 m",
          "Length = 54 m, Breadth = 23 m"
        ],
        "correctAnswer": "Length = 52 m, Breadth = 25 m",
        "explanation": "Let breadth = b. Length = 2b + 2. Perimeter = 2(l + b) = 2(2b + 2 + b) = 6b + 4 = 154 => 6b = 150 => b = 25 m. Length = 2(25) + 2 = 52 m.",
        "misconceptions": {
          "Length = 50 m, Breadth = 27 m": "2*(27) + 2 = 56, not 50."
        }
      },
      {
        "id": "le-14",
        "topicId": "linear-equations",
        "difficulty": 2.2,
        "text": "Solve: $\\frac{3y + 4}{2 - 6y} = -\\frac{2}{5}$",
        "options": [
          "$8$",
          "$4$",
          "$-2$",
          "$-8$"
        ],
        "correctAnswer": "$-8$",
        "explanation": "Cross multiply: 5(3y + 4) = -2(2 - 6y) => 15y + 20 = -4 + 12y => 15y - 12y = -4 - 20 => 3y = -24 => y = -8.",
        "misconceptions": {
          "$-2$": "Be careful with sign distribution: -2 * (-6y) = +12y and -2 * 2 = -4."
        }
      },
      {
        "id": "le-15",
        "topicId": "linear-equations",
        "difficulty": 2.3,
        "text": "A number consists of two digits whose sum is 9. If 27 is added to the number, its digits are reversed. Find the number.",
        "options": [
          "45",
          "36",
          "27",
          "63"
        ],
        "correctAnswer": "36",
        "explanation": "Digits sum to 9. Let units = x, tens = 9-x. Value = 10(9-x) + x = 90 - 9x. Reversed = 10x + (9-x) = 9x + 9. (90 - 9x) + 27 = 9x + 9 => 117 - 9 = 18x => 108 = 18x => x = 6. Tens = 9-6 = 3. Number is 36.",
        "misconceptions": {
          "63": "63 + 27 = 90, which is not 36 reversed. 36 + 27 = 63, so 36 is the original number."
        }
      },
      {
        "id": "le-16",
        "topicId": "linear-equations",
        "difficulty": 2.4,
        "text": "A streamer goes downstream from one port to another in 9 hours, and covers the same distance upstream in 10 hours. If the speed of stream is 1 km/h, find the speed of the streamer in still water.",
        "options": [
          "20 km/h",
          "18 km/h",
          "21 km/h",
          "19 km/h"
        ],
        "correctAnswer": "19 km/h",
        "explanation": "Let speed in still water = x. Downstream speed = x + 1, Upstream speed = x - 1. Distance is equal: 9(x + 1) = 10(x - 1) => 9x + 9 = 10x - 10 => x = 19 km/h.",
        "misconceptions": {
          "18 km/h": "9(18+1) = 171, while 10(18-1) = 170. Distances must be strictly equal."
        }
      },
      {
        "id": "le-17",
        "topicId": "linear-equations",
        "difficulty": 2.5,
        "text": "Solve for $x$: $\\frac{(x + 1)(x + 2)}{(x + 3)(x + 4)} = 1 - \\frac{4}{(x + 3)(x + 4)}$.",
        "options": [
          "$x = 2$",
          "$x = 0$",
          "All real numbers except $-3, -4$",
          "No solution"
        ],
        "correctAnswer": "All real numbers except $-3, -4$",
        "explanation": "Equations with identical polynomial expansions on both sides hold for all real numbers except values where the denominator is zero (x != -3, -4)."
      }
    ]
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
    "items": [
      {
        "id": "quad-1",
        "topicId": "quadrilaterals",
        "difficulty": -2.1,
        "text": "What is the sum of the measures of the four interior angles of any quadrilateral?",
        "options": [
          "$360^\\circ$",
          "$540^\\circ$",
          "$180^\\circ$",
          "$720^\\circ$"
        ],
        "correctAnswer": "$360^\\circ$",
        "explanation": "Angle sum of any n-gon is (n - 2) * 180°. For n = 4, (4 - 2) * 180° = 360°.",
        "misconceptions": {
          "$180^\\circ$": "180° is the angle sum of a triangle, not a quadrilateral."
        }
      },
      {
        "id": "quad-2",
        "topicId": "quadrilaterals",
        "difficulty": -1.7,
        "text": "What is the sum of the measures of the exterior angles of ANY convex polygon?",
        "options": [
          "$n \\times 180^\\circ$",
          "$540^\\circ$",
          "$180^\\circ$",
          "$360^\\circ$"
        ],
        "correctAnswer": "$360^\\circ$",
        "explanation": "The sum of the exterior angles of any convex polygon is always constant at 360°, regardless of the number of sides.",
        "misconceptions": {
          "$n \\times 180^\\circ$": "The exterior angle sum is independent of n and always equals 360°."
        }
      },
      {
        "id": "quad-3",
        "topicId": "quadrilaterals",
        "difficulty": -1.3,
        "text": "How many diagonals does a convex quadrilateral have?",
        "options": [
          "$2$",
          "$4$",
          "$0$",
          "$1$"
        ],
        "correctAnswer": "$2$",
        "explanation": "The number of diagonals is given by n(n - 3)/2. For n = 4: 4(1)/2 = 2 diagonals.",
        "misconceptions": {
          "$4$": "A quadrilateral has 4 sides and 4 vertices, but only 2 diagonals connecting opposite vertices."
        }
      },
      {
        "id": "quad-4",
        "topicId": "quadrilaterals",
        "difficulty": -0.8,
        "text": "How many diagonals does a regular hexagon have?",
        "options": [
          "$6$",
          "$9$",
          "$12$",
          "$8$"
        ],
        "correctAnswer": "$9$",
        "explanation": "Using the formula n(n - 3)/2 with n = 6: 6(6 - 3)/2 = 6 * 3 / 2 = 9 diagonals.",
        "misconceptions": {
          "$6$": "A hexagon has 6 sides, but 9 diagonals."
        }
      },
      {
        "id": "quad-5",
        "topicId": "quadrilaterals",
        "difficulty": -0.4,
        "text": "Find the measure of each interior angle of a regular pentagon (5 sides).",
        "options": [
          "$90^\\circ$",
          "$120^\\circ$",
          "$72^\\circ$",
          "$108^\\circ$"
        ],
        "correctAnswer": "$108^\\circ$",
        "explanation": "Total sum = (5 - 2) * 180° = 540°. Each interior angle = 540° / 5 = 108°.",
        "misconceptions": {
          "$72^\\circ$": "72° is the exterior angle (360° / 5), interior angle is 180° - 72° = 108°."
        }
      },
      {
        "id": "quad-6",
        "topicId": "quadrilaterals",
        "difficulty": 0.1,
        "text": "In a parallelogram ABCD, if $\\angle A = 70^\\circ$, what is the measure of adjacent angle $\\angle B$?",
        "options": [
          "$180^\\circ$",
          "$90^\\circ$",
          "$110^\\circ$",
          "$70^\\circ$"
        ],
        "correctAnswer": "$110^\\circ$",
        "explanation": "Adjacent angles of a parallelogram are supplementary (sum = 180°). Thus, angle B = 180° - 70° = 110°.",
        "misconceptions": {
          "$70^\\circ$": "Opposite angles are equal (angle C = 70°), but adjacent angles are supplementary (110°)."
        }
      },
      {
        "id": "quad-7",
        "topicId": "quadrilaterals",
        "difficulty": 0.5,
        "text": "A quadrilateral with all 4 sides equal in length and diagonals intersecting perpendicularly at right angles, but interior angles not necessarily $90^\\circ$, is a:",
        "options": [
          "Rhombus",
          "Rectangle",
          "Trapezium",
          "Kite"
        ],
        "correctAnswer": "Rhombus",
        "explanation": "A rhombus has all four sides equal and its diagonals are perpendicular bisectors of each other.",
        "misconceptions": {
          "Rectangle": "A rectangle has opposite sides equal and 90° corner angles, but its diagonals are not perpendicular."
        }
      },
      {
        "id": "quad-8",
        "topicId": "quadrilaterals",
        "difficulty": 0.9,
        "text": "Find the number of sides of a regular polygon whose each exterior angle measures $45^\\circ$.",
        "options": [
          "$10$",
          "$6$",
          "$8$",
          "$9$"
        ],
        "correctAnswer": "$8$",
        "explanation": "Number of sides n = 360° / (measure of each exterior angle) = 360° / 45° = 8 (an octagon).",
        "misconceptions": {
          "$6$": "360° / 45° = 8, not 6."
        }
      },
      {
        "id": "quad-9",
        "topicId": "quadrilaterals",
        "difficulty": 1.2,
        "text": "In a parallelogram, two adjacent angles are in the ratio $4:5$. What is the measure of the smaller angle?",
        "options": [
          "$60^\\circ$",
          "$70^\\circ$",
          "$100^\\circ$",
          "$80^\\circ$"
        ],
        "correctAnswer": "$80^\\circ$",
        "explanation": "Adjacent angles are supplementary: 4x + 5x = 180° => 9x = 180° => x = 20°. Smaller angle = 4 * 20° = 80°.",
        "misconceptions": {
          "$100^\\circ$": "100° is the larger angle (5 * 20°); the question asks for the smaller angle."
        }
      },
      {
        "id": "quad-10",
        "topicId": "quadrilaterals",
        "difficulty": 1.5,
        "text": "Three angles of a quadrilateral are $75^\\circ, 90^\\circ$, and $75^\\circ$. What is the measure of the fourth angle?",
        "options": [
          "$130^\\circ$",
          "$120^\\circ$",
          "$90^\\circ$",
          "$110^\\circ$"
        ],
        "correctAnswer": "$120^\\circ$",
        "explanation": "Sum of four angles = 360°. Fourth angle = 360° - (75° + 90° + 75°) = 360° - 240° = 120°.",
        "misconceptions": {
          "$110^\\circ$": "75 + 90 + 75 = 240. 360 - 240 = 120."
        }
      },
      {
        "id": "quad-11",
        "topicId": "quadrilaterals",
        "difficulty": 1.8,
        "text": "In rectangle ABCD, diagonals AC and BD intersect at O. If $OA = 2x + 4$ and $OD = 3x + 1$, find $x$.",
        "options": [
          "$2$",
          "$4$",
          "$3$",
          "$5$"
        ],
        "correctAnswer": "$3$",
        "explanation": "Diagonals of a rectangle are equal in length and bisect each other, so OA = OD. Thus, 2x + 4 = 3x + 1 => x = 3.",
        "misconceptions": {
          "$2$": "3x - 2x = 4 - 1 => x = 3."
        }
      },
      {
        "id": "quad-12",
        "topicId": "quadrilaterals",
        "difficulty": 2,
        "text": "The diagonals of a rhombus are 16 cm and 12 cm. What is the perimeter of the rhombus?",
        "options": [
          "$56\\text{ cm}$",
          "$40\\text{ cm}$",
          "$48\\text{ cm}$",
          "$20\\text{ cm}$"
        ],
        "correctAnswer": "$40\\text{ cm}$",
        "explanation": "Diagonals bisect at right angles. Half-lengths are 8 cm and 6 cm. Side = sqrt(8^2 + 6^2) = sqrt(64 + 36) = 10 cm. Perimeter = 4 * 10 = 40 cm.",
        "misconceptions": {
          "$20\\text{ cm}$": "20 cm is the sum of two sides, the perimeter is 4 * side = 40 cm."
        }
      },
      {
        "id": "quad-13",
        "topicId": "quadrilaterals",
        "difficulty": 2.2,
        "text": "A quadrilateral having exactly one pair of parallel opposite sides is known as a:",
        "options": [
          "Kite",
          "Rhombus",
          "Parallelogram",
          "Trapezium"
        ],
        "correctAnswer": "Trapezium",
        "explanation": "A trapezium is defined as a quadrilateral with at least/exactly one pair of parallel sides.",
        "misconceptions": {
          "Parallelogram": "A parallelogram has BOTH pairs of opposite sides parallel."
        }
      },
      {
        "id": "quad-14",
        "topicId": "quadrilaterals",
        "difficulty": 2.3,
        "text": "Can a regular polygon have an interior angle of $105^\\circ$?",
        "options": [
          "Yes, it is a regular heptagon",
          "No, because exterior angle $75^\\circ$ does not divide $360^\\circ$ evenly",
          "No, because interior angle cannot be odd",
          "Yes, it has 12 sides"
        ],
        "correctAnswer": "No, because exterior angle $75^\\circ$ does not divide $360^\\circ$ evenly",
        "explanation": "Exterior angle = 180° - 105° = 75°. 360° / 75° = 4.8, which is not an integer. Hence no such regular polygon exists.",
        "misconceptions": {
          "Yes, it has 12 sides": "A 12-sided regular polygon has exterior angle 360/12 = 30°, interior angle 150°."
        }
      },
      {
        "id": "quad-15",
        "topicId": "quadrilaterals",
        "difficulty": 2.4,
        "text": "In an isosceles trapezium ABCD with $AB \\parallel CD$ and non-parallel sides $AD = BC$, which property is ALWAYS true?",
        "options": [
          "Opposite angles are supplementary only if all sides are equal",
          "Diagonals are perpendicular to each other",
          "Base angles are equal ($\\angle A = \\angle B$) and diagonals are equal",
          "All four sides are equal"
        ],
        "correctAnswer": "Base angles are equal ($\\angle A = \\angle B$) and diagonals are equal",
        "explanation": "In an isosceles trapezium, the base angles are congruent and diagonals are equal in length.",
        "misconceptions": {
          "Diagonals are perpendicular to each other": "Diagonals are perpendicular in a kite or rhombus, not generally in an isosceles trapezium."
        }
      },
      {
        "id": "quad-16",
        "topicId": "quadrilaterals",
        "difficulty": 2.4,
        "text": "Find the value of $x + y + z + w$ for any convex quadrilateral where $x, y, z, w$ represent the exterior angles at each of the 4 vertices.",
        "options": [
          "$360^\\circ$",
          "$720^\\circ$",
          "$180^\\circ$",
          "$540^\\circ$"
        ],
        "correctAnswer": "$360^\\circ$",
        "explanation": "The sum of the exterior angles of any convex polygon is always 360°.",
        "misconceptions": {
          "$720^\\circ$": "720° is the sum of 4 straight lines (4 * 180 = 720), minus interior angles (360), leaving exactly 360°."
        }
      },
      {
        "id": "quad-17",
        "topicId": "quadrilaterals",
        "difficulty": 2.5,
        "text": "The interior angle of a regular polygon exceeds its exterior angle by $108^\\circ$. How many sides does this polygon have?",
        "options": [
          "$12$",
          "$8$",
          "$9$",
          "$10$"
        ],
        "correctAnswer": "$10$",
        "explanation": "Let exterior = e, interior = i. i + e = 180° and i - e = 108°. Adding gives 2i = 288° => i = 144°, e = 36°. Number of sides n = 360° / 36° = 10 sides (decagon).",
        "misconceptions": {
          "$8$": "For an octagon, e = 360/8 = 45°, i = 135°, difference = 135 - 45 = 90°, not 108°."
        }
      }
    ]
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
    "items": [
      {
        "id": "sqr-1",
        "topicId": "squares-and-square-roots",
        "difficulty": -2.4,
        "text": "Which of the following statements is TRUE for any perfect square number?",
        "options": [
          "It always has an odd number of factors",
          "It always has an even number of factors",
          "It can never be an even number",
          "It must always end with an odd digit"
        ],
        "correctAnswer": "It always has an odd number of factors",
        "explanation": "Factors of a non-square number always come in distinct pairs (a, b) where a * b = n. For a perfect square n = k^2, the factor k pairs with itself (k * k = n), making the total number of distinct factors odd. For example, 16 has 5 factors: 1, 2, 4, 8, 16.",
        "misconceptions": {
          "It always has an even number of factors": "Ordinary numbers have an even number of factors because they pair up. Only perfect squares have an odd number of factors due to the repeated square root."
        }
      },
      {
        "id": "sqr-2",
        "topicId": "squares-and-square-roots",
        "difficulty": -2,
        "text": "Which of the following digits can NEVER appear in the units place of a perfect square number?",
        "options": [
          "$8$",
          "$6$",
          "$9$",
          "$1$"
        ],
        "correctAnswer": "$8$",
        "explanation": "The square of any natural number can only end in 0, 1, 4, 5, 6, or 9. Numbers ending in 2, 3, 7, or 8 can never be perfect squares. Therefore, 8 can never be the unit digit.",
        "misconceptions": {
          "$6$": "$4^2 = 16$ and $6^2 = 36$ both end in 6, so 6 is a valid unit digit of a perfect square."
        }
      },
      {
        "id": "sqr-3",
        "topicId": "squares-and-square-roots",
        "difficulty": -1.7,
        "text": "Which of the following numbers can NOT be a perfect square solely by examining the number of zeros at the end?",
        "options": [
          "$4000$",
          "$400$",
          "$90000$",
          "$2500$"
        ],
        "correctAnswer": "$4000$",
        "explanation": "A perfect square must end with an even number of zeros. $4000$ ends with 3 zeros (an odd count), so it cannot be a perfect square ($400 = 20^2$, $90000 = 300^2$, and $2500 = 50^2$ all have an even number of zeros).",
        "misconceptions": {
          "$90000$": "$90000$ ends with 4 zeros (an even count), and $300^2 = 90000$."
        }
      },
      {
        "id": "sqr-4",
        "topicId": "squares-and-square-roots",
        "difficulty": -1.4,
        "text": "Using the textbook identity for squaring numbers ending in 5: $(a5)^2 = [a \\times (a + 1)] \\text{ hundreds} + 25$, what is the value of $95^2$?",
        "options": [
          "$9025$",
          "$8525$",
          "$9125$",
          "$8925$"
        ],
        "correctAnswer": "$9025$",
        "explanation": "Here a = 9. We compute a * (a + 1) = 9 * 10 = 90 hundreds = 9000. Adding 25 gives 9025. Thus, $95^2 = 9025$.",
        "misconceptions": {
          "$8525$": "Multiply a by (a + 1), which is 9 * 10 = 90, not 9 * 9 = 81."
        }
      },
      {
        "id": "sqr-5",
        "topicId": "squares-and-square-roots",
        "difficulty": -1.1,
        "text": "How many natural numbers lie between $25^2$ and $26^2$?",
        "options": [
          "$50$",
          "$49$",
          "$51$",
          "$52$"
        ],
        "correctAnswer": "$50$",
        "explanation": "Between $n^2$ and $(n+1)^2$, there are always $2n$ non-square natural numbers. For $n = 25$, count $= 2 \\times 25 = 50$. (Checking: $26^2 - 25^2 - 1 = 676 - 625 - 1 = 50$).",
        "misconceptions": {
          "$51$": "Subtracting $676 - 625 = 51$ includes one boundary. To find numbers strictly between, subtract 1: $51 - 1 = 50$."
        }
      },
      {
        "id": "sqr-6",
        "topicId": "squares-and-square-roots",
        "difficulty": -0.8,
        "text": "What is the value of the sum $1 + 3 + 5 + 7 + 9 + 11 + 13 + 15$ without actual addition?",
        "options": [
          "$64$",
          "$49$",
          "$81$",
          "$56$"
        ],
        "correctAnswer": "$64$",
        "explanation": "This is the sum of the first 8 consecutive odd natural numbers (n = 8). The sum of the first n odd natural numbers equals $n^2 = 8^2 = 64$.",
        "misconceptions": {
          "$49$": "Count the number of terms: there are 8 terms, not 7 ($7^2 = 49$)."
        }
      },
      {
        "id": "sqr-7",
        "topicId": "squares-and-square-roots",
        "difficulty": -0.4,
        "text": "Given that $125^2 = 15625$, which expression gives the exact value of $126^2$ using consecutive square properties?",
        "options": [
          "$15625 + 251$",
          "$15625 + 126$",
          "$15625 + 253$",
          "$15625 + 26^2$"
        ],
        "correctAnswer": "$15625 + 251$",
        "explanation": "For consecutive integers, $(n+1)^2 = n^2 + [(n+1) + n] = n^2 + (2n + 1)$. Here $126^2 = 125^2 + (126 + 125) = 15625 + 251 = 15876$.",
        "misconceptions": {
          "$15625 + 126$": "The difference between $(n+1)^2$ and $n^2$ is $(n+1) + n = 251$, not just $(n+1)$."
        }
      },
      {
        "id": "sqr-8",
        "topicId": "squares-and-square-roots",
        "difficulty": 0,
        "text": "Evaluate the nested square root: $\\sqrt{208 + \\sqrt{2304}}$",
        "options": [
          "$16$",
          "$18$",
          "$14$",
          "$22$"
        ],
        "correctAnswer": "$16$",
        "explanation": "First evaluate the inner square root: $\\sqrt{2304} = 48$ (since $48^2 = 2304$). Now substitute: $\\sqrt{208 + 48} = \\sqrt{256} = 16$.",
        "misconceptions": {
          "$18$": "$18^2 = 324$, which is not 256."
        }
      },
      {
        "id": "sqr-9",
        "topicId": "squares-and-square-roots",
        "difficulty": 0.4,
        "text": "Find the smallest natural number by which $75$ should be divided so that the quotient is a perfect square.",
        "options": [
          "$3$",
          "$5$",
          "$1$",
          "$2$"
        ],
        "correctAnswer": "$3$",
        "explanation": "Prime factorisation of $75 = 3 \\times 5^2$. The prime factor 5 is paired ($5^2$), while 3 is unpaired. Dividing 75 by 3 gives $25 = 5^2$, which is a perfect square.",
        "misconceptions": {
          "$5$": "Dividing 75 by 5 leaves 15, which is not a perfect square because 3 and 5 are both unpaired."
        }
      },
      {
        "id": "sqr-10",
        "topicId": "squares-and-square-roots",
        "difficulty": 0.7,
        "text": "Given that $\\sqrt{1521} = 39$, what is the value of $\\sqrt{0.1521} + \\sqrt{15.21}$?",
        "options": [
          "$4.29$",
          "$3.51$",
          "$42.9$",
          "$35.1$"
        ],
        "correctAnswer": "$4.29$",
        "explanation": "$\\sqrt{0.1521} = \\frac{39}{100} = 0.39$ and $\\sqrt{15.21} = \\frac{39}{10} = 3.9$. Adding them gives $0.39 + 3.9 = 4.29$.",
        "misconceptions": {
          "$3.51$": "Be careful with decimal addition: $0.39 + 3.90 = 4.29$, not 3.51."
        }
      },
      {
        "id": "sqr-11",
        "topicId": "squares-and-square-roots",
        "difficulty": 1,
        "text": "Find the smallest square number that is divisible by each of $6$, $9$, and $15$.",
        "options": [
          "$900$",
          "$90$",
          "$180$",
          "$3600$"
        ],
        "correctAnswer": "$900$",
        "explanation": "First find $\\text{LCM}(6, 9, 15) = 90$. Prime factorisation: $90 = 2 \\times 3^2 \\times 5$. To make each factor paired, multiply 90 by $2 \\times 5 = 10$, giving $900 = 30^2$.",
        "misconceptions": {
          "$90$": "90 is the LCM, but not a perfect square since 2 and 5 are unpaired."
        }
      },
      {
        "id": "sqr-12",
        "topicId": "squares-and-square-roots",
        "difficulty": 1.3,
        "text": "The students of Class VIII donated ₹$2401$ in all for the National Relief Fund. Each student donated as many rupees as the number of students in the class. How many students are in the class?",
        "options": [
          "$49$",
          "$41$",
          "$51$",
          "$59$"
        ],
        "correctAnswer": "$49$",
        "explanation": "Let the number of students be x. Total donation $= x \\times x = x^2 = 2401$. Taking the square root, $x = \\sqrt{2401} = 49$ students.",
        "misconceptions": {
          "$51$": "$50^2 = 2500$. Since $2401 < 2500$, x must be less than 50 ($49^2 = 2401$)."
        }
      },
      {
        "id": "sqr-13",
        "topicId": "squares-and-square-roots",
        "difficulty": 1.6,
        "text": "Evaluate the square root of the mixed fraction: $\\sqrt{3\\frac{6}{25}}$",
        "options": [
          "$\\frac{9}{5}$",
          "$\\frac{5}{9}$",
          "$\\frac{4}{5}$",
          "$\\frac{5}{4}$"
        ],
        "correctAnswer": "$\\frac{9}{5}$",
        "explanation": "Convert to an improper fraction: $3\\frac{6}{25} = \\frac{3 \\times 25 + 6}{25} = \\frac{81}{25}$. Then $\\sqrt{\\frac{81}{25}} = \\frac{\\sqrt{81}}{\\sqrt{25}} = \\frac{9}{5}$.",
        "misconceptions": {
          "$\\frac{5}{9}$": "That is the reciprocal of the square root."
        }
      },
      {
        "id": "sqr-14",
        "topicId": "squares-and-square-roots",
        "difficulty": 1.8,
        "text": "A $6\\text{ m}$ long ladder leans against a vertical wall, reaching a height of $4.8\\text{ m}$. What is the distance between the foot of the ladder and the wall?",
        "options": [
          "$3.6\\text{ m}$",
          "$3.2\\text{ m}$",
          "$2.4\\text{ m}$",
          "$4.2\\text{ m}$"
        ],
        "correctAnswer": "$3.6\\text{ m}$",
        "explanation": "By Pythagoras theorem, $(\\text{ladder})^2 = (\\text{height})^2 + (\\text{base})^2 \\implies 6^2 = 4.8^2 + b^2 \\implies 36 = 23.04 + b^2$. Thus $b^2 = 12.96 \\implies b = \\sqrt{12.96} = 3.6\\text{ m}$.",
        "misconceptions": {
          "$2.4\\text{ m}$": "Subtracting $6 - 4.8 = 1.2$ instead of applying Pythagoras theorem ($c^2 = a^2 + b^2$)."
        }
      },
      {
        "id": "sqr-15",
        "topicId": "squares-and-square-roots",
        "difficulty": 2.1,
        "text": "There are $1000$ children in a school. For a P.T. drill, they have to stand in such a way that the number of rows equals the number of columns. How many children would be left out in this arrangement?",
        "options": [
          "$39$",
          "$24$",
          "$64$",
          "$31$"
        ],
        "correctAnswer": "$39$",
        "explanation": "Find the largest perfect square $\\le 1000$. By long division, $31^2 = 961 < 1000 < 32^2 = 1024$. The square drill uses 961 children ($31 \\times 31$). Children left out $= 1000 - 961 = 39$.",
        "misconceptions": {
          "$31$": "31 is the number of rows/columns in the formation, not the number of children left out.",
          "$24$": "24 is how many more children are needed to make $32^2 = 1024$, not the number left out."
        }
      },
      {
        "id": "sqr-16",
        "topicId": "squares-and-square-roots",
        "difficulty": 2.3,
        "text": "A gardener has $1400$ plants. He wants to plant them so that the number of rows equals the number of columns. What is the minimum number of additional plants he needs?",
        "options": [
          "$44$",
          "$31$",
          "$38$",
          "$40$"
        ],
        "correctAnswer": "$44$",
        "explanation": "Testing squares around 1400: $37^2 = 1369 < 1400 < 38^2 = 1444$. To form a complete square without removing any plants, he needs the next square: $38^2 = 1444$. Additional plants needed $= 1444 - 1400 = 44$.",
        "misconceptions": {
          "$31$": "$1400 - 1369 = 31$ is the number of excess plants if forming a $37 \\times 37$ square, but the gardener wants to add more plants to complete a larger square."
        }
      },
      {
        "id": "sqr-17",
        "topicId": "squares-and-square-roots",
        "difficulty": 2.5,
        "text": "If $\\sqrt{2025} + \\sqrt{0.0612 + x} = 45.25$, what is the exact value of $x$?",
        "options": [
          "$0.0013$",
          "$0.013$",
          "$0.0025$",
          "$0.0125$"
        ],
        "correctAnswer": "$0.0013$",
        "explanation": "First, $\\sqrt{2025} = 45$ (since $45^2 = 2025$). Substituting: $45 + \\sqrt{0.0612 + x} = 45.25 \\implies \\sqrt{0.0612 + x} = 0.25$. Squaring both sides gives $0.0612 + x = (0.25)^2 = 0.0625$. Solving for x: $x = 0.0625 - 0.0612 = 0.0013$.",
        "misconceptions": {
          "$0.013$": "Watch decimal places: $(0.25)^2 = 0.0625$, and $0.0625 - 0.0612 = 0.0013$ (four decimal places, not three)."
        }
      }
    ]
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
    "items": [
      {
        "id": "ai-1",
        "topicId": "algebraic-identities",
        "difficulty": -2,
        "text": "What is the coefficient of $x$ in the algebraic expression $7 - 3x + 5x^2$?",
        "options": [
          "$5$",
          "$7$",
          "$3$",
          "$-3$"
        ],
        "correctAnswer": "$-3$",
        "explanation": "The term containing x is -3x, so the numerical coefficient is -3.",
        "misconceptions": {
          "$3$": "Do not overlook the negative sign attached to 3x."
        }
      },
      {
        "id": "ai-2",
        "topicId": "algebraic-identities",
        "difficulty": -1.7,
        "text": "Multiply the monomials: $(-4p) \\times (7pq)$",
        "options": [
          "$28p^2q$",
          "$-28pq$",
          "$-28p^2q$",
          "$-11p^2q$"
        ],
        "correctAnswer": "$-28p^2q$",
        "explanation": "Multiply coefficients: (-4) * 7 = -28. Multiply variables: p * pq = p^2 * q. Result: -28p^2q.",
        "misconceptions": {
          "$-28pq$": "Remember that p * p = p^2, so the power of p is 2."
        }
      },
      {
        "id": "ai-3",
        "topicId": "algebraic-identities",
        "difficulty": -1.3,
        "text": "Which of the following is the standard algebraic identity for $(a + b)^2$?",
        "options": [
          "$a^2 + ab + b^2$",
          "$a^2 - 2ab + b^2$",
          "$a^2 + b^2$",
          "$a^2 + 2ab + b^2$"
        ],
        "correctAnswer": "$a^2 + 2ab + b^2$",
        "explanation": "(a + b)^2 = (a + b)(a + b) = a^2 + ab + ba + b^2 = a^2 + 2ab + b^2.",
        "misconceptions": {
          "$a^2 + b^2$": "The Freshman's Dream: forgetting the middle cross-product term +2ab is a common error."
        }
      },
      {
        "id": "ai-4",
        "topicId": "algebraic-identities",
        "difficulty": -0.9,
        "text": "Expand using an identity: $(2y + 5)(2y - 5)$",
        "options": [
          "$4y^2 - 25$",
          "$4y^2 - 20y + 25$",
          "$2y^2 - 25$",
          "$4y^2 + 25$"
        ],
        "correctAnswer": "$4y^2 - 25$",
        "explanation": "Using (a + b)(a - b) = a^2 - b^2: (2y)^2 - 5^2 = 4y^2 - 25.",
        "misconceptions": {
          "$2y^2 - 25$": "Remember that (2y)^2 = 4y^2, not 2y^2."
        }
      },
      {
        "id": "ai-5",
        "topicId": "algebraic-identities",
        "difficulty": -0.5,
        "text": "Evaluate $103 \\times 104$ without direct multiplication using $(x + a)(x + b) = x^2 + (a + b)x + ab$.",
        "options": [
          "10812",
          "10612",
          "10702",
          "10712"
        ],
        "correctAnswer": "10712",
        "explanation": "(100 + 3)(100 + 4) = 100^2 + (3 + 4)*100 + 3*4 = 10000 + 700 + 12 = 10712.",
        "misconceptions": {
          "10702": "3 * 4 = 12, so the last two digits are 12."
        }
      },
      {
        "id": "ai-6",
        "topicId": "algebraic-identities",
        "difficulty": 0.1,
        "text": "Factorise completely: $49x^2 - 36$",
        "options": [
          "$(7x - 6)^2$",
          "$(49x - 6)(x + 6)$",
          "$(7x - 6)(7x + 6)$",
          "$(7x - 3)(7x + 12)$"
        ],
        "correctAnswer": "$(7x - 6)(7x + 6)$",
        "explanation": "49x^2 - 36 = (7x)^2 - (6)^2 = (7x - 6)(7x + 6) using the difference of squares identity.",
        "misconceptions": {
          "$(7x - 6)^2$": "(7x - 6)^2 = 49x^2 - 84x + 36, which has a middle term."
        }
      },
      {
        "id": "ai-7",
        "topicId": "algebraic-identities",
        "difficulty": 0.6,
        "text": "Expand: $(3x + 4y)^2$",
        "options": [
          "$9x^2 + 24xy + 16y^2$",
          "$6x^2 + 24xy + 8y^2$",
          "$9x^2 + 16y^2$",
          "$9x^2 + 12xy + 16y^2$"
        ],
        "correctAnswer": "$9x^2 + 24xy + 16y^2$",
        "explanation": "(3x)^2 + 2*(3x)*(4y) + (4y)^2 = 9x^2 + 24xy + 16y^2.",
        "misconceptions": {
          "$9x^2 + 12xy + 16y^2$": "The middle term is 2*a*b = 2*(3x)*(4y) = 24xy, not 12xy."
        }
      },
      {
        "id": "ai-8",
        "topicId": "algebraic-identities",
        "difficulty": 1,
        "text": "Evaluate $99^2$ using the identity $(a - b)^2 = a^2 - 2ab + b^2$.",
        "options": [
          "9901",
          "9811",
          "9701",
          "9801"
        ],
        "correctAnswer": "9801",
        "explanation": "(100 - 1)^2 = 100^2 - 2(100)(1) + 1^2 = 10000 - 200 + 1 = 9801.",
        "misconceptions": {
          "9811": "10000 - 200 = 9800; adding 1 gives 9801."
        }
      },
      {
        "id": "ai-9",
        "topicId": "algebraic-identities",
        "difficulty": 1.3,
        "text": "If $x + \\frac{1}{x} = 5$, find the value of $x^2 + \\frac{1}{x^2}$.",
        "options": [
          "23",
          "25",
          "27",
          "21"
        ],
        "correctAnswer": "23",
        "explanation": "Square both sides: (x + 1/x)^2 = x^2 + 2 + 1/x^2 = 25 => x^2 + 1/x^2 = 25 - 2 = 23.",
        "misconceptions": {
          "25": "Squaring (x + 1/x) produces a +2 middle term: x^2 + 2*(x)*(1/x) + 1/x^2, so you must subtract 2 from 25."
        }
      },
      {
        "id": "ai-10",
        "topicId": "algebraic-identities",
        "difficulty": 1.6,
        "text": "Factorise the quadratic expression: $y^2 - 7y + 12$",
        "options": [
          "$(y - 3)(y - 4)$",
          "$(y + 3)(y + 4)$",
          "$(y - 1)(y - 12)$",
          "$(y - 2)(y - 6)$"
        ],
        "correctAnswer": "$(y - 3)(y - 4)$",
        "explanation": "Find two numbers whose product is 12 and sum is -7: (-3) * (-4) = 12, (-3) + (-4) = -7. Thus, (y - 3)(y - 4).",
        "misconceptions": {
          "$(y + 3)(y + 4)$": "(y+3)(y+4) gives +7y as the middle term, not -7y."
        }
      },
      {
        "id": "ai-11",
        "topicId": "algebraic-identities",
        "difficulty": 1.9,
        "text": "Simplify: $\\frac{6x^3y^2 - 9x^2y^3}{3x^2y^2}$",
        "options": [
          "$2x - 3y$",
          "$2x + 3y$",
          "$3x - 2y$",
          "$2x^2 - 3y^2$"
        ],
        "correctAnswer": "$2x - 3y$",
        "explanation": "Divide each term by 3x^2y^2: (6x^3y^2)/(3x^2y^2) - (9x^2y^3)/(3x^2y^2) = 2x - 3y.",
        "misconceptions": {
          "$2x^2 - 3y^2$": "x^3 / x^2 = x^(3-2) = x^1 = x."
        }
      },
      {
        "id": "ai-12",
        "topicId": "algebraic-identities",
        "difficulty": 2.1,
        "text": "Factorise: $z^2 - 4z - 12$",
        "options": [
          "$(z - 12)(z + 1)$",
          "$(z - 4)(z + 3)$",
          "$(z - 6)(z + 2)$",
          "$(z + 6)(z - 2)$"
        ],
        "correctAnswer": "$(z - 6)(z + 2)$",
        "explanation": "Product is -12 and sum is -4: (-6) * 2 = -12 and -6 + 2 = -4. Thus, (z - 6)(z + 2).",
        "misconceptions": {
          "$(z + 6)(z - 2)$": "6 + (-2) = +4, which gives +4z instead of -4z."
        }
      },
      {
        "id": "ai-13",
        "topicId": "algebraic-identities",
        "difficulty": 2.2,
        "text": "If $x - \\frac{1}{x} = 6$, find the value of $x^2 + \\frac{1}{x^2}$.",
        "options": [
          "36",
          "38",
          "32",
          "34"
        ],
        "correctAnswer": "38",
        "explanation": "(x - 1/x)^2 = x^2 - 2 + 1/x^2 = 36 => x^2 + 1/x^2 = 36 + 2 = 38.",
        "misconceptions": {
          "34": "For (x - 1/x)^2, the middle term is -2, so you add 2 to both sides, not subtract."
        }
      },
      {
        "id": "ai-14",
        "topicId": "algebraic-identities",
        "difficulty": 2.3,
        "text": "Evaluate: $(1.05)^2 - (0.95)^2$ using the identity $a^2 - b^2 = (a - b)(a + b)$.",
        "options": [
          "0.4",
          "0.02",
          "0.2",
          "0.1"
        ],
        "correctAnswer": "0.2",
        "explanation": "(1.05 - 0.95)(1.05 + 0.95) = (0.10) * (2.00) = 0.20 = 0.2.",
        "misconceptions": {
          "0.02": "(0.1) * (2.0) = 0.2, not 0.02."
        }
      },
      {
        "id": "ai-15",
        "topicId": "algebraic-identities",
        "difficulty": 2.4,
        "text": "Factorise: $a^4 - b^4$",
        "options": [
          "$(a - b)(a^3 + b^3)$",
          "$(a - b)^2(a + b)^2$",
          "$(a^2 - b^2)^2$",
          "$(a - b)(a + b)(a^2 + b^2)$"
        ],
        "correctAnswer": "$(a - b)(a + b)(a^2 + b^2)$",
        "explanation": "a^4 - b^4 = (a^2)^2 - (b^2)^2 = (a^2 - b^2)(a^2 + b^2) = (a - b)(a + b)(a^2 + b^2).",
        "misconceptions": {
          "$(a^2 - b^2)^2$": "a^4 - b^4 is a difference of squares, not a square of a binomial."
        }
      },
      {
        "id": "ai-16",
        "topicId": "algebraic-identities",
        "difficulty": 2.5,
        "text": "Find the value of $m$ if $(2x + 3y)^2 - (2x - 3y)^2 = m xy$.",
        "options": [
          "48",
          "12",
          "24",
          "6"
        ],
        "correctAnswer": "24",
        "explanation": "(a + b)^2 - (a - b)^2 = 4ab. Here a = 2x, b = 3y => 4*(2x)*(3y) = 24xy. Hence m = 24.",
        "misconceptions": {
          "12": "2ab - (-2ab) = 4ab = 4 * 2 * 3 = 24."
        }
      },
      {
        "id": "ai-17",
        "topicId": "algebraic-identities",
        "difficulty": 2.5,
        "text": "Simplify: $(a + b + c)^2 - (a - b - c)^2$.",
        "options": [
          "$2a(b + c)$",
          "$2(a^2 + b^2 + c^2)$",
          "$4(ab + bc + ca)$",
          "$4a(b + c)$"
        ],
        "correctAnswer": "$4a(b + c)$",
        "explanation": "Let X = b + c. Then [a + X]^2 - [a - X]^2 = 4aX = 4a(b + c).",
        "misconceptions": {
          "$2a(b + c)$": "The difference between (a+X)^2 and (a-X)^2 is 4aX, not 2aX."
        }
      }
    ]
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
    "items": [
      {
        "id": "sci-cp-1",
        "topicId": "crop-production",
        "difficulty": -2.1,
        "text": "Which of the following is a Kharif crop sown during the rainy season (June to September) in India?",
        "options": [
          "Paddy (Rice)",
          "Gram",
          "Mustard",
          "Wheat"
        ],
        "correctAnswer": "Paddy (Rice)",
        "explanation": "Paddy, maize, soyabean, groundnut, and cotton are Kharif crops requiring abundant water during the monsoon.",
        "misconceptions": {
          "Wheat": "Wheat is a Rabi crop sown in winter (October to March) and harvested in spring."
        }
      },
      {
        "id": "sci-cp-2",
        "topicId": "crop-production",
        "difficulty": -1.7,
        "text": "What is the traditional agricultural implement used for tilling and loosening the soil?",
        "options": [
          "Sickle",
          "Silo",
          "Plough",
          "Combine"
        ],
        "correctAnswer": "Plough",
        "explanation": "A plough has been used since ancient times for tilling the soil, adding fertilizers, and removing weeds.",
        "misconceptions": {
          "Sickle": "A sickle is used for harvesting mature crops, not for tilling soil."
        }
      },
      {
        "id": "sci-cp-3",
        "topicId": "crop-production",
        "difficulty": -1.3,
        "text": "Why is the loosening and turning of soil considered essential for plant growth?",
        "options": [
          "It prevents earthworms from entering the field",
          "It packs the soil tightly to prevent root growth",
          "It allows roots to penetrate deep and breathe easily, promoting earthworms and microbes",
          "It makes the soil completely waterproof"
        ],
        "correctAnswer": "It allows roots to penetrate deep and breathe easily, promoting earthworms and microbes",
        "explanation": "Turning loosens soil so roots easily absorb oxygen. It also brings nutrient-rich soil to the top and aids friendly decomposers.",
        "misconceptions": {
          "It prevents earthworms from entering the field": "Earthworms are farmers' friends; loosening soil encourages their activity."
        }
      },
      {
        "id": "sci-cp-4",
        "topicId": "crop-production",
        "difficulty": -0.9,
        "text": "What is the modern method of irrigation where water falls drop-by-drop directly near the roots of plants?",
        "options": [
          "Moat (pulley system)",
          "Drip system",
          "Chain pump",
          "Sprinkler system"
        ],
        "correctAnswer": "Drip system",
        "explanation": "Drip irrigation delivers water directly to the plant root zone drop by drop, eliminating water wastage. Ideal for water-scarce areas.",
        "misconceptions": {
          "Sprinkler system": "Sprinkler system sprays water like rain over the crop canopy, whereas drip irrigation targets roots directly."
        }
      },
      {
        "id": "sci-cp-5",
        "topicId": "crop-production",
        "difficulty": -0.4,
        "text": "Which chemical substance is commonly sprayed to destroy weeds without harming the main crops?",
        "options": [
          "Pesticide",
          "Insecticide",
          "Fungicide",
          "Weedicide (e.g., 2,4-D)"
        ],
        "correctAnswer": "Weedicide (e.g., 2,4-D)",
        "explanation": "Chemicals like 2,4-D selectively kill broadleaf weeds without damaging cereal crops, and are known as weedicides.",
        "misconceptions": {
          "Pesticide": "Pesticides kill insect pests, whereas weedicides specifically destroy unwanted weeds."
        }
      },
      {
        "id": "sci-cp-6",
        "topicId": "crop-production",
        "difficulty": 0.1,
        "text": "Which symbiotic bacterium present in the root nodules of leguminous plants fixes atmospheric nitrogen into nitrates?",
        "options": [
          "Penicillium",
          "Rhizobium",
          "Clostridium",
          "Lactobacillus"
        ],
        "correctAnswer": "Rhizobium",
        "explanation": "Rhizobium bacteria form root nodules on pulses/legumes and convert atmospheric nitrogen into usable nitrates for soil enrichment.",
        "misconceptions": {
          "Lactobacillus": "Lactobacillus is used in dairy for making curd from milk."
        }
      },
      {
        "id": "sci-cp-7",
        "topicId": "crop-production",
        "difficulty": 0.5,
        "text": "Which of the following is a key advantage of organic manure over chemical fertilizers?",
        "options": [
          "It requires no water for absorption",
          "It does not require composting",
          "It is inorganic salt with instant nitrogen shock",
          "It enhances soil texture, water-holding capacity, and humus without pollution"
        ],
        "correctAnswer": "It enhances soil texture, water-holding capacity, and humus without pollution",
        "explanation": "Manure is organic matter that improves soil porosity, water retention, and microbial biodiversity over long periods.",
        "misconceptions": {
          "It is inorganic salt with instant nitrogen shock": "Chemical fertilizers are inorganic salts; manure is decomposed organic matter."
        }
      },
      {
        "id": "sci-cp-8",
        "topicId": "crop-production",
        "difficulty": 0.9,
        "text": "The separation of the harvested grain seeds from the chaff using wind currents is known as:",
        "options": [
          "Sowing",
          "Threshing",
          "Winnowing",
          "Tilling"
        ],
        "correctAnswer": "Winnowing",
        "explanation": "Small-scale farmers separate lighter chaff from heavier grain seeds by dropping them in the wind, called winnowing.",
        "misconceptions": {
          "Threshing": "Threshing is beating or mechanically detaching grain seeds from the stalks."
        }
      },
      {
        "id": "sci-cp-9",
        "topicId": "crop-production",
        "difficulty": 1.2,
        "text": "Large-scale storage of food grains to protect them from pests, rats, and moisture is carried out in:",
        "options": [
          "Silos and granaries",
          "Polythene bags on the ground",
          "Open fields",
          "Glass jars"
        ],
        "correctAnswer": "Silos and granaries",
        "explanation": "Large-scale storage of grain is conducted in tall cylindrical structures called silos or granaries with chemical treatments.",
        "misconceptions": {
          "Open fields": "Storing grains in open fields leads to rapid spoilage from moisture, pests, and birds."
        }
      },
      {
        "id": "sci-cp-10",
        "topicId": "crop-production",
        "difficulty": 1.5,
        "text": "What agricultural practice involves growing different crops alternately in the same field to replenish soil nutrients naturally?",
        "options": [
          "Deforestation",
          "Monoculture",
          "Terrace farming",
          "Crop rotation"
        ],
        "correctAnswer": "Crop rotation",
        "explanation": "Growing legumes after cereals replenishes soil nitrogen naturally without relying heavily on chemical fertilizers.",
        "misconceptions": {
          "Monoculture": "Monoculture is growing the same single crop year after year, which rapidly depletes specific soil nutrients."
        }
      },
      {
        "id": "sci-cp-11",
        "topicId": "crop-production",
        "difficulty": 1.8,
        "text": "Which of the following is an inorganic chemical fertilizer providing nitrogen, phosphorus, and potassium?",
        "options": [
          "NPK Fertilizer",
          "Compost",
          "Cow dung manure",
          "Vermicompost"
        ],
        "correctAnswer": "NPK Fertilizer",
        "explanation": "NPK stands for Nitrogen (N), Phosphorus (P), and Potassium (K) chemical nutrient blends.",
        "misconceptions": {
          "Vermicompost": "Vermicompost is organic manure made with the help of redworms."
        }
      },
      {
        "id": "sci-cp-12",
        "topicId": "crop-production",
        "difficulty": 2,
        "text": "Why should freshly harvested seeds be dried thoroughly in the sun before storage?",
        "options": [
          "To kill the embryo inside the seed",
          "To reduce moisture content and prevent attack by fungi, bacteria, and insect pests",
          "To change their color for marketing",
          "To make the seeds heavier"
        ],
        "correctAnswer": "To reduce moisture content and prevent attack by fungi, bacteria, and insect pests",
        "explanation": "High moisture content accelerates fungal mold growth and insect infestation. Sun drying reduces moisture safely.",
        "misconceptions": {
          "To kill the embryo inside the seed": "Farmers need the embryo alive so that the stored seed can germinate in the next planting season."
        }
      },
      {
        "id": "sci-cp-13",
        "topicId": "crop-production",
        "difficulty": 2.2,
        "text": "What happens to agricultural soil when chemical fertilizers like Urea and Superphosphate are applied excessively year after year?",
        "options": [
          "Earthworms multiply at 10x rate",
          "Crop water requirement drops to zero",
          "Soil loses its natural humus, becomes either too acidic or alkaline, and causes water pollution",
          "Soil fertility becomes permanently infinite"
        ],
        "correctAnswer": "Soil loses its natural humus, becomes either too acidic or alkaline, and causes water pollution",
        "explanation": "Chemical fertilizers do not add humus; continuous overuse destroys beneficial soil microorganisms and contaminates groundwater.",
        "misconceptions": {
          "Earthworms multiply at 10x rate": "Harsh chemical salts actually kill or repel earthworms."
        }
      },
      {
        "id": "sci-cp-14",
        "topicId": "crop-production",
        "difficulty": 2.3,
        "text": "A combine harvester machine performs which two agricultural operations simultaneously?",
        "options": [
          "Weeding and Irrigation",
          "Sowing and Ploughing",
          "Harvesting and Threshing",
          "Tilling and Winnowing"
        ],
        "correctAnswer": "Harvesting and Threshing",
        "explanation": "A 'combine' is a combined harvester and thresher that cuts the crop and threshes the grain in a single pass.",
        "misconceptions": {
          "Sowing and Ploughing": "A seed drill is used with a tractor for sowing; combines work only on mature standing crops."
        }
      },
      {
        "id": "sci-cp-15",
        "topicId": "crop-production",
        "difficulty": 2.4,
        "text": "Why are seed drills preferred over traditional broadcasting (manual scattering) for sowing seeds?",
        "options": [
          "They kill all weeds before germination",
          "They need no tractor or animals",
          "They double the size of the seeds",
          "They sow seeds uniformly at proper depth and distance and cover them with soil to prevent bird damage"
        ],
        "correctAnswer": "They sow seeds uniformly at proper depth and distance and cover them with soil to prevent bird damage",
        "explanation": "Seed drills ensure uniform spacing and depth so crops do not overcrowd and seeds are protected from birds by a top layer of soil.",
        "misconceptions": {
          "They double the size of the seeds": "Implements cannot alter the biological genetics or physical size of seeds."
        }
      },
      {
        "id": "sci-cp-16",
        "topicId": "crop-production",
        "difficulty": 2.4,
        "text": "During water-logging in fields due to faulty irrigation, why do plant roots suffer damage?",
        "options": [
          "Roots expand and explode from hydrostatic pressure",
          "Sunlight cannot penetrate into leaves",
          "Air spaces in the soil get filled with water, depriving roots of oxygen for cellular respiration",
          "Water washes away all plant chlorophyll"
        ],
        "correctAnswer": "Air spaces in the soil get filled with water, depriving roots of oxygen for cellular respiration",
        "explanation": "Root cells need air (oxygen) in soil pores to respire. In saturated soils, oxygen depletion leads to root suffocation and rot.",
        "misconceptions": {
          "Water washes away all plant chlorophyll": "Chlorophyll is inside leaf chloroplasts, not washed away by soil moisture."
        }
      },
      {
        "id": "sci-cp-17",
        "topicId": "crop-production",
        "difficulty": 2.5,
        "text": "What term describes the rearing of animals on a large scale for milk, meat, and eggs with proper food, shelter, and care?",
        "options": [
          "Pisciculture",
          "Apiculture",
          "Sericulture",
          "Animal Husbandry"
        ],
        "correctAnswer": "Animal Husbandry",
        "explanation": "Animal husbandry is the branch of agriculture concerned with animals raised for meat, fibre, milk, or other products.",
        "misconceptions": {
          "Apiculture": "Apiculture is specifically the rearing of honeybees for honey and wax."
        }
      }
    ]
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
    "items": [
      {
        "id": "sci-mo-1",
        "topicId": "microorganisms",
        "difficulty": -2.1,
        "text": "Which bacterium promotes the conversion of milk into curd?",
        "options": [
          "Lactobacillus",
          "Bacillus anthracis",
          "Rhizobium",
          "Streptococcus"
        ],
        "correctAnswer": "Lactobacillus",
        "explanation": "Lactobacillus multiplies in warm milk and converts the milk sugar (lactose) into lactic acid, curdling the milk proteins.",
        "misconceptions": {
          "Rhizobium": "Rhizobium lives in root nodules and fixes nitrogen in legumes."
        }
      },
      {
        "id": "sci-mo-2",
        "topicId": "microorganisms",
        "difficulty": -1.7,
        "text": "Which of the following is NOT classified under the major groups of microorganisms?",
        "options": [
          "Bacteria",
          "Protozoa",
          "Fungi",
          "Insects"
        ],
        "correctAnswer": "Insects",
        "explanation": "Microorganisms are divided into bacteria, fungi, protozoa, and algae. Insects are macroscopic arthropod animals.",
        "misconceptions": {
          "Protozoa": "Protozoa (like Amoeba and Paramecium) are single-celled microscopic organisms."
        }
      },
      {
        "id": "sci-mo-3",
        "topicId": "microorganisms",
        "difficulty": -1.3,
        "text": "Who discovered the first antibiotic, Penicillin, from a mold in 1929?",
        "options": [
          "Edward Jenner",
          "Robert Koch",
          "Louis Pasteur",
          "Alexander Fleming"
        ],
        "correctAnswer": "Alexander Fleming",
        "explanation": "Sir Alexander Fleming observed that a green mold (Penicillium notatum) produced a substance preventing bacterial growth.",
        "misconceptions": {
          "Edward Jenner": "Edward Jenner discovered the vaccine for smallpox in 1798."
        }
      },
      {
        "id": "sci-mo-4",
        "topicId": "microorganisms",
        "difficulty": -0.8,
        "text": "The anaerobic conversion of sugar into alcohol by yeast is known as:",
        "options": [
          "Sterilization",
          "Fermentation",
          "Nitrogen fixation",
          "Pasteurization"
        ],
        "correctAnswer": "Fermentation",
        "explanation": "Louis Pasteur discovered fermentation in 1857, where yeast enzymes convert glucose into ethanol and carbon dioxide.",
        "misconceptions": {
          "Pasteurization": "Pasteurization is heating milk to 70°C and rapidly chilling it to kill pathogens."
        }
      },
      {
        "id": "sci-mo-5",
        "topicId": "microorganisms",
        "difficulty": -0.4,
        "text": "Malaria is caused by which pathogen and transmitted by which insect vector?",
        "options": [
          "Protozoan (Plasmodium) carried by female Anopheles mosquito",
          "Virus carried by Aedes mosquito",
          "Fungus carried by ticks",
          "Bacteria carried by housefly"
        ],
        "correctAnswer": "Protozoan (Plasmodium) carried by female Anopheles mosquito",
        "explanation": "Plasmodium is a protozoan parasite transmitted between humans via the bite of infected female Anopheles mosquitoes.",
        "misconceptions": {
          "Virus carried by Aedes mosquito": "Aedes mosquito transmits the Dengue virus, not Malaria."
        }
      },
      {
        "id": "sci-mo-6",
        "topicId": "microorganisms",
        "difficulty": 0.1,
        "text": "Why are viruses considered borderline entities between living and non-living things?",
        "options": [
          "They survive only at absolute zero",
          "They reproduce and metabolize only inside host cells, remaining crystalline outside",
          "They can walk on water",
          "They have both plant and animal cells"
        ],
        "correctAnswer": "They reproduce and metabolize only inside host cells, remaining crystalline outside",
        "explanation": "Viruses possess no cellular machinery of their own and act as inert particles until they invade a host cell to replicate.",
        "misconceptions": {
          "They have both plant and animal cells": "Viruses do not have any cellular structure at all; they consist of genetic material wrapped in a protein coat."
        }
      },
      {
        "id": "sci-mo-7",
        "topicId": "microorganisms",
        "difficulty": 0.5,
        "text": "Which human disease is caused by a virus?",
        "options": [
          "Cholera",
          "Tuberculosis",
          "Typhoid",
          "Polio and Chickenpox"
        ],
        "correctAnswer": "Polio and Chickenpox",
        "explanation": "Polio and chickenpox are viral infections. Tuberculosis, typhoid, and cholera are bacterial diseases.",
        "misconceptions": {
          "Tuberculosis": "Tuberculosis is caused by Mycobacterium tuberculosis, which is a bacterium."
        }
      },
      {
        "id": "sci-mo-8",
        "topicId": "microorganisms",
        "difficulty": 0.9,
        "text": "Which process invented by Louis Pasteur preserves milk without boiling away its nutrients?",
        "options": [
          "Fermentation",
          "Distillation",
          "Pasteurization",
          "Condensation"
        ],
        "correctAnswer": "Pasteurization",
        "explanation": "Milk is heated to about 70°C for 15-30 seconds and then suddenly chilled and stored, which prevents microbial growth.",
        "misconceptions": {
          "Distillation": "Distillation separates volatile liquids by evaporation and condensation."
        }
      },
      {
        "id": "sci-mo-9",
        "topicId": "microorganisms",
        "difficulty": 1.3,
        "text": "How does common salt (sodium chloride) preserve pickles, fish, and meat from bacterial spoilage?",
        "options": [
          "It draws out moisture from bacterial cells through osmosis, dehydrating and inhibiting them",
          "It provides vitamin C to kill microbes",
          "It freezes bacteria into solid ice",
          "It increases water availability for bacteria"
        ],
        "correctAnswer": "It draws out moisture from bacterial cells through osmosis, dehydrating and inhibiting them",
        "explanation": "High salt concentration creates a hypertonic environment, causing plasmolysis (dehydration) in bacterial cells.",
        "misconceptions": {
          "It increases water availability for bacteria": "Salt binds free water, making moisture unavailable for microbial survival."
        }
      },
      {
        "id": "sci-mo-10",
        "topicId": "microorganisms",
        "difficulty": 1.6,
        "text": "Which plant disease is caused by bacteria and transmitted through air?",
        "options": [
          "Yellow Vein Mosaic of Bhindi",
          "Late blight of potato",
          "Citrus Canker",
          "Rust of Wheat"
        ],
        "correctAnswer": "Citrus Canker",
        "explanation": "Citrus canker is caused by Xanthomonas axonopodis (a bacterium) and spreads via airborne moisture droplets.",
        "misconceptions": {
          "Rust of Wheat": "Rust of wheat is caused by fungi (Puccinia) through air and seeds."
        }
      },
      {
        "id": "sci-mo-11",
        "topicId": "microorganisms",
        "difficulty": 1.8,
        "text": "Which chemical preservatives are commonly added to commercial jams and squashes to check microbial growth?",
        "options": [
          "Sodium benzoate and Sodium metabisulphite",
          "Calcium carbonate and Copper sulphate",
          "Sodium hydroxide and Hydrochloric acid",
          "Urea and Ammonium phosphate"
        ],
        "correctAnswer": "Sodium benzoate and Sodium metabisulphite",
        "explanation": "Sodium benzoate and sodium metabisulphite are approved chemical food preservatives used in fruit products.",
        "misconceptions": {
          "Sodium hydroxide and Hydrochloric acid": "These are caustic laboratory reagents (bases and acids), not edible preservatives."
        }
      },
      {
        "id": "sci-mo-12",
        "topicId": "microorganisms",
        "difficulty": 2,
        "text": "What makes dough rise when yeast is added during the baking of bread and cakes?",
        "options": [
          "Rapid release of Carbon Dioxide gas ($CO_2$) bubbles produced during yeast respiration",
          "Yeast drinking up the water",
          "Evaporation of sugar",
          "Production of oxygen gas"
        ],
        "correctAnswer": "Rapid release of Carbon Dioxide gas ($CO_2$) bubbles produced during yeast respiration",
        "explanation": "Yeast reproduces rapidly and respires, releasing CO2 bubbles that get trapped in the gluten matrix, making the bread porous and fluffy.",
        "misconceptions": {
          "Production of oxygen gas": "Yeast in dough undergoes anaerobic respiration, producing CO2 and trace ethanol, not oxygen."
        }
      },
      {
        "id": "sci-mo-13",
        "topicId": "microorganisms",
        "difficulty": 2.2,
        "text": "Why are antibiotics ineffective against viral infections such as the common cold and flu?",
        "options": [
          "Viruses digest antibiotics as food",
          "Antibiotics target bacterial cell walls and metabolic pathways, which viruses do not possess",
          "Common cold viruses are immune to all chemicals",
          "Antibiotics are too large to see viruses"
        ],
        "correctAnswer": "Antibiotics target bacterial cell walls and metabolic pathways, which viruses do not possess",
        "explanation": "Antibiotics inhibit peptidoglycan wall synthesis or bacterial ribosomes. Viruses hijack host mechanisms, so antibiotics cannot harm them.",
        "misconceptions": {
          "Viruses digest antibiotics as food": "Viruses do not eat or have metabolic digestion."
        }
      },
      {
        "id": "sci-mo-14",
        "topicId": "microorganisms",
        "difficulty": 2.3,
        "text": "What is the biological mechanism by which a vaccine confers immunity against an infectious disease?",
        "options": [
          "It kills all bacteria living inside the body",
          "It chemically cleans the bloodstream instantly",
          "It introduces weakened or dead microbes, prompting the immune system to produce antibodies and memory cells",
          "It physically blocks viruses from touching the skin"
        ],
        "correctAnswer": "It introduces weakened or dead microbes, prompting the immune system to produce antibodies and memory cells",
        "explanation": "Vaccines contain attenuated antigens that train B-lymphocytes to produce specific antibodies and long-lived memory cells.",
        "misconceptions": {
          "It chemically cleans the bloodstream instantly": "Vaccines stimulate an active immune response; they are not disinfectant cleaners."
        }
      },
      {
        "id": "sci-mo-15",
        "topicId": "microorganisms",
        "difficulty": 2.4,
        "text": "Which sequence correctly represents the flow of nitrogen through the Nitrogen Cycle in nature?",
        "options": [
          "Atmospheric $N_2 \\rightarrow$ Nitrogen fixation $\\rightarrow$ Soil Nitrates $\\rightarrow$ Plant uptake $\\rightarrow$ Animals $\\rightarrow$ Decomposers $\\rightarrow$ Denitrifying bacteria $\\rightarrow N_2$",
          "Decomposers $\\rightarrow N_2 \\rightarrow$ Fertilizer $\\rightarrow$ Atmosphere",
          "Atmospheric $N_2 \\rightarrow$ Direct animal inhalation $\\rightarrow$ Plants $\\rightarrow$ Soil",
          "Nitrate $\\rightarrow N_2 \\rightarrow$ Plant $\\rightarrow$ Nitrite"
        ],
        "correctAnswer": "Atmospheric $N_2 \\rightarrow$ Nitrogen fixation $\\rightarrow$ Soil Nitrates $\\rightarrow$ Plant uptake $\\rightarrow$ Animals $\\rightarrow$ Decomposers $\\rightarrow$ Denitrifying bacteria $\\rightarrow N_2$",
        "explanation": "Biological fixation turns N2 into ammonium/nitrates, taken up by plants, consumed by animals, returned by decomposers, and denitrified back to N2 gas.",
        "misconceptions": {
          "Atmospheric $N_2 \\rightarrow$ Direct animal inhalation $\\rightarrow$ Plants $\\rightarrow$ Soil": "Animals cannot absorb or fix nitrogen directly by breathing; they only obtain it through plant proteins."
        }
      },
      {
        "id": "sci-mo-16",
        "topicId": "microorganisms",
        "difficulty": 2.5,
        "text": "Which deadly human and cattle disease was discovered by Robert Koch in 1876 to be caused by Bacillus anthracis?",
        "options": [
          "Smallpox",
          "Anthrax",
          "Rabies",
          "Cholera"
        ],
        "correctAnswer": "Anthrax",
        "explanation": "Robert Koch discovered Bacillus anthracis, the spore-forming bacterium responsible for the lethal disease anthrax.",
        "misconceptions": {
          "Rabies": "Rabies is caused by the Rabies lyssavirus, for which Louis Pasteur developed a vaccine."
        }
      },
      {
        "id": "sci-mo-17",
        "topicId": "microorganisms",
        "difficulty": 2.5,
        "text": "Which microorganism is a single-celled eukaryote that moves and captures food using pseudopodia ('false feet')?",
        "options": [
          "Amoeba",
          "Euglena",
          "Paramecium",
          "Spirogyra"
        ],
        "correctAnswer": "Amoeba",
        "explanation": "Amoeba is a protozoan that extends temporary cytoplasm projections called pseudopodia for locomotion and phagocytosis.",
        "misconceptions": {
          "Paramecium": "Paramecium uses thousands of tiny hair-like cilia for movement, not pseudopodia."
        }
      }
    ]
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
    "items": [
      {
        "id": "sci-fp-1",
        "topicId": "force-pressure",
        "difficulty": -2.2,
        "text": "What is the SI unit of force in physics?",
        "options": [
          "Newton (N)",
          "Watt (W)",
          "Pascal (Pa)",
          "Joule (J)"
        ],
        "correctAnswer": "Newton (N)",
        "explanation": "Force is measured in Newtons (N), named after Sir Isaac Newton.",
        "misconceptions": {
          "Pascal (Pa)": "Pascal is the unit of pressure ($1\\text{ Pa} = 1\\text{ N/m}^2$), not force."
        }
      },
      {
        "id": "sci-fp-2",
        "topicId": "force-pressure",
        "difficulty": -1.8,
        "text": "Which of the following is an example of a non-contact force?",
        "options": [
          "Tension force",
          "Gravitational force",
          "Muscular force",
          "Frictional force"
        ],
        "correctAnswer": "Gravitational force",
        "explanation": "Gravity acts across space without requiring physical contact between bodies. Friction and muscular forces require direct contact.",
        "misconceptions": {
          "Frictional force": "Frictional force arises only when two physical surfaces are in direct contact and sliding/rolling."
        }
      },
      {
        "id": "sci-fp-3",
        "topicId": "force-pressure",
        "difficulty": -1.4,
        "text": "If two equal forces of 15 N act on an object in exactly opposite directions, what is the net resultant force?",
        "options": [
          "$-15\\text{ N}$",
          "$30\\text{ N}$",
          "$0\\text{ N}$",
          "$15\\text{ N}$"
        ],
        "correctAnswer": "$0\\text{ N}$",
        "explanation": "Forces in opposite directions subtract: $15\\text{ N} - 15\\text{ N} = 0\\text{ N}$. The object remains in equilibrium.",
        "misconceptions": {
          "$30\\text{ N}$": "Forces add together only when they act in the same direction, not opposite directions."
        }
      },
      {
        "id": "sci-fp-4",
        "topicId": "force-pressure",
        "difficulty": -0.9,
        "text": "What is the mathematical definition of Pressure?",
        "options": [
          "$\\text{Pressure} = \\frac{\\text{Area}}{\\text{Force}}$",
          "$\\text{Pressure} = \\text{Force} \\times \\text{Area}$",
          "$\\text{Pressure} = \\text{Force} + \\text{Area}$",
          "$\\text{Pressure} = \\frac{\\text{Force}}{\\text{Area}}$"
        ],
        "correctAnswer": "$\\text{Pressure} = \\frac{\\text{Force}}{\\text{Area}}$",
        "explanation": "Pressure is the force acting perpendicularly per unit surface area: $P = \\frac{F}{A}$.",
        "misconceptions": {
          "$\\text{Pressure} = \\text{Force} \\times \\text{Area}$": "Pressure is inversely proportional to area, so force must be divided by area."
        }
      },
      {
        "id": "sci-fp-5",
        "topicId": "force-pressure",
        "difficulty": -0.5,
        "text": "Why do heavy school bags have broad straps instead of thin string straps?",
        "options": [
          "A larger contact area reduces the pressure exerted on the shoulders",
          "Thin straps cannot hold colour",
          "Broad straps look bigger",
          "Broad straps increase the downward force"
        ],
        "correctAnswer": "A larger contact area reduces the pressure exerted on the shoulders",
        "explanation": "Since $P = F/A$, increasing contact surface area $A$ drastically decreases the pressure $P$ on the shoulders.",
        "misconceptions": {
          "Broad straps increase the downward force": "Force depends solely on the weight of books (mass * gravity), not strap width."
        }
      },
      {
        "id": "sci-fp-6",
        "topicId": "force-pressure",
        "difficulty": 0.1,
        "text": "Which force always opposes the relative motion between two surfaces in contact?",
        "options": [
          "Friction",
          "Magnetic force",
          "Electrostatic force",
          "Gravity"
        ],
        "correctAnswer": "Friction",
        "explanation": "Friction is the contact force that opposes the impending or actual sliding motion of one surface over another.",
        "misconceptions": {
          "Gravity": "Gravity pulls downwards towards Earth's center, not along the contact plane."
        }
      },
      {
        "id": "sci-fp-7",
        "topicId": "force-pressure",
        "difficulty": 0.5,
        "text": "Calculate the pressure exerted when a perpendicular force of 300 N acts on an area of $0.06\\text{ m}^2$.",
        "options": [
          "$5000\\text{ Pa}$",
          "$18\\text{ Pa}$",
          "$1800\\text{ Pa}$",
          "$500\\text{ Pa}$"
        ],
        "correctAnswer": "$5000\\text{ Pa}$",
        "explanation": "$P = \\frac{F}{A} = \\frac{300}{0.06} = \\frac{30000}{6} = 5000\\text{ Pa}$ (or $\\text{N/m}^2$).",
        "misconceptions": {
          "$18\\text{ Pa}$": "Did you multiply $300 \\times 0.06$? Pressure requires division ($F / A$)."
        }
      },
      {
        "id": "sci-fp-8",
        "topicId": "force-pressure",
        "difficulty": 0.8,
        "text": "How does the pressure exerted by a liquid vary with depth in a container?",
        "options": [
          "Pressure remains constant at all depths",
          "Pressure decreases with depth",
          "Pressure drops to zero at the bottom",
          "Pressure increases as depth increases"
        ],
        "correctAnswer": "Pressure increases as depth increases",
        "explanation": "Liquid pressure is given by $P = h \\rho g$. As depth $h$ increases, the weight of the liquid column above increases, increasing pressure.",
        "misconceptions": {
          "Pressure decreases with depth": "The weight of the water column increases downward, so bottom pressure is always highest."
        }
      },
      {
        "id": "sci-fp-9",
        "topicId": "force-pressure",
        "difficulty": 1.2,
        "text": "Why does a rubber suction cup stick firmly to a smooth, flat glass window?",
        "options": [
          "Water vapor pulls it like a magnet",
          "External atmospheric pressure presses firmly against the vacuum/low-pressure region inside",
          "The rubber melts and fuses with glass",
          "Glass has strong magnetic attraction for rubber"
        ],
        "correctAnswer": "External atmospheric pressure presses firmly against the vacuum/low-pressure region inside",
        "explanation": "Pressing the cup squeezes out air. Atmospheric pressure outside is much higher than inside, holding it tightly.",
        "misconceptions": {
          "Glass has strong magnetic attraction for rubber": "Neither glass nor rubber are magnetic materials."
        }
      },
      {
        "id": "sci-fp-10",
        "topicId": "force-pressure",
        "difficulty": 1.5,
        "text": "What instrument is used to measure atmospheric pressure?",
        "options": [
          "Barometer",
          "Manometer",
          "Ammeter",
          "Thermometer"
        ],
        "correctAnswer": "Barometer",
        "explanation": "A barometer (such as a mercury or aneroid barometer) measures atmospheric pressure.",
        "misconceptions": {
          "Manometer": "A manometer measures differential gas or liquid pressure in a closed vessel."
        }
      },
      {
        "id": "sci-fp-11",
        "topicId": "force-pressure",
        "difficulty": 1.8,
        "text": "Why do mountaineers sometimes experience nosebleeds at high mountain altitudes?",
        "options": [
          "Gravity becomes zero",
          "Atmospheric pressure drops significantly, so internal blood pressure exceeds external pressure",
          "Blood becomes thinner due to cold",
          "The air becomes too hot at high altitudes"
        ],
        "correctAnswer": "Atmospheric pressure drops significantly, so internal blood pressure exceeds external pressure",
        "explanation": "High altitude reduces atmospheric air pressure. The internal pressure of blood vessels exceeds external pressure, rupturing fragile nasal capillaries.",
        "misconceptions": {
          "Gravity becomes zero": "Gravity on mountain peaks is almost identical to sea level."
        }
      },
      {
        "id": "sci-fp-12",
        "topicId": "force-pressure",
        "difficulty": 2,
        "text": "A sharp knife cuts vegetables much more easily than a blunt knife because:",
        "options": [
          "Blunt knives produce negative force",
          "A sharp knife has a tiny edge area, creating very high cutting pressure for the same applied force",
          "A sharp knife weighs much more",
          "A blunt knife exerts higher pressure"
        ],
        "correctAnswer": "A sharp knife has a tiny edge area, creating very high cutting pressure for the same applied force",
        "explanation": "Because $P = F/A$, extremely small edge contact area $A$ amplifies the pressure $P$ enough to slice through plant fibers easily.",
        "misconceptions": {
          "A blunt knife exerts higher pressure": "A blunt edge has larger area $A$, so it produces far LESS pressure for the same force."
        }
      },
      {
        "id": "sci-fp-13",
        "topicId": "force-pressure",
        "difficulty": 2.2,
        "text": "Two charged plastic straws rubbed with dry paper repel each other when brought close. This repulsion is due to:",
        "options": [
          "Frictional contact force",
          "Magnetic force",
          "Atmospheric suction",
          "Electrostatic force between like charges"
        ],
        "correctAnswer": "Electrostatic force between like charges",
        "explanation": "Rubbing generates identical electrostatic charges on both straws; like charges repel via non-contact electrostatic force.",
        "misconceptions": {
          "Magnetic force": "Plastic straws do not contain magnetic dipoles; the charge is static electricity."
        }
      },
      {
        "id": "sci-fp-14",
        "topicId": "force-pressure",
        "difficulty": 2.3,
        "text": "A solid brick of mass 3 kg and dimensions $20\\text{ cm} \\times 10\\text{ cm} \\times 5\\text{ cm}$ lies on a table ($g = 10\\text{ m/s}^2$). Which face produces the MAXIMUM pressure?",
        "options": [
          "All faces produce identical pressure",
          "The face measuring $20\\text{ cm} \\times 10\\text{ cm}$",
          "The face measuring $10\\text{ cm} \\times 5\\text{ cm}$",
          "The face measuring $20\\text{ cm} \\times 5\\text{ cm}$"
        ],
        "correctAnswer": "The face measuring $10\\text{ cm} \\times 5\\text{ cm}$",
        "explanation": "Maximum pressure occurs when contact area is minimum. Minimum area = $10 \\times 5 = 50\\text{ cm}^2 = 0.005\\text{ m}^2$. $P = 30 / 0.005 = 6000\\text{ Pa}$.",
        "misconceptions": {
          "The face measuring $20\\text{ cm} \\times 10\\text{ cm}$": "That is the largest area ($200\\text{ cm}^2$), which produces the MINIMUM pressure."
        }
      },
      {
        "id": "sci-fp-15",
        "topicId": "force-pressure",
        "difficulty": 2.4,
        "text": "Why are the walls of a water dam constructed much thicker at the bottom than at the top?",
        "options": [
          "Fish only swim at the bottom",
          "Water pressure increases with depth, requiring thicker walls to withstand the immense hydrostatic pressure at the base",
          "To save cement at the top",
          "To make it easier for cars to drive on top"
        ],
        "correctAnswer": "Water pressure increases with depth, requiring thicker walls to withstand the immense hydrostatic pressure at the base",
        "explanation": "Because $P = h \\rho g$, hydrostatic pressure peaks at the bottom reservoir depth, requiring maximum structural thickness.",
        "misconceptions": {
          "To save cement at the top": "The design is purely governed by hydrostatic pressure physics, not arbitrary material saving."
        }
      },
      {
        "id": "sci-fp-16",
        "topicId": "force-pressure",
        "difficulty": 2.5,
        "text": "Otto von Guericke performed the famous 1654 Magdeburg Hemispheres experiment. Why could 16 horses not pull the two copper hemispheres apart?",
        "options": [
          "A magnetic field held them",
          "The hemispheres were welded together with iron",
          "Horses were walking on slippery ice",
          "Air was pumped out of the interior, and external atmospheric air pressure pressed the spheres together with tremendous force"
        ],
        "correctAnswer": "Air was pumped out of the interior, and external atmospheric air pressure pressed the spheres together with tremendous force",
        "explanation": "Creating a vacuum inside meant zero internal pressure. Massive external atmospheric pressure ($101.3\\text{ kPa}$) clamped them together.",
        "misconceptions": {
          "The hemispheres were welded together with iron": "They were simply two hollow copper hemispheres fitted together with a greased leather ring, no welding."
        }
      },
      {
        "id": "sci-fp-17",
        "topicId": "force-pressure",
        "difficulty": 2.5,
        "text": "An object is subjected to three collinear forces: $25\\text{ N}$ towards East, $15\\text{ N}$ towards West, and $10\\text{ N}$ towards West. What is the state of motion of the object?",
        "options": [
          "Balanced (Net force = $0\\text{ N}$), the object experiences no acceleration",
          "Moving in a circle",
          "Accelerating West with $10\\text{ N}$",
          "Accelerating East with $50\\text{ N}$"
        ],
        "correctAnswer": "Balanced (Net force = $0\\text{ N}$), the object experiences no acceleration",
        "explanation": "East: $+25\\text{ N}$. West: $-15 - 10 = -25\\text{ N}$. Net force = $+25 - 25 = 0\\text{ N}$. Balanced forces cause zero acceleration.",
        "misconceptions": {
          "Accelerating East with $50\\text{ N}$": "Forces in opposite directions oppose and cancel each other out."
        }
      }
    ]
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
    "items": [
      {
        "id": "sci-sd-1",
        "topicId": "sound-vibrations",
        "difficulty": -2.1,
        "text": "What is the primary physical cause of sound?",
        "options": [
          "Combustion of oxygen",
          "Vibrations of an object",
          "Static electricity",
          "Flow of electrons"
        ],
        "correctAnswer": "Vibrations of an object",
        "explanation": "Sound is always produced by vibrating objects (e.g. vocal cords, guitar strings, drum membranes).",
        "misconceptions": {
          "Flow of electrons": "Flow of electrons creates electric current, not acoustic sound waves."
        }
      },
      {
        "id": "sci-sd-2",
        "topicId": "sound-vibrations",
        "difficulty": -1.7,
        "text": "What is the SI unit of frequency of a wave?",
        "options": [
          "Hertz (Hz)",
          "Decibel (dB)",
          "Metre (m)",
          "Second (s)"
        ],
        "correctAnswer": "Hertz (Hz)",
        "explanation": "Frequency (number of oscillations per second) is measured in Hertz (Hz).",
        "misconceptions": {
          "Decibel (dB)": "Decibel is the unit for loudness / sound intensity level, not frequency."
        }
      },
      {
        "id": "sci-sd-3",
        "topicId": "sound-vibrations",
        "difficulty": -1.3,
        "text": "Through which of the following media does sound travel FASTEST?",
        "options": [
          "Solids (e.g., steel)",
          "Liquids (e.g., water)",
          "Vacuum",
          "Gases (e.g., air)"
        ],
        "correctAnswer": "Solids (e.g., steel)",
        "explanation": "Molecules in solids are tightly packed with strong intermolecular bonds, transmitting vibrational energy fastest (~5000 m/s in steel).",
        "misconceptions": {
          "Vacuum": "Sound cannot travel through a vacuum at all because it requires a material medium."
        }
      },
      {
        "id": "sci-sd-4",
        "topicId": "sound-vibrations",
        "difficulty": -0.8,
        "text": "Why can two astronauts not talk directly to each other on the Moon without radio transmitters?",
        "options": [
          "There is no atmosphere/medium on the Moon, and sound cannot travel through a vacuum",
          "Moon gravity is too strong for sound",
          "Their vocal cords stop vibrating on the Moon",
          "Sound freezes in lunar cold"
        ],
        "correctAnswer": "There is no atmosphere/medium on the Moon, and sound cannot travel through a vacuum",
        "explanation": "Sound is a mechanical wave that requires a material medium (solid, liquid, or gas) to propagate.",
        "misconceptions": {
          "Moon gravity is too strong for sound": "Moon gravity is 1/6th of Earth; sound transmission depends on medium, not gravity."
        }
      },
      {
        "id": "sci-sd-5",
        "topicId": "sound-vibrations",
        "difficulty": -0.4,
        "text": "The loudness of sound depends primarily on which characteristic of vibration?",
        "options": [
          "Amplitude of vibration",
          "Phase of wave",
          "Speed of wave",
          "Frequency of vibration"
        ],
        "correctAnswer": "Amplitude of vibration",
        "explanation": "Loudness is proportional to the square of the amplitude of vibration ($Loudness \\propto Amplitude^2$).",
        "misconceptions": {
          "Frequency of vibration": "Frequency determines the shrillness or pitch of the sound, not loudness."
        }
      },
      {
        "id": "sci-sd-6",
        "topicId": "sound-vibrations",
        "difficulty": 0.1,
        "text": "What is the normal audible frequency range for human ears?",
        "options": [
          "2 Hz to 200 Hz",
          "200 Hz to 200,000 Hz",
          "20 Hz to 20,000 Hz",
          "Above 50,000 Hz only"
        ],
        "correctAnswer": "20 Hz to 20,000 Hz",
        "explanation": "The human ear can detect frequencies roughly between 20 Hz and 20 kHz (20,000 Hz).",
        "misconceptions": {
          "2 Hz to 200 Hz": "Below 20 Hz is infrasound, which humans cannot hear."
        }
      },
      {
        "id": "sci-sd-7",
        "topicId": "sound-vibrations",
        "difficulty": 0.5,
        "text": "If a simple pendulum oscillates 40 times in 4 seconds, what is its frequency and time period?",
        "options": [
          "Frequency = 160 Hz, Time period = 0.025 s",
          "Frequency = 0.1 Hz, Time period = 10 s",
          "Frequency = 4 Hz, Time period = 0.25 s",
          "Frequency = 10 Hz, Time period = 0.1 s"
        ],
        "correctAnswer": "Frequency = 10 Hz, Time period = 0.1 s",
        "explanation": "Frequency = oscillations / time = 40 / 4 = 10 Hz. Time period T = 1 / f = 1 / 10 = 0.1 seconds.",
        "misconceptions": {
          "Frequency = 4 Hz, Time period = 0.25 s": "40 / 4 = 10, not 4."
        }
      },
      {
        "id": "sci-sd-8",
        "topicId": "sound-vibrations",
        "difficulty": 0.9,
        "text": "What is the voice box in humans anatomically called?",
        "options": [
          "Larynx",
          "Bronchus",
          "Pharynx",
          "Trachea"
        ],
        "correctAnswer": "Larynx",
        "explanation": "The larynx (voice box) contains two vocal cords stretched across with a narrow slit through which expelled air creates vibrations.",
        "misconceptions": {
          "Trachea": "The trachea is the windpipe leading air to the lungs below the larynx."
        }
      },
      {
        "id": "sci-sd-9",
        "topicId": "sound-vibrations",
        "difficulty": 1.2,
        "text": "The pitch or shrillness of a sound is determined by its:",
        "options": [
          "Frequency",
          "Amplitude",
          "Wavelength alone",
          "Loudness"
        ],
        "correctAnswer": "Frequency",
        "explanation": "Higher frequency produces higher pitch (shrill sound, like a bird or whistle); lower frequency produces a grave sound (like a drum).",
        "misconceptions": {
          "Amplitude": "Amplitude determines loudness (volume), not pitch."
        }
      },
      {
        "id": "sci-sd-10",
        "topicId": "sound-vibrations",
        "difficulty": 1.5,
        "text": "If the amplitude of vibration of a body is doubled, its loudness becomes:",
        "options": [
          "2 times",
          "Half",
          "4 times",
          "8 times"
        ],
        "correctAnswer": "4 times",
        "explanation": "Loudness is proportional to the square of amplitude: $(2)^2 = 4$ times.",
        "misconceptions": {
          "2 times": "Remember the square relationship: $L \\propto A^2$, so doubling amplitude quadruples loudness."
        }
      },
      {
        "id": "sci-sd-11",
        "topicId": "sound-vibrations",
        "difficulty": 1.8,
        "text": "Sound waves with frequencies above 20,000 Hz are known as:",
        "options": [
          "Infrasound",
          "Ultrasound",
          "Supersonic sound",
          "Audible sound"
        ],
        "correctAnswer": "Ultrasound",
        "explanation": "Frequencies exceeding 20 kHz are ultrasound (used by bats, dolphins, and medical sonography).",
        "misconceptions": {
          "Supersonic sound": "Supersonic refers to object speed faster than the speed of sound in air, not sound frequency."
        }
      },
      {
        "id": "sci-sd-12",
        "topicId": "sound-vibrations",
        "difficulty": 2,
        "text": "Which membrane in the human ear vibrates when struck by incoming sound waves and transfers vibrations to the middle ear bones?",
        "options": [
          "Eardrum (Tympanic membrane)",
          "Pinna",
          "Auditory nerve",
          "Cochlea"
        ],
        "correctAnswer": "Eardrum (Tympanic membrane)",
        "explanation": "The eardrum is a stretched thin membrane at the end of the ear canal that vibrates and moves the hammer, anvil, and stirrup.",
        "misconceptions": {
          "Cochlea": "The cochlea is in the inner ear and converts fluid vibrations into electrical nerve impulses."
        }
      },
      {
        "id": "sci-sd-13",
        "topicId": "sound-vibrations",
        "difficulty": 2.2,
        "text": "Which of the following animals communicates and navigates in the dark using ultrasonic echolocation?",
        "options": [
          "Elephants",
          "Bats",
          "Rhinos",
          "Whales using infrasound"
        ],
        "correctAnswer": "Bats",
        "explanation": "Bats emit high-frequency ultrasonic clicks and listen to the returning echoes to detect obstacles and prey.",
        "misconceptions": {
          "Elephants": "Elephants communicate over long distances using low-frequency INFRASOUND (below 20 Hz)."
        }
      },
      {
        "id": "sci-sd-14",
        "topicId": "sound-vibrations",
        "difficulty": 2.3,
        "text": "Continuous exposure to noise levels above which threshold can cause hearing impairment and stress-related ailments according to health standards?",
        "options": [
          "50 dB",
          "10 dB",
          "30 dB",
          "80 dB"
        ],
        "correctAnswer": "80 dB",
        "explanation": "Sounds above 80 dB (like heavy traffic or loud factories) become physically painful and cause noise pollution and ear damage.",
        "misconceptions": {
          "50 dB": "50 dB corresponds to a quiet office or moderate rain, which is harmless."
        }
      },
      {
        "id": "sci-sd-15",
        "topicId": "sound-vibrations",
        "difficulty": 2.4,
        "text": "During a thunderstorm, lightning is seen before thunder is heard because:",
        "options": [
          "Sound waves get deflected by clouds",
          "Thunder is produced several seconds after lightning occurs",
          "Human eyes are positioned in front of ears",
          "Light travels at $3 \\times 10^8\\text{ m/s}$ whereas sound travels at only $\\approx 340\\text{ m/s}$ in air"
        ],
        "correctAnswer": "Light travels at $3 \\times 10^8\\text{ m/s}$ whereas sound travels at only $\\approx 340\\text{ m/s}$ in air",
        "explanation": "Light reaches our eyes almost instantaneously, while sound takes roughly 3 seconds to travel just 1 kilometre in air.",
        "misconceptions": {
          "Thunder is produced several seconds after lightning occurs": "Lightning and thunder are produced simultaneously by the electrical discharge."
        }
      },
      {
        "id": "sci-sd-16",
        "topicId": "sound-vibrations",
        "difficulty": 2.5,
        "text": "In which of the following musical instruments is sound produced by vibrating air columns?",
        "options": [
          "Ghatam and Manjira",
          "Tabla and Dholak",
          "Sitar and Veena",
          "Flute and Shehnai"
        ],
        "correctAnswer": "Flute and Shehnai",
        "explanation": "Flutes and shehnais are wind instruments (aerophones) producing sound via standing waves in vibrating air columns.",
        "misconceptions": {
          "Tabla and Dholak": "Tabla and dholak produce sound through vibrating stretched membranes (membranophones)."
        }
      },
      {
        "id": "sci-sd-17",
        "topicId": "sound-vibrations",
        "difficulty": 2.5,
        "text": "A tuning fork makes 512 complete vibrations every second. If the speed of sound in air is $340\\text{ m/s}$, calculate the wavelength of the sound wave produced.",
        "options": [
          "$174\\text{ m}$",
          "$0.66\\text{ m}$",
          "$1.50\\text{ m}$",
          "$0.002\\text{ m}$"
        ],
        "correctAnswer": "$0.66\\text{ m}$",
        "explanation": "Wave equation: $v = f \\times \\lambda \\Rightarrow \\lambda = \\frac{v}{f} = \\frac{340}{512} \\approx 0.664\\text{ m}$.",
        "misconceptions": {
          "$1.50\\text{ m}$": "Did you divide 512 by 340? Wavelength is $v / f$ (340 / 512)."
        }
      }
    ]
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
    "items": [
      {
        "id": "eng-t-1",
        "topicId": "english-tenses",
        "difficulty": -2.1,
        "text": "Identify the sentence written in the Simple Present Tense:",
        "options": [
          "Rohan walked to school yesterday.",
          "Rohan will walk to school.",
          "Rohan walks to school every morning.",
          "Rohan is walking to school."
        ],
        "correctAnswer": "Rohan walks to school every morning.",
        "explanation": "'Walks' is the base form + s indicating habitual present action (Simple Present).",
        "misconceptions": {
          "Rohan is walking to school.": "This is Present Continuous (is + verb-ing), showing an ongoing action."
        }
      },
      {
        "id": "eng-t-2",
        "topicId": "english-tenses",
        "difficulty": -1.7,
        "text": "Fill in the blank with the correct Past Continuous form: 'While mother was cooking, the children _____ their homework.'",
        "options": [
          "did",
          "were doing",
          "are doing",
          "was doing"
        ],
        "correctAnswer": "were doing",
        "explanation": "'Children' is plural, so it takes 'were' + present participle 'doing'.",
        "misconceptions": {
          "was doing": "'Children' is plural; 'was' is only used with singular subjects."
        }
      },
      {
        "id": "eng-t-3",
        "topicId": "english-tenses",
        "difficulty": -1.3,
        "text": "Fill in the blank: 'The train _____ before we reached the railway platform.'",
        "options": [
          "had left",
          "leaves",
          "has left",
          "was left"
        ],
        "correctAnswer": "had left",
        "explanation": "When two actions happened in the past, the earlier completed action takes the Past Perfect tense (had + past participle).",
        "misconceptions": {
          "has left": "The context is past ('before we reached'); 'has left' is present perfect."
        }
      },
      {
        "id": "eng-t-4",
        "topicId": "english-tenses",
        "difficulty": -0.9,
        "text": "Choose the correct verb form: 'They _____ football in the park since 3 PM.'",
        "options": [
          "played",
          "are playing",
          "were playing",
          "have been playing"
        ],
        "correctAnswer": "have been playing",
        "explanation": "Action starting in the past and continuing into the present with a time marker ('since 3 PM') requires Present Perfect Continuous.",
        "misconceptions": {
          "are playing": "Present Continuous does not take time markers of duration ('since 3 PM')."
        }
      },
      {
        "id": "eng-t-5",
        "topicId": "english-tenses",
        "difficulty": -0.5,
        "text": "Identify the tense of: 'By next December, our team will have completed the project.'",
        "options": [
          "Simple Future Tense",
          "Future Continuous Tense",
          "Present Perfect Tense",
          "Future Perfect Tense"
        ],
        "correctAnswer": "Future Perfect Tense",
        "explanation": "'Will have completed' expresses an action that will be finished before a specified future point in time (Future Perfect).",
        "misconceptions": {
          "Future Continuous Tense": "Future Continuous uses 'will be + verb-ing' (e.g. will be completing)."
        }
      },
      {
        "id": "eng-t-6",
        "topicId": "english-tenses",
        "difficulty": 0,
        "text": "Complete the conditional clause: 'If it rains tomorrow, we _____ the cricket match.'",
        "options": [
          "had cancelled",
          "cancelled",
          "would cancel",
          "will cancel"
        ],
        "correctAnswer": "will cancel",
        "explanation": "In a First Conditional sentence: 'If + simple present (rains), ... will + base verb (will cancel)'.",
        "misconceptions": {
          "would cancel": "'Would' is used in Second Conditionals with past subjunctive ('If it rained...')."
        }
      },
      {
        "id": "eng-t-7",
        "topicId": "english-tenses",
        "difficulty": 0.4,
        "text": "Fill in the blank: 'When I entered the classroom, the teacher _____ the whiteboard.'",
        "options": [
          "was cleaning",
          "cleans",
          "has cleaned",
          "is cleaned"
        ],
        "correctAnswer": "was cleaning",
        "explanation": "A continuous action in progress when another event interrupted it in the past requires the Past Continuous.",
        "misconceptions": {
          "has cleaned": "Past narration cannot mix with present perfect 'has cleaned'."
        }
      },
      {
        "id": "eng-t-8",
        "topicId": "english-tenses",
        "difficulty": 0.8,
        "text": "Select the sentence showing correct subject-verb agreement in tense:",
        "options": [
          "Neither the teacher nor the students were present in the hall.",
          "Neither the teacher nor the students is present in the hall.",
          "Neither the teacher nor the students has been present in the hall.",
          "Neither the teacher nor the students was present in the hall."
        ],
        "correctAnswer": "Neither the teacher nor the students were present in the hall.",
        "explanation": "When subjects are joined by 'neither... nor', the verb agrees with the closer subject ('students' = plural => 'were').",
        "misconceptions": {
          "Neither the teacher nor the students was present in the hall.": "The verb must agree with the nearest subject ('students'), which is plural."
        }
      },
      {
        "id": "eng-t-9",
        "topicId": "english-tenses",
        "difficulty": 1.1,
        "text": "Complete with the correct tense: 'He said that he _____ working on the research paper for three hours before the computer crashed.'",
        "options": [
          "is",
          "was",
          "has been",
          "had been"
        ],
        "correctAnswer": "had been",
        "explanation": "Reported speech in past tense referencing an action continuing up to a past event takes the Past Perfect Continuous.",
        "misconceptions": {
          "has been": "In past reported speech, present perfect 'has been' must backshift to 'had been'."
        }
      },
      {
        "id": "eng-t-10",
        "topicId": "english-tenses",
        "difficulty": 1.4,
        "text": "Which sentence correctly differentiates the use of 'for' and 'since'?",
        "options": [
          "I am living here since six years.",
          "I have lived in this city for 2018.",
          "I have lived in this city since 2018 and for six years.",
          "I lived here since six years ago."
        ],
        "correctAnswer": "I have lived in this city since 2018 and for six years.",
        "explanation": "'Since' denotes a specific starting point in time (2018); 'for' denotes a duration or period (six years).",
        "misconceptions": {
          "I have lived in this city for 2018.": "'For' cannot be used with a specific calendar starting year; use 'since 2018'."
        }
      },
      {
        "id": "eng-t-11",
        "topicId": "english-tenses",
        "difficulty": 1.7,
        "text": "Fill in the blank: 'Scarcely had the bell rung when the students _____ out of the room.'",
        "options": [
          "had rushed",
          "were rushing",
          "rush",
          "rushed"
        ],
        "correctAnswer": "rushed",
        "explanation": "'Scarcely had... when...' is followed by the simple past ('rushed').",
        "misconceptions": {
          "had rushed": "The past perfect is already supplied in the first clause ('had the bell rung')."
        }
      },
      {
        "id": "eng-t-12",
        "topicId": "english-tenses",
        "difficulty": 1.9,
        "text": "Choose the correct sentence in the Future Continuous tense:",
        "options": [
          "This time tomorrow, we fly over the Himalayas.",
          "This time tomorrow, we will fly over the Himalayas.",
          "This time tomorrow, we will be flying over the Himalayas.",
          "This time tomorrow, we will have flown over the Himalayas."
        ],
        "correctAnswer": "This time tomorrow, we will be flying over the Himalayas.",
        "explanation": "'Will be flying' denotes an action that will be in progress at a specific moment in the future.",
        "misconceptions": {
          "This time tomorrow, we will have flown over the Himalayas.": "Future Perfect implies completion, not an action in progress at that exact time."
        }
      },
      {
        "id": "eng-t-13",
        "topicId": "english-tenses",
        "difficulty": 2.1,
        "text": "Complete the sentence: 'She behaved as though she _____ the owner of the mansion.'",
        "options": [
          "is",
          "was",
          "has been",
          "were"
        ],
        "correctAnswer": "were",
        "explanation": "In hypothetical/unreal comparisons introduced by 'as though' or 'as if', the subjunctive 'were' is used regardless of subject.",
        "misconceptions": {
          "was": "In formal English subjunctive moods for unreal situations, 'were' is preferred over 'was'."
        }
      },
      {
        "id": "eng-t-14",
        "topicId": "english-tenses",
        "difficulty": 2.2,
        "text": "Identify the error: 'He has visited Agra last month to see the Taj Mahal.'",
        "options": [
          "'Taj Mahal' should not have 'the'",
          "'to see' should be 'seeing'",
          "'has visited' should be 'visited' because 'last month' denotes a definite past time",
          "There is no error"
        ],
        "correctAnswer": "'has visited' should be 'visited' because 'last month' denotes a definite past time",
        "explanation": "Definite past time markers (like 'yesterday', 'last month', 'in 1947') cannot be used with the Present Perfect.",
        "misconceptions": {
          "There is no error": "Present perfect never co-occurs with past point-of-time adverbs like 'last month'."
        }
      },
      {
        "id": "eng-t-15",
        "topicId": "english-tenses",
        "difficulty": 2.3,
        "text": "Fill in the blank: 'By the time the ambulance arrived, the doctor _____ first aid to the patient.'",
        "options": [
          "administered",
          "had already administered",
          "was administering",
          "has already administered"
        ],
        "correctAnswer": "had already administered",
        "explanation": "The administration of first aid preceded the arrival of the ambulance in past time, requiring Past Perfect.",
        "misconceptions": {
          "has already administered": "Cannot use present perfect 'has administered' with past narrative 'arrived'."
        }
      },
      {
        "id": "eng-t-16",
        "topicId": "english-tenses",
        "difficulty": 2.4,
        "text": "Choose the correct sequence of tenses: 'The scientist proved that the earth _____ around the sun.'",
        "options": [
          "was revolving",
          "revolved",
          "had revolved",
          "revolves"
        ],
        "correctAnswer": "revolves",
        "explanation": "Universal truths, scientific facts, and general principles remain in the Simple Present even when the reporting verb is in the past.",
        "misconceptions": {
          "revolved": "Universal scientific truths do not backshift to past tense in reported speech."
        }
      },
      {
        "id": "eng-t-17",
        "topicId": "english-tenses",
        "difficulty": 2.5,
        "text": "Complete with the correct modal perfect: 'He did not attend the meeting. He _____ missed his flight.'",
        "options": [
          "ought to have",
          "should have",
          "would",
          "must have"
        ],
        "correctAnswer": "must have",
        "explanation": "'Must have + past participle' expresses a logical deduction about a past event with high certainty.",
        "misconceptions": {
          "should have": "'Should have' expresses regret or an unfulfilled duty, not a logical deduction."
        }
      }
    ]
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
    "items": [
      {
        "id": "eng-ap-1",
        "topicId": "active-passive",
        "difficulty": -2.1,
        "text": "Convert to Passive Voice: 'She sings a melodious song.'",
        "options": [
          "A melodious song has sung by her.",
          "A melodious song was sung by her.",
          "A melodious song is sung by her.",
          "A melodious song is being sung by her."
        ],
        "correctAnswer": "A melodious song is sung by her.",
        "explanation": "Simple Present active (sings) changes to 'is/am/are + V3' (is sung).",
        "misconceptions": {
          "A melodious song was sung by her.": "Tense must remain unchanged; do not shift present to past."
        }
      },
      {
        "id": "eng-ap-2",
        "topicId": "active-passive",
        "difficulty": -1.7,
        "text": "Convert to Passive Voice: 'The painters are painting the building.'",
        "options": [
          "The building is painted by the painters.",
          "The building was painted by the painters.",
          "The building has been painted by the painters.",
          "The building is being painted by the painters."
        ],
        "correctAnswer": "The building is being painted by the painters.",
        "explanation": "Present Continuous active (are painting) converts to 'is/are + being + V3' (is being painted).",
        "misconceptions": {
          "The building is painted by the painters.": "Without 'being', the continuous aspect is lost."
        }
      },
      {
        "id": "eng-ap-3",
        "topicId": "active-passive",
        "difficulty": -1.3,
        "text": "Convert to Passive Voice: 'The chef prepared a grand feast.'",
        "options": [
          "A grand feast was being prepared by the chef.",
          "A grand feast was prepared by the chef.",
          "A grand feast is prepared by the chef.",
          "A grand feast had prepared by the chef."
        ],
        "correctAnswer": "A grand feast was prepared by the chef.",
        "explanation": "Simple Past active (prepared) converts to 'was/were + V3' (was prepared).",
        "misconceptions": {
          "A grand feast is prepared by the chef.": "The tense must stay in the past ('was prepared')."
        }
      },
      {
        "id": "eng-ap-4",
        "topicId": "active-passive",
        "difficulty": -0.8,
        "text": "Convert an imperative sentence to passive: 'Shut the front door.'",
        "options": [
          "You are shutting the front door.",
          "Shutting the front door is done.",
          "Let the front door be shut.",
          "The front door should shut."
        ],
        "correctAnswer": "Let the front door be shut.",
        "explanation": "Imperative orders/commands follow the passive pattern: 'Let + object + be + past participle (V3)'.",
        "misconceptions": {
          "The front door should shut.": "This implies the door shuts on its own (active intransitive)."
        }
      },
      {
        "id": "eng-ap-5",
        "topicId": "active-passive",
        "difficulty": -0.4,
        "text": "Convert an interrogative sentence to passive: 'Did you complete the assignment?'",
        "options": [
          "Was the assignment completed by you?",
          "Did the assignment completed by you?",
          "Had the assignment completed by you?",
          "Is the assignment completed by you?"
        ],
        "correctAnswer": "Was the assignment completed by you?",
        "explanation": "'Did + subject + V1' in past interrogative changes to 'Was/Were + subject + V3' in passive.",
        "misconceptions": {
          "Is the assignment completed by you?": "'Did' is past tense, so the passive auxiliary must be 'Was', not 'Is'."
        }
      },
      {
        "id": "eng-ap-6",
        "topicId": "active-passive",
        "difficulty": 0.1,
        "text": "Convert a sentence with a modal auxiliary: 'You must follow all safety rules.'",
        "options": [
          "All safety rules must be followed by you.",
          "All safety rules must followed by you.",
          "All safety rules are followed by you.",
          "All safety rules should be follow by you."
        ],
        "correctAnswer": "All safety rules must be followed by you.",
        "explanation": "Modal active (must + V1) converts to 'modal + be + V3' (must be followed).",
        "misconceptions": {
          "All safety rules must followed by you.": "The auxiliary 'be' must be placed between the modal and V3."
        }
      },
      {
        "id": "eng-ap-7",
        "topicId": "active-passive",
        "difficulty": 0.5,
        "text": "Convert to passive: 'Who wrote this famous play?'",
        "options": [
          "By whom was this famous play written?",
          "Whom was this famous play written by?",
          "By who was this famous play written?",
          "Who was written this famous play?"
        ],
        "correctAnswer": "By whom was this famous play written?",
        "explanation": "'Who' in active voice transforms into the objective prepositional phrase 'By whom' in passive voice.",
        "misconceptions": {
          "By who was this famous play written?": "Prepositions take objective pronouns ('whom', not 'who')."
        }
      },
      {
        "id": "eng-ap-8",
        "topicId": "active-passive",
        "difficulty": 0.9,
        "text": "Convert a sentence with two objects: 'The principal awarded Ananya a medal.' (Focus on direct object)",
        "options": [
          "A medal was awarded to Ananya by the principal.",
          "Ananya was awarding a medal by the principal.",
          "A medal awarded Ananya by the principal.",
          "A medal has been awarded Ananya by the principal."
        ],
        "correctAnswer": "A medal was awarded to Ananya by the principal.",
        "explanation": "When making the direct object (a medal) the subject, the indirect object takes 'to' ('awarded to Ananya').",
        "misconceptions": {
          "A medal awarded Ananya by the principal.": "Missing auxiliary 'was'; without 'was' the meaning is corrupted."
        }
      },
      {
        "id": "eng-ap-9",
        "topicId": "active-passive",
        "difficulty": 1.2,
        "text": "Convert to Passive: 'Someone has stolen my bicycle.'",
        "options": [
          "My bicycle has stolen.",
          "My bicycle is been stolen.",
          "My bicycle has been stolen.",
          "My bicycle was stolen by someone."
        ],
        "correctAnswer": "My bicycle has been stolen.",
        "explanation": "With vague indefinite agents ('someone', 'people', 'they'), the 'by' phrase is omitted in natural passive voice.",
        "misconceptions": {
          "My bicycle has stolen.": "Without 'been', it would mean the bicycle itself stole something!"
        }
      },
      {
        "id": "eng-ap-10",
        "topicId": "active-passive",
        "difficulty": 1.5,
        "text": "Which of the following sentences CANNOT be converted into passive voice?",
        "options": [
          "The child broke the ceramic vase.",
          "The migratory birds flew across the clear sky.",
          "The teacher explained the difficult problem.",
          "The gardener watered the flowering plants."
        ],
        "correctAnswer": "The migratory birds flew across the clear sky.",
        "explanation": "The verb 'flew' is intransitive here (has no direct object receiving the action). Only transitive verbs can be passivized.",
        "misconceptions": {
          "The child broke the ceramic vase.": "'Broke' has direct object 'ceramic vase', so it easily passivizes."
        }
      },
      {
        "id": "eng-ap-11",
        "topicId": "active-passive",
        "difficulty": 1.8,
        "text": "Convert to active voice: 'The wounded soldier was being carried by his comrades.'",
        "options": [
          "His comrades are carrying the wounded soldier.",
          "His comrades carried the wounded soldier.",
          "His comrades have carried the wounded soldier.",
          "His comrades were carrying the wounded soldier."
        ],
        "correctAnswer": "His comrades were carrying the wounded soldier.",
        "explanation": "Passive 'was being carried' corresponds to active Past Continuous 'were carrying'.",
        "misconceptions": {
          "His comrades carried the wounded soldier.": "That would be Simple Past; the original was continuous ('was being carried')."
        }
      },
      {
        "id": "eng-ap-12",
        "topicId": "active-passive",
        "difficulty": 2,
        "text": "Convert imperative advice to passive: 'Help the poor and needy.'",
        "options": [
          "The poor and needy should be helped.",
          "Let the poor and needy be helped by you.",
          "You are requested to help the poor.",
          "Poor and needy are helped."
        ],
        "correctAnswer": "The poor and needy should be helped.",
        "explanation": "For moral suggestions or advice, 'Object + should + be + V3' is the preferred pedagogical transformation.",
        "misconceptions": {
          "Let the poor and needy be helped by you.": "'Let...' is typically reserved for commands/orders rather than benevolent moral advice."
        }
      },
      {
        "id": "eng-ap-13",
        "topicId": "active-passive",
        "difficulty": 2.2,
        "text": "Convert to passive: 'They are constructing a new bridge over the river.'",
        "options": [
          "A new bridge will be constructed over the river.",
          "A new bridge has been constructed by them.",
          "A new bridge was constructed over the river.",
          "A new bridge is being constructed over the river by them."
        ],
        "correctAnswer": "A new bridge is being constructed over the river by them.",
        "explanation": "Present Continuous 'are constructing' becomes 'is being constructed'.",
        "misconceptions": {
          "A new bridge was constructed over the river.": "Do not alter the ongoing present continuous tense to past."
        }
      },
      {
        "id": "eng-ap-14",
        "topicId": "active-passive",
        "difficulty": 2.3,
        "text": "Convert to passive: 'One should keep one's promises.'",
        "options": [
          "One's promises should be kept by one.",
          "Promises must be kept by everyone.",
          "Promises should be kept.",
          "Promises should keep."
        ],
        "correctAnswer": "Promises should be kept.",
        "explanation": "In general aphorisms with pronoun 'one', the agent 'by one' is dropped for conciseness.",
        "misconceptions": {
          "One's promises should be kept by one.": "Redundant repetition of 'one' is unnatural in standard English."
        }
      },
      {
        "id": "eng-ap-15",
        "topicId": "active-passive",
        "difficulty": 2.4,
        "text": "Convert to passive: 'The police caught the thief red-handed.'",
        "options": [
          "The thief had caught by police.",
          "The thief was caught red-handed by the police.",
          "Red-handed was caught the thief.",
          "The thief was been caught red-handed."
        ],
        "correctAnswer": "The thief was caught red-handed by the police.",
        "explanation": "Simple past active 'caught' becomes 'was caught' with adjunct 'red-handed' retained.",
        "misconceptions": {
          "The thief was been caught red-handed.": "'Was been' is an invalid double auxiliary combination."
        }
      },
      {
        "id": "eng-ap-16",
        "topicId": "active-passive",
        "difficulty": 2.5,
        "text": "Convert to active voice: 'Why was such a reckless decision made by the committee?'",
        "options": [
          "Why did the committee make such a reckless decision?",
          "Why does the committee make such a reckless decision?",
          "Why will the committee make such a reckless decision?",
          "Why had the committee made such a reckless decision?"
        ],
        "correctAnswer": "Why did the committee make such a reckless decision?",
        "explanation": "Passive past question 'Why was... made' converts to active past question 'Why did... make'.",
        "misconceptions": {
          "Why does the committee make such a reckless decision?": "Tense must remain past ('did make', not 'does make')."
        }
      },
      {
        "id": "eng-ap-17",
        "topicId": "active-passive",
        "difficulty": 2.5,
        "text": "Convert to passive: 'It is time to ring the morning school bell.'",
        "options": [
          "It is time for the morning school bell to be rung.",
          "Time has come to ring the bell.",
          "The morning school bell should be rung in time.",
          "It is time that the school bell was rung."
        ],
        "correctAnswer": "It is time for the morning school bell to be rung.",
        "explanation": "The standard construction 'It is time + infinitive' becomes 'It is time + for + object + to be + V3'.",
        "misconceptions": {
          "It is time that the school bell was rung.": "The standard idiom uses 'for + noun + to be + V3'."
        }
      }
    ]
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
    "items": [
      {
        "id": "sst-tt-1",
        "topicId": "trade-to-territory",
        "difficulty": -2.1,
        "text": "Who was the last powerful Mughal Emperor whose death in 1707 marked the beginning of regional political fragmentation?",
        "options": [
          "Bahadur Shah Zafar",
          "Aurangzeb",
          "Shah Jahan",
          "Akbar"
        ],
        "correctAnswer": "Aurangzeb",
        "explanation": "After Aurangzeb's death in 1707, powerful regional subadars and zamindars carved out independent regional kingdoms.",
        "misconceptions": {
          "Bahadur Shah Zafar": "Bahadur Shah Zafar was the last symbolic titular Mughal emperor during the 1857 revolt, not the last powerful one."
        }
      },
      {
        "id": "sst-tt-2",
        "topicId": "trade-to-territory",
        "difficulty": -1.7,
        "text": "In which year was the historic Battle of Plassey fought between Sirajuddaulah and Robert Clive?",
        "options": [
          "1857",
          "1764",
          "1707",
          "1757"
        ],
        "correctAnswer": "1757",
        "explanation": "The Battle of Plassey was fought in 1757, marking the first major British military victory in India.",
        "misconceptions": {
          "1764": "1764 was the Battle of Buxar."
        }
      },
      {
        "id": "sst-tt-3",
        "topicId": "trade-to-territory",
        "difficulty": -1.3,
        "text": "Which ruler of Mysore was famously known as the 'Tiger of Mysore' for his fierce resistance against the British?",
        "options": [
          "Mir Jafar",
          "Sirajuddaulah",
          "Tipu Sultan",
          "Haidar Ali"
        ],
        "correctAnswer": "Tipu Sultan",
        "explanation": "Tipu Sultan ruled Mysore from 1782 to 1799, modernized his military, and fought bravely until his martyrdom at Seringapatam.",
        "misconceptions": {
          "Haidar Ali": "Haidar Ali was Tipu Sultan's father who ruled Mysore earlier."
        }
      },
      {
        "id": "sst-tt-4",
        "topicId": "trade-to-territory",
        "difficulty": -0.8,
        "text": "Which Governor-General of India introduced the annexation policy known as the 'Doctrine of Lapse'?",
        "options": [
          "Lord Hastings",
          "Lord Wellesley",
          "Lord Dalhousie",
          "Robert Clive"
        ],
        "correctAnswer": "Lord Dalhousie",
        "explanation": "Governor-General Lord Dalhousie introduced the Doctrine of Lapse, declaring that if an Indian ruler died without a natural male heir, his kingdom 'lapsed' to British rule.",
        "misconceptions": {
          "Lord Wellesley": "Lord Wellesley introduced the Subsidiary Alliance system, not the Doctrine of Lapse."
        }
      },
      {
        "id": "sst-tt-5",
        "topicId": "trade-to-territory",
        "difficulty": -0.4,
        "text": "In 1765, following the Battle of Buxar, the Mughal Emperor granted which critical right to the East India Company?",
        "options": [
          "Diwani of Bengal (right to collect land revenues)",
          "Title of Mughal Emperor",
          "Control of the Afghan border",
          "Right to build palaces in Delhi"
        ],
        "correctAnswer": "Diwani of Bengal (right to collect land revenues)",
        "explanation": "The Diwani allowed the Company to tap the vast revenue resources of Bengal to finance trade, troops, and administrative expenses.",
        "misconceptions": {
          "Title of Mughal Emperor": "The Company remained nominally under the Mughal Emperor's grant; they did not become emperors themselves."
        }
      },
      {
        "id": "sst-tt-6",
        "topicId": "trade-to-territory",
        "difficulty": 0.1,
        "text": "What was the main military condition imposed on Indian rulers under Lord Wellesley's 'Subsidiary Alliance'?",
        "options": [
          "Rulers had to send their armies to fight in Europe",
          "Rulers could not keep independent armed forces and had to pay for British subsidiary forces stationed in their territory",
          "Rulers had to surrender all weapons immediately",
          "Rulers had to pay taxes directly to France"
        ],
        "correctAnswer": "Rulers could not keep independent armed forces and had to pay for British subsidiary forces stationed in their territory",
        "explanation": "If an Indian ruler failed to make payments for the subsidiary forces, a portion of his territory was ceded to the British as penalty.",
        "misconceptions": {
          "Rulers had to surrender all weapons immediately": "They were allowed palace guards, but their foreign defense was controlled by the British Resident."
        }
      },
      {
        "id": "sst-tt-7",
        "topicId": "trade-to-territory",
        "difficulty": 0.5,
        "text": "Which courageous queen led an armed anti-British resistance when the British attempted to annex her small state of Kitoor (Karnataka)?",
        "options": [
          "Begum Hazrat Mahal",
          "Razia Sultana",
          "Rani Channamma",
          "Rani Lakshmibai"
        ],
        "correctAnswer": "Rani Channamma",
        "explanation": "Rani Channamma of Kitoor led an armed rebellion in 1824 and defeated British forces before being arrested and dying in prison.",
        "misconceptions": {
          "Rani Lakshmibai": "Rani Lakshmibai led the revolt in Jhansi during the 1857 uprising."
        }
      },
      {
        "id": "sst-tt-8",
        "topicId": "trade-to-territory",
        "difficulty": 0.9,
        "text": "Which was the first Indian princely state annexed by Lord Dalhousie under the Doctrine of Lapse in 1848?",
        "options": [
          "Satara",
          "Sambalpur",
          "Nagpur",
          "Jhansi"
        ],
        "correctAnswer": "Satara",
        "explanation": "Satara was annexed in 1848, followed by Sambalpur (1850), Udaipur (1852), Nagpur (1853), and Jhansi (1854).",
        "misconceptions": {
          "Jhansi": "Jhansi was annexed in 1854, six years after Satara."
        }
      },
      {
        "id": "sst-tt-9",
        "topicId": "trade-to-territory",
        "difficulty": 1.2,
        "text": "What high-value Indian commodities were in enormous demand across European markets during the 17th and 18th centuries?",
        "options": [
          "Wheat, barley, and rye",
          "Fine quality cotton and silk fabrics, pepper, cloves, cardamom, and cinnamon",
          "Iron ore and industrial coal",
          "Machinery and firearms"
        ],
        "correctAnswer": "Fine quality cotton and silk fabrics, pepper, cloves, cardamom, and cinnamon",
        "explanation": "Indian textiles and Malabar spices enjoyed unmatched quality and profit margins in European mercantile markets.",
        "misconceptions": {
          "Iron ore and industrial coal": "Industrial coal and iron became significant later during the Industrial Revolution, not during early mercantile trade."
        }
      },
      {
        "id": "sst-tt-10",
        "topicId": "trade-to-territory",
        "difficulty": 1.5,
        "text": "Why did Sirajuddaulah march with 30,000 soldiers to the English factory at Kassimbazar and capture Fort William in Calcutta in 1756?",
        "options": [
          "The French paid the Nawab to attack",
          "The British kidnapped his ministers",
          "The Company insulted his religious beliefs",
          "The Company refused to pay customs taxes and illegally fortified Calcutta without the Nawab's permission"
        ],
        "correctAnswer": "The Company refused to pay customs taxes and illegally fortified Calcutta without the Nawab's permission",
        "explanation": "The Company misused royal trade concessions (dastaks) for private trade, evaded customs, and began building military fortifications.",
        "misconceptions": {
          "The French paid the Nawab to attack": "Sirajuddaulah acted independently as sovereign Nawab to protect state revenues."
        }
      },
      {
        "id": "sst-tt-11",
        "topicId": "trade-to-territory",
        "difficulty": 1.8,
        "text": "How did Robert Clive manage to defeat Nawab Sirajuddaulah at the Battle of Plassey despite being heavily outnumbered?",
        "options": [
          "He received massive reinforcements from the Mughal Emperor",
          "He used secret submarines in the Hooghly",
          "He bribed Mir Jafar (commander-in-chief) with the promise of making him the next Nawab, ensuring Mir Jafar's troops never fought",
          "The Nawab had no ammunition"
        ],
        "correctAnswer": "He bribed Mir Jafar (commander-in-chief) with the promise of making him the next Nawab, ensuring Mir Jafar's troops never fought",
        "explanation": "Mir Jafar betrayed Sirajuddaulah by holding back the largest division of the Nawab's army during the battle.",
        "misconceptions": {
          "He received massive reinforcements from the Mughal Emperor": "The Mughal Emperor had no troops at Plassey; the battle was decided by treachery."
        }
      },
      {
        "id": "sst-tt-12",
        "topicId": "trade-to-territory",
        "difficulty": 2,
        "text": "What justified the annexation of Awadh by Lord Dalhousie in 1856, despite the Nawab having male heirs?",
        "options": [
          "A direct military attack by Awadh on Calcutta",
          "Allegations of 'misgovernment and internal corruption'",
          "Awadh signed a treaty with Russia",
          "The Doctrine of Lapse"
        ],
        "correctAnswer": "Allegations of 'misgovernment and internal corruption'",
        "explanation": "Awadh was annexed on the fabricated pretext of freeing the people from the Nawab's 'misrule', creating deep resentment leading to 1857.",
        "misconceptions": {
          "The Doctrine of Lapse": "Doctrine of Lapse applied only where there was no natural male heir; Nawab Wajid Ali Shah had legitimate heirs."
        }
      },
      {
        "id": "sst-tt-13",
        "topicId": "trade-to-territory",
        "difficulty": 2.2,
        "text": "Under the new administrative setup introduced by Warren Hastings in 1772, each district was given two courts: a Faujdari Adalat and a Diwani Adalat. What did these represent?",
        "options": [
          "Faujdari was a Religious court only",
          "Faujdari Adalat was a Criminal Court; Diwani Adalat was a Civil Court",
          "Both were military courts",
          "Faujdari was a Tax court; Diwani was an Appellate court"
        ],
        "correctAnswer": "Faujdari Adalat was a Criminal Court; Diwani Adalat was a Civil Court",
        "explanation": "Diwani Adalats handled civil disputes (property, contracts), while Faujdari Adalats heard criminal cases under a Qazi and Mufti supervised by the Collector.",
        "misconceptions": {
          "Faujdari Adalat was a Tax court; Diwani Adalat was an Appellate court": "Diwani refers to civil/revenue jurisdiction, Faujdari to criminal law."
        }
      },
      {
        "id": "sst-tt-14",
        "topicId": "trade-to-territory",
        "difficulty": 2.3,
        "text": "What was the royal charter granted by Queen Elizabeth I in 1600 to the East India Company?",
        "options": [
          "Right to arrest European monarchs",
          "An exclusive monopoly right to trade with the East, meaning no other English trading group could compete",
          "Free tea for the British army",
          "Ownership of all Indian land"
        ],
        "correctAnswer": "An exclusive monopoly right to trade with the East, meaning no other English trading group could compete",
        "explanation": "The Royal Charter granted sole English trading rights eastward, although other European powers (Portuguese, Dutch, French) could still compete.",
        "misconceptions": {
          "Ownership of all Indian land": "The charter was issued by the English monarch; she had no jurisdiction over sovereign Indian territory."
        }
      },
      {
        "id": "sst-tt-15",
        "topicId": "trade-to-territory",
        "difficulty": 2.4,
        "text": "Why did Tipu Sultan establish close diplomatic and trading relations with the French in India?",
        "options": [
          "To learn French painting",
          "To surrender Mysore to the French King",
          "To modernize his army with European weaponry and counteract British expansionism",
          "Because he wanted to export spices to France only"
        ],
        "correctAnswer": "To modernize his army with European weaponry and counteract British expansionism",
        "explanation": "Tipu modernized his infantry and artillery with French technical experts and established a Jacobin club at Seringapatam.",
        "misconceptions": {
          "To surrender Mysore to the French King": "Tipu Sultan was fiercely proud of Mysore's sovereign independence."
        }
      },
      {
        "id": "sst-tt-16",
        "topicId": "trade-to-territory",
        "difficulty": 2.5,
        "text": "In the 1830s, the East India Company became increasingly anxious about which foreign empire possibly expanding through Afghanistan into India?",
        "options": [
          "The Chinese Qing Empire",
          "The Ottoman Empire",
          "The Russian Empire",
          "The Spanish Empire"
        ],
        "correctAnswer": "The Russian Empire",
        "explanation": "The 'Great Game' rivalry with Russia led the British to fight prolonged wars in Afghanistan (1838-1842) to secure northwest borders.",
        "misconceptions": {
          "The Ottoman Empire": "The Ottoman Empire was declining and posed no expansionist threat to northwest India."
        }
      },
      {
        "id": "sst-tt-17",
        "topicId": "trade-to-territory",
        "difficulty": 2.5,
        "text": "What was the principal role of the British 'Resident' appointed to the courts of Indian princely states after the Subsidiary Alliance?",
        "options": [
          "To oversee temple construction",
          "To manage agricultural irrigation dams",
          "To act as political and commercial agents serving Company interests and interfering in state succession and administration",
          "To teach English grammar to princes"
        ],
        "correctAnswer": "To act as political and commercial agents serving Company interests and interfering in state succession and administration",
        "explanation": "Residents exercised de facto control over state appointments, foreign diplomacy, and succession decisions.",
        "misconceptions": {
          "To teach English grammar to princes": "The Resident was a high-level imperial diplomatic and political supervisor, not an educator."
        }
      }
    ]
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
    "items": [
      {
        "id": "sst-ic-1",
        "topicId": "indian-constitution",
        "difficulty": -2.1,
        "text": "Who is universally recognized as the 'Father of the Indian Constitution'?",
        "options": [
          "Mahatma Gandhi",
          "Dr. Rajendra Prasad",
          "Jawaharlal Nehru",
          "Dr. B.R. Ambedkar"
        ],
        "correctAnswer": "Dr. B.R. Ambedkar",
        "explanation": "Dr. Bhimrao Ramji Ambedkar was the Chairman of the Drafting Committee of the Constituent Assembly.",
        "misconceptions": {
          "Dr. Rajendra Prasad": "Dr. Rajendra Prasad was the President of the Constituent Assembly, while Dr. Ambedkar chaired the Drafting Committee."
        }
      },
      {
        "id": "sst-ic-2",
        "topicId": "indian-constitution",
        "difficulty": -1.7,
        "text": "On which historic date did the Constitution of India officially come into force?",
        "options": [
          "15 August 1947",
          "26 November 1949",
          "26 January 1950",
          "2 October 1950"
        ],
        "correctAnswer": "26 January 1950",
        "explanation": "While adopted on 26 November 1949, the Constitution officially took effect on 26 January 1950 (celebrated as Republic Day).",
        "misconceptions": {
          "26 November 1949": "26 November 1949 is Constitution Day (Adoption date); it was enacted into law on 26 January 1950."
        }
      },
      {
        "id": "sst-ic-3",
        "topicId": "indian-constitution",
        "difficulty": -1.3,
        "text": "What is the core meaning of 'Secularism' in the context of the Indian Constitution?",
        "options": [
          "The State follows only ancient customs",
          "The State collects special taxes for majority temples",
          "The State prohibits citizens from visiting religious places",
          "The State does not officially promote any one religion as the state religion and treats all religions equally"
        ],
        "correctAnswer": "The State does not officially promote any one religion as the state religion and treats all religions equally",
        "explanation": "Secularism guarantees freedom of faith and ensures strict state neutrality without establishing an official state faith.",
        "misconceptions": {
          "The State prohibits citizens from visiting religious places": "The Constitution guarantees fundamental freedom to practice and propagate religion (Articles 25-28)."
        }
      },
      {
        "id": "sst-ic-4",
        "topicId": "indian-constitution",
        "difficulty": -0.8,
        "text": "Which key feature of the Indian Constitution refers to the existence of multiple tiers of government (National, State, and Local Panchayati Raj)?",
        "options": [
          "Federalism",
          "Monarchy",
          "Dictatorship",
          "Unitary System"
        ],
        "correctAnswer": "Federalism",
        "explanation": "Federalism divides legislative and executive powers between the Central Government and State Governments.",
        "misconceptions": {
          "Unitary System": "In a unitary system, all governing power resides in a single central government."
        }
      },
      {
        "id": "sst-ic-5",
        "topicId": "indian-constitution",
        "difficulty": -0.4,
        "text": "According to the Constitution, how many separate organs of the State exist to ensure checks and balances?",
        "options": [
          "Four (including Corporate sector)",
          "Three (Legislature, Executive, Judiciary)",
          "One (Prime Minister)",
          "Two (Army and Police)"
        ],
        "correctAnswer": "Three (Legislature, Executive, Judiciary)",
        "explanation": "The Legislature makes laws, the Executive implements laws, and the Judiciary interprets laws and administers justice.",
        "misconceptions": {
          "Two (Army and Police)": "Armed forces and police are administrative bodies under the Executive organ."
        }
      },
      {
        "id": "sst-ic-6",
        "topicId": "indian-constitution",
        "difficulty": 0.1,
        "text": "Which Fundamental Right empowers citizens to approach the High Court or Supreme Court if their fundamental rights are violated?",
        "options": [
          "Right to Equality",
          "Right to Freedom of Speech",
          "Right to Education",
          "Right to Constitutional Remedies (Article 32)"
        ],
        "correctAnswer": "Right to Constitutional Remedies (Article 32)",
        "explanation": "Dr. Ambedkar called Article 32 the 'heart and soul of the Constitution' because it guarantees judicial enforcement of rights through writs.",
        "misconceptions": {
          "Right to Equality": "Right to Equality guarantees equal protection of laws, but Article 32 provides the legal remedy to enforce it."
        }
      },
      {
        "id": "sst-ic-7",
        "topicId": "indian-constitution",
        "difficulty": 0.5,
        "text": "Under which Fundamental Right is human trafficking, forced labour (begar), and employment of children under 14 years in hazardous work strictly prohibited?",
        "options": [
          "Right to Property",
          "Right to Freedom",
          "Cultural and Educational Rights",
          "Right against Exploitation (Articles 23-24)"
        ],
        "correctAnswer": "Right against Exploitation (Articles 23-24)",
        "explanation": "Articles 23 and 24 specifically forbid trafficking, bonded labour, and child employment in factories, mines, or hazardous industries.",
        "misconceptions": {
          "Right to Freedom": "Right to Freedom (Articles 19-22) protects speech, movement, and life, not child labour prohibitions directly."
        }
      },
      {
        "id": "sst-ic-8",
        "topicId": "indian-constitution",
        "difficulty": 0.9,
        "text": "What democratic principle grants every adult citizen aged 18 and above the right to cast one vote regardless of gender, wealth, caste, or education?",
        "options": [
          "Aristocratic Voting",
          "Selective Franchise",
          "Universal Adult Suffrage",
          "Feudal Mandate"
        ],
        "correctAnswer": "Universal Adult Suffrage",
        "explanation": "Universal Adult Suffrage guarantees that every adult citizen holds an equal vote in determining their representative government.",
        "misconceptions": {
          "Selective Franchise": "Selective franchise restricted voting to property-owners or educated men during British colonial rule."
        }
      },
      {
        "id": "sst-ic-9",
        "topicId": "indian-constitution",
        "difficulty": 1.2,
        "text": "What section of the Constitution was referred to as its 'conscience' by the makers, guiding the State towards social and economic justice?",
        "options": [
          "Emergency Provisions",
          "Civil Service Rules",
          "Directive Principles of State Policy (DPSP) and Fundamental Rights",
          "Union Territories Schedule"
        ],
        "correctAnswer": "Directive Principles of State Policy (DPSP) and Fundamental Rights",
        "explanation": "The Fundamental Rights protect individual liberties, while DPSPs instruct governments to build an egalitarian welfare state.",
        "misconceptions": {
          "Emergency Provisions": "Emergency provisions temporarily suspend certain rights during war or rebellion."
        }
      },
      {
        "id": "sst-ic-10",
        "topicId": "indian-constitution",
        "difficulty": 1.5,
        "text": "Why is the Indian Judiciary described as 'independent' in our constitutional framework?",
        "options": [
          "Courts have their own military army",
          "Judges run their own political parties",
          "Courts do not follow the Constitution",
          "Judges cannot be easily removed by politicians, and other organs cannot interfere in judicial rulings"
        ],
        "correctAnswer": "Judges cannot be easily removed by politicians, and other organs cannot interfere in judicial rulings",
        "explanation": "Judicial independence is protected by fixed tenure, difficult impeachment procedures, and independent appointments.",
        "misconceptions": {
          "Courts have their own military army": "Courts do not command military forces; their judgments are enforced through constitutional rule of law."
        }
      },
      {
        "id": "sst-ic-11",
        "topicId": "indian-constitution",
        "difficulty": 1.8,
        "text": "What is the Preamble to the Constitution of India?",
        "options": [
          "A table of postal zip codes",
          "A brief introductory statement outlining the guiding ideals, philosophy, and objectives of the Constitution",
          "The military command handbook",
          "A list of all Indian civil servants"
        ],
        "correctAnswer": "A brief introductory statement outlining the guiding ideals, philosophy, and objectives of the Constitution",
        "explanation": "The Preamble serves as the preface declaring India to be a Sovereign, Socialist, Secular, Democratic Republic.",
        "misconceptions": {
          "A list of all Indian civil servants": "The Constitution contains constitutional laws and schedules, not directory listings."
        }
      },
      {
        "id": "sst-ic-12",
        "topicId": "indian-constitution",
        "difficulty": 2,
        "text": "Which constitutional amendment added the words 'Secular' and 'Socialist' into the Preamble in 1976?",
        "options": [
          "44th Constitutional Amendment Act",
          "73rd Constitutional Amendment Act",
          "42nd Constitutional Amendment Act",
          "1st Constitutional Amendment Act"
        ],
        "correctAnswer": "42nd Constitutional Amendment Act",
        "explanation": "The 42nd Amendment Act of 1976 amended the Preamble to explicitly insert 'Socialist', 'Secular', and 'Integrity'.",
        "misconceptions": {
          "44th Constitutional Amendment Act": "The 44th Amendment in 1978 removed the Right to Property from fundamental rights."
        }
      },
      {
        "id": "sst-ic-13",
        "topicId": "indian-constitution",
        "difficulty": 2.2,
        "text": "What prevents the majority community in a democratic nation from tyrannizing or discriminating against minority groups?",
        "options": [
          "Allowing only minorities to vote",
          "Frequent changes of capital cities",
          "Banning all religious holidays",
          "Enforceable Fundamental Rights that safeguard minority languages, culture, and religious autonomy"
        ],
        "correctAnswer": "Enforceable Fundamental Rights that safeguard minority languages, culture, and religious autonomy",
        "explanation": "Articles 29 and 30 guarantee cultural and educational rights to minorities, preventing the 'tyranny of the majority'.",
        "misconceptions": {
          "Banning all religious holidays": "The Constitution protects freedom to observe religious festivals peacefully."
        }
      },
      {
        "id": "sst-ic-14",
        "topicId": "indian-constitution",
        "difficulty": 2.3,
        "text": "Why did the members of the Constituent Assembly introduce a federal system with three legislative lists (Union, State, and Concurrent)?",
        "options": [
          "Because Britain ordered them to do so",
          "To make legislation as slow as possible",
          "To allow each state to print its own currency",
          "To accommodate India's vast geographical and cultural diversity while maintaining strong national unity and defense"
        ],
        "correctAnswer": "To accommodate India's vast geographical and cultural diversity while maintaining strong national unity and defense",
        "explanation": "The Union list covers national defense and foreign affairs; State list covers local police and agriculture; Concurrent list covers education and forests.",
        "misconceptions": {
          "To allow each state to print its own currency": "Only the Central Government (Reserve Bank of India) has the power to issue currency."
        }
      },
      {
        "id": "sst-ic-15",
        "topicId": "indian-constitution",
        "difficulty": 2.4,
        "text": "What does 'Sovereign' mean in the opening phrase 'We, the People of India, having solemnly resolved to constitute India into a Sovereign...'?",
        "options": [
          "India is ruled by a hereditary king",
          "India is completely free from external foreign control and has full authority to make its own domestic and foreign policies",
          "Only wealthy citizens have power",
          "India must consult the United Nations for all domestic laws"
        ],
        "correctAnswer": "India is completely free from external foreign control and has full authority to make its own domestic and foreign policies",
        "explanation": "Sovereignty indicates ultimate supreme power; the nation is neither a colony nor dependent upon any external power.",
        "misconceptions": {
          "India is ruled by a hereditary king": "Sovereign republic means the head of state is elected, not hereditary."
        }
      },
      {
        "id": "sst-ic-16",
        "topicId": "indian-constitution",
        "difficulty": 2.5,
        "text": "In the landmark 1973 Kesavananda Bharati case, what critical doctrine did the Supreme Court establish to protect the Constitution?",
        "options": [
          "The Doctrine of Governor Absolute Veto",
          "The 'Basic Structure Doctrine' (Parliament cannot destroy fundamental tenets of the Constitution)",
          "The Absolute Power of Parliament",
          "The Doctrine of Judicial Supremacy over Elections"
        ],
        "correctAnswer": "The 'Basic Structure Doctrine' (Parliament cannot destroy fundamental tenets of the Constitution)",
        "explanation": "The Supreme Court ruled that while Parliament can amend articles, it cannot alter or dismantle the 'basic structure' (secularism, federalism, judicial review).",
        "misconceptions": {
          "The Absolute Power of Parliament": "The ruling specifically placed limits on Parliament's amending power."
        }
      },
      {
        "id": "sst-ic-17",
        "topicId": "indian-constitution",
        "difficulty": 2.5,
        "text": "What is the key distinction between Fundamental Rights and Directive Principles of State Policy (DPSPs) in the Indian legal framework?",
        "options": [
          "Fundamental Rights only apply during wartime",
          "Fundamental Rights are justiciable in court, while DPSPs are non-justiciable moral guidelines for government policy",
          "DPSPs can send citizens to prison",
          "DPSPs are enacted by the United Nations"
        ],
        "correctAnswer": "Fundamental Rights are justiciable in court, while DPSPs are non-justiciable moral guidelines for government policy",
        "explanation": "A citizen can move courts if a Fundamental Right is breached (Article 32/226), but cannot sue the state for not implementing a DPSP.",
        "misconceptions": {
          "DPSPs can send citizens to prison": "DPSPs are directives addressed to lawmakers, not penal laws for citizens."
        }
      }
    ]
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
    "items": [
      {
        "id": "hin-ss-1",
        "topicId": "hindi-sandhi-samas",
        "difficulty": -2.1,
        "text": "'सूर्योदय' शब्द का सही संधि-विच्छेद क्या होगा?",
        "options": [
          "सूर्य + उदय",
          "सूर्या + उदय",
          "सू + उदय",
          "सूर्य + दय"
        ],
        "correctAnswer": "सूर्य + उदय",
        "explanation": "सूर्य के अंत का 'अ' और उदय का 'उ' मिलकर 'ओ' बनाते हैं (अ + उ = ओ), जो गुण स्वर संधि का नियम है।",
        "misconceptions": {
          "सूर्या + उदय": "'सूर्या' अशुद्ध मूल शब्द है; सही मूल शब्द 'सूर्य' है।"
        }
      },
      {
        "id": "hin-ss-2",
        "topicId": "hindi-sandhi-samas",
        "difficulty": -1.7,
        "text": "'विद्यालय' (विद्या + आलय) में कौन-सी स्वर संधि है?",
        "options": [
          "दीर्घ स्वर संधि",
          "वृद्धि स्वर संधि",
          "यण स्वर संधि",
          "गुण स्वर संधि"
        ],
        "correctAnswer": "दीर्घ स्वर संधि",
        "explanation": "दो सजातीय स्वर (आ + आ) मिलकर दीर्घ 'आ' बन जाते हैं, इसलिए यह दीर्घ स्वर संधि है।",
        "misconceptions": {
          "गुण स्वर संधि": "गुण संधि में अ/आ के बाद इ/ई या उ/ऊ आता है, सजातीय स्वर नहीं।"
        }
      },
      {
        "id": "hin-ss-3",
        "topicId": "hindi-sandhi-samas",
        "difficulty": -1.3,
        "text": "'यथाशक्ति' (शक्ति के अनुसार) शब्द में कौन-सा समास है?",
        "options": [
          "द्विगु समास",
          "तत्पुरुष समास",
          "अव्ययीभाव समास",
          "कर्मधारय समास"
        ],
        "correctAnswer": "अव्ययीभाव समास",
        "explanation": "जिस समास का पहला पद अव्यय (यथा) हो और वही प्रधान हो, उसे अव्ययीभाव समास कहते हैं।",
        "misconceptions": {
          "तत्पुरुष समास": "तत्पुरुष समास में उत्तर पद प्रधान होता है और कारक चिह्नों का लोप होता है।"
        }
      },
      {
        "id": "hin-ss-4",
        "topicId": "hindi-sandhi-samas",
        "difficulty": -0.9,
        "text": "'त्रिलोक' (तीन लोकों का समाहार) में कौन-सा समास है?",
        "options": [
          "कर्मधारय समास",
          "द्विगु समास",
          "बहुव्रीहि समास",
          "द्वन्द्व समास"
        ],
        "correctAnswer": "द्विगु समास",
        "explanation": "जिस समास का पहला पद संख्यावाचक विशेषण हो और समूह (समाहार) का बोध कराए, वह द्विगु समास होता है।",
        "misconceptions": {
          "द्वन्द्व समास": "द्वन्द्व समास में दोनों पद प्रधान होते हैं (जैसे माता-पिता), संख्यावाचक नहीं।"
        }
      },
      {
        "id": "hin-ss-5",
        "topicId": "hindi-sandhi-samas",
        "difficulty": -0.5,
        "text": "'माता-पिता' और 'रात-दिन' शब्दों में कौन-सा समास पाया जाता है?",
        "options": [
          "द्विगु समास",
          "अव्ययीभाव समास",
          "द्वन्द्व समास",
          "बहुव्रीहि समास"
        ],
        "correctAnswer": "द्वन्द्व समास",
        "explanation": "जिस समास के दोनों पद प्रधान हों और विग्रह करने पर 'और' या 'या' लगे, उसे द्वन्द्व समास कहते हैं।",
        "misconceptions": {
          "अव्ययीभाव समास": "माता और पिता दोनों संज्ञा पद हैं, कोई भी पद अव्यय नहीं है।"
        }
      },
      {
        "id": "hin-ss-6",
        "topicId": "hindi-sandhi-samas",
        "difficulty": 0.1,
        "text": "'अत्यधिक' (अति + अधिक) में कौन-सी स्वर संधि है?",
        "options": [
          "गुण स्वर संधि",
          "दीर्घ स्वर संधि",
          "यण स्वर संधि",
          "वृद्धि स्वर संधि"
        ],
        "correctAnswer": "यण स्वर संधि",
        "explanation": "इ/ई के बाद कोई भिन्न स्वर आने पर 'इ' का 'य्' में परिवर्तन हो जाता है (अति + अधिक = अत्यधिक)।",
        "misconceptions": {
          "गुण स्वर संधि": "गुण संधि में अ/आ के बाद इ/ई आता है; यहाँ पहले 'इ' आ रहा है।"
        }
      },
      {
        "id": "hin-ss-7",
        "topicId": "hindi-sandhi-samas",
        "difficulty": 0.5,
        "text": "'पीताम्बर' (पीले हैं वस्त्र जिसके अर्थात् भगवान श्रीकृष्ण) में कौन-सा समास है?",
        "options": [
          "द्विगु समास",
          "कर्मधारय समास",
          "तत्पुरुष समास",
          "बहुव्रीहि समास"
        ],
        "correctAnswer": "बहुव्रीहि समास",
        "explanation": "जिस समास में कोई भी पद प्रधान न होकर किसी तीसरे विशेष व्यक्ति (श्रीकृष्ण) की ओर संकेत करे, वह बहुव्रीहि समास कहलाता है।",
        "misconceptions": {
          "कर्मधारय समास": "यदि विग्रह 'पीत है जो अम्बर' हो तो कर्मधारय होगा, परंतु विशेष व्यक्ति (कृष्ण) के अर्थ में बहुव्रीहि प्रधान होता है।"
        }
      },
      {
        "id": "hin-ss-8",
        "topicId": "hindi-sandhi-samas",
        "difficulty": 0.9,
        "text": "'सदा + एव = सदैव' में किस संधि का नियम लागू होता है?",
        "options": [
          "यण स्वर संधि",
          "वृद्धि स्वर संधि (आ + ए = ऐ)",
          "गुण स्वर संधि",
          "अयादि स्वर संधि"
        ],
        "correctAnswer": "वृद्धि स्वर संधि (आ + ए = ऐ)",
        "explanation": "अ/आ के बाद ए/ऐ आने पर दोनों मिलकर 'ऐ' बन जाते हैं, इसे वृद्धि स्वर संधि कहते हैं।",
        "misconceptions": {
          "गुण स्वर संधि": "गुण संधि में अ + इ = ए बनता है, जबकि यहाँ 'ऐ' (दो मात्राएं) बन रहा है।"
        }
      },
      {
        "id": "hin-ss-9",
        "topicId": "hindi-sandhi-samas",
        "difficulty": 1.2,
        "text": "'राजपुत्र' (राजा का पुत्र) में कौन-सा समास है?",
        "options": [
          "अव्ययीभाव समास",
          "करण तत्पुरुष समास",
          "कर्मधारय समास",
          "संबंध तत्पुरुष समास"
        ],
        "correctAnswer": "संबंध तत्पुरुष समास",
        "explanation": "विग्रह करने पर संबंध कारक के विभक्ति चिह्न 'का' का लोप होता है, अतः यह संबंध तत्पुरुष समास है।",
        "misconceptions": {
          "कर्मधारय समास": "राजा और पुत्र में विशेषण-विशेष्य का संबंध नहीं है, संबंध कारक (का) का लोप है।"
        }
      },
      {
        "id": "hin-ss-10",
        "topicId": "hindi-sandhi-samas",
        "difficulty": 1.5,
        "text": "'निराहार' शब्द का सही संधि-विच्छेद क्या होगा?",
        "options": [
          "नि + राहारी",
          "निः + आहार",
          "निर् + आहार",
          "निरा + हार"
        ],
        "correctAnswer": "निः + आहार",
        "explanation": "विसर्ग के बाद स्वर आने पर विसर्ग का 'र्' में परिवर्तन हो जाता है (निः + आहार = निराहार, विसर्ग संधि)।",
        "misconceptions": {
          "निर् + आहार": "संस्कृत/हिंदी व्याकरण के विसर्ग संधि नियम के अनुसार मूल रूप 'निः' है।"
        }
      },
      {
        "id": "hin-ss-11",
        "topicId": "hindi-sandhi-samas",
        "difficulty": 1.8,
        "text": "'नीलकमल' (नीला है जो कमल) में कौन-सा समास है?",
        "options": [
          "तत्पुरुष समास",
          "कर्मधारय समास",
          "बहुव्रीहि समास",
          "द्विगु समास"
        ],
        "correctAnswer": "कर्मधारय समास",
        "explanation": "जिस समास में पहला पद विशेषण (नीला) और दूसरा पद विशेष्य (कमल) हो, उसे कर्मधारय समास कहते हैं।",
        "misconceptions": {
          "तत्पुरुष समास": "यहाँ कारक चिह्न का लोप नहीं है, बल्कि विशेषण-विशेष्य का भाव है।"
        }
      },
      {
        "id": "hin-ss-12",
        "topicId": "hindi-sandhi-samas",
        "difficulty": 2,
        "text": "'पवन' शब्द का सही संधि-विच्छेद क्या होगा?",
        "options": [
          "पाव + न",
          "पो + अन",
          "प + वन",
          "पौ + अन"
        ],
        "correctAnswer": "पो + अन",
        "explanation": "अयादि स्वर संधि के नियम से 'ओ' के बाद भिन्न स्वर आने पर 'ओ' का 'अव्' हो जाता है (पो + अन = पवन)।",
        "misconceptions": {
          "पौ + अन": "पौ + अक = पावक बनता है (औ का आव्), जबकि पवन में 'पो + अन' होगा।"
        }
      },
      {
        "id": "hin-ss-13",
        "topicId": "hindi-sandhi-samas",
        "difficulty": 2.2,
        "text": "'चतुर्मुख' (चार हैं मुख जिसके अर्थात् ब्रह्मा जी) में कौन-सा समास है?",
        "options": [
          "तत्पुरुष समास",
          "बहुव्रीहि समास",
          "द्विगु समास",
          "कर्मधारय समास"
        ],
        "correctAnswer": "बहुव्रीहि समास",
        "explanation": "पहला पद संख्यावाचक होने पर भी यदि तीसरा विशेष अर्थ (ब्रह्मा जी) निकले, तो बहुव्रीहि समास मान्य होता है।",
        "misconceptions": {
          "द्विगु समास": "यद्यपि 'चतुर्' संख्या है, परंतु यह ब्रह्मा जी के लिए रूढ़ हो चुका है, इसलिए बहुव्रीहि माना जाएगा।"
        }
      },
      {
        "id": "hin-ss-14",
        "topicId": "hindi-sandhi-samas",
        "difficulty": 2.3,
        "text": "'सज्जन' शब्द का शुद्ध संधि-विच्छेद चुनिए:",
        "options": [
          "सत् + जन",
          "सज + जन",
          "सद् + जन",
          "सत + जान"
        ],
        "correctAnswer": "सत् + जन",
        "explanation": "व्यंजन संधि के नियम से यदि 'त्' के बाद 'ज्' आए, तो 'त्' भी 'ज्' में बदल जाता है (सत् + जन = सज्जन)।",
        "misconceptions": {
          "सज + जन": "मूल संस्कृत उपसर्ग 'सत्' होता है, 'सज' नहीं।"
        }
      },
      {
        "id": "hin-ss-15",
        "topicId": "hindi-sandhi-samas",
        "difficulty": 2.4,
        "text": "'दशानन' शब्द में विग्रह के आधार पर कौन-से दो समास हो सकते हैं?",
        "options": [
          "केवल द्वन्द्व समास",
          "तत्पुरुष एवं कर्मधारय",
          "अव्ययीभाव एवं द्वन्द्व",
          "द्विगु समास (दस आननों का समूह) एवं बहुव्रीहि समास (दस हैं आनन जिसके अर्थात् रावण)"
        ],
        "correctAnswer": "द्विगु समास (दस आननों का समूह) एवं बहुव्रीहि समास (दस हैं आनन जिसके अर्थात् रावण)",
        "explanation": "संख्या समूह मानने पर द्विगु तथा रावण विशेष का अर्थ लेने पर बहुव्रीहि समास होता है।",
        "misconceptions": {
          "तत्पुरुष एवं कर्मधारय": "दशानन में तत्पुरुष का कारक लोप नहीं होता।"
        }
      },
      {
        "id": "hin-ss-16",
        "topicId": "hindi-sandhi-samas",
        "difficulty": 2.5,
        "text": "'जगदीश' शब्द का सही संधि-विच्छेद क्या होगा?",
        "options": [
          "जग + दीश",
          "जगत + ईश",
          "जगत् + ईश",
          "जगदीश + अ"
        ],
        "correctAnswer": "जगत् + ईश",
        "explanation": "व्यंजन संधि के नियमानुसार वर्ग के प्रथम वर्ण (त्) के बाद कोई स्वर आने पर वह अपने ही वर्ग के तीसरे वर्ण (द्) में बदल जाता है (जगत् + ईश = जगदीश)।",
        "misconceptions": {
          "जगत + ईश": "संस्कृत व्याकरण में हलन्त 'त्' (जगत्) शुद्ध मूल पद है।"
        }
      },
      {
        "id": "hin-ss-17",
        "topicId": "hindi-sandhi-samas",
        "difficulty": 2.5,
        "text": "'मनोरथ' का सही संधि-विच्छेद क्या है?",
        "options": [
          "मनः + रथ",
          "मन + रथ",
          "मनो + रथ",
          "मन् + ओरथ"
        ],
        "correctAnswer": "मनः + रथ",
        "explanation": "विसर्ग संधि के नियम से विसर्ग के पूर्व 'अ' और बाद में घोष वर्ण 'र्' होने पर विसर्ग 'ओ' में बदल जाता है (मनः + रथ = मनोरथ)।",
        "misconceptions": {
          "मनो + रथ": "'मनो' कोई स्वतंत्र मूल पद नहीं है; विसर्ग संधि का विकार 'मनः' से होता है।"
        }
      }
    ]
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
    "items": [
      {
        "id": "hin-sv-1",
        "topicId": "hindi-shabd-vichar",
        "difficulty": -2.1,
        "text": "'अपमान' शब्द में कौन-सा उपसर्ग प्रयुक्त हुआ है?",
        "options": [
          "अ",
          "अपम",
          "अप",
          "मान"
        ],
        "correctAnswer": "अप",
        "explanation": "'अप' उपसर्ग का अर्थ 'बुरा' या 'विपरीत' होता है। मान में अप लगने से अपमान बना।",
        "misconceptions": {
          "मान": "'मान' मूल शब्द है, उपसर्ग शब्द के प्रारंभ में जुड़ने वाला शब्दांश (अप) है।"
        }
      },
      {
        "id": "hin-sv-2",
        "topicId": "hindi-shabd-vichar",
        "difficulty": -1.7,
        "text": "'मिठास' शब्द में किस प्रत्यय का प्रयोग हुआ है?",
        "options": [
          "ठास",
          "आस",
          "मीठा",
          "स"
        ],
        "correctAnswer": "आस",
        "explanation": "'मीठा' विशेषण में भाववाचक तद्धित प्रत्यय 'आस' जोड़ने पर 'मिठास' बनता है।",
        "misconceptions": {
          "मीठा": "'मीठा' मूल शब्द है, प्रत्यय अंत में लगने वाला शब्दांश (आस) है।"
        }
      },
      {
        "id": "hin-sv-3",
        "topicId": "hindi-shabd-vichar",
        "difficulty": -1.3,
        "text": "निम्नलिखित में से कौन-सा शब्द 'सूर्य' का पर्यायवाची शब्द नहीं है?",
        "options": [
          "निशाकर",
          "दिनकर",
          "रवि",
          "भास्कर"
        ],
        "correctAnswer": "निशाकर",
        "explanation": "'निशाकर' (रात करने वाला) चंद्रमा का पर्यायवाची है, सूर्य का नहीं। दिनकर, रवि, और भास्कर सूर्य के पर्यायवाची हैं।",
        "misconceptions": {
          "दिनकर": "दिनकर सूर्य का ही पर्यायवाची है (दिन करने वाला)।"
        }
      },
      {
        "id": "hin-sv-4",
        "topicId": "hindi-shabd-vichar",
        "difficulty": -0.9,
        "text": "'आकाश' शब्द का सही विलोम शब्द क्या है?",
        "options": [
          "धरती",
          "पाताल",
          "अम्बर",
          "गगन"
        ],
        "correctAnswer": "पाताल",
        "explanation": "आकाश का विलोम पाताल होता है। अम्बर और गगन इसके पर्यायवाची हैं।",
        "misconceptions": {
          "अम्बर": "अम्बर तो आकाश का समानार्थी (पर्यायवाची) शब्द है।"
        }
      },
      {
        "id": "hin-sv-5",
        "topicId": "hindi-shabd-vichar",
        "difficulty": -0.5,
        "text": "मुहावरे 'अंगूठा दिखाना' का सही अर्थ क्या है?",
        "options": [
          "मदद के लिए तैयार होना",
          "ताली बजाना",
          "साफ़ इनकार करना या मना कर देना",
          "अंगूठे पर चोट लगना"
        ],
        "correctAnswer": "साफ़ इनकार करना या मना कर देना",
        "explanation": "'अंगूठा दिखाना' मुहावरे का भावार्थ समय पर किसी काम के लिए साफ़ मना कर देना होता है।",
        "misconceptions": {
          "मदद के लिए तैयार होना": "इसका उल्टा अर्थ है; अंगूठा दिखाने का अर्थ धोखा देना या मना करना है।"
        }
      },
      {
        "id": "hin-sv-6",
        "topicId": "hindi-shabd-vichar",
        "difficulty": 0.1,
        "text": "'अग्नि' तत्सम शब्द का सही तद्भव रूप क्या है?",
        "options": [
          "अनल",
          "पावक",
          "आग",
          "ज्वाला"
        ],
        "correctAnswer": "आग",
        "explanation": "संस्कृत शब्द 'अग्नि' का समय के साथ बदलकर सामान्य हिंदी में 'आग' (तद्भव) बन गया। पावक व अनल इसके पर्यायवाची हैं।",
        "misconceptions": {
          "पावक": "पावक भी संस्कृत (तत्सम) शब्द ही है, तद्भव रूप 'आग' है।"
        }
      },
      {
        "id": "hin-sv-7",
        "topicId": "hindi-shabd-vichar",
        "difficulty": 0.5,
        "text": "'जो सब कुछ जानता हो' — इस वाक्यांश के लिए एक उपयुक्त शब्द क्या है?",
        "options": [
          "अल्पज्ञ",
          "बहुज्ञ",
          "सर्वज्ञ",
          "अज्ञ"
        ],
        "correctAnswer": "सर्वज्ञ",
        "explanation": "सर्व (सब) + ज्ञ (जानने वाला) = सर्वज्ञ। अल्पज्ञ का अर्थ कम जानने वाला होता है।",
        "misconceptions": {
          "अल्पज्ञ": "अल्पज्ञ का अर्थ 'बहुत कम जानने वाला' होता है।"
        }
      },
      {
        "id": "hin-sv-8",
        "topicId": "hindi-shabd-vichar",
        "difficulty": 0.8,
        "text": "मुहावरे 'दाल में कुछ काला होना' का क्या अर्थ है?",
        "options": [
          "भोजन स्वादिष्ट न होना",
          "दाल जल जाना",
          "किसी बात पर शक या गड़बड़ होना",
          "दाल में कंकड़ पड़ना"
        ],
        "correctAnswer": "किसी बात पर शक या गड़बड़ होना",
        "explanation": "'दाल में कुछ काला होना' का सांकेतिक अर्थ किसी स्थिति में कुछ रहस्य या गड़बड़ी का संदेह होना है।",
        "misconceptions": {
          "दाल में कंकड़ पड़ना": "मुहावरे का शाब्दिक अर्थ नहीं, लाक्षणिक अर्थ लिया जाता है।"
        }
      },
      {
        "id": "hin-sv-9",
        "topicId": "hindi-shabd-vichar",
        "difficulty": 1.2,
        "text": "'अनुराग' शब्द का सही विलोम शब्द क्या होगा?",
        "options": [
          "द्वेष",
          "राग",
          "प्रेम",
          "विराग"
        ],
        "correctAnswer": "विराग",
        "explanation": "अनुराग का अर्थ प्रेम/लगाव होता है, और इसका सटीक विलोम विराग (उदासीनता/वैराग्य) है।",
        "misconceptions": {
          "द्वेष": "द्वेष राग या प्रेम का विरोधी भाव है, परंतु व्याकरणिक दृष्टि से अनुराग का विलोम 'विराग' है।"
        }
      },
      {
        "id": "hin-sv-10",
        "topicId": "hindi-shabd-vichar",
        "difficulty": 1.5,
        "text": "'परोपकार' शब्द में कौन-सा उपसर्ग लगा है?",
        "options": [
          "परा",
          "प्र",
          "परो",
          "पर"
        ],
        "correctAnswer": "पर",
        "explanation": "पर (दूसरों का) + उपकार = परोपकार (गुण संधि से ओ बना)। अतः मूल उपसर्ग 'पर' है।",
        "misconceptions": {
          "परा": "'परा' का अर्थ विपरीत/पीछे होता है (जैसे पराजय)। यहाँ 'पर' उपसर्ग है।"
        }
      },
      {
        "id": "hin-sv-11",
        "topicId": "hindi-shabd-vichar",
        "difficulty": 1.8,
        "text": "निम्नलिखित में से तत्सम शब्द चुनिए:",
        "options": [
          "हवा",
          "दूध",
          "घी",
          "दुग्ध"
        ],
        "correctAnswer": "दुग्ध",
        "explanation": "'दुग्ध' संस्कृत का मूल शब्द है जो बिना किसी परिवर्तन के हिंदी में प्रयुक्त होता है (तत्सम)। इसका तद्भव 'दूध' है।",
        "misconceptions": {
          "दूध": "'दूध' तद्भव शब्द है जो 'दुग्ध' से विकसित हुआ है।"
        }
      },
      {
        "id": "hin-sv-12",
        "topicId": "hindi-shabd-vichar",
        "difficulty": 2,
        "text": "लोकोक्ति 'नाच न जाने आँगन टेढ़ा' का सही अर्थ क्या है?",
        "options": [
          "अपनी कमी या अयोग्यता छुपाने के लिए दूसरों या साधनों में दोष निकालना",
          "नृत्य न कर पाना",
          "सुंदर नृत्य करना",
          "आँगन का टेढ़ा होना"
        ],
        "correctAnswer": "अपनी कमी या अयोग्यता छुपाने के लिए दूसरों या साधनों में दोष निकालना",
        "explanation": "जब कोई व्यक्ति अपनी अकुशलता को स्वीकार न करके परिस्थितियों को दोष देता है, तब यह लोकोक्ति कही जाती है।",
        "misconceptions": {
          "आँगन का टेढ़ा होना": "लोकोक्ति का लोक-प्रसिद्ध लाक्षणिक अर्थ लिया जाता है, शाब्दिक नहीं।"
        }
      },
      {
        "id": "hin-sv-13",
        "topicId": "hindi-shabd-vichar",
        "difficulty": 2.2,
        "text": "'लौकिक' शब्द में किस प्रत्यय का प्रयोग हुआ है?",
        "options": [
          "क",
          "किक",
          "इक",
          "ईक"
        ],
        "correctAnswer": "इक",
        "explanation": "लोक + इक = लौकिक। 'इक' प्रत्यय लगने से प्रथम स्वर 'ओ' का वृद्धि होकर 'औ' हो जाता है।",
        "misconceptions": {
          "किक": "प्रत्यय 'इक' है, 'किक' नहीं। क लोक के अंत में पहले से मौजूद है।"
        }
      },
      {
        "id": "hin-sv-14",
        "topicId": "hindi-shabd-vichar",
        "difficulty": 2.3,
        "text": "'कनक' शब्द का अनेकार्थी युग्म कौन-सा सही है?",
        "options": [
          "फल और फूल",
          "चांदी और गेहूं",
          "सोना और धतूरा",
          "लोहा और तांबा"
        ],
        "correctAnswer": "सोना और धतूरा",
        "explanation": "'कनक-कनक ते सौ गुनी' दोहे में कनक का एक अर्थ 'सोना' (स्वर्ण) और दूसरा अर्थ 'धतूरा' (नशीला फल) है।",
        "misconceptions": {
          "चांदी और गेहूं": "कनक का गेहूं भी एक अर्थ होता है, पर मुख्य प्रसिद्ध अनेकार्थी जोड़ा सोना और धतूरा है।"
        }
      },
      {
        "id": "hin-sv-15",
        "topicId": "hindi-shabd-vichar",
        "difficulty": 2.4,
        "text": "मुहावरा 'दाँतों तले उँगली दबाना' का सही भावार्थ क्या है?",
        "options": [
          "क्रोध में कांपना",
          "आश्चर्यचकित या दंग रह जाना",
          "उँगली कट जाना",
          "दाँत में दर्द होना"
        ],
        "correctAnswer": "आश्चर्यचकित या दंग रह जाना",
        "explanation": "किसी अत्यंत अद्भुत या अकल्पनीय कार्य को देखकर चकित रह जाने पर इस मुहावरे का प्रयोग किया जाता है।",
        "misconceptions": {
          "क्रोध में कांपना": "क्रोध के लिए 'दाँत पीसना' या 'आग-बबूला होना' मुहावरा होता है।"
        }
      },
      {
        "id": "hin-sv-16",
        "topicId": "hindi-shabd-vichar",
        "difficulty": 2.5,
        "text": "'उन्मेष' शब्द में कौन-सा उपसर्ग प्रयुक्त है?",
        "options": [
          "उत्",
          "उन्",
          "उ",
          "उद्"
        ],
        "correctAnswer": "उत्",
        "explanation": "व्यंजन संधि के नियमानुसार 'उत् + मेष' में 'त्' का अनुनासिक वर्ण के प्रभाव से 'न्' में परिवर्तन होकर 'उन्मेष' बनता है।",
        "misconceptions": {
          "उन्": "संस्कृत में मूल उपसर्ग 'उत्' होता है, 'उन्' नहीं।"
        }
      },
      {
        "id": "hin-sv-17",
        "topicId": "hindi-shabd-vichar",
        "difficulty": 2.5,
        "text": "निम्नलिखित में से शुद्ध वर्तनी वाला शब्द चुनिए:",
        "options": [
          "उज्वल्य",
          "उज्जवल",
          "उज्वल",
          "उज्ज्वल"
        ],
        "correctAnswer": "उज्ज्वल",
        "explanation": "उत् + ज्वल = उज्ज्वल। इसमें दो बार आधा 'ज्' (ज् + ज् + व) आता है, जो व्याकरण की दृष्टि से शुद्ध है।",
        "misconceptions": {
          "उज्जवल": "उज्जवल में दूसरा 'ज' पूरा लिखा है जो अशुद्ध है; दोनों 'ज्' आधे होते हैं।"
        }
      }
    ]
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
    "items": [
      {
        "id": "san-sd-1",
        "topicId": "sanskrit-sandhi",
        "difficulty": -2.1,
        "text": "'देवालयः' इत्यस्य पदस्य शुद्धः सन्धि-विच्छेदः कः अस्ति?",
        "options": [
          "देव + आलयः",
          "देवाल + यः",
          "देव + लयः",
          "देवा + लयः"
        ],
        "correctAnswer": "देव + आलयः",
        "explanation": "'अकः सवर्णे दीर्घः' सूत्रेण 'देव' इत्यत्र अकारः तथा 'आलयः' इत्यत्र आकारः मिलित्वा दीर्घः (आ) भवति — देव + आलयः = देवालयः।",
        "misconceptions": {
          "देवा + लयः": "'देवा' तथा 'लयः' पृथक् रूपेण अर्थहीनौ स्तः, मूलपदम् 'देव' तथा 'आलयः' अस्ति।"
        }
      },
      {
        "id": "san-sd-2",
        "topicId": "sanskrit-sandhi",
        "difficulty": -1.7,
        "text": "'गणेशः' (गण + ईशः) इत्यत्र कः सन्धिः वर्तते?",
        "options": [
          "गुणसन्धिः",
          "दीर्घसन्धिः",
          "यण्सन्धिः",
          "वृद्धिसन्धिः"
        ],
        "correctAnswer": "गुणसन्धिः",
        "explanation": "'आद्गुणः' नियमेन अ + ई = ए भवति। अतः गण + ईशः = गणेशः (गुणसन्धिः)।",
        "misconceptions": {
          "दीर्घसन्धिः": "दीर्घसन्धौ समानस्वरयोः मेलनं भवति, अत्र भिन्नस्वरौ (अ + ई) मिलित्वा 'ए' रूपं धारयतः।"
        }
      },
      {
        "id": "san-sd-3",
        "topicId": "sanskrit-sandhi",
        "difficulty": -1.3,
        "text": "'इति + आदि' इत्यस्य सन्धियुक्तं पदं किम् भविष्यति?",
        "options": [
          "इतेयादि",
          "इत्यादि",
          "इतीआदि",
          "इत्यादी"
        ],
        "correctAnswer": "इत्यादि",
        "explanation": "'इको यणचि' सूत्रानुसारं इ/ई इत्यस्य स्थाने 'य्' भवति यदि परे असमानस्वरः स्यात्। अतः इति + आदि = इत्यादि।",
        "misconceptions": {
          "इतीआदि": "सन्धौ स्वरयोः पृथक्करणं न भवति, विकारः आवश्यकः अस्ति।"
        }
      },
      {
        "id": "san-sd-4",
        "topicId": "sanskrit-sandhi",
        "difficulty": -0.8,
        "text": "'विद्या + आलयः' इत्यत्र कः सन्धि-नियमः प्रवर्तते?",
        "options": [
          "वृद्धिरेचि",
          "आद्गुणः",
          "इको यणचि",
          "अकः सवर्णे दीर्घः"
        ],
        "correctAnswer": "अकः सवर्णे दीर्घः",
        "explanation": "सवर्णयोः स्वरयोः (आ + आ) स्थाने एकः दीर्घस्वरः (आ) भवति।",
        "misconceptions": {
          "आद्गुणः": "आद्गुणः सूत्रेण अ/आ परे इ/उ/ऋ आगमने गुणः (ए, ओ, अर्) भवति।"
        }
      },
      {
        "id": "san-sd-5",
        "topicId": "sanskrit-sandhi",
        "difficulty": -0.4,
        "text": "'सूर्योदयः' (सूर्य + उदयः) इत्यत्र विकारः कः अस्ति?",
        "options": [
          "आ + उ = ऊ",
          "उ + अ = व",
          "अ + उ = औ",
          "अ + उ = ओ (गुणः)"
        ],
        "correctAnswer": "अ + उ = ओ (गुणः)",
        "explanation": "'सूर्य' पदस्य अन्ते विद्यमानः 'अ' तथा 'उदयः' पदस्य 'उ' मिलित्वा 'ओ' गुणं प्राप्नुतः।",
        "misconceptions": {
          "अ + उ = औ": "अ + उ मिलित्वा 'ओ' भवति, 'औ' वृद्धि-सन्धौ भवति।"
        }
      },
      {
        "id": "san-sd-6",
        "topicId": "sanskrit-sandhi",
        "difficulty": 0.1,
        "text": "'अद्य + एव' इत्यस्य शुद्धं सन्धिरूपं किम्?",
        "options": [
          "अद्यैव",
          "अद्याव",
          "अद्येव",
          "अदयैव"
        ],
        "correctAnswer": "अद्यैव",
        "explanation": "'वृद्धिरेचि' सूत्रेण अ/आ इत्यनन्तरम् ए/ऐ आगमने 'ऐ' वृद्धिः भवति (अद्य + एव = अद्यैव)।",
        "misconceptions": {
          "अद्येव": "अद्येव रूपम् अशुद्धम् अस्ति, वृद्धि-सन्धौ 'ऐ' (द्विमात्रिकः) भवति।"
        }
      },
      {
        "id": "san-sd-7",
        "topicId": "sanskrit-sandhi",
        "difficulty": 0.5,
        "text": "'सु + आगतम्' इत्यस्य सन्धियुक्तं पदं किम्?",
        "options": [
          "स्वागतम्",
          "सोवागतम्",
          "स्वागता",
          "सुवागतम्"
        ],
        "correctAnswer": "स्वागतम्",
        "explanation": "'इको यणचि' नियमेन उ/ऊ स्थाने 'व्' आदेशः भवति परे असमानस्वरे सति (स् + व् + आगतम् = स्वागतम्)।",
        "misconceptions": {
          "सुवागतम्": "उकारस्य स्थाने 'व्' आदेशः भवति, न तु उकारस्य लोपः विना परिवर्तनम्।"
        }
      },
      {
        "id": "san-sd-8",
        "topicId": "sanskrit-sandhi",
        "difficulty": 0.9,
        "text": "'ने + अनम्' इत्यस्य अयादि-सन्धौ किं रूपं भवति?",
        "options": [
          "नेयनम्",
          "नयनम्",
          "नानम्",
          "नायानम्"
        ],
        "correctAnswer": "नयनम्",
        "explanation": "'एचोऽयवायावः' सूत्रेण 'ए' इत्यस्य स्थाने 'अय' आदेशः भवति (न् + अय् + अनम् = नयनम्)।",
        "misconceptions": {
          "नेयनम्": "एकारस्य स्थाने 'अय' आदेशः भवति, एकारः अवशिष्टः न तिष्ठति।"
        }
      },
      {
        "id": "san-sd-9",
        "topicId": "sanskrit-sandhi",
        "difficulty": 1.2,
        "text": "'कवीन्द्रः' पदस्य शुद्धः सन्धि-विच्छेदः कः स्यात्?",
        "options": [
          "कवि + इन्द्रः",
          "कव + इन्द्रः",
          "कवी + इन्द्रः",
          "कवि + ईन्द्रः"
        ],
        "correctAnswer": "कवि + इन्द्रः",
        "explanation": "ह्रस्व 'इ' + ह्रस्व 'इ' मिलित्वा दीर्घ 'ई' भवति (कवि + इन्द्रः = कवीन्द्रः, दीर्घसन्धिः)।",
        "misconceptions": {
          "कवी + इन्द्रः": "मूलपदं ह्रस्वकारान्तम् 'कवि' अस्ति, 'कवी' न।"
        }
      },
      {
        "id": "san-sd-10",
        "topicId": "sanskrit-sandhi",
        "difficulty": 1.5,
        "text": "'महोत्सवः' पदस्य सन्धि-विच्छेदः किम् अस्ति?",
        "options": [
          "महा + ओत्सवः",
          "महो + त्सवः",
          "महा + उत्सवः",
          "मह + उत्सवः"
        ],
        "correctAnswer": "महा + उत्सवः",
        "explanation": "महा (आ) + उत्सवः (उ) = महोत्सवः (गुण स्वर सन्धिः)।",
        "misconceptions": {
          "मह + उत्सवः": "संस्कृतभाषायां सार्थकं पदं 'महा' वर्तते, 'मह' न।"
        }
      },
      {
        "id": "san-sd-11",
        "topicId": "sanskrit-sandhi",
        "difficulty": 1.8,
        "text": "'हरे + अव' इत्यस्य पूर्वरूपसन्धौ किं रूपं निष्पद्यते?",
        "options": [
          "हराव",
          "हरेऽव",
          "हर्याव",
          "हरेव"
        ],
        "correctAnswer": "हरेऽव",
        "explanation": "'एङः पदान्तादति' सूत्रेण पदान्त-एकारात् परे ह्रस्व-अकारस्य पूर्वरूपं (ऽ अवग्रहचिह्नम्) भवति।",
        "misconceptions": {
          "हराव": "पूर्वरूपसन्धौ एकारः यथावत् तिष्ठति तथा अकारस्य स्थाने अवग्रहः (ऽ) आगच्छति।"
        }
      },
      {
        "id": "san-sd-12",
        "topicId": "sanskrit-sandhi",
        "difficulty": 2,
        "text": "'पौ + अकः' इत्यस्य अयादि-सन्धौ किं पदं सिद्ध्यति?",
        "options": [
          "पाविकः",
          "पवकः",
          "पोवकः",
          "पावकः"
        ],
        "correctAnswer": "पावकः",
        "explanation": "'औ' इत्यस्य स्थाने 'आव्' आदेशः भवति (प् + आव् + अकः = पावकः अर्थात् अग्निः)।",
        "misconceptions": {
          "पवकः": "ओकारस्य 'अव्' भवति (पो + अन = पवन), औकारस्य 'आव्' भवति (पौ + अक = पावक)।"
        }
      },
      {
        "id": "san-sd-13",
        "topicId": "sanskrit-sandhi",
        "difficulty": 2.2,
        "text": "'मातृ + उपदेशः' इत्यस्य यण्-सन्धौ किं रूपं भवति?",
        "options": [
          "मातोपदेशः",
          "मात्रोपदेशः",
          "मात्रुपदेशः",
          "मातृपदेशः"
        ],
        "correctAnswer": "मात्रुपदेशः",
        "explanation": "ऋकारस्य स्थाने 'र्' आदेशः भवति: त् + र् + उ = त्रु (मातृ + उपदेशः = मात्रुपदेशः)।",
        "misconceptions": {
          "मात्रोपदेशः": "गुणसन्धौ 'ओ' भवति, अत्र यण्सन्धौ ऋकारस्य 'र्' आदेशः भवति।"
        }
      },
      {
        "id": "san-sd-14",
        "topicId": "sanskrit-sandhi",
        "difficulty": 2.3,
        "text": "'तथैव' इत्यस्य शुद्धः सन्धि-विच्छेदः कः वर्तते?",
        "options": [
          "तथा + ऐव",
          "तथा + एव",
          "तथ + एव",
          "तथै + व"
        ],
        "correctAnswer": "तथा + एव",
        "explanation": "तथा (आ) + एव (ए) = तथैव (वृद्धिरेचि सूत्रेण वृद्धि सन्धिः)।",
        "misconceptions": {
          "तथा + ऐव": "मूलमव्ययपदं 'एव' भवति, 'ऐव' न।"
        }
      },
      {
        "id": "san-sd-15",
        "topicId": "sanskrit-sandhi",
        "difficulty": 2.4,
        "text": "'सत् + चित् + आनन्दः' इत्यस्य समस्त-सन्धिपदं किम्?",
        "options": [
          "सच्चित्आनन्दः",
          "सतचिदानन्दः",
          "सच्चिदानन्दः",
          "सदानन्दः"
        ],
        "correctAnswer": "सच्चिदानन्दः",
        "explanation": "सत् + चित् = सच्चित् (श्चुत्व सन्धिः), ततः चित् + आनन्दः = चिदानन्दः (जश्त्व सन्धिः) => सच्चिदानन्दः।",
        "misconceptions": {
          "सतचिदानन्दः": "त् इत्यस्य च् तथा द् रूपेण विकारः अनिवार्यः अस्ति।"
        }
      },
      {
        "id": "san-sd-16",
        "topicId": "sanskrit-sandhi",
        "difficulty": 2.5,
        "text": "'नमस्ते' पदस्य शुद्धः विसर्ग-सन्धि-विच्छेदः कः?",
        "options": [
          "नमो + ते",
          "नमस् + ते",
          "नम + स्ते",
          "नमः + ते"
        ],
        "correctAnswer": "नमः + ते",
        "explanation": "'विसर्जनीयस्य सः' सूत्रेण खर्-प्रत्याहारे (त्) परे विसर्गस्य स्थाने सकारः (स्) भवति (नमः + ते = नमस्ते)।",
        "misconceptions": {
          "नमस् + ते": "विच्छेद-काले मूलविसर्गरूपं 'नमः' प्रयुज्यते।"
        }
      },
      {
        "id": "san-sd-17",
        "topicId": "sanskrit-sandhi",
        "difficulty": 2.5,
        "text": "'कोऽपि' पदस्य सन्धि-विच्छेदः कः अस्ति?",
        "options": [
          "कः + अपि",
          "को + अपि",
          "क + अपि",
          "कस् + अपि"
        ],
        "correctAnswer": "कः + अपि",
        "explanation": "कः + अपि इत्यत्र उत्व-सन्धौ 'ओ' भूत्वा पूर्वरूपेण अवग्रहः (ऽ) भवति => कोऽपि।",
        "misconceptions": {
          "को + अपि": "'को' इति स्वतन्त्रपदं नास्ति, विसर्गात् उत्वे सति 'ओ' रूपं जायते।"
        }
      }
    ]
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
    "items": [
      {
        "id": "san-sdh-1",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": -2.1,
        "text": "'बालक' शब्दस्य तृतीया-विभक्तौ एकवचने किं रूपं भवति?",
        "options": [
          "बालकाय",
          "बालकात्",
          "बालकेन",
          "बालकस्य"
        ],
        "correctAnswer": "बालकेन",
        "explanation": "अकारान्त-पुंल्लिङ्ग 'बालक' शब्दस्य तृतीया-एकवचने रूपं 'बालकेन' (बालक के द्वारा / से) भवति।",
        "misconceptions": {
          "बालकाय": "'बालकाय' चतुर्थी विभक्तिः अस्ति (बालक के लिए)।"
        }
      },
      {
        "id": "san-sdh-2",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": -1.7,
        "text": "'पठ्' धातोः लट्-लकारे प्रथम-पुरुषस्य बहुवचने किं रूपं स्यात्?",
        "options": [
          "पठथ",
          "पठन्ति",
          "पठामः",
          "पठति"
        ],
        "correctAnswer": "पठन्ति",
        "explanation": "लट् लकारे प्रथमपुरुष-रूपाणि: पठति, पठतः, पठन्ति (वे सब पढ़ते हैं)।",
        "misconceptions": {
          "पठति": "'पठति' एकवचनं वर्तते, न तु बहुवचनम्।"
        }
      },
      {
        "id": "san-sdh-3",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": -1.3,
        "text": "'लता' आकारान्त-स्त्रीलिङ्ग-शब्दस्य प्रथमा-विभक्तौ बहुवचने किं रूपं भवति?",
        "options": [
          "लताः",
          "लताम्",
          "लते",
          "लतया"
        ],
        "correctAnswer": "लताः",
        "explanation": "लता, लते, लताः (प्रथमा विभक्तिः)। अतः बहुवचने 'लताः' भवति।",
        "misconceptions": {
          "लते": "'लते' द्विवचनं वर्तते (दो लताएँ)।"
        }
      },
      {
        "id": "san-sdh-4",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": -0.8,
        "text": "'गम्' (गच्छ्) धातोः भविष्यत्-काले (लृट्-लकारे) प्रथम-पुरुषस्य एकवचने रूपं किम्?",
        "options": [
          "अगच्छत्",
          "गमिष्यति",
          "गच्छतु",
          "गच्छति"
        ],
        "correctAnswer": "गमिष्यति",
        "explanation": "लृट् लकारे गम् धातोः मूलरूपेण सह 'गमिष्यति' रूपं सिद्ध्यति।",
        "misconceptions": {
          "गच्छति": "'गच्छति' लट् लकारः (वर्तमानकालः) अस्ति।"
        }
      },
      {
        "id": "san-sdh-5",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": -0.4,
        "text": "'फल' नपुंसकलिङ्ग-शब्दस्य प्रथमा तथा द्वितीया विभक्तयोः एकवचने किं रूपं भवति?",
        "options": [
          "फलम्",
          "फलात्",
          "फलस्य",
          "फलेन"
        ],
        "correctAnswer": "फलम्",
        "explanation": "फलम्, फले, फलानि — नपुंसकलिङ्गे प्रथमा-द्वितीया विभक्त्योः रूपाणि समानानि भवन्ति।",
        "misconceptions": {
          "फलेन": "'फलेन' तृतीया विभक्तिः अस्ति।"
        }
      },
      {
        "id": "san-sdh-6",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": 0.1,
        "text": "'अस्मद्' (अहम्) सर्वनामशब्दस्य षष्ठी-एकवचने किं रूपं भवति?",
        "options": [
          "मम",
          "माम्",
          "मह्यम्",
          "मया"
        ],
        "correctAnswer": "मम",
        "explanation": "मम (मेरा / मेरी) — षष्ठी एकवचने रूपं भवति। माम् (द्वितीया), मया (तृतीया), मह्यम् (चतुर्थी)।",
        "misconceptions": {
          "मह्यम्": "'मह्यम्' चतुर्थी विभक्तिः अस्ति (मुझको / मेरे लिए)।"
        }
      },
      {
        "id": "san-sdh-7",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": 0.5,
        "text": "'लिख्' धातोः भूतकाले (लङ्-लकारे) प्रथम-पुरुषस्य एकवचने रूपं किम्?",
        "options": [
          "लिखति",
          "अलिखत्",
          "अलिखताम्",
          "अलिखन्"
        ],
        "correctAnswer": "अलिखत्",
        "explanation": "लङ् लकारे भूतकाल-द्योतनाय धातोः पूर्वम् 'अ' योज्यते: अलिखत्, अलिखताम्, अलिखन्।",
        "misconceptions": {
          "अलिखन्": "'अलिखन्' बहुवचनं वर्तते।"
        }
      },
      {
        "id": "san-sdh-8",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": 0.9,
        "text": "'मुनि' इकारान्त-पुंल्लिङ्ग-शब्दस्य पञ्चमी तथा षष्ठी विभक्त्योः एकवचने किं रूपं भवति?",
        "options": [
          "मुनेः",
          "मुनये",
          "मुनिना",
          "मुनौ"
        ],
        "correctAnswer": "मुनेः",
        "explanation": "मुनि शब्दस्य पञ्चमी-षष्ठी एकवचने 'मुनेः' रूपं भवति।",
        "misconceptions": {
          "मुनये": "'मुनये' चतुर्थी विभक्तिः एकवचनं वर्तते।"
        }
      },
      {
        "id": "san-sdh-9",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": 1.2,
        "text": "'कृ' (करणे) धातोः लट्-लकारे प्रथम-पुरुषस्य बहुवचने किं रूपं भवति?",
        "options": [
          "कुरुतः",
          "करिष्यन्ति",
          "कुर्वन्ति",
          "करोति"
        ],
        "correctAnswer": "कुर्वन्ति",
        "explanation": "कृ धातोः लट् लकारे रूपाणि: करोति (एकवचनम्), कुरुतः (द्विवचनम्), कुर्वन्ति (बहुवचनम्)।",
        "misconceptions": {
          "करोति": "'करोति' एकवचनं रूपम् अस्ति।"
        }
      },
      {
        "id": "san-sdh-10",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": 1.5,
        "text": "'युष्मद्' (त्वम्) सर्वनामशब्दस्य तृतीया-एकवचने रूपं किम् अस्ति?",
        "options": [
          "तुभ्यम्",
          "त्वया",
          "तव",
          "त्वाम्"
        ],
        "correctAnswer": "त्वया",
        "explanation": "त्वया (तेरे द्वारा) — युष्मद् शब्दस्य तृतीया एकवचनम्। तवा (षष्ठी), तुभ्यम् (चतुर्थी)।",
        "misconceptions": {
          "तव": "'तव' षष्ठी विभक्तिः अस्ति (तेरा/तेरी)।"
        }
      },
      {
        "id": "san-sdh-11",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": 1.8,
        "text": "'भू' (भव्) धातोः आज्ञार्थे (लोट्-लकारे) मध्यम-पुरुषस्य एकवचने किं रूपं भवति?",
        "options": [
          "भवताम्",
          "भव",
          "भवतु",
          "भवेत्"
        ],
        "correctAnswer": "भव",
        "explanation": "लोट् लकारे मध्यमपुरुष-रूपाणि: भव, भवतम्, भवत (यथा: त्वं विजयी भव)।",
        "misconceptions": {
          "भवतु": "'भवतु' प्रथमपुरुष-एकवचनं रूपम् अस्ति।"
        }
      },
      {
        "id": "san-sdh-12",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": 2,
        "text": "'नदी' ईकारान्त-स्त्रीलिङ्ग-शब्दस्य द्वितीया-विभक्तौ बहुवचने किं रूपं भवति?",
        "options": [
          "नद्यः",
          "नदीम्",
          "नदीभिः",
          "नदीः"
        ],
        "correctAnswer": "नदीः",
        "explanation": "द्वितीया विभक्तौ रूपाणि: नदीम्, नद्यौ, नदीः। अतः बहुवचने 'नदीः' रूपं सिद्ध्यति।",
        "misconceptions": {
          "नद्यः": "'नद्यः' प्रथमा-बहुवचनं रूपं वर्तते, द्वितीयायां 'नदीः' भवति।"
        }
      },
      {
        "id": "san-sdh-13",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": 2.2,
        "text": "'पठ्' धातोः चाहिए/प्रेरणार्थे (विधिलिङ्-लकारे) प्रथम-पुरुषस्य एकवचने रूपं किम्?",
        "options": [
          "पठेयुः",
          "पठेत्",
          "पठेताम्",
          "पठतु"
        ],
        "correctAnswer": "पठेत्",
        "explanation": "विधिलिङ् लकारे प्रथमपुरुषे रूपाणि: पठेत् (एकवचनम्), पठेताम् (द्विवचनम्), पठेयुः (बहुवचनम्)।",
        "misconceptions": {
          "पठतु": "'पठतु' लोट् लकारस्य रूपम् अस्ति।"
        }
      },
      {
        "id": "san-sdh-14",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": 2.3,
        "text": "'अस्मद्' सर्वनामशब्दस्य चतुर्थी-विभक्तौ बहुवचने किं रूपं भवति?",
        "options": [
          "अस्माकम्",
          "आवाभ्याम्",
          "अस्मभ्यम्",
          "मह्यम्"
        ],
        "correctAnswer": "अस्मभ्यम्",
        "explanation": "चतुर्थी विभक्तौ: मह्यम् (एकवचनम्), आवाभ्याम् (द्विवचनम्), अस्मभ्यम् (बहुवचनम् - हम सबके लिए)।",
        "misconceptions": {
          "अस्माकम्": "'अस्माकम्' षष्ठी-बहुवचनं रूपं वर्तते (हमारा)।"
        }
      },
      {
        "id": "san-sdh-15",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": 2.4,
        "text": "'बालक' शब्दस्य सप्तमी-विभक्तौ बहुवचने शुद्धं रूपं किम्?",
        "options": [
          "बालकेषु",
          "बालकानाम्",
          "बालकैः",
          "बालकेसु"
        ],
        "correctAnswer": "बालकेषु",
        "explanation": "'इण्कोः' नियमेन एकारात् परे मूर्धन्य-षकारः (षु) भवति, अतः 'बालकेषु' रूपं सिद्ध्यति।",
        "misconceptions": {
          "बालकेसु": "दन्त्य-सकारः अशुद्धः अस्ति, एकारस्य प्रभावेन मूर्धन्य 'षु' भवति।"
        }
      },
      {
        "id": "san-sdh-16",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": 2.5,
        "text": "'दृश्' (पश्य्) धातोः लट्-लकारे उत्तम-पुरुषस्य एकवचने किं रूपं भवति?",
        "options": [
          "दृश्यामि",
          "पश्यति",
          "द्रक्ष्यामि",
          "पश्यामि"
        ],
        "correctAnswer": "पश्यामि",
        "explanation": "दृश् धातोः लट् लकारे 'पश्य्' आदेशः भवति: पश्यामि (मैं देखता हूँ)।",
        "misconceptions": {
          "दृश्यामि": "लट् लकारे धातोः मूलरूपेण 'दृश्यामि' न भवति, 'पश्य्' आदेशः आवश्यकः।"
        }
      },
      {
        "id": "san-sdh-17",
        "topicId": "sanskrit-shabd-dhatu",
        "difficulty": 2.5,
        "text": "'तत्' (वह) पुंल्लिङ्ग-सर्वनामशब्दस्य प्रथमा-विभक्तेः रूपाणि कानि सन्ति?",
        "options": [
          "तत्, ते, तानि",
          "सः, तौ, ते",
          "तेन, ताभ्याम्, तैः",
          "सा, ते, ताः"
        ],
        "correctAnswer": "सः, तौ, ते",
        "explanation": "पुंल्लिङ्गे प्रथमा विभक्तौ: सः (वह), तौ (वे दोनों), ते (वे सब)।",
        "misconceptions": {
          "सा, ते, ताः": "इदं स्त्रीलिङ्गस्य प्रथमा-रूपम् अस्ति।"
        }
      }
    ]
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
    "items": [
      {
        "id": "san-pr-1",
        "topicId": "sanskrit-pratyaya",
        "difficulty": -2.1,
        "text": "'पठ् + क्त्वा' इत्यस्य मेलनेन किं पदं सिद्ध्यति?",
        "options": [
          "पठितुम्",
          "पठित्वा",
          "पठ्य",
          "पाठित्वा"
        ],
        "correctAnswer": "पठित्वा",
        "explanation": "'क्त्वा' प्रत्ययः भूतकालस्य पूर्वकालिक-क्रियायाम् (करके) प्रयुज्यते: पठ् + क्त्वा = पठित्वा (पढ़कर)।",
        "misconceptions": {
          "पठितुम्": "'पठितुम्' तुमुन् प्रत्ययेन भवति (पढ़ने के लिए)।"
        }
      },
      {
        "id": "san-pr-2",
        "topicId": "sanskrit-pratyaya",
        "difficulty": -1.7,
        "text": "'गम् + तुमुन्' इत्यनेन निष्पन्नं पदं किम्?",
        "options": [
          "गच्छितुम्",
          "गमितुम्",
          "गन्तुम्",
          "गत्वा"
        ],
        "correctAnswer": "गन्तुम्",
        "explanation": "'तुमुन्' प्रत्ययः के लिए (प्रयोजनार्थे) प्रयुज्यते: गम् + तुमुन् = गन्तुम् (जाने के लिए)।",
        "misconceptions": {
          "गमितुम्": "गम् धातोः मकारस्य नकारादेशः भवति, अतः 'गन्तुम्' शुद्धम्।"
        }
      },
      {
        "id": "san-pr-3",
        "topicId": "sanskrit-pratyaya",
        "difficulty": -1.3,
        "text": "यदि धातोः पूर्वम् उपसर्गः स्यात्, तदा 'क्त्वा' स्थाने कः प्रत्ययः प्रयुज्यते?",
        "options": [
          "तुमुन् प्रत्ययः",
          "शतृ प्रत्ययः",
          "ल्यप् प्रत्ययः",
          "क्त प्रत्ययः"
        ],
        "correctAnswer": "ल्यप् प्रत्ययः",
        "explanation": "'समासेऽनञ्पूर्वे क्त्वो ल्यप्' सूत्रेण उपसर्गयुक्ते धातौ क्त्वा प्रत्ययस्य स्थाने 'ल्यप्' (य) भवति।",
        "misconceptions": {
          "तुमुन् प्रत्ययः": "तुमुन् के लिए अर्थ में होता है, पूर्वकालिक क्रिया में उपसर्ग होने पर ल्यप् लगता है।"
        }
      },
      {
        "id": "san-pr-4",
        "topicId": "sanskrit-pratyaya",
        "difficulty": -0.8,
        "text": "'आ + गम् + ल्यप्' इत्यस्य संयुक्तं रूपं किं भवति?",
        "options": [
          "आगत्वा",
          "आगम्यम्",
          "आगन्तुम्",
          "आगत्य"
        ],
        "correctAnswer": "आगत्य",
        "explanation": "उपसर्गयुक्त 'आ + गम्' धातोः ल्यप् प्रत्ययेन 'आगत्य' (आकर) रूपं सिद्ध्यति।",
        "misconceptions": {
          "आगत्वा": "उपसर्ग होने पर क्त्वा नहीं लगता, ल्यप् लगता है, अतः आगत्वा अशुद्ध है।"
        }
      },
      {
        "id": "san-pr-5",
        "topicId": "sanskrit-pratyaya",
        "difficulty": -0.4,
        "text": "'सह' (साथ) इति उपपद-योगे का विभक्तिः प्रयुज्यते?",
        "options": [
          "चतुर्थी विभक्तिः",
          "द्वितीया विभक्तिः",
          "तृतीया विभक्तिः (यथा: रामेण सह)",
          "षष्ठी विभक्तिः"
        ],
        "correctAnswer": "तृतीया विभक्तिः (यथा: रामेण सह)",
        "explanation": "'सहयुक्तेऽप्रधाने' सूत्रेण सह, साकम्, सार्धम् इति शब्दानां योगे तृतीया विभक्तिः भवति।",
        "misconceptions": {
          "षष्ठी विभक्तिः": "यद्यपि हिन्दी भाषा में 'राम के साथ' (के) आता है, पर संस्कृत में उपपद नियमेन तृतीया लगती है।"
        }
      },
      {
        "id": "san-pr-6",
        "topicId": "sanskrit-pratyaya",
        "difficulty": 0.1,
        "text": "'नमः' (प्रणाम) इति उपपद-योगे का विभक्तिः भवति?",
        "options": [
          "पञ्चमी विभक्तिः",
          "तृतीया विभक्तिः",
          "चतुर्थी विभक्तिः (यथा: देवाय नमः)",
          "द्वितीया विभक्तिः"
        ],
        "correctAnswer": "चतुर्थी विभक्तिः (यथा: देवाय नमः)",
        "explanation": "'नमःस्वस्तिस्वाहास्वधाऽलंवषड्योगाच्च' सूत्रेण नमः योगे चतुर्थी विभक्तिः प्रयुज्यते (सूर्याय नमः, गणेशाय नमः)।",
        "misconceptions": {
          "द्वितीया विभक्तिः": "नमः पदस्य योगे उपपद-नियमानुसारं सर्वदा चतुर्थी एव भवति।"
        }
      },
      {
        "id": "san-pr-7",
        "topicId": "sanskrit-pratyaya",
        "difficulty": 0.5,
        "text": "'हस् + क्त्वा' इत्यस्य संयुक्तं रूपं किम् अस्ति?",
        "options": [
          "प्रहस्य",
          "हसित्वा",
          "हसितुम्",
          "हस्त्वा"
        ],
        "correctAnswer": "हसित्वा",
        "explanation": "हस् धातोः इट्-आगमेन सह क्त्वा प्रत्यये 'हसित्वा' (हँसकर) रूपं भवति।",
        "misconceptions": {
          "हस्त्वा": "हस् धातौ इट् (इ) का आगम होता है, अतः हसित्वा शुद्ध है।"
        }
      },
      {
        "id": "san-pr-8",
        "topicId": "sanskrit-pratyaya",
        "difficulty": 0.9,
        "text": "'दा + तुमुन्' इत्यनेन किं पदं निर्मीयते?",
        "options": [
          "दातुम्",
          "दायितुम्",
          "दत्वा",
          "देतुम्"
        ],
        "correctAnswer": "दातुम्",
        "explanation": "दा (देना) + तुमुन् (के लिए) = दातुम् (देने के लिए)।",
        "misconceptions": {
          "दत्वा": "'दत्वा' क्त्वा प्रत्यय से बनता है (देकर)।"
        }
      },
      {
        "id": "san-pr-9",
        "topicId": "sanskrit-pratyaya",
        "difficulty": 1.2,
        "text": "'वृक्षात् पत्रं पतति' अत्र 'वृक्षात्' पदे का विभक्तिः कस्मात् कारकात् च वर्तते?",
        "options": [
          "षष्ठी विभक्तिः (सम्बन्ध)",
          "तृतीया विभक्तिः (करण)",
          "द्वितीया विभक्तिः (कर्म)",
          "पञ्चमी विभक्तिः (अपादान कारकात्)"
        ],
        "correctAnswer": "पञ्चमी विभक्तिः (अपादान कारकात्)",
        "explanation": "'ध्रुवमपायेऽपादानम्' — अलग होने (पृथक्करणे) के अर्थ में अपादान कारक होकर पञ्चमी विभक्ति लगती है।",
        "misconceptions": {
          "तृतीया विभक्तिः (करण)": "करण कारक साधन के लिए होता है, अलग होने के लिए अपादान (पञ्चमी) होता है।"
        }
      },
      {
        "id": "san-pr-10",
        "topicId": "sanskrit-pratyaya",
        "difficulty": 1.5,
        "text": "'वि + हस् + ल्यप्' इत्यस्य रूपं किं भविष्यति?",
        "options": [
          "विहसितुम्",
          "विहस्य",
          "विहास्य",
          "विहसित्वा"
        ],
        "correctAnswer": "विहस्य",
        "explanation": "वि (उपसर्ग) + हस् + ल्यप् = विहस्य (मुस्कुराकर)।",
        "misconceptions": {
          "विहसित्वा": "उपसर्गयुक्ते धातौ ल्यप् प्रयुज्यते, क्त्वा न।"
        }
      },
      {
        "id": "san-pr-11",
        "topicId": "sanskrit-pratyaya",
        "difficulty": 1.8,
        "text": "'अभितः' तथा 'परितः' (चारों ओर) इति शब्दयोः योगे का विभक्तिः भवति?",
        "options": [
          "सप्तमी विभक्तिः",
          "पञ्चमी विभक्तिः",
          "तृतीया विभक्तिः",
          "द्वितीया विभक्तिः (यथा: ग्रामं परितः)"
        ],
        "correctAnswer": "द्वितीया विभक्तिः (यथा: ग्रामं परितः)",
        "explanation": "'अभितःपरितःसमयानिकषाहाप्रतियोगेऽपि' वार्तिकेन परितः, अभितः योगे द्वितीया विभक्तिः भवति।",
        "misconceptions": {
          "सप्तमी विभक्तिः": "यद्यपि 'गाँव के चारों ओर' अर्थ है, उपपद नियमात् द्वितीया प्रयुज्यते।"
        }
      },
      {
        "id": "san-pr-12",
        "topicId": "sanskrit-pratyaya",
        "difficulty": 2,
        "text": "'गम् + क्त' इत्यस्य पुंल्लिङ्गे किं रूपं सिद्ध्यति?",
        "options": [
          "गन्तव्यम्",
          "गत्वा",
          "गतवान्",
          "गतः"
        ],
        "correctAnswer": "गतः",
        "explanation": "'क्त' प्रत्ययः भूतकालिक-कर्मणि/भावे कृदन्तः अस्ति: गम् + क्त = गतः (पुंल्लिङ्गे), गता (स्त्रीलिङ्गे), गतम् (नपुंसकलिङ्गे)।",
        "misconceptions": {
          "गतवान्": "'गतवान्' क्तवतु प्रत्ययेन भवति।"
        }
      },
      {
        "id": "san-pr-13",
        "topicId": "sanskrit-pratyaya",
        "difficulty": 2.2,
        "text": "'पा + तुमुन्' इत्यनेन निष्पन्नं रूपं किम् अस्ति?",
        "options": [
          "पायितुम्",
          "पातुम्",
          "पिबतु",
          "पीत्वा"
        ],
        "correctAnswer": "पातुम्",
        "explanation": "पा (पीना) + तुमुन् = पातुम् (पीने के लिए)।",
        "misconceptions": {
          "पीत्वा": "'पीत्वा' क्त्वा प्रत्ययेन भवति (पीकर)।"
        }
      },
      {
        "id": "san-pr-14",
        "topicId": "sanskrit-pratyaya",
        "difficulty": 2.3,
        "text": "'नेत्रेण काणः' अत्र 'नेत्रेण' पदे अङ्गविकार-कारणात् केन सूत्रेण तृतीया विभक्तिः जाता?",
        "options": [
          "साधकतमं करणम्",
          "येनाङ्गविकारः",
          "सहयुक्तेऽप्रधाने",
          "हेतौ"
        ],
        "correctAnswer": "येनाङ्गविकारः",
        "explanation": "'येनाङ्गविकारः' सूत्रेण जिस विकृत अङ्ग से शरीर का विकार प्रकट हो, उसमें तृतीया विभक्ति होती है।",
        "misconceptions": {
          "हेतौ": "हेतौ सूत्र कारण बताने के लिए होता है, अङ्ग विकार के लिए 'येनाङ्गविकारः' नियम है।"
        }
      },
      {
        "id": "san-pr-15",
        "topicId": "sanskrit-pratyaya",
        "difficulty": 2.4,
        "text": "'विना' (बिना) शब्दस्य योगे काः विभक्तयः प्रयोक्तुं शक्यन्ते?",
        "options": [
          "केवलम् षष्ठी विभक्तिः",
          "केवलं सप्तमी",
          "केवलम् प्रथमा विभक्तिः",
          "द्वितीया, तृतीया तथा पञ्चमी विभक्तयः"
        ],
        "correctAnswer": "द्वितीया, तृतीया तथा पञ्चमी विभक्तयः",
        "explanation": "'पृथग्विनानानाभिस्तृतीयान्यतरस्याम्' सूत्रेण 'विना' शब्द के योग में द्वितीया, तृतीया अथवा पञ्चमी तीनों विभक्तियाँ प्रयुक्त हो सकती हैं।",
        "misconceptions": {
          "केवलम् षष्ठी विभक्तिः": "विना के योग में षष्ठी विभक्ति नहीं लगती।"
        }
      },
      {
        "id": "san-pr-16",
        "topicId": "sanskrit-pratyaya",
        "difficulty": 2.5,
        "text": "'कृ + अनीयर्' इत्यस्य नपुंसकलिङ्गे किं रूपं भवति?",
        "options": [
          "कर्तव्यम्",
          "करणीयः",
          "करणीयम्",
          "करणीया"
        ],
        "correctAnswer": "करणीयम्",
        "explanation": "अनीयर् प्रत्ययः चाहिए अथवा योग्य अर्थ में लगता है: करणीयम् (करना चाहिए / करने योग्य)।",
        "misconceptions": {
          "कर्तव्यम्": "'कर्तव्यम्' तव्यत् प्रत्यय से बनता है।"
        }
      },
      {
        "id": "san-pr-17",
        "topicId": "sanskrit-pratyaya",
        "difficulty": 2.5,
        "text": "'कविना काव्यं रचितम्' अत्र कर्मवाच्ये कर्तरि (कविना) का विभक्तिः अस्ति?",
        "options": [
          "द्वितीया विभक्तिः",
          "षष्ठी विभक्तिः",
          "अनुक्ते कर्तरि तृतीया विभक्तिः",
          "प्रथमा विभक्तिः"
        ],
        "correctAnswer": "अनुक्ते कर्तरि तृतीया विभक्तिः",
        "explanation": "कर्मवाच्ये कर्मणि प्रथमा तथा अनुक्त कर्ता में 'कर्तृकरणयोस्तृतीया' सूत्र से तृतीया विभक्ति होती है।",
        "misconceptions": {
          "प्रथमा विभक्तिः": "कर्तृवाच्य में कर्ता प्रथमा में होता है, कर्मवाच्य में कर्ता तृतीया में होता है।"
        }
      }
    ]
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
    "items": [
      {
        "id": "cs-net-1",
        "topicId": "computer-networks",
        "difficulty": -2.1,
        "text": "Which type of computer network is confined to a localized area such as a single room, school lab, or office building?",
        "options": [
          "PAN (Personal Area Network)",
          "WAN (Wide Area Network)",
          "LAN (Local Area Network)",
          "MAN (Metropolitan Area Network)"
        ],
        "correctAnswer": "LAN (Local Area Network)",
        "explanation": "A Local Area Network (LAN) spans a geographically restricted area like a school laboratory or office building.",
        "misconceptions": {
          "WAN (Wide Area Network)": "WAN spans whole countries or continents (e.g. the global Internet)."
        }
      },
      {
        "id": "cs-net-2",
        "topicId": "computer-networks",
        "difficulty": -1.7,
        "text": "What does the network acronym 'WAN' stand for?",
        "options": [
          "Web Associated Network",
          "Wireless Access Network",
          "Wide Area Network",
          "World Area Network"
        ],
        "correctAnswer": "Wide Area Network",
        "explanation": "WAN stands for Wide Area Network, connecting disparate networks across cities, countries, and continents.",
        "misconceptions": {
          "Wireless Access Network": "Wireless networks are WLAN, WAN refers to Wide Area Network."
        }
      },
      {
        "id": "cs-net-3",
        "topicId": "computer-networks",
        "difficulty": -1.3,
        "text": "Connecting a smartphone to a wireless smartwatch or Bluetooth headset within a 10-metre radius is an example of:",
        "options": [
          "LAN",
          "MAN",
          "WAN",
          "PAN (Personal Area Network)"
        ],
        "correctAnswer": "PAN (Personal Area Network)",
        "explanation": "A Personal Area Network (PAN) is centered around an individual's personal devices within a short range of a few metres.",
        "misconceptions": {
          "LAN": "A LAN connects computers across a building; a personal wearable link is a PAN."
        }
      },
      {
        "id": "cs-net-4",
        "topicId": "computer-networks",
        "difficulty": -0.8,
        "text": "In which network topology are all computers connected along a single continuous central transmission cable (backbone)?",
        "options": [
          "Star Topology",
          "Bus Topology",
          "Mesh Topology",
          "Ring Topology"
        ],
        "correctAnswer": "Bus Topology",
        "explanation": "In a bus topology, every node is connected in linear series along a single central coaxial or twisted backbone wire.",
        "misconceptions": {
          "Star Topology": "In a star topology, all devices connect individually to a central hub or switch."
        }
      },
      {
        "id": "cs-net-5",
        "topicId": "computer-networks",
        "difficulty": -0.4,
        "text": "In which network topology is every workstation connected directly to a central connecting device like a Switch or Hub?",
        "options": [
          "Ring Topology",
          "Star Topology",
          "Bus Topology",
          "Tree Topology"
        ],
        "correctAnswer": "Star Topology",
        "explanation": "Star topology features radiating point-to-point connections from each computer to a central switch/hub.",
        "misconceptions": {
          "Ring Topology": "In ring topology, each device connects only to its two immediate neighbors in a circle."
        }
      },
      {
        "id": "cs-net-6",
        "topicId": "computer-networks",
        "difficulty": 0.1,
        "text": "Which intelligent networking device connects multiple devices on a LAN and forwards data frames specifically to the intended destination port?",
        "options": [
          "Hub",
          "Modem",
          "Switch",
          "Repeater"
        ],
        "correctAnswer": "Switch",
        "explanation": "A switch uses MAC address tables to intelligently unicast data to the intended destination node, unlike a hub which broadcasts to all ports.",
        "misconceptions": {
          "Hub": "A hub is a passive/dumb device that broadcasts incoming packets out through every single port."
        }
      },
      {
        "id": "cs-net-7",
        "topicId": "computer-networks",
        "difficulty": 0.5,
        "text": "What is the primary function of a Modem (Modulator-Demodulator)?",
        "options": [
          "Assigns domain names to websites",
          "Acts as an antivirus scanner",
          "Boosts computer processor speed",
          "Converts digital computer signals into analog signals for telephone lines and vice-versa"
        ],
        "correctAnswer": "Converts digital computer signals into analog signals for telephone lines and vice-versa",
        "explanation": "Modems modulate digital bitstreams into analog frequencies for transmission media and demodulate them back at the receiving end.",
        "misconceptions": {
          "Acts as an antivirus scanner": "Modems handle physical signal modulation, not software malware scanning."
        }
      },
      {
        "id": "cs-net-8",
        "topicId": "computer-networks",
        "difficulty": 0.9,
        "text": "In which network topology does every node have a dedicated point-to-point link to every other node, providing maximum fault tolerance?",
        "options": [
          "Bus Topology",
          "Ring Topology",
          "Mesh Topology",
          "Star Topology"
        ],
        "correctAnswer": "Mesh Topology",
        "explanation": "In a complete mesh topology with n nodes, there are n(n-1)/2 physical channels, ensuring uninterrupted routing if any link fails.",
        "misconceptions": {
          "Bus Topology": "If the main backbone breaks in bus topology, the entire network fails."
        }
      },
      {
        "id": "cs-net-9",
        "topicId": "computer-networks",
        "difficulty": 1.2,
        "text": "What is the unique, permanent 48-bit physical address burned into a Network Interface Card (NIC) during manufacturing?",
        "options": [
          "URL",
          "Port Number",
          "MAC Address",
          "IP Address"
        ],
        "correctAnswer": "MAC Address",
        "explanation": "Media Access Control (MAC) address is a globally unique hardware address (e.g. 00:1A:2B:3C:4D:5E) tied to the physical network card.",
        "misconceptions": {
          "IP Address": "An IP address is logical and dynamic (assigned by the network), whereas MAC is permanent hardware."
        }
      },
      {
        "id": "cs-net-10",
        "topicId": "computer-networks",
        "difficulty": 1.5,
        "text": "Which guided transmission medium carries data as pulses of light through thin strands of ultra-pure glass at tremendous speeds?",
        "options": [
          "Twisted Pair Cable",
          "Fiber Optic Cable",
          "Coaxial Cable",
          "Copper Wire"
        ],
        "correctAnswer": "Fiber Optic Cable",
        "explanation": "Fiber optic cables utilize total internal reflection to transmit data as photons of light, immune to electromagnetic interference.",
        "misconceptions": {
          "Coaxial Cable": "Coaxial cables use solid copper electrical conductors shielded by insulation and metal braiding."
        }
      },
      {
        "id": "cs-net-11",
        "topicId": "computer-networks",
        "difficulty": 1.8,
        "text": "Which network protocol is responsible for securing web traffic with SSL/TLS encryption (showing a padlock in browser address bars)?",
        "options": [
          "SMTP",
          "HTTP",
          "FTP",
          "HTTPS"
        ],
        "correctAnswer": "HTTPS",
        "explanation": "HTTPS (Hypertext Transfer Protocol Secure) encrypts data between client and web server over port 443.",
        "misconceptions": {
          "HTTP": "HTTP transfers data in clear plaintext, vulnerable to interception."
        }
      },
      {
        "id": "cs-net-12",
        "topicId": "computer-networks",
        "difficulty": 2,
        "text": "What is the network device that determines the best optimal path to route data packets across different interconnected networks?",
        "options": [
          "Repeater",
          "Router",
          "Bridge",
          "RJ-45 Connector"
        ],
        "correctAnswer": "Router",
        "explanation": "Routers inspect IP destination headers and use dynamic routing tables to forward packets across different subnets and the Internet.",
        "misconceptions": {
          "Repeater": "A repeater merely regenerates and amplifies electrical signals over long distances without routing."
        }
      },
      {
        "id": "cs-net-13",
        "topicId": "computer-networks",
        "difficulty": 2.2,
        "text": "What is the standard twisted pair cable connector commonly used with Ethernet cables in computer labs called?",
        "options": [
          "USB-C",
          "VGA",
          "HDMI",
          "RJ-45 Connector"
        ],
        "correctAnswer": "RJ-45 Connector",
        "explanation": "Registered Jack 45 (RJ-45) is the standardized 8-pin modular connector for Category 5/6 Ethernet cables.",
        "misconceptions": {
          "USB-C": "USB-C is a universal peripheral connection standard, not the classic 8P8C Ethernet jack."
        }
      },
      {
        "id": "cs-net-14",
        "topicId": "computer-networks",
        "difficulty": 2.3,
        "text": "What does the Domain Name System (DNS) do on the Internet?",
        "options": [
          "Speeds up computer fans",
          "Stores videos locally",
          "Blocks viruses from downloading",
          "Translates human-friendly domain names (e.g. google.com) into numerical IP addresses (e.g. 142.250.190.46)"
        ],
        "correctAnswer": "Translates human-friendly domain names (e.g. google.com) into numerical IP addresses (e.g. 142.250.190.46)",
        "explanation": "DNS acts as the phonebook of the Internet, resolving alphanumeric web addresses to router-readable binary/decimal IP addresses.",
        "misconceptions": {
          "Blocks viruses from downloading": "Virus scanning is performed by antivirus and firewalls, not DNS lookup servers."
        }
      },
      {
        "id": "cs-net-15",
        "topicId": "computer-networks",
        "difficulty": 2.4,
        "text": "Which transmission medium is susceptible to electrical and magnetic interference (EMI) from nearby lightning or heavy machinery?",
        "options": [
          "Laser line-of-sight link",
          "Fiber optic glass cable",
          "Infrared in a vacuum",
          "Unshielded Twisted Pair (UTP) copper cable"
        ],
        "correctAnswer": "Unshielded Twisted Pair (UTP) copper cable",
        "explanation": "Copper cables conduct electrical currents and are vulnerable to electromagnetic induction, whereas glass optical fibers are completely immune.",
        "misconceptions": {
          "Fiber optic glass cable": "Fiber optics use light signals which are 100% immune to electromagnetic radio noise."
        }
      },
      {
        "id": "cs-net-16",
        "topicId": "computer-networks",
        "difficulty": 2.5,
        "text": "In an IPv4 address like `192.168.1.10`, how many bits in total make up the address?",
        "options": [
          "64 bits",
          "32 bits",
          "128 bits",
          "16 bits"
        ],
        "correctAnswer": "32 bits",
        "explanation": "An IPv4 address consists of 4 octets (each 8 bits): $4 \\times 8 = 32\\text{ bits}$. IPv6 uses 128 bits.",
        "misconceptions": {
          "128 bits": "128 bits is the address length of modern IPv6, not IPv4."
        }
      },
      {
        "id": "cs-net-17",
        "topicId": "computer-networks",
        "difficulty": 2.5,
        "text": "What is the network architecture where all participating computers have equal privileges and responsibilities without any central dedicated server?",
        "options": [
          "Mainframe Architecture",
          "Peer-to-Peer (P2P) Architecture",
          "Client-Server Architecture",
          "Master-Slave Architecture"
        ],
        "correctAnswer": "Peer-to-Peer (P2P) Architecture",
        "explanation": "In Peer-to-Peer (P2P) networks, every node acts simultaneously as both a client and a server, sharing resources equally.",
        "misconceptions": {
          "Client-Server Architecture": "In Client-Server architecture, centralized dedicated servers manage all resources and authenticate clients."
        }
      }
    ]
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
    "items": [
      {
        "id": "cs-cs-1",
        "topicId": "cyber-security",
        "difficulty": -2.1,
        "text": "Which of the following passwords demonstrates the highest level of security?",
        "options": [
          "password123",
          "12345678",
          "Tr@v3l#2026!Sky",
          "vinod2024"
        ],
        "correctAnswer": "Tr@v3l#2026!Sky",
        "explanation": "Strong passwords combine uppercase and lowercase letters, numbers, and special symbols with length >= 12 characters.",
        "misconceptions": {
          "12345678": "Simple consecutive numerical sequences are guessed by brute-force bots in milliseconds."
        }
      },
      {
        "id": "cs-cs-2",
        "topicId": "cyber-security",
        "difficulty": -1.7,
        "text": "What is the general term for malicious software designed to disrupt, damage, or gain unauthorized access to computer systems?",
        "options": [
          "Freeware",
          "Shareware",
          "Firmware",
          "Malware"
        ],
        "correctAnswer": "Malware",
        "explanation": "'Malware' is a portmanteau of 'malicious software', encompassing viruses, worms, trojans, ransomware, and spyware.",
        "misconceptions": {
          "Firmware": "Firmware is low-level permanent software programmed into hardware chips (like BIOS)."
        }
      },
      {
        "id": "cs-cs-3",
        "topicId": "cyber-security",
        "difficulty": -1.3,
        "text": "What type of cyber attack uses deceptive emails or fake websites masquerading as legitimate banks to steal login credentials and credit card numbers?",
        "options": [
          "Cyberbullying",
          "Phishing",
          "Spamming",
          "Eavesdropping"
        ],
        "correctAnswer": "Phishing",
        "explanation": "Phishing tricks victims into clicking malicious links and submitting confidential passwords on spoofed websites.",
        "misconceptions": {
          "Spamming": "Spam is unsolicited bulk advertising, which may be annoying but is not necessarily deceptive credential theft."
        }
      },
      {
        "id": "cs-cs-4",
        "topicId": "cyber-security",
        "difficulty": -0.8,
        "text": "What is the permanent digital trail of data left behind whenever you browse websites, post on social media, or send emails?",
        "options": [
          "Browser Cache",
          "Cookie Jar",
          "Download Log",
          "Digital Footprint"
        ],
        "correctAnswer": "Digital Footprint",
        "explanation": "A digital footprint consists of all traceable records of your online activity and posted content.",
        "misconceptions": {
          "Browser Cache": "Browser cache is temporary local storage of web page assets that can be easily cleared."
        }
      },
      {
        "id": "cs-cs-5",
        "topicId": "cyber-security",
        "difficulty": -0.4,
        "text": "Which software or hardware security barrier monitors and filters incoming and outgoing network traffic based on predefined security rules?",
        "options": [
          "Graphic Driver",
          "Firewall",
          "Web Browser",
          "Operating System Kernel"
        ],
        "correctAnswer": "Firewall",
        "explanation": "A firewall establishes a barrier between a trusted internal network and untrusted external networks like the Internet.",
        "misconceptions": {
          "Web Browser": "A web browser retrieves and displays web pages, but does not serve as a network packet inspection firewall."
        }
      },
      {
        "id": "cs-cs-6",
        "topicId": "cyber-security",
        "difficulty": 0.1,
        "text": "What type of malware locks and encrypts a victim's files and demands payment in cryptocurrency to provide the decryption key?",
        "options": [
          "Ransomware",
          "Spyware",
          "Adware",
          "Worm"
        ],
        "correctAnswer": "Ransomware",
        "explanation": "Ransomware (e.g. WannaCry) encrypts user data and extorts money ('ransom') for data restoration.",
        "misconceptions": {
          "Spyware": "Spyware secretly monitors keystrokes and user habits without openly demanding ransoms."
        }
      },
      {
        "id": "cs-cs-7",
        "topicId": "cyber-security",
        "difficulty": 0.5,
        "text": "What landmark Indian legislation was enacted in 2000 to provide a legal framework for electronic transactions and penalize cybercrimes?",
        "options": [
          "Cyber Safety Act, 2010",
          "Digital India Bill, 2005",
          "Computer Fraud Law, 1999",
          "Information Technology Act, 2000 (IT Act)"
        ],
        "correctAnswer": "Information Technology Act, 2000 (IT Act)",
        "explanation": "The IT Act, 2000 (amended in 2008) is India's primary statute addressing electronic governance, cybercrimes, and digital signatures.",
        "misconceptions": {
          "Digital India Bill, 2005": "Digital India is a flagship government digitization program launched in 2015, not the 2000 cyber law."
        }
      },
      {
        "id": "cs-cs-8",
        "topicId": "cyber-security",
        "difficulty": 0.9,
        "text": "What authentication mechanism requires two separate forms of identification (e.g. password + SMS/App OTP) to access an account?",
        "options": [
          "Biometric bypass",
          "PIN hashing",
          "Two-Factor Authentication (2FA)",
          "Single Sign-On (SSO)"
        ],
        "correctAnswer": "Two-Factor Authentication (2FA)",
        "explanation": "2FA combines something you know (password) with something you possess (mobile OTP or security key) for enhanced security.",
        "misconceptions": {
          "Single Sign-On (SSO)": "SSO lets you use one set of credentials across multiple applications, not two independent verification steps."
        }
      },
      {
        "id": "cs-cs-9",
        "topicId": "cyber-security",
        "difficulty": 1.2,
        "text": "A program that masquerades as useful legitimate software (like a free game) but secretly opens a backdoor for hackers is a:",
        "options": [
          "Computer Worm",
          "Cookie",
          "Macro Virus",
          "Trojan Horse"
        ],
        "correctAnswer": "Trojan Horse",
        "explanation": "Named after the ancient Greek myth, a Trojan horse deceives users about its true malicious intent.",
        "misconceptions": {
          "Computer Worm": "A worm self-replicates across networks without needing human trickery or host files."
        }
      },
      {
        "id": "cs-cs-10",
        "topicId": "cyber-security",
        "difficulty": 1.5,
        "text": "What is the process of converting readable plaintext into scrambled ciphertext to protect data confidentiality during transmission?",
        "options": [
          "Defragmentation",
          "Encoding",
          "Encryption",
          "Compression"
        ],
        "correctAnswer": "Encryption",
        "explanation": "Cryptographic encryption scrambles data using mathematical algorithms so only parties holding the secret key can decrypt it.",
        "misconceptions": {
          "Compression": "Compression reduces file size (e.g. ZIP) but does not provide cryptographic secrecy."
        }
      },
      {
        "id": "cs-cs-11",
        "topicId": "cyber-security",
        "difficulty": 1.8,
        "text": "What is the difference between a Computer Virus and a Computer Worm?",
        "options": [
          "Viruses never delete files",
          "There is no difference",
          "Worms only infect smartphones",
          "A virus requires an existing host executable file and user action to spread, whereas a worm self-replicates autonomously across networks"
        ],
        "correctAnswer": "A virus requires an existing host executable file and user action to spread, whereas a worm self-replicates autonomously across networks",
        "explanation": "Viruses attach to programs and need execution; worms exploit network vulnerabilities to propagate automatically without host files.",
        "misconceptions": {
          "Worms only infect smartphones": "Worms infect any network-connected computers, servers, and IoT devices."
        }
      },
      {
        "id": "cs-cs-12",
        "topicId": "cyber-security",
        "difficulty": 2,
        "text": "Using electronic communication like social media to intimidate, threaten, or harass a classmate repeatedly is legally known as:",
        "options": [
          "Phishing",
          "Spoofing",
          "Cyberbullying",
          "Eavesdropping"
        ],
        "correctAnswer": "Cyberbullying",
        "explanation": "Cyberbullying involves deliberate, repeated psychological harm inflicted through digital technologies and social media.",
        "misconceptions": {
          "Spoofing": "Spoofing is masquerading as another device or identity to gain unauthorized network access."
        }
      },
      {
        "id": "cs-cs-13",
        "topicId": "cyber-security",
        "difficulty": 2.2,
        "text": "What is a 'Zero-Day Vulnerability' in cybersecurity?",
        "options": [
          "A software security flaw unknown to the vendor, leaving 0 days for patches before potential exploits occur",
          "An antivirus license expired today",
          "A computer with 0 days of battery life",
          "A network with 0 latency"
        ],
        "correctAnswer": "A software security flaw unknown to the vendor, leaving 0 days for patches before potential exploits occur",
        "explanation": "Zero-day bugs have no existing patch available, meaning developers have had 'zero days' to remediate the vulnerability.",
        "misconceptions": {
          "An antivirus license expired today": "Zero-day refers to unpatched software vulnerabilities, not subscription expiry."
        }
      },
      {
        "id": "cs-cs-14",
        "topicId": "cyber-security",
        "difficulty": 2.3,
        "text": "What is a 'Man-in-the-Middle' (MitM) attack?",
        "options": [
          "An employee standing in the server room",
          "An attacker secretly intercepts and potentially alters communication between two parties who believe they are talking directly",
          "A slow network router",
          "A physical robbery of laptop computers"
        ],
        "correctAnswer": "An attacker secretly intercepts and potentially alters communication between two parties who believe they are talking directly",
        "explanation": "MitM attacks occur on unencrypted or spoofed Wi-Fi networks where attackers intercept sensitive passwords or data in transit.",
        "misconceptions": {
          "An employee standing in the server room": "MitM is an active network interception protocol attack, not a physical location."
        }
      },
      {
        "id": "cs-cs-15",
        "topicId": "cyber-security",
        "difficulty": 2.4,
        "text": "Under Section 66C of India's IT Act, 2000, what is the punishment for fraudulent or dishonest use of electronic signatures or passwords of another person (Identity Theft)?",
        "options": [
          "Imprisonment up to 3 years and/or fine up to ₹1 lakh",
          "Life imprisonment without bail",
          "A warning letter only",
          "Community service for one week"
        ],
        "correctAnswer": "Imprisonment up to 3 years and/or fine up to ₹1 lakh",
        "explanation": "Section 66C penalizes identity theft with imprisonment of either description for a term extending to 3 years and liability to a fine up to ₹1,00,000.",
        "misconceptions": {
          "A warning letter only": "Identity theft is a recognized criminal offense under Indian cyber jurisprudence."
        }
      },
      {
        "id": "cs-cs-16",
        "topicId": "cyber-security",
        "difficulty": 2.5,
        "text": "What is a 'DDoS' (Distributed Denial of Service) attack?",
        "options": [
          "Downloading files at double speed",
          "Deleting data from a local hard drive",
          "Flooding a target web server with overwhelming traffic from thousands of compromised botnet computers to bring it down",
          "Stealing credit cards using magnetic skimmers"
        ],
        "correctAnswer": "Flooding a target web server with overwhelming traffic from thousands of compromised botnet computers to bring it down",
        "explanation": "DDoS overwhelms server bandwidth and processor resources with junk traffic, denying access to legitimate visitors.",
        "misconceptions": {
          "Deleting data from a local hard drive": "DDoS aims to exhaust server availability; it does not delete database files on target systems."
        }
      },
      {
        "id": "cs-cs-17",
        "topicId": "cyber-security",
        "difficulty": 2.5,
        "text": "Which of the following is considered safe practice when using public Wi-Fi networks at airports or railway stations?",
        "options": [
          "Use a trusted Virtual Private Network (VPN) and avoid logging into banking portals",
          "Turn off the firewall to speed up connection",
          "Accept all SSL certificate warning overrides",
          "Share files openly on local network"
        ],
        "correctAnswer": "Use a trusted Virtual Private Network (VPN) and avoid logging into banking portals",
        "explanation": "Public Wi-Fi is often unencrypted; a VPN wraps all transmitted packets in an encrypted tunnel, shielding credentials.",
        "misconceptions": {
          "Turn off the firewall to speed up connection": "Turning off your firewall exposes your computer directly to malicious network probes."
        }
      }
    ]
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
    "items": [
      {
        "id": "cs-py-1",
        "topicId": "python-basics",
        "difficulty": -2.1,
        "text": "Which symbol is used to write a single-line comment in Python?",
        "options": [
          "#",
          "//",
          "/*",
          "--"
        ],
        "correctAnswer": "#",
        "explanation": "In Python, the hash character (#) starts a single-line comment that is ignored by the interpreter.",
        "misconceptions": {
          "//": "// is used for single-line comments in C/C++/Java/JavaScript; in Python, // is the floor division operator."
        }
      },
      {
        "id": "cs-py-2",
        "topicId": "python-basics",
        "difficulty": -1.7,
        "text": "What will be the output of the Python expression: `print(10 // 3)`?",
        "options": [
          "3.0",
          "3.3333333333333335",
          "3",
          "1"
        ],
        "correctAnswer": "3",
        "explanation": "The `//` operator performs floor (integer) division, truncating the fractional part and returning 3.",
        "misconceptions": {
          "3.3333333333333335": "Single slash `/` performs floating-point division; double slash `//` performs integer division."
        }
      },
      {
        "id": "cs-py-3",
        "topicId": "python-basics",
        "difficulty": -1.3,
        "text": "Which data type in Python represents boolean values `True` or `False`?",
        "options": [
          "str",
          "bool",
          "int",
          "float"
        ],
        "correctAnswer": "bool",
        "explanation": "The `bool` data type holds one of the two logical values: `True` or `False`.",
        "misconceptions": {
          "int": "int represents whole integers (like 10, -5), though internally True evaluates to 1 and False to 0."
        }
      },
      {
        "id": "cs-py-4",
        "topicId": "python-basics",
        "difficulty": -0.8,
        "text": "What does the Python code `print(\"Hello\" * 3)` output?",
        "options": [
          "SyntaxError",
          "Hello 3",
          "HelloHelloHello",
          "HelloHello"
        ],
        "correctAnswer": "HelloHelloHello",
        "explanation": "The `*` operator on a string and an integer performs string repetition.",
        "misconceptions": {
          "Hello 3": "The multiplication operator repeats the exact characters without automatically inserting spaces."
        }
      },
      {
        "id": "cs-py-5",
        "topicId": "python-basics",
        "difficulty": -0.4,
        "text": "How do you create an empty list in Python?",
        "options": [
          "my_list = list(0)",
          "my_list = ()",
          "my_list = {}",
          "my_list = []"
        ],
        "correctAnswer": "my_list = []",
        "explanation": "Square brackets `[]` create an empty list. `()` creates a tuple, and `{}` creates an empty dictionary.",
        "misconceptions": {
          "my_list = ()": "Parentheses `()` create a tuple, which is immutable."
        }
      },
      {
        "id": "cs-py-6",
        "topicId": "python-basics",
        "difficulty": 0.1,
        "text": "What does `len([10, 20, 30, 40])` return?",
        "options": [
          "4",
          "40",
          "3",
          "5"
        ],
        "correctAnswer": "4",
        "explanation": "`len()` returns the total number of items in the container. There are 4 elements.",
        "misconceptions": {
          "3": "Elements are indexed from 0 to 3, but the length (count) is 4."
        }
      },
      {
        "id": "cs-py-7",
        "topicId": "python-basics",
        "difficulty": 0.5,
        "text": "What is the output of the loop: `for i in range(2, 6): print(i, end=\" \")`?",
        "options": [
          "1 2 3 4 5",
          "2 3 4 5",
          "2 3 4 5 6",
          "3 4 5 6"
        ],
        "correctAnswer": "2 3 4 5",
        "explanation": "`range(start, stop)` generates integers from start up to stop - 1. So range(2, 6) produces 2, 3, 4, 5.",
        "misconceptions": {
          "2 3 4 5 6": "In Python, the stop value in `range(start, stop)` is strictly exclusive."
        }
      },
      {
        "id": "cs-py-8",
        "topicId": "python-basics",
        "difficulty": 0.9,
        "text": "What error is triggered if code inside an `if` block is not properly indented?",
        "options": [
          "NameError",
          "TypeError",
          "ValueError",
          "IndentationError"
        ],
        "correctAnswer": "IndentationError",
        "explanation": "Python uses indentation (typically 4 spaces) rather than curly braces to define scope. Inconsistent indentation triggers an `IndentationError`.",
        "misconceptions": {
          "NameError": "NameError occurs when an undefined variable identifier is accessed."
        }
      },
      {
        "id": "cs-py-9",
        "topicId": "python-basics",
        "difficulty": 1.2,
        "text": "What will be printed by the following snippet?\n```python\nx = [1, 2, 3]\nx.append(4)\nprint(x)\n```",
        "options": [
          "[1, 2, 3]",
          "[4, 1, 2, 3]",
          "[1, 2, 3, 4]",
          "Error"
        ],
        "correctAnswer": "[1, 2, 3, 4]",
        "explanation": "The `.append(item)` method adds the item to the very end of the list in-place.",
        "misconceptions": {
          "[4, 1, 2, 3]": "To insert at the beginning, you use `.insert(0, 4)`, not `.append(4)`."
        }
      },
      {
        "id": "cs-py-10",
        "topicId": "python-basics",
        "difficulty": 1.5,
        "text": "What is the value of `10 % 3` in Python?",
        "options": [
          "0",
          "0.333",
          "1",
          "3"
        ],
        "correctAnswer": "1",
        "explanation": "The `%` (modulus) operator returns the remainder after division: $10 = 3 \\times 3 + 1$. The remainder is 1.",
        "misconceptions": {
          "3": "3 is the quotient, not the remainder."
        }
      },
      {
        "id": "cs-py-11",
        "topicId": "python-basics",
        "difficulty": 1.8,
        "text": "What will `bool(0)` and `bool(\"\")` evaluate to?",
        "options": [
          "True and False respectively",
          "Both evaluate to False",
          "Error",
          "Both evaluate to True"
        ],
        "correctAnswer": "Both evaluate to False",
        "explanation": "In Python, the number 0 and empty sequences/strings are considered falsy, evaluating to `False`.",
        "misconceptions": {
          "Both evaluate to True": "Zero and empty strings are falsy values in Python."
        }
      },
      {
        "id": "cs-py-12",
        "topicId": "python-basics",
        "difficulty": 2,
        "text": "What is the output of the following slicing code?\n```python\nword = \"PYTHON\"\nprint(word[1:4])\n```",
        "options": [
          "YTH",
          "PYT",
          "YTO",
          "YTHO"
        ],
        "correctAnswer": "YTH",
        "explanation": "Indexing starts at 0: index 1='Y', 2='T', 3='H'. Index 4 is exclusive, so it outputs 'YTH'.",
        "misconceptions": {
          "YTHO": "Index 4 ('O') is excluded because slices go up to stop - 1."
        }
      },
      {
        "id": "cs-py-13",
        "topicId": "python-basics",
        "difficulty": 2.2,
        "text": "What does the `break` statement do inside a loop?",
        "options": [
          "Pauses the loop for 1 second",
          "Restarts the computer",
          "Skips to the next iteration of the loop",
          "Immediately terminates the loop and resumes execution at the next statement outside the loop"
        ],
        "correctAnswer": "Immediately terminates the loop and resumes execution at the next statement outside the loop",
        "explanation": "`break` exits the nearest enclosing loop immediately. `continue` skips to the next iteration.",
        "misconceptions": {
          "Skips to the next iteration of the loop": "Skipping to the next iteration is done by `continue`, not `break`."
        }
      },
      {
        "id": "cs-py-14",
        "topicId": "python-basics",
        "difficulty": 2.3,
        "text": "What will `type(3.14)` return in Python?",
        "options": [
          "<class 'double'>",
          "<class 'float'>",
          "<class 'int'>",
          "<class 'decimal'>"
        ],
        "correctAnswer": "<class 'float'>",
        "explanation": "Numbers with fractional decimal points are classified as `float` in Python (there is no separate 'double' keyword).",
        "misconceptions": {
          "<class 'double'>": "In C/Java, double-precision floats are called 'double', but in Python, the type is `float`."
        }
      },
      {
        "id": "cs-py-15",
        "topicId": "python-basics",
        "difficulty": 2.4,
        "text": "What is the output of the following arithmetic expression?\n`print(2 ** 3 ** 2)`",
        "options": [
          "64",
          "18",
          "512",
          "36"
        ],
        "correctAnswer": "512",
        "explanation": "Exponentiation `**` has right-to-left associativity in Python: `3 ** 2 = 9`, then `2 ** 9 = 512`.",
        "misconceptions": {
          "64": "If evaluated left-to-right, (2**3)**2 = 8**2 = 64, but Python evaluates powers right-to-left (2**(3**2) = 512)."
        }
      },
      {
        "id": "cs-py-16",
        "topicId": "python-basics",
        "difficulty": 2.5,
        "text": "What is the output of:\n```python\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)\n```",
        "options": [
          "Error",
          "None",
          "[1, 2, 3, 4]",
          "[1, 2, 3]"
        ],
        "correctAnswer": "[1, 2, 3, 4]",
        "explanation": "In Python, lists are mutable objects and variables hold references. `b = a` points to the same underlying list object.",
        "misconceptions": {
          "[1, 2, 3]": "b is not a separate copy; modifying b alters the shared list referenced by a."
        }
      },
      {
        "id": "cs-py-17",
        "topicId": "python-basics",
        "difficulty": 2.5,
        "text": "What does the `input()` function always return in Python 3?",
        "options": [
          "A string (`str`)",
          "A float (`float`)",
          "An integer (`int`)",
          "Whatever data type the user types"
        ],
        "correctAnswer": "A string (`str`)",
        "explanation": "`input()` always reads user input from standard input as a string (`str`). If numbers are needed, explicit casting like `int(input())` is required.",
        "misconceptions": {
          "Whatever data type the user types": "Even if the user types 25, `input()` captures it as the string \"25\"."
        }
      }
    ]
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
    "items": [
      {
        "id": "cs-html-1",
        "topicId": "html-web-basics",
        "difficulty": -2.1,
        "text": "What does the acronym 'HTML' stand for?",
        "options": [
          "HyperTransfer Markup Language",
          "HyperText Markup Language",
          "HighText Machine Language",
          "Home Tool Markup Language"
        ],
        "correctAnswer": "HyperText Markup Language",
        "explanation": "HTML stands for HyperText Markup Language, the standard code for structuring web pages.",
        "misconceptions": {
          "HyperTransfer Markup Language": "HTTP stands for HyperText Transfer Protocol; HTML is Markup Language."
        }
      },
      {
        "id": "cs-html-2",
        "topicId": "html-web-basics",
        "difficulty": -1.7,
        "text": "Which HTML tag is used to define the largest heading on a web page?",
        "options": [
          "<header>",
          "<h6>",
          "<head>",
          "<h1>"
        ],
        "correctAnswer": "<h1>",
        "explanation": "HTML heading tags range from <h1> (largest and most important) down to <h6> (smallest).",
        "misconceptions": {
          "<h6>": "<h6> defines the smallest heading, while <h1> is the largest."
        }
      },
      {
        "id": "cs-html-3",
        "topicId": "html-web-basics",
        "difficulty": -1.3,
        "text": "Which HTML tag is used to create a paragraph of text?",
        "options": [
          "<pg>",
          "<para>",
          "<text>",
          "<p>"
        ],
        "correctAnswer": "<p>",
        "explanation": "The <p> tag defines a paragraph block with automatic margin spacing above and below.",
        "misconceptions": {
          "<para>": "<para> is not a valid standard HTML tag."
        }
      },
      {
        "id": "cs-html-4",
        "topicId": "html-web-basics",
        "difficulty": -0.8,
        "text": "Which tag is used to insert a clickable hyperlink in HTML?",
        "options": [
          "<href url='...'>",
          "<a href='...'>",
          "<link src='...'>",
          "<hyperlink>"
        ],
        "correctAnswer": "<a href='...'>",
        "explanation": "The <a> (anchor) tag with the `href` (Hypertext REFerence) attribute creates clickable links.",
        "misconceptions": {
          "<link src='...'>": "<link> is placed in the <head> to load external stylesheets, not for clickable text links."
        }
      },
      {
        "id": "cs-html-5",
        "topicId": "html-web-basics",
        "difficulty": -0.4,
        "text": "Which HTML tag is used to embed an image into a webpage?",
        "options": [
          "<pic src='...'>",
          "<img href='...'>",
          "<img src='...' alt='...'>",
          "<image href='...'>"
        ],
        "correctAnswer": "<img src='...' alt='...'>",
        "explanation": "The empty tag <img> with `src` (source URL) and `alt` (alternative text) embeds an image.",
        "misconceptions": {
          "<img href='...'>": "Images use the `src` attribute for file path, whereas links use `href`."
        }
      },
      {
        "id": "cs-html-6",
        "topicId": "html-web-basics",
        "difficulty": 0.1,
        "text": "Which tag creates an ordered (numbered) list in HTML?",
        "options": [
          "<dl>",
          "<ol>",
          "<list>",
          "<ul>"
        ],
        "correctAnswer": "<ol>",
        "explanation": "<ol> stands for Ordered List (numbered 1, 2, 3), containing <li> (list items).",
        "misconceptions": {
          "<ul>": "<ul> creates an Unordered List (bullet points)."
        }
      },
      {
        "id": "cs-html-7",
        "topicId": "html-web-basics",
        "difficulty": 0.5,
        "text": "Which HTML element is used to insert a line break without starting a new paragraph?",
        "options": [
          "<hr>",
          "<br>",
          "<lb>",
          "<break>"
        ],
        "correctAnswer": "<br>",
        "explanation": "<br> is an empty element that inserts a single line break in text flow.",
        "misconceptions": {
          "<hr>": "<hr> inserts a horizontal thematic rule line across the page."
        }
      },
      {
        "id": "cs-html-8",
        "topicId": "html-web-basics",
        "difficulty": 0.9,
        "text": "What is the purpose of the `alt` attribute in the `<img src='photo.jpg' alt='Mountains'>` tag?",
        "options": [
          "Changes image color",
          "Makes the image spin",
          "Sets the altitude of the photo",
          "Displays alternative descriptive text if the image fails to load and aids screen readers for accessibility"
        ],
        "correctAnswer": "Displays alternative descriptive text if the image fails to load and aids screen readers for accessibility",
        "explanation": "The `alt` text describes the image for visually impaired users using screen readers or when the network connection fails to load the image.",
        "misconceptions": {
          "Sets the altitude of the photo": "alt stands for 'alternate text', not geographical altitude."
        }
      },
      {
        "id": "cs-html-9",
        "topicId": "html-web-basics",
        "difficulty": 1.2,
        "text": "Which HTML tag is used to create a row inside a table?",
        "options": [
          "<table-row>",
          "<tr>",
          "<td>",
          "<th>"
        ],
        "correctAnswer": "<tr>",
        "explanation": "<tr> stands for Table Row, which contains <td> (table data cells) or <th> (table headers).",
        "misconceptions": {
          "<td>": "<td> defines individual table data cells inside a row."
        }
      },
      {
        "id": "cs-html-10",
        "topicId": "html-web-basics",
        "difficulty": 1.5,
        "text": "Which tag defines an unordered (bulleted) list?",
        "options": [
          "<li>",
          "<bullet>",
          "<ul>",
          "<ol>"
        ],
        "correctAnswer": "<ul>",
        "explanation": "<ul> defines an Unordered List rendered with bullet markers by default.",
        "misconceptions": {
          "<ol>": "<ol> creates numbered ordered lists."
        }
      },
      {
        "id": "cs-html-11",
        "topicId": "html-web-basics",
        "difficulty": 1.8,
        "text": "What does the declaration `<!DOCTYPE html>` placed at the very first line of a web document do?",
        "options": [
          "Loads internet styles",
          "Connects to a database",
          "Executes JavaScript",
          "Instructs the web browser that the document is written in modern HTML5 standards mode"
        ],
        "correctAnswer": "Instructs the web browser that the document is written in modern HTML5 standards mode",
        "explanation": "<!DOCTYPE html> informs the rendering engine to parse the document according to the HTML5 specification.",
        "misconceptions": {
          "Connects to a database": "HTML is purely a client-side markup language; it cannot connect directly to databases."
        }
      },
      {
        "id": "cs-html-12",
        "topicId": "html-web-basics",
        "difficulty": 2,
        "text": "Which HTML tag contains metadata about the HTML document that is NOT directly displayed in the main web page window (e.g. `<title>`, `<meta>`, `<style>`)?",
        "options": [
          "<header>",
          "<footer>",
          "<head>",
          "<body>"
        ],
        "correctAnswer": "<head>",
        "explanation": "The <head> element contains document title, character encoding, external script/CSS links, and metadata.",
        "misconceptions": {
          "<body>": "<body> contains all visible elements rendered in the browser viewport."
        }
      },
      {
        "id": "cs-html-13",
        "topicId": "html-web-basics",
        "difficulty": 2.2,
        "text": "Which tag pair is used to make text visually bold and indicate strong semantic importance?",
        "options": [
          "<em>",
          "<dark>",
          "<strong> or <b>",
          "<bold>"
        ],
        "correctAnswer": "<strong> or <b>",
        "explanation": "<strong> conveys strong semantic emphasis (rendered bold) and <b> applies bold styling.",
        "misconceptions": {
          "<em>": "<em> emphasizes text with italicization, not bolding."
        }
      },
      {
        "id": "cs-html-14",
        "topicId": "html-web-basics",
        "difficulty": 2.3,
        "text": "How do you specify that a hyperlink should open in a new browser tab when clicked?",
        "options": [
          "<a href='...' target='_blank'>",
          "<a href='...' target='newtab'>",
          "<a href='...' window='new'>",
          "<a href='...' open='tab'>"
        ],
        "correctAnswer": "<a href='...' target='_blank'>",
        "explanation": "Setting `target='_blank'` instructs the user agent to open the linked resource in a new browsing context/tab.",
        "misconceptions": {
          "<a href='...' window='new'>": "`window` is not a valid attribute on anchor tags; `target='_blank'` is standard."
        }
      },
      {
        "id": "cs-html-15",
        "topicId": "html-web-basics",
        "difficulty": 2.4,
        "text": "Which attribute in a `<table border='1'>` cell allows it to span across three columns horizontally?",
        "options": [
          "col-width='3'",
          "rowspan='3'",
          "colspan='3'",
          "span='3'"
        ],
        "correctAnswer": "colspan='3'",
        "explanation": "`colspan` merges a table cell across multiple columns horizontally. `rowspan` merges vertically across rows.",
        "misconceptions": {
          "rowspan='3'": "`rowspan` merges cells vertically across multiple rows."
        }
      },
      {
        "id": "cs-html-16",
        "topicId": "html-web-basics",
        "difficulty": 2.5,
        "text": "Which form element allows a user to select only ONE option out of a mutually exclusive group?",
        "options": [
          "<input type='button'>",
          "<input type='radio' name='gender'>",
          "<textarea>",
          "<input type='checkbox'>"
        ],
        "correctAnswer": "<input type='radio' name='gender'>",
        "explanation": "Radio buttons sharing the same `name` attribute are mutually exclusive, permitting only one selection.",
        "misconceptions": {
          "<input type='checkbox'>": "Checkboxes allow users to select multiple independent options simultaneously."
        }
      },
      {
        "id": "cs-html-17",
        "topicId": "html-web-basics",
        "difficulty": 2.5,
        "text": "What is the correct way to write an HTML comment?",
        "options": [
          "/* This is a comment */",
          "# This is a comment",
          "// This is a comment",
          "<!-- This is a comment -->"
        ],
        "correctAnswer": "<!-- This is a comment -->",
        "explanation": "HTML comments open with `<!--` and close with `-->`.",
        "misconceptions": {
          "// This is a comment": "// is used in JavaScript and C++, not in HTML markup."
        }
      }
    ]
  }
];

export function getTopicById(id: string): ConceptTopic | undefined {
  return CONCEPT_BANK.find((c) => c.id === id);
}

export function getAllTopics(): ConceptTopic[] {
  return CONCEPT_BANK;
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
  return CONCEPT_BANK.filter((c) => c.subject.toLowerCase() === subject.toLowerCase());
}
