// Translation Helper - Converts all analysis to Telugu
// This centralizes all translations in one place

const telugu = require("./telugu");

class TranslationHelper {
  // Translate planet name to Telugu
  static getPlanetTelugu(planetName) {
    return telugu.planets[planetName] || planetName;
  }

  // Translate zodiac sign to Telugu
  static getSignTelugu(signName) {
    return telugu.zodiacSigns[signName] || signName;
  }

  // Translate house number to Telugu name
  static getHouseTelugu(houseNumber) {
    return telugu.houses[houseNumber] || `ఇల్లు ${houseNumber}`;
  }

  // Translate nakshatra to Telugu
  static getNakshatraTelugu(nakshatraName) {
    return telugu.nakshatras[nakshatraName] || nakshatraName;
  }

  // Translate yoga to Telugu
  static getYogaTelugu(yogaName) {
    return telugu.yogas[yogaName] || yogaName;
  }

  // Translate strength to Telugu
  static getStrengthTelugu(strength) {
    const strengthMap = {
      "Strong": telugu.strong,
      "strong": telugu.strong,
      "Weak": telugu.weak,
      "weak": telugu.weak,
      "Moderate": telugu.moderate,
      "moderate": telugu.moderate,
      "Very Strong": telugu.veryStrong,
      "Intense": telugu.intense,
      "Spiritual": telugu.spiritual,
      "Challenging": telugu.challenging,
      "Positive": telugu.positive
    };
    return strengthMap[strength] || strength;
  }

  // Translate severity to Telugu
  static getSeverityTelugu(severity) {
    const severityMap = {
      "high": telugu.severityHigh,
      "medium": telugu.severityMedium,
      "low": telugu.severityLow,
      "positive": "సానుకూల"
    };
    return severityMap[severity] || severity;
  }

  // Translate entire planet result to Telugu
  static translatePlanetResult(result) {
    return {
      ...result,
      planet: this.getPlanetTelugu(result.planet),
      sign: result.sign ? this.getSignTelugu(result.sign) : result.sign,
      placement: result.placement ? result.placement.replace(/House (\d+)/, (match, num) => `ఇల్లు ${num}`) : result.placement,
      strength: result.strength ? this.getStrengthTelugu(result.strength) : result.strength,
      severity: result.severity ? this.getSeverityTelugu(result.severity) : result.severity
    };
  }

  // Translate entire house result to Telugu
  static translateHouseResult(result) {
    return {
      ...result,
      house: result.house,
      area: telugu.houseDescriptions[result.house] || result.area,
      strength: result.strength ? this.getStrengthTelugu(result.strength) : result.strength
    };
  }

  // Translate entire yoga result to Telugu
  static translateYogaResult(result) {
    return {
      ...result,
      yoga: this.getYogaTelugu(result.yoga),
      type: result.type === "benefic" ? "శుభ" : "అశుభ"
    };
  }

  // Translate entire problem result to Telugu
  static translateProblemResult(result) {
    return {
      ...result,
      problem: this.translateProblemName(result.problem),
      area: this.translateArea(result.area),
      severity: this.getSeverityTelugu(result.severity),
      solutions: result.solutions ? result.solutions.map(s => this.translateSolution(s)) : result.solutions
    };
  }

  // Helper to translate common problem names
  static translateProblemName(problemName) {
    const nameMap = {
      "Marriage Delay": "వివాహ ఆలస్యం",
      "Career Growth Through Hard Work": "కష్టపరిశ్రమ ద్వారా ఉద్యోగ వృద్ధి",
      "Career Instability or Direction Issues": "ఉద్యోగ అస్థిరత లేదా దిశ సమస్యలు",
      "Financial Instability or Lack of Resources": "ఆర్థిక అస్థిరత లేదా సంపదల లేమి",
      "Health Weaknesses or Chronic Issues": "ఆరోగ్య బలహీనతలు లేదా దీర్ఘకాలిక సమస్యలు",
      "Relationship Conflict and Passionate Interactions": "సంబంధ సంఘర్షణ మరియు తీవ్ర పరస్పర చర్య",
      "Emotional Intensity and Deep Feelings": "భావోద్వేగ తీవ్రత మరియు లోతైన భావాలు",
      "Distance from Family or Separation Issues": "కుటుంబం నుండి దూరం లేదా వేరుచేయుటకు సమస్యలు",
      "Financial Obligations, Debts, or Losses": "ఆర్థిక బాధ్యతలు, ఋణాలు లేదా నష్టాలు",
      "Reduced Fortune or Lack of Opportunities": "తగ్గిన అదృష్టం లేదా అవకాశాల లేమి",
      "Social Shyness or Isolation Tendencies": "సామాజిక సిగ్గు లేదా ఏకాంતత ప్రవృత్తులు",
      "Communication or Learning Difficulties": "సంభాషణ లేదా అభ్యాస ఇబ్బందులు"
    };
    return nameMap[problemName] || problemName;
  }

