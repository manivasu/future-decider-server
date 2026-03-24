// Problem Detection Engine
// Identifies real-life challenges and provides astrological solutions
// This is the CORE of your real-time problem-solving feature

exports.analyzeProblems = (chart) => {
  let problems = [];

  const planets = chart.planets || {};
  const houses = chart.houses || {};
  const { Sun, Moon, Mars, Jupiter, Saturn, Venus, Mercury, Rahu } = planets;

  // PROBLEM 1: MARRIAGE DELAY DETECTION
  if (Saturn && Saturn.house === 7) {
    problems.push({
      id: "marriage_delay",
      problem: "Marriage Delay",
      severity: "high",
      area: "Relationships",
      detection: "Saturn in 7th House",
      reason: "Saturn causes delays and tests in marriage/partnerships.",
      source: "Brihat Parashara Hora Shastra",
      timeline: "Marriage likely after Saturn period ends or maturity (age 36+)",
      solutions: [
        "Patience and maturity bring stable relationships.",
        "Consider marriage after age 30-36 for better stability.",
        "Strengthen Venus through remedies (diamond, white clothing).",
        "Seek partner with strong Jupiter and Venus placements."
      ],
      confidence: 0.90
    });
  }

  // PROBLEM 2: CAREER INSTABILITY
  if (Saturn && Saturn.house === 10) {
    const careerStrength = houses[10]?.strength;
    
    problems.push({
      id: "career_slow_growth",
      problem: "Career Growth Through Hard Work",
      severity: "medium",
      area: "Career",
      detection: "Saturn in 10th House",
      reason: "Saturn brings delayed but steady career success through discipline.",
      source: "Parashara",
      timeline: "Career improves with age and experience after 35-40",
      solutions: [
        "Focus on skill development and patience.",
        "Long-term planning brings success, avoid quick changes.",
        "Strengthen Saturn through discipline and karma yoga.",
        "Take on responsible positions for better outcomes."
      ],
      confidence: 0.88
    });
  }

  if (careerWeak(houses)) {
    problems.push({
      id: "career_instability",
      problem: "Career Instability or Direction Issues",
      severity: "high",
      area: "Career",
      detection: "Weak 10th House",
      reason: "Weak 10th house indicates lack of clear career path.",
      timeline: "Improve through mentorship and focused effort.",
      solutions: [
        "Seek mentorship and clear career guidance.",
        "Identify passion area and pursue certification.",
        "Strengthen Sun and Mercury through remedies.",
        "Take on leadership roles to build authority."
      ],
      confidence: 0.85
    });
  }

  // PROBLEM 3: FINANCIAL CHALLENGES
  if (houses[2]?.strength === "weak" || houses[2]?.afflicted) {
    problems.push({
      id: "financial_challenges",
      problem: "Financial Instability or Lack of Resources",
      severity: "high",
      area: "Finance",
      detection: "Weak or Afflicted 2nd House",
      reason: "2nd house governs wealth, family security, and resources.",
      timeline: "Improve through consistent effort and Jupiter transits.",
      solutions: [
        "Improve financial literacy and budgeting.",
        "Invest in education for better income opportunities.",
        "Strengthen Jupiter through charity and yellow clothing.",
        "Avoid risky speculation; focus on stable income."
      ],
      confidence: 0.85
    });
  }

  // PROBLEM 4: HEALTH ISSUES
  if (Sun && Sun.house === 12) {
    problems.push({
      id: "health_concerns",
      problem: "Health Weaknesses or Chronic Issues",
      severity: "medium",
      area: "Health",
      detection: "Sun in 12th House",
      reason: "Sun in 12th can indicate vitality loss or health challenges.",
      timeline: "Health improves with proper care and prevention.",
      solutions: [
        "Regular exercise and health check-ups.",
        "Strengthen Sun through early morning routine.",
        "Avoid excessive stress and fatigue.",
        "Wear ruby or red clothing for vitality."
      ],
      confidence: 0.75
    });
  }

  // PROBLEM 5: RELATIONSHIP CONFLICTS
  if (Mars && Mars.house === 7) {
    problems.push({
      id: "relationship_conflict",
      problem: "Relationship Conflict and Passionate Interactions",
      severity: "high",
      area: "Relationships",
      detection: "Mars in 7th House",
      reason: "Mars brings passion but can create conflict and aggression in partnerships.",
      timeline: "Improves with communication and compromise after Saturn matures.",
      solutions: [
        "Practice patience and active listening in relationships.",
        "Channel Mars energy into shared activities/sports.",
        "Choose partner with calm Moon placement.",
        "Strengthen Venus for harmony in relationships."
      ],
      confidence: 0.92
    });
  }

  // PROBLEM 6: EMOTIONAL INSTABILITY
  if (Moon && Moon.sign === "Scorpio") {
    problems.push({
      id: "emotional_intensity",
      problem: "Emotional Intensity and Deep Feelings",
      severity: "medium",
      area: "Mental Health",
      detection: "Moon in Scorpio",
      reason: "Scorpio Moon brings deep emotions, secretiveness, and intensity.",
      timeline: "Emotional maturity brings strength and insight.",
      solutions: [
        "Practice meditation and emotional expression.",
        "Build trust through honest relationships.",
        "Channel intensity into research, investigation, or psychology.",
        "Strengthen Moon through white and copper remedies."
      ],
      confidence: 0.80
    });
  }

  // PROBLEM 7: FAMILY SEPARATION OR DISTANCE
  if (Moon && Moon.house === 12) {
    problems.push({
      id: "family_separation",
      problem: "Distance from Family or Separation Issues",
      severity: "medium",
      area: "Family",
      detection: "Moon in 12th House",
      reason: "Moon in 12th indicates living away from family or emotional distance.",
      timeline: "Distance may be temporary; maintain emotional connections.",
      solutions: [
        "Maintain regular communication with family.",
        "Visit home whenever possible.",
        "Practice gratitude for family bonds.",
        "Balance independence with family values."
      ],
      confidence: 0.78
    });
  }

  // PROBLEM 8: DEBT OR FINANCIAL OBLIGATIONS
  if (Saturn && Saturn.house === 2) {
    problems.push({
      id: "debt_obligations",
      problem: "Financial Obligations, Debts, or Losses",
      severity: "high",
      area: "Finance",
      detection: "Saturn in 2nd House",
      reason: "Saturn in 2nd causes financial restrictions and obligations.",
      source: "Parashara",
      timeline: "Financial improvement after 30s or Saturn return.",
      solutions: [
        "Pay off debts systematically.",
        "Avoid loans and borrowing.",
        "Build emergency fund through disciplined saving.",
        "Strengthen Jupiter for wealth increase."
      ],
      confidence: 0.88
    });
  }

  // PROBLEM 9: LACK OF LUCK OR OPPORTUNITY
  if (Jupiter && Jupiter.house === 12) {
    problems.push({
      id: "luck_deficit",
      problem: "Reduced Fortune or Lack of Opportunities",
      severity: "medium",
      area: "Luck & Opportunity",
      detection: "Jupiter in 12th House",
      reason: "Jupiter in 12th can indicate hidden blessings or external obstacles.",
      timeline: "Improve through karma yoga and spiritual practices.",
      solutions: [
        "Develop spiritual practices and meditation.",
        "Share knowledge generously with others.",
        "Donate and practice charity for Jupiter strengthening.",
        "Seek wisdom from gurus and mentors."
      ],
      confidence: 0.75
    });
  }

  // PROBLEM 10: SOCIAL ANXIETY OR ISOLATION
  if (Saturn && Saturn.house === 1) {
    problems.push({
      id: "social_withdrawal",
      problem: "Social Shyness or Isolation Tendencies",
      severity: "medium",
      area: "Personality",
      detection: "Saturn in 1st House",
      reason: "Saturn in 1st brings seriousness and social withdrawn nature.",
      timeline: "Confidence increases with age and achievement.",
      solutions: [
        "Gradually build social confidence through activities.",
        "Pursue structured learning and skill development.",
        "Take on small leadership responsibilities.",
        "Strengthen Sun through morning routines and exercise."
      ],
      confidence: 0.80
    });
  }

  // PROBLEM 11: CREATIVE/EDUCATIONAL BLOCKS
  if (Mercury && Mercury.house === 8) {
    problems.push({
      id: "mental_blocks",
      problem: "Communication or Learning Difficulties",
      severity: "medium",
      area: "Education",
      detection: "Mercury in 8th House",
      reason: "Mercury in 8th can create obstacles in learning and expression.",
      timeline: "Improves through consistent practice and specific focus.",
      solutions: [
        "Practice writing and public speaking.",
        "Study under experienced mentors.",
        "Use visualization for learning enhancement.",
        "Strengthen Mercury through green clothing and emerald."
      ],
      confidence: 0.75
    });
  }

  return problems;
};

// Helper function to check career weakness
function careerWeak(houses) {
  const house10 = houses[10];
  return house10 && (house10.strength === "weak" || house10.afflicted);
}
