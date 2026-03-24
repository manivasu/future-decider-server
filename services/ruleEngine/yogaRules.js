// Yoga Analysis - Auspicious & Inauspicious Combinations
// Based on Parashara and classical astrology texts
// Yogas are combinations of planet placements that create special effects

exports.analyzeYogas = (chart) => {
  let results = [];

  const planets = chart.planets || {};
  const { Sun, Moon, Mars, Jupiter, Saturn, Venus, Mercury, Rahu, Ketu } = planets;

  // GAJAKESARI YOGA - Supreme Benefic
  // Jupiter in Kendra (1,4,7,10) from Moon or in same house
  if (Jupiter && Moon) {
    const moonHouse = Moon.house || 0;
    const jupiterHouse = Jupiter.house || 0;
    const distance = Math.abs(jupiterHouse - moonHouse);
    
    if (
      jupiterHouse === moonHouse ||
      distance === 3 ||
      distance === 6 ||
      distance === 9
    ) {
      results.push({
        yoga: "Gajakesari Yoga",
        type: "benefic",
        severity: "strong",
        message: "Intelligence, wisdom, wealth, fame, and good fortune.",
        source: "Brihat Parashara Hora Shastra",
        confidence: 0.95
      });
    }
  }

  // CHANDRA-MANGAL YOGA - Business Skills
  // Moon and Mars in same sign or house
  if (Moon && Mars) {
    if (Moon.house === Mars.house || Moon.sign === Mars.sign) {
      results.push({
        yoga: "Chandra-Mangal Yoga",
        type: "benefic",
        severity: "moderate",
        message: "Financial success, business acumen, emotional strength.",
        confidence: 0.85
      });
    }
  }

  // RAJ YOGA - Royal Combinations
  // Exalted or strong planets in Kendra or Trikona
  if (Jupiter && Jupiter.house && [1, 4, 5, 7, 9, 10].includes(Jupiter.house)) {
    if (Jupiter.strength === "strong" || Jupiter.sign === "Cancer") {
      results.push({
        yoga: "Raj Yoga (Jupiter)",
        type: "benefic",
        severity: "strong",
        message: "Political power, authority, success in ventures.",
        confidence: 0.90
      });
    }
  }

  // VESI YOGA - Acquisition
  // Benefics in 2nd and 12th from Moon
  if (Moon) {
    const moonHouse = Moon.house || 0;
    const secondFromMoon = (moonHouse % 12) + 1;
    const twelfthFromMoon = (moonHouse - 2 + 12) % 12 || 12;
    
    const beneficsInSecond = [Jupiter, Venus, Mercury].some(p => p && p.house === secondFromMoon);
    const beneficsInTwelfth = [Jupiter, Venus, Mercury].some(p => p && p.house === twelfthFromMoon);
    
    if (beneficsInSecond && beneficsInTwelfth) {
      results.push({
        yoga: "Vesi Yoga",
        type: "benefic",
        severity: "moderate",
        message: "Acquisition of wealth and possessions, prosperity.",
        confidence: 0.80
      });
    }
  }

  // PARIVARTANA YOGA - Exchange
  // Two planets in each other's sign
  if (Mars && Venus) {
    const marsOwnSign = ["Aries", "Scorpio"].includes(Mars.sign);
    const venusOwnSign = ["Taurus", "Libra"].includes(Venus.sign);
    
    if (marsOwnSign && venusOwnSign) {
      results.push({
        yoga: "Parivartana Yoga (Mars-Venus)",
        type: "benefic",
        severity: "moderate",
        message: "Exchange of energies, mutual support, artistic and passionate nature.",
        confidence: 0.80
      });
    }
  }

  // NEECHA BHANGA RAJA YOGA - Cancellation of Debilitation
  // When a debilitated planet is saved by another planet
  if (Saturn && Saturn.sign === "Libra") {
    // Saturn debilitated in Libra
    if (Venus && (Venus.strength === "strong" || Venus.house === 9 || Venus.house === 10)) {
      // Venus (Saturn's enemy) in strong position cancels debilitation
      results.push({
        yoga: "Neecha Bhanga Raj Yoga",
        type: "benefic",
        severity: "moderate",
        message: "Overcoming obstacles, limitations transformed into strengths.",
        confidence: 0.85
      });
    }
  }

  // INAUSPICIOUS YOGAS

  // PANCHAK YOGA - Misfortune
  // Saturn-Rahu combination or similar afflictions
  if (Saturn && Rahu && Saturn.house === Rahu.house) {
    results.push({
      yoga: "Saturn-Rahu Conjunction",
      type: "malefic",
      severity: "high",
      message: "Obstacles, delays, misfortune, and difficult life circumstances.",
      confidence: 0.85
    });
  }

  // MANGAL DOSHA / KUJA DOSHA - Mars Affliction
  // Mars in 2, 7, 8, or 12 from Lagna or Moon (delays in marriage)
  if (Mars) {
    if ([2, 7, 8, 12].includes(Mars.house)) {
      results.push({
        yoga: "Mangal Dosha",
        type: "malefic",
        severity: "high",
        message: "Delay in marriage, conflict in relationships, need for remedy.",
        applicableTo: "Marriage",
        confidence: 0.90
      });
    }
  }

  // SARPA DOSHA - Snake Curse (Rahu-Ketu effects)
  if (Rahu && Ketu) {
    const rahuKetu = Math.abs((Rahu.house || 0) - (Ketu.house || 0));
    if (rahuKetu === 0 || rahuKetu === 6) {
      results.push({
        yoga: "Sarpa Dosha",
        type: "malefic",
        severity: "high",
        message: "Karmic obligations, ancestral issues, spiritual challenges.",
        confidence: 0.80
      });
    }
  }

  // DARIDRA YOGA - Poverty
  // Multiple malefics in 8th, 12th, or 6th house
  const maleificsIn812 = [Mars, Saturn, Rahu, Ketu].filter(p => 
    p && (p.house === 8 || p.house === 12)
  ).length;
  
  if (maleificsIn812 >= 2) {
    results.push({
      yoga: "Daridra Yoga",
      type: "malefic",
      severity: "high",
      message: "Financial losses, poverty tendencies, need for hard work.",
      confidence: 0.85
    });
  }

  return results;
};