  // Helper to translate area names
  static translateArea(area) {
    const areaMap = {
      "Relationships": "సంబంధాలు",
      "Career": "ఉద్యోగం",
      "Finance": "ఆర్థిక",
      "Health": "ఆరోగ్య",
      "Mental Health": "మానసిక ఆరోగ్య",
      "Family": "కుటుంబం",
      "Luck & Opportunity": "అదృష్టం & అవకాశం",
      "Personality": "వ్యక్తిత్వం",
      "Education": "విద్య"
    };
    return areaMap[area] || area;
  }

  // Helper to translate solution text
  static translateSolution(solution) {
    const solutionMap = {
      "Patience and maturity bring stable relationships.": "ఓర్పు మరియు పరిపక్వత స్థిర సంబంధాలను తీసుకువస్తాయి.",
      "Consider marriage after age 30-36 for better stability.": "మెరుగైన స్థిరత కోసం 30-36 సంవత్సరాల తర్వాత వివాహం పరిగణించండి.",
      "Strengthen Venus through remedies (diamond, white clothing).": "నిర్వారణ ద్వారా శుక్రుడిని బలపరచండి (వజ్రం, తెలుపు దుస్తులు).",
      "Seek partner with strong Jupiter and Venus placements.": "బలమైన గురువు మరియు శుక్ర స్థానంలో భాగస్వామిని కోసం చేస్తాయి.",
      "Focus on skill development and patience.": "నైపుణ్య అభివృద్ధి మరియు ఓర్పుపై దృష్టి సారించండి.",
      "Long-term planning brings success, avoid quick changes.": "దీర్ఘకాలిన ప్రణాళిక విజయం తీసుకువస్తుంది, శీఘ్ర మార్పులను నివారించండి.",
      "Strengthen Saturn through discipline and karma yoga.": "క్షమ మరియు కర్మ యోగ ద్వారా శని ను బలపరచండి.",
      "Take on responsible positions for better outcomes.": "మంచి ఫలితాల కోసం బాధ్యత వహించే స్థానాలను చేపట్టండి.",
      "Seek mentorship and clear career guidance.": "సలహాదారు మరియు స్పష్ట ఉద్యోగ మార్గదర్శకతను కోసం చేస్తాయి.",
      "Identify passion area and pursue certification.": "ఆసక్తి ప్రాంతాన్ని గుర్తించండి మరియు సర్టిఫికేషన్‌ను కోసం చేస్తాయి.",
      "Improve financial literacy and budgeting.": "ఆర్థిక సాక్షరత మరియు బడ్జెట్‌ను మెరుగుపరచండి.",
      "Invest in education for better income opportunities.": "ఉత్తమ ఆదాయ అవకాశాల కోసం విద్యలో పెట్టుబడి పెట్టండి.",
      "Strengthen Jupiter through charity and yellow clothing.": "దాతృత్వం మరియు పసుపు దుస్తుల ద్వారా గురువును బలపరచండి.",
      "Avoid risky speculation; focus on stable income.": "ఝుకీ ఊహాలను నివారించండి; స్థిర ఆదాయపై దృష్టి సారించండి."
    };
    return solutionMap[solution] || solution;
  }

  // Translate all analysis results
  static translateAllResults(analysis) {
    return {
      ...analysis,
      planets: analysis.planets?.map(p => this.translatePlanetResult(p)) || [],
      houses: analysis.houses?.map(h => this.translateHouseResult(h)) || [],
      yogas: analysis.yogas?.map(y => this.translateYogaResult(y)) || [],
      problems: analysis.problems?.map(p => this.translateProblemResult(p)) || [],
      summary: this.translateSummary(analysis.summary),
      recommendations: analysis.recommendations?.map(r => this.translateRecommendation(r)) || []
    };
  }

