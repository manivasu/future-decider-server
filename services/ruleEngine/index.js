// Main Rule Engine Orchestrator
// Combines all analysis modules into comprehensive chart reading

const { analyzePlanets } = require("./planetRules");
const { analyzeHouses } = require("./houseRules");
const { analyzeYogas } = require("./yogaRules");
const { analyzeProblems } = require("./problemRules");
const { calculateDashas, analyzeBhukti, getAuspiciousPeriods } = require("./dashaRules");

/**
 * Main function - Comprehensive chart analysis
 * Returns structured data for UI presentation
 */
exports.analyzeChart = (chart, userAge = null) => {
  if (!chart) {
    throw new Error("Chart data is required");
  }

  const analysis = {
    timestamp: new Date().toISOString(),
    chart: {
      date: chart.date,
      time: chart.time,
      place: chart.place,
      timezone: chart.timezone
    }
  };

  // 1. PLANET ANALYSIS
  try {
    analysis.planets = analyzePlanets(chart);
  } catch (e) {
    analysis.planets = [];
    console.error("Planet analysis error:", e.message);
  }

  // 2. HOUSE ANALYSIS
  try {
    analysis.houses = analyzeHouses(chart);
  } catch (e) {
    analysis.houses = [];
    console.error("House analysis error:", e.message);
  }

  // 3. YOGA ANALYSIS (Auspicious/Inauspicious combinations)
  try {
    analysis.yogas = analyzeYogas(chart);
  } catch (e) {
    analysis.yogas = [];
    console.error("Yoga analysis error:", e.message);
  }

  // 4. PROBLEM DETECTION (Real-time issue solving)
  try {
    analysis.problems = analyzeProblems(chart);
  } catch (e) {
    analysis.problems = [];
    console.error("Problem analysis error:", e.message);
  }

  // 5. DASHA ANALYSIS (Timing of events) - Optional if age provided
  if (userAge !== null && userAge !== undefined) {
    try {
      const nakshatraOfMoon = chart.planets?.Moon?.nakshatra || "Ashwini";
      analysis.dasha = calculateDashas(nakshatraOfMoon, userAge);
      
      // Add sub-dasha interpretation if we have main and sub-dasha lords
      if (analysis.dasha.currentDasha) {
        // You would need more data for sub-dasha calculation
        analysis.dashaInterpretation = {
          currentDasha: analysis.dasha.currentDasha.lord,
          timeline: `Age ${analysis.dasha.currentDasha.startAge} to ${analysis.dasha.currentDasha.endAge}`,
          theme: analysis.dasha.currentDasha.predictions?.theme,
          expectations: analysis.dasha.currentDasha.predictions?.predictions
        };
      }
    } catch (e) {
      console.error("Dasha analysis error:", e.message);
    }
  }

  // 6. SUMMARY & SCORING
  analysis.summary = generateSummary(analysis);
  analysis.scorecard = generateScorecard(analysis);
  analysis.recommendations = generateRecommendations(analysis);

  return analysis;
};

/**
 * Generate comprehensive summary
 */
function generateSummary(analysis) {
  const strengths = [];
  const challenges = [];
  const opportunities = [];

  // Identify strengths from yogas
  analysis.yogas.forEach(yoga => {
    if (yoga.type === "benefic") {
      strengths.push(yoga.yoga);
    } else if (yoga.type === "malefic") {
      challenges.push(yoga.yoga);
    }
  });

  // Identify main problems
  analysis.problems.forEach(problem => {
    if (problem.severity === "high") {
      challenges.push(problem.problem);
    } else {
      opportunities.push(`Work on: ${problem.problem}`);
    }
  });

  return {
    strengths: strengths.length > 0 ? strengths : ["Need more positive yoga configuration"],
    challenges: challenges.length > 0 ? challenges : ["No major yogic afflictions"],
    opportunities: opportunities.length > 0 ? opportunities : ["Steady growth path"],
    overallTone: getOverallTone(analysis),
    nextActions: generateNextActions(analysis)
  };
}

/**
 * Generate life scorecard (0-10 scale for each area)
 */
function generateScorecard(analysis) {
  const scores = {
    career: 5,
    relationships: 5,
    finances: 5,
    health: 5,
    spirituality: 5,
    creativity: 5,
    family: 5,
    overall: 5
  };

  // Adjust based on analysis
  analysis.problems.forEach(problem => {
    const area = problem.area?.toLowerCase();
    if (area && scores[area] !== undefined) {
      scores[area] -= Math.ceil(problem.severity === "high" ? 3 : 1);
    }
  });

  // Boost from benefic yogas
  analysis.yogas.forEach(yoga => {
    if (yoga.type === "benefic" && yoga.severity === "strong") {
      const areas = getYogaAreas(yoga.yoga);
      areas.forEach(area => {
        if (scores[area] !== undefined) {
          scores[area] += 2;
        }
      });
    }
  });

  // Clamp scores between 0-10
  Object.keys(scores).forEach(key => {
    scores[key] = Math.max(0, Math.min(10, scores[key]));
  });

  scores.overall = Math.round(
    Object.keys(scores)
      .filter(k => k !== "overall")
      .reduce((sum, key) => sum + scores[key], 0) / 7
  );

  return scores;
}

