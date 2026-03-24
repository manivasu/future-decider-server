// Planet Analysis based on Brihat Parashara Hora Shastra
// Comprehensive planet placement interpretation

exports.analyzePlanets = (chart) => {
  let results = [];

  const planets = chart.planets || {};
  const { Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Rahu, Ketu } = planets;

  // First, add all planets with their basic data (house, sign, degree)
  const planetList = [
    { name: "Sun", data: Sun },
    { name: "Moon", data: Moon },
    { name: "Mercury", data: Mercury },
    { name: "Venus", data: Venus },
    { name: "Mars", data: Mars },
    { name: "Jupiter", data: Jupiter },
    { name: "Saturn", data: Saturn },
    { name: "Rahu", data: Rahu },
    { name: "Ketu", data: Ketu }
  ];

  // Add all planets with their essential data
  planetList.forEach(({ name, data }) => {
    if (data) {
      results.push({
        planet: name,
        sign: data.sign,
        house: data.house,
        degree: data.degree,
        nakshatra: data.nakshatra,
        strength: data.strength,
        type: "planet"
      });
    }
  });

  // Now add interpretations for specific placements
  // SUN - Authority, Career, Father, Health
  if (Sun) {
    if (Sun.house === 10) {
      results[0].analysis = "Natural leader with authority and public recognition potential.";
      results[0].severity = "positive";
    }
    if (Sun.house === 12) {
      results[0].analysis = "Health challenges or need for spiritual growth.";
      results[0].severity = "medium";
    }
    if (Sun.sign === "Aries" || Sun.sign === "Leo") {
      results[0].analysis = "Sun exalted - confident, authoritative, wealth and status related.";
    }
  }

  // MOON - Mind, Emotions, Mother, Quantity & Quality of Life
  if (Moon) {
    if (Moon.house === 7) {
      results[1].analysis = "Emotional sensitivity in relationships and partnerships.";
    }
    if (Moon.sign === "Taurus" || Moon.sign === "Pisces") {
      results[1].analysis = "Moon exalted - peaceful mind, good emotional stability.";
    }
    if (Moon.sign === "Scorpio") {
      results[1].analysis = "Deep emotional nature, secretive tendencies, need for emotional privacy.";
    }
  }

  // MERCURY - Communication, Intelligence, Business, Siblings
  if (Mercury) {
    if (Mercury.house === 1 || Mercury.house === 10) {
      results[2].analysis = "Excellent communication and analytical skills for business.";
    }
  }

  // VENUS - Beauty, Relationships, Finance, Vehicles
  if (Venus) {
    if (Venus.house === 7) {
      results[3].analysis = "Strong attraction potential, romantic and graceful nature.";
    }
    if (Venus.house === 12) {
      results[3].analysis = "Secret relationships or expenses, sensuality.";
    }
  }

  // MARS - Courage, Energy, Conflict, Siblings, Sports
  if (Mars) {
    if (Mars.house === 1) {
      results[4].analysis = "High energy, ambitious, courageous but may lack maturity or cause aggression.";
    }
    if (Mars.house === 7) {
      results[4].analysis = "Competitive in relationships, passionate but conflict potential.";
      results[4].severity = "high";
    }
    if (Mars.house === 12) {
      results[4].analysis = "Energy turned inward, loss or hidden aggression.";
    }
  }

  // JUPITER - Expansion, Wisdom, Fortune, Children, Luck
  if (Jupiter) {
    if (Jupiter.house === 1) {
      results[5].analysis = "Wisdom, fortune, good health, respectable personality.";
      results[5].severity = "positive";
    }
    if (Jupiter.house === 7) {
      results[5].analysis = "Fortune in marriage/partnerships, harmonious relationships.";
      results[5].severity = "positive";
    }
    if (Jupiter.house === 10) {
      results[5].analysis = "Career success, promotions, social status and honor.";
      results[5].severity = "positive";
    }
  }

  // SATURN - Limitations, Delays, Discipline, Illness, Heavy Work
  if (Saturn) {
    if (Saturn.house === 1) {
      results[6].analysis = "Serious, hardworking, early life challenges but later success.";
      results[6].severity = "medium";
    }
    if (Saturn.house === 7) {
      results[6].analysis = "Marriage delay, but brings lasting commitment and stability.";
      results[6].severity = "high";
    }
    if (Saturn.house === 10) {
      results[6].analysis = "Career progress through hard work and discipline, long-term success.";
      results[6].severity = "medium";
    }
  }

  // RAHU - Ambition, Obsession, Modern Tech, Foreign
  if (Rahu) {
    if (Rahu.house === 1) {
      results[7].analysis = "Ambitious, unconventional, identity confusion may occur.";
    }
  }

  // KETU - Spirituality, Detachment, Past Karma Release
  if (Ketu) {
    if (Ketu.house === 12) {
      results[8].analysis = "Spiritual inclinations, mystical experiences may occur.";
    }
  }

  return results;
};
