// Dasha System - Timing of Events
// Dasha periods determine when planets' effects manifest
// Based on Vimshottari Dasha (120-year cycle) - most widely used

// Dasha lord periods (years)
const DASHA_PERIODS = {
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Mercury: 17,
  Jupiter: 16,
  Venus: 20,
  Saturn: 19,
  Rahu: 18,
  Ketu: 7
};

// Total cycle = 120 years
const TOTAL_CYCLE = 120;

exports.calculateDashas = (nakshatraOfMoon, currentAge) => {
  /**
   * Vimshottari Dasha calculation based on Moon's Nakshatra
   * There are 27 nakshatras, each owned by a planet
   */
  
  const dashaSequence = [
    "Ketu", "Venus", "Sun", "Moon", "Mars", 
    "Rahu", "Jupiter", "Saturn", "Mercury"
  ];
  
  const nakshatraLords = {
    "Ashwini": "Ketu", "Bharani": "Venus", "Kritika": "Sun",
    "Rohini": "Moon", "Mrigasira": "Mars", "Ardra": "Rahu",
    "Punarvasu": "Jupiter", "Pushya": "Saturn", "Ashlesha": "Mercury",
    "Magha": "Ketu", "Purva Phalguni": "Venus", "Uttara Phalguni": "Sun",
    "Hasta": "Moon", "Chitra": "Mars", "Swati": "Rahu",
    "Vishakha": "Jupiter", "Anuradha": "Saturn", "Jyeshtha": "Mercury",
    "Mula": "Ketu", "Purva Ashadha": "Venus", "Uttara Ashadha": "Sun",
    "Abhijit": "Mercury", "Shravana": "Moon", "Dhanishtha": "Mars",
    "Shatabhisha": "Rahu", "Purva Bhadrapada": "Jupiter", "Uttara Bhadrapada": "Saturn",
    "Revati": "Mercury"
  };

  const startingLord = nakshatraLords[nakshatraOfMoon] || "Ketu";
  const startingIndex = dashaSequence.indexOf(startingLord);
  
  const result = {
    currentAge,
    nakshatraOfMoon,
    startingLord,
    dashaProgression: []
  };

  let remainingYears = TOTAL_CYCLE - (currentAge % TOTAL_CYCLE);
  let currentIndex = startingIndex;
  let accumulatedYears = 0;

  // Generate dasha progression
  for (let i = 0; i < dashaSequence.length && accumulatedYears < 40; i++) {
    const lord = dashaSequence[currentIndex];
    const period = DASHA_PERIODS[lord];
    const startAge = currentAge + accumulatedYears;
    const endAge = startAge + period;

    result.dashaProgression.push({
      lord,
      period,
      startAge,
      endAge,
      strengthAnalysis: analyzeNumerology(lord, startAge, endAge),
      predictions: generateDashaPredictions(lord, startAge)
    });

    accumulatedYears += period;
    currentIndex = (currentIndex + 1) % dashaSequence.length;
  }

  // Current dasha
  result.currentDasha = findCurrentDasha(result.dashaProgression, currentAge);

  return result;
};

// Analyze dasha strength using numerology
function analyzeNumerology(lord, startAge, endAge) {
  const startSum = startAge.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
  const endSum = endAge.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
  const avgSum = Math.floor((startSum + endSum) / 2);

  const qualities = {
    1: "Leadership & New Beginnings",
    2: "Partnership & Balance",
    3: "Creativity & Communication",
    4: "Stability & Foundation",
    5: "Change & Freedom",
    6: "Responsibility & Service",
    7: "Spirituality & Wisdom",
    8: "Power & Transformation",
    9: "Completion & Wisdom"
  };

  return {
    numerologyNumber: avgSum,
    quality: qualities[avgSum] || "Unknown"
  };
}