  static translateSummary(summary) {
    if (!summary) return summary;
    return {
      ...summary,
      strengths: summary.strengths?.map(s => this.translateArea(s) || this.getYogaTelugu(s)) || [],
      challenges: summary.challenges?.map(c => this.translateProblemName(c) || this.getYogaTelugu(c)) || [],
      opportunities: summary.opportunities?.map(o => o.replace(/Work on: /, "పని: ") || o) || [],
      overallTone: this.translateTone(summary.overallTone),
      nextActions: summary.nextActions?.map(a => this.translateAction(a)) || []
    };
  }

  static translateAction(action) {
    const actionMap = {
      "Address": "పరిష్కరించండి",
      "through": "ద్వారా",
      "recommended practices": "సిఫారసు చేసిన అభ్యాసాలు",
      "Capitalize on": "దీని ఆధారంగా రాపిడి చేయండి",
      "for maximum benefit": "గరిష్ఠ ప్రయోజనం కోసం",
      "Seek guidance from an experienced astrologer": "అనుభవం చెందిన జ్యోతిషి నుండి మార్గదర్శకత సందర్భించండి"
    };
    let translated = action;
    Object.entries(actionMap).forEach(([eng, tel]) => {
      translated = translated.replace(new RegExp(eng, "g"), tel);
    });
    return translated;
  }

  static translateTone(tone) {
    const toneMap = {
      "Favorable with opportunities for growth": "వృద్ధి కోసం అవకాశాలతో అనుకూలమైనది",
      "Challenging but growth possible through effort": "సవాలుభరితమైనది కానీ ప్రయత్నం ద్వారా వృద్ధి సాధ్యమైనది",
      "Mixed influences requiring balanced approach": "సమతుల్య విధానం కోసం మిశ్రమ ప్రభావాలు"
    };
    return toneMap[tone] || tone;
  }

  static translateRecommendation(rec) {
    return {
      ...rec,
      issue: rec.issue ? this.translateProblemName(rec.issue) : rec.issue,
      opportunity: rec.opportunity ? this.getYogaTelugu(rec.opportunity) : rec.opportunity,
      actions: rec.actions?.map(a => this.translateAction(a)) || [],
      priority: rec.priority
    };
  }