/**
 * Generate actionable recommendations
 */
function generateRecommendations(analysis) {
  const recommendations = [];

  // From problems
  analysis.problems.forEach(problem => {
    if (problem.solutions && problem.solutions.length > 0) {
      recommendations.push({
        issue: problem.problem,
        actions: problem.solutions.slice(0, 3),
        priority: problem.severity === "high" ? "HIGH" : "MEDIUM"
      });
    }
  });

  // From yogas
  analysis.yogas.forEach(yoga => {
    if (yoga.type === "benefic") {
      recommendations.push({
        opportunity: `Leverage ${yoga.yoga}`,
        action: yoga.message,
        priority: "HIGH"
      });
    }
  });

  return recommendations.slice(0, 7); // Top 7 recommendations
}

/**
 * Helper: Get overall tone of chart
 */
function getOverallTone(analysis) {
  const beneficYogas = analysis.yogas.filter(y => y.type === "benefic").length;
  const maleficYogas = analysis.yogas.filter(y => y.type === "malefic").length;
  const highProblems = analysis.problems.filter(p => p.severity === "high").length;

  if (beneficYogas > maleficYogas && highProblems <= 2) {
    return "Favorable with opportunities for growth";
  } else if (maleficYogas > beneficYogas && highProblems > 2) {
    return "Challenging but growth possible through effort";
  } else {
    return "Mixed influences requiring balanced approach";
  }
}

/**
 * Helper: Generate next actions
 */
function generateNextActions(analysis) {
  const actions = [];

  // Identify most pressing problems
  const topProblems = analysis.problems
    .filter(p => p.severity === "high")
    .slice(0, 2);

  topProblems.forEach(problem => {
    actions.push(`Address ${problem.problem} through: ${problem.solutions?.[0] || "recommended practices"}`);
  });

  // Add positive actions
  const topYogas = analysis.yogas
    .filter(y => y.type === "benefic")
    .slice(0, 1);

  topYogas.forEach(yoga => {
    actions.push(`Capitalize on ${yoga.yoga} for maximum benefit`);
  });

  if (actions.length < 3) {
    actions.push("Seek guidance from an experienced astrologer for personalized remedies");
  }

  return actions;
}

/**
 * Helper: Get areas affected by yoga
 */
function getYogaAreas(yogaName) {
  const yogaAreas = {
    "Gajakesari Yoga": ["career", "finances", "spirituality"],
    "Chandra-Mangal Yoga": ["finances", "career"],
    "Raj Yoga": ["career", "spirituality"],
    "Parivartana Yoga": ["relationships", "creativity"],
    "Neecha Bhanga Raj Yoga": ["overall", "spirituality"],
    "Mangal Dosha": ["relationships"],
    "Sarpa Dosha": ["spirituality"],
    "Daridra Yoga": ["finances"]
  };

  return yogaAreas[yogaName] || ["overall"];
}

/**
 * Extended analysis with specific question
 */
exports.analyzeChartForQuestion = (chart, question, userAge = null) => {
  const baseAnalysis = exports.analyzeChart(chart, userAge);

  // Add question-specific filtering
  const questionLower = question.toLowerCase();
  
  let relevantData = {
    ...baseAnalysis,
    questionAsked: question,
    questionType: identifyQuestionType(question),
    relevantProblem: null,
    relevantYogas: []
  };

  // Find relevant problem
  relevantData.relevantProblem = baseAnalysis.problems.find(p =>
    p.problem.toLowerCase().includes(questionLower) ||
    questionLower.includes(p.area.toLowerCase())
  );

  // Find relevant yogas
  relevantData.relevantYogas = baseAnalysis.yogas.filter(y =>
    y.message.toLowerCase().includes(questionLower) ||
    questionLower.includes(y.yoga.toLowerCase())
  );

  return relevantData;
};

/**
 * Identify question type for targeted analysis
 */
function identifyQuestionType(question) {
  const q = question.toLowerCase();
  
  if (q.includes("marriage") || q.includes("relationship") || q.includes("wedding")) {
    return "relationship";
  } else if (q.includes("career") || q.includes("job") || q.includes("business")) {
    return "career";
  } else if (q.includes("health") || q.includes("disease") || q.includes("illness")) {
    return "health";
  } else if (q.includes("money") || q.includes("finance") || q.includes("wealth")) {
    return "finance";
  } else if (q.includes("child") || q.includes("baby") || q.includes("conception")) {
    return "children";
  } else if (q.includes("travel") || q.includes("relocation") || q.includes("abroad")) {
    return "travel";
  } else {
    return "general";
  }
}