// Generate predictions for each dasha period
function generateDashaPredictions(lord, startAge) {
  const predictions = {
    "Ketu": {
      startAge,
      theme: "Spiritual Awakening & Release",
      predictions: [
        "Detachment from material concerns",
        "Spiritual growth and mystical insights",
        "Release of past karmic patterns",
        "May experience losses for spiritual gain"
      ]
    },
    "Venus": {
      startAge,
      theme: "Relationships, Beauty & Pleasure",
      predictions: [
        "Focus on relationships and partnerships",
        "Success in arts, music, and beauty",
        "Financial gain through creativity",
        "Marriage or romantic developments"
      ]
    },
    "Sun": {
      startAge,
      theme: "power, Authority & Confidence",
      predictions: [
        "Career advancement and leadership roles",
        "Increased confidence and visibility",
        "Success in government or authority positions",
        "Health improvements"
      ]
    },
    "Moon": {
      startAge,
      theme: "Emotions, Mind & Nourishment",
      predictions: [
        "Emotional growth and mental clarity",
        "Family importance and domestic focus",
        "Healing and nurturing activities",
        "Travel and water-related activities"
      ]
    },
    "Mars": {
      startAge,
      theme: "Courage, Energy & Action",
      predictions: [
        "High energy and competitive drive",
        "Success in physical activities and sports",
        "Possible conflicts or aggression issues",
        "Courageous ventures and risk-taking"
      ]
    },
    "Rahu": {
      startAge,
      theme: "Ambition, Obsession & Unconventional",
      predictions: [
        "Ambitious pursuits and success",
        "Modern technology and innovation",
        "Foreign travels or relocations",
        "Obsessive focus on goals"
      ]
    },
    "Jupiter": {
      startAge,
      theme: "Wisdom, Expansion & Fortune",
      predictions: [
        "Great fortune and luck",
        "Spiritual growth and teaching",
        "Wealth expansion and prosperity",
        "Children's birth or success"
      ]
    },
    "Saturn": {
      startAge,
      theme: "Discipline, Hardship & Growth",
      predictions: [
        "Lessons through hard work",
        "Delays and obstacles overcome gradually",
        "Long-term achievement through discipline",
        "Karmic lessons and maturity"
      ]
    },
    "Mercury": {
      startAge,
      theme: "Communication, Business & Intellect",
      predictions: [
        "Success in business and commerce",
        "Communication skills enhancement",
        "Mental activities and learning",
        "Trade and short travels"
      ]
    }
  };

  return predictions[lord] || { theme: "Unknown", predictions: [] };
}

// Find current dasha based on age
function findCurrentDasha(dashaProgression, currentAge) {
  return dashaProgression.find(d => currentAge >= d.startAge && currentAge < d.endAge) || null;
}

// Primary + Sub-dasha analysis (Bhukti)
exports.analyzeBhukti = (mainDashaLord, subDashaLord) => {
  const bhuktiFocus = {
    "Sun-Moon": "Heart matters and emotional recognition",
    "Moon-Venus": "Emotional relationships and creativity",
    "Mars-Jupiter": "Courage in spiritual pursuits",
    "Jupiter-Saturn": "Wisdom through discipline",
    "Saturn-Mercury": "Communication through hard work",
    "Venus-Mercury": "Artistic communication and business success",
    "Mercury-Mars": "Competitive business success",
    "Rahu-Jupiter": "Foreign wealth and expansion",
    "Ketu-Venus": "Detachment from relationships, spiritual focus"
  };

  const key = `${mainDashaLord}-${subDashaLord}`;
  return {
    mainDasha: mainDashaLord,
    subDasha: subDashaLord,
    focus: bhuktiFocus[key] || "Interaction of planetary energies",
    recommendation: `Focus on ${bhuktiFocus[key]?.toLowerCase() || "planetary balance"} during this period.`
  };
};

// Dasha favorable periods for specific activities
exports.getAuspiciousPeriods = (askedActivity, planetaryPositions) => {
  const activityOptions = {
    "marriage": ["Venus", "Jupiter", "Moon"],
    "business": ["Mercury", "Jupiter", "Sun"],
    "education": ["Mercury", "Jupiter", "Venus"],
    "relocation": ["Mars", "Rahu", "Mercury"],
    "health": ["Sun", "Jupiter", "Venus"],
    "spirituality": ["Jupiter", "Saturn", "Ketu"]
  };

  const favorableLords = activityOptions[askedActivity.toLowerCase()] || [];
  
  return {
    activity: askedActivity,
    favorableDashaLords: favorableLords,
    recommendation: `For ${askedActivity}, seek periods when ${favorableLords.join(", ")} Dasha is active.`
  };
};