  // Main static method to translate entire analysis to Telugu
  static translateAllResults(analysis) {
    if (!analysis) return analysis;

    const translated = {
      ...analysis,
      planets: (analysis.planets || []).map(planet => ({
        ...planet,
        planet: this.getPlanetTelugu(planet.planet),
        sign: planet.sign ? this.getSignTelugu(planet.sign) : planet.sign,
        placement: planet.placement ? planet.placement.replace(/House (\d+)/, (m, num) => `ఇల్లు ${num}`) : planet.placement,
        message: translateMessage(planet.message),
        strength: planet.strength ? this.getStrengthTelugu(planet.strength) : planet.strength,
        type: planet.type ? this.translateArea(planet.type) : planet.type,
        nakshatra: planet.nakshatra ? this.getNakshatraTelugu(planet.nakshatra) : planet.nakshatra
      })),
      
      houses: (analysis.houses || []).map(house => ({
        ...house,
        area: this.translateArea(house.area),
        message: translateMessage(house.message),
        strength: house.strength ? this.getStrengthTelugu(house.strength) : house.strength
      })),
      
      yogas: (analysis.yogas || []).map(yoga => ({
        ...yoga,
        yoga: this.getYogaTelugu(yoga.yoga),
        type: yoga.type === "benefic" ? "శుభ" : "అశుభ",
        message: translateMessage(yoga.message)
      })),
      
      problems: (analysis.problems || []).map(problem => ({
        ...problem,
        problem: this.translateProblemName(problem.problem),
        area: this.translateArea(problem.area),
        message: translateMessage(problem.message),
        detection: translateMessage(problem.detection),
        reason: translateMessage(problem.reason),
        timeline: translateMessage(problem.timeline),
        severity: problem.severity === "high" ? "ఎక్కువ" : problem.severity === "medium" ? "మధ్యమ" : "తక్కువ",
        solutions: (problem.solutions || []).map(sol => this.translateSolution(sol))
      })),
      
      summary: analysis.summary ? {
        ...analysis.summary,
        overallTone: translateMessage(analysis.summary.overallTone),
        strengths: (analysis.summary.strengths || []).map(s => this.translateProblemName(s) || translateMessage(s)),
        challenges: (analysis.summary.challenges || []).map(c => this.translateProblemName(c) || translateMessage(c)),
        opportunities: (analysis.summary.opportunities || []).map(o => translateMessage(o)),
        nextActions: (analysis.summary.nextActions || []).map(a => translateMessage(a))
      } : analysis.summary,
      
      scorecard: analysis.scorecard ? {
        ...analysis.scorecard,
        career: analysis.scorecard.career,
        relationships: analysis.scorecard.relationships,
        finances: analysis.scorecard.finances,
        health: analysis.scorecard.health,
        spirituality: analysis.scorecard.spirituality,
        creativity: analysis.scorecard.creativity,
        family: analysis.scorecard.family,
        overall: analysis.scorecard.overall
      } : {},
      
      recommendations: (analysis.recommendations || []).map(rec => ({
        ...rec,
        issue: rec.issue ? this.translateProblemName(rec.issue) : rec.issue,
        opportunity: rec.opportunity ? this.getYogaTelugu(rec.opportunity) : rec.opportunity,
        actions: (rec.actions || []).map(a => translateMessage(a))
      })),
      
      dasha: analysis.dasha ? {
        ...analysis.dasha,
        lord: analysis.dasha.lord ? this.getPlanetTelugu(analysis.dasha.lord) : analysis.dasha.lord
      } : analysis.dasha,
      
      dashaInterpretation: analysis.dashaInterpretation ? {
        ...analysis.dashaInterpretation,
        currentDasha: analysis.dashaInterpretation.currentDasha ? this.getPlanetTelugu(analysis.dashaInterpretation.currentDasha) : analysis.dashaInterpretation.currentDasha,
        theme: translateMessage(analysis.dashaInterpretation.theme),
        expectations: translateMessage(analysis.dashaInterpretation.expectations)
      } : analysis.dashaInterpretation,
      
      panchangam: analysis.panchangam ? this.translatePanchangam(analysis.panchangam) : analysis.panchangam,
      aadayam: analysis.aadayam !== undefined ? analysis.aadayam : null,
      vyayam: analysis.vyayam !== undefined ? analysis.vyayam : null,
      rajapujyam: analysis.rajapujyam !== undefined ? analysis.rajapujyam : null,
      avamanam: analysis.avamanam !== undefined ? analysis.avamanam : null
    };
    
    return translated;
  }

  // Translate Panchangam results to Telugu
  // Panchangam values are numerical (0-14 and 0-7), so no translation needed
  // Just ensure proper formatting
  static translatePanchangam(panchangam) {
    if (!panchangam) return panchangam;
    
    // If Panchangam data is not populated yet, return null to hide the section
    if (panchangam.dataAvailable === false) {
      return null;
    }
    
    return {
      ...panchangam,
      aadayam: panchangam.aadayam !== null ? panchangam.aadayam : undefined,
      vyayam: panchangam.vyayam !== null ? panchangam.vyayam : undefined,
      rajapujyam: panchangam.rajapujyam !== null ? panchangam.rajapujyam : undefined,
      avamanam: panchangam.avamanam !== null ? panchangam.avamanam : undefined,
      moonRashi: panchangam.moonRashi,
      housePosition: panchangam.housePosition,
      houseLord: this.getPlanetTelugu(panchangam.houseLord || "Sun"),
      year: panchangam.year
    };
  }
}

// Helper function to translate general messages
function translateMessage(message) {
  if (!message || typeof message !== 'string') return message;
  
  const messageMap = {
    // Problem names and areas
    "Marriage Delay": "వివాహ ఆలస్యం",
    "Career Growth Through Hard Work": "కష్టపరిశ్రమ ద్వారా ఉద్యోగ వృద్ధి",
    "Career Instability or Direction Issues": "ఉద్యోగ అస్థిరత లేదా దిశ సమస్యలు",
    "Financial Instability or Lack of Resources": "ఆర్థిక అస్థిరత లేదా సంపదల లేమి",
    "Health Weaknesses or Chronic Issues": "ఆరోగ్య బలహీనతలు లేదా దీర్ఘకాలిక సమస్యలు",
    "Relationship Conflict and Passionate Interactions": "సంబంధ సంఘర్షణ మరియు తీవ్ర పరస్పర చర్య",
    "Emotional Intensity and Deep Feelings": "భావోద్వేగ తీవ్రత మరియు లోతైన భావాలు",
    "Distance from Family or Separation Issues": "కుటుంబం నుండి దూరం లేదా వేరుచేయుటకు సమస్యలు",
    "Financial Obligations, Debts, or Losses": "ఆర్థిక బాధ్యతలు, ఋణాలు లేదా నష్టాలు",
    "Reduced Fortune or Lack of Opportunities": "తగ్గిన అదృష్టం లేదా అవకాశాల లేమి",
    "Social Shyness or Isolation Tendencies": "సామాజిక సిగ్గు లేదా ఏకాంతత ప్రవృత్తులు",
    "Communication or Learning Difficulties": "సంభాషణ లేదా అభ్యాస ఇబ్బందులు",
    
    // Common phrases and detection text
    "Saturn in 7th House": "7వ ఇల్లులో శని",
    "Saturn causes delays and tests in marriage/partnerships.": "శని వివాహ/భాగీదారీ సంబంధాలలో ఆలస్యం మరియు పరీక్షలను కలిగిస్తుంది.",
    "Saturn in 10th House": "10వ ఇల్లులో శని",
    "Saturn brings delayed but steady career success through discipline.": "శని క్రమశిక్షణ ద్వారా ఆలస్య కానీ స్థిర ఉద్యోగ విజయం తీసుకువస్తుంది.",
    "Weak 10th House": "బలహీన 10వ ఇల్లు",
    "Weak 10th house indicates lack of clear career path.": "బలహీన 10వ ఇల్లు స్పష్ట ఉద్యోగ మార్గం లేకపోవడం సూచిస్తుంది.",
    "Weak or Afflicted 2nd House": "బలహీన లేదా ఆటించిన 2వ ఇల్లు",
    "2nd house governs wealth, family security, and resources.": "2వ ఇల్లు సంపద, కుటుంబ భద్రత మరియు వనరులను నిర్వహిస్తుంది.",
    
    // Solutions
    "Patience and maturity bring stable relationships.": "ఓర్పు మరియు పరిపక్వత స్థిర సంబంధాలను తీసుకువస్తాయి.",
    "Consider marriage after age 30-36 for better stability.": "మెరుగైన స్థిరత కోసం 30-36 సంవత్సరాల తర్వాత వివాహం పరిగణించండి.",
    "Strengthen Venus through remedies (diamond, white clothing).": "వజ్రం, తెలుపు దుస్తుల ద్వారా శుక్రుడిని బలపరచండి.",
    "Seek partner with strong Jupiter and Venus placements.": "బలమైన గురువు మరియు శుక్ర స్థానంలో భాగస్వామిని చేసుకోండి.",
    "Focus on skill development and patience.": "నైపుణ్య అభివృద్ధి మరియు ఓర్పుపై దృష్టి సారించండి.",
    "Long-term planning brings success, avoid quick changes.": "దీర్ఘకాలిన ప్రణాళిక విజయం తీసుకువస్తుంది, శీఘ్ర మార్పులను నివారించండి.",
    "Strengthen Saturn through discipline and karma yoga.": "క్రమశిక్షణ మరియు కర్మ యోగ ద్వారా శని ను బలపరచండి.",
    "Take on responsible positions for better outcomes.": "మంచి ఫలితాల కోసం బాధ్యత వహించే స్థానాలను చేపట్టండి.",
    "Seek mentorship and clear career guidance.": "సలహాదారు మరియు స్పష్ట ఉద్యోగ మార్గదర్శకతను కోసం చేస్తాయి.",
    "Identify passion area and pursue certification.": "ఆసక్తి ప్రాంతాన్ని గుర్తించండి మరియు సర్టిఫికేషన్‌ను పంచుకోండి.",
    "Strengthen Sun and Mercury through remedies.": "నిర్వారణ ద్వారా సూర్యుడు మరియు బుధుడిని బలపరచండి.",
    "Take on leadership roles to build authority.": "అధికారం రూపొందించడానికి నేతృత్వ పాత్రలను చేపట్టండి.",
    "Improve financial literacy and budgeting.": "ఆర్థిక సాక్షరత మరియు బడ్జెట్‌ను మెరుగుపరచండి.",
    "Invest in education for better income opportunities.": "ఉత్తమ ఆదాయ అవకాశాల కోసం విద్యలో పెట్టుబడి పెట్టండి.",
    "Strengthen Jupiter through charity and yellow clothing.": "దాతృత్వం మరియు పసుపు దుస్తుల ద్వారా గురువును బలపరచండి.",
    "Avoid risky speculation; focus on stable income.": "ఝుకీ ఊహాలను నివారించండి; స్థిర ఆదాయపై దృష్టి సారించండి.",
    "Regular exercise and health check-ups.": "సాధారణ వ్యాయామం మరియు ఆరోగ్య పరీక్షలు.",
    "Strengthen Sun through early morning routine.": "ఉదయం నిතారిత రూటీన్ ద్వారా సూర్యుడిని బలపరచండి.",
    "Avoid excessive stress and fatigue.": "అధిక ఒత్తిడి మరియు అలసట నివారించండి.",
    "Wear ruby or red clothing for vitality.": "శక్తి కోసం రూబీ లేదా ఎరుపు దుస్తులను ధరించండి.",
    "Practice patience and active listening in relationships.": "సంబంధాలలో ఓర్పు మరియు సక్రియ శ్రవణ ఆచరణ చేయండి.",
    "Channel Mars energy into shared activities/sports.": "మంగళ శక్తిని భాగస్వామ్య కార్యకలాపాలు/క్రీడలలోకి దర్శించండి.",
    "Choose partner with calm Moon placement.": "శాంతియుక్త చంద్ర స్థానం కలిగిన భాగస్వామిని ఎన్నుకోండి.",
    "Strengthen Venus for harmony in relationships.": "సంబంధాలలో సామరస్యం కోసం శుక్రుడిని బలపరచండి.",
    "Practice meditation and emotional expression.": "ధ్యానం మరియు భావోద్వేగ వ్యక్తీకరణను ఆచరణ చేయండి.",
    "Build trust through honest relationships.": "సత్యవంత సంబంధాల ద్వారా విశ్వాసం నిర్మించండి.",
    "Channel intensity into research, investigation, or psychology.": "తీవ్రతను పరిశోధన, సందర్భ విచారణ లేదా మనస్తత్త్వశాస్త్రంలోకి దర్శించండి.",
    "Strengthen Moon through white and copper remedies.": "తెలుపు మరియు రాగి నిర్వారణ ద్వారా చంద్రుడిని బలపరచండి.",
    "Maintain regular communication with family.": "కుటుంబం తో సాధారణ సంభాషణ నిర్వహించండి.",
    "Visit home whenever possible.": "వీలైతే ఇంటికి సందర్శించండి.",
    "Practice gratitude for family bonds.": "కుటుంబ బంధాల కోసం ఆभాస్సు నిర్వహణ చేయండి.",
    "Balance independence with family values.": "స్వాతంత్ర్యం మరియు కుటుంబ విలువలను సమతుల్యం చేయండి.",
    "Pay off debts systematically.": "ఋణాలను క్రమబద్ధంగా చెల్లించండి.",
    "Avoid loans and borrowing.": "రుణాలు మరియు అప్పులను నివారించండి.",
    "Build emergency fund through disciplined saving.": "క్రమశిక్ష సమృద్ధీకరణ ద్వారా విపత్కర నిధిని నిర్మించండి.",
    "Strengthen Jupiter for wealth increase.": "సంపద పెరుగుదల కోసం గురువును బలపరచండి.",
    "Develop spiritual practices and meditation.": "ఆధ్యాత్మిక ఆచరణలు మరియు ధ్యానం అభివర్ణించండి.",
    "Share knowledge generously with others.": "జ్ఞానాన్ని ఇతరులతో ఉదారంగా పంచుకోండి.",
    "Donate and practice charity for Jupiter strengthening.": "గురువు బలపరచడానికి దానం చేయండి మరియు దాతృత్వం ఆచరించండి.",
    "Seek wisdom from gurus and mentors.": "గురువుల మరియు సలహాదారుల నుండి జ్ఞానం కోసం చేస్తాయి.",
    "Gradually build social confidence through activities.": "కార్యకలాపాల ద్వారా క్రమంగా సామాజిక ఆత్మవిశ్వాసం నిర్మించండి.",
    "Pursue structured learning and skill development.": "నిర్మిత శిక్షణ మరియు నైపుణ్య అభివృద్ధిని చేపట్టండి.",
    "Take on small leadership responsibilities.": "చిన్న నేతృత్వ బాధ్యతలను చేపట్టండి.",
    "Strengthen Sun through morning routines and exercise.": "ఉదయం నిష్పత్తులు మరియు వ్యాయామ ద్వారా సూర్యుడిని బలపరచండి.",
    "Practice writing and public speaking.": "రచన మరియు ప్రజా పలుకు ఆచరణ చేయండి.",
    "Study under experienced mentors.": "అనుభవం చెందిన సలహాదారుల క్రింద అధ్యయనం చేయండి.",
    "Use visualization for learning enhancement.": "శిక్షణ సమర్థన కోసం దృశ్య చిత్రణను ఉపయోగించండి.",
    "Strengthen Mercury through green clothing and emerald.": "ఆకు దుస్తులు మరియు పచ్ఛ రత్నం ద్వారా బుధుడిని బలపరచండి.",
    
    // Yogas
    "Gajakesari Yoga": "గజకేసరి యోగ",
    "Chandra-Mangal Yoga": "చంద్ర-మంగళ యోగ",
    "Raj Yoga": "రాజ యోగ",
    "Parivartana Yoga": "పరివర్తన యోగ",
    "Neecha Bhanga Raj Yoga": "నీచ భంగ రాజ యోగ",
    "Mangal Dosha": "మంగళ దోష",
    "Sarpa Dosha": "సర్ప దోష",
    "Daridra Yoga": "దరిద్ర యోగ",
    
    // Vedic/Sanskrit terms
    "Brihat Parashara Hora Shastra": "బృహత్ పారాశర హోర శాస్త్ర",
    "Parashara": "పారాశర",
    "Key Recommendations": "ముఖ్య సిఫారసులు",
    "MEDIUM": "మధ్యమ",
    "HIGH": "ఎక్కువ",
    "LOW": "తక్కువ",
    "Confidence": "నమ్మకం",
    
    // Planet descriptions
    "Natural leader with authority and public recognition potential.": "ఆధికారం మరియు ప్రజా గుర్తింపు సంభావ్యతకు సహజ నేత.",
    "Health challenges or need for spiritual growth.": "ఆరోగ్య సవాళ్లు లేదా ఆధ్యాత్మిక వృద్ధి అవసరం.",
    "Sun exalted - confident, authoritative, wealth and status related.": "సూర్యుడు ఉన్నత - ఆత్మవిశ్వాస, ఆధికారం, సంపద మరియు స్థితికి సంబంధించినది.",
    "Emotional sensitivity in relationships and partnerships.": "సంబంధాలు మరియు భాగీదారీలలో భావోద్వేగ సూక్ష్మత.",
    "Moon exalted - peaceful mind, good emotional stability.": "చంద్రుడు ఉన్నత - శాంతియుక్త మనస్సు, మంచి భావోద్వేగ స్థిరత.",
    "Deep emotional nature, secretive tendencies, need for emotional privacy.": "లోతైన భావోద్వేగ స్వభావం, రహస్య ప్రవృత్తులు, భావోద్వేగ గోప్యతా అవసరం.",
    "Excellent communication and analytical skills for business.": "ఉద్యోగం కోసం అద్భుత సంభాషణ మరియు విశ్లేషణాత్మక నైపుణ్యాలు.",
    "Strong attraction potential, romantic and graceful nature.": "బలమైన ఆకర్షణ సంభావ్యత, రోమాంటిక మరియు సోపానమైన స్వభావం."
  };
  
  let translated = message;
  Object.entries(messageMap).forEach(([eng, tel]) => {
    translated = translated.split(eng).join(tel);
  });
  
  return translated;
}

function translateArea(area) {
  const areaMap = {
    "career": "ఉద్యోగం",
    "relationship": "సంబంధం",
    "relationships": "సంబంధాలు",
    "health": "ఆరోగ్య",
    "finance": "ఆర్థిక",
    "family": "కుటుంబం"
  };
  return areaMap[area?.toLowerCase()] || area;
}

module.exports = TranslationHelper;

