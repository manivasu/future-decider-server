// House Analysis based on Parashara and classical principles
// Houses represent different life areas

exports.analyzeHouses = (chart) => {
  let results = [];

  const houses = chart.houses || {};

  // HOUSE 1 - Self, Physical Body, Personality, Health
  if (houses[1]) {
    const house1 = houses[1];
    if (house1.strength === "weak") {
      results.push({
        house: 1,
        area: "Self & Health",
        message: "Physical weakness or health concerns, lack of confidence.",
        severity: "medium"
      });
    }
    if (house1.strength === "strong") {
      results.push({
        house: 1,
        area: "Self & Health",
        message: "Strong personality, good health, natural charisma.",
        severity: "positive"
      });
    }
  }

  // HOUSE 2 - Finances, Family, Speech, Eyes, Food
  if (houses[2]) {
    const house2 = houses[2];
    if (house2.strength === "weak") {
      results.push({
        house: 2,
        area: "Finance & Family",
        type: "finance",
        message: "Financial challenges, family instability or losses.",
        severity: "high"
      });
    }
    if (house2.strength === "strong") {
      results.push({
        house: 2,
        area: "Finance & Family",
        message: "Financial prosperity, family support, success in business.",
        severity: "positive"
      });
    }
  }

  // HOUSE 3 - Siblings, Communication, Courage, Short Travels
  if (houses[3]) {
    const house3 = houses[3];
    if (house3.strength === "weak") {
      results.push({
        house: 3,
        area: "Siblings & Communication",
        message: "Weak communication skills, strained sibling relations.",
        severity: "medium"
      });
    }
  }

  // HOUSE 4 - Mother, Property, Land, Home, Education, Vehicles
  if (houses[4]) {
    const house4 = houses[4];
    if (house4.strength === "weak") {
      results.push({
        house: 4,
        area: "Home & Property",
        message: "Instability in home/property matters, maternal issues.",
        severity: "medium"
      });
    }
  }

  // HOUSE 5 - Children, Creativity, Education, Love Affairs, Speculation
  if (houses[5]) {
    const house5 = houses[5];
    if (house5.strength === "weak") {
      results.push({
        house: 5,
        area: "Children & Creativity",
        message: "Challenges with children, educational difficulties, creative blocks.",
        severity: "medium"
      });
    }
  }

  // HOUSE 6 - Enemies, Diseases, Debt, Service, Competition
  if (houses[6]) {
    const house6 = houses[6];
    if (house6.afflicted) {
      results.push({
        house: 6,
        area: "Enemies & Health",
        message: "Health issues, competition at work, enemies or legal matters.",
        severity: "high"
      });
    }
  }

  // HOUSE 7 - Spouse/Partner, Business, Public, Relationships, Courts
  if (houses[7]) {
    const house7 = houses[7];
    if (house7.strength === "weak") {
      results.push({
        house: 7,
        area: "Relationships & Marriage",
        type: "relationship",
        message: "Challenges in marriage or partnerships, relationship delays.",
        severity: "high"
      });
    }
    if (house7.afflicted) {
      results.push({
        house: 7,
        area: "Relationships & Marriage",
        type: "relationship",
        message: "Significant relationship obstacles or delays in marriage.",
        severity: "high"
      });
    }
    if (house7.strength === "strong") {
      results.push({
        house: 7,
        area: "Relationships & Marriage",
        message: "Harmonious relationships, successful partnerships and marriage.",
        severity: "positive"
      });
    }
  }

  // HOUSE 8 - Longevity, Death, Debts, Wills, Secrets, Transformation
  if (houses[8]) {
    const house8 = houses[8];
    if (house8.strength === "weak") {
      results.push({
        house: 8,
        area: "Transformation & Secrets",
        message: "Potential health crises, inheritance issues or hidden matters.",
        severity: "high"
      });
    }
  }

  // HOUSE 9 - Luck, Religion, Father, Long Travels, Higher Learning, Gurus
  if (houses[9]) {
    const house9 = houses[9];
    if (house9.strength === "weak") {
      results.push({
        house: 9,
        area: "Luck & Fortune",
        message: "Reduced fortune, difficulty finding guidance or spiritual path.",
        severity: "medium"
      });
    }
    if (house9.strength === "strong") {
      results.push({
        house: 9,
        area: "Luck & Fortune",
        message: "Great luck, spiritual inclinations, success in higher learning.",
        severity: "positive"
      });
    }
  }

  // HOUSE 10 - Career, Status, Authority, Reputation, Government
  if (houses[10]) {
    const house10 = houses[10];
    if (house10.strength === "weak") {
      results.push({
        house: 10,
        area: "Career & Status",
        type: "career",
        message: "Career instability or lack of direction, reputation concerns.",
        severity: "high"
      });
    }
    if (house10.strength === "strong") {
      results.push({
        house: 10,
        area: "Career & Status",
        type: "career",
        message: "Strong career growth, public recognition, leadership potential.",
        severity: "positive"
      });
    }
  }

  // HOUSE 11 - Gains, Friends, Wishes, Income, Network
  if (houses[11]) {
    const house11 = houses[11];
    if (house11.strength === "weak") {
      results.push({
        house: 11,
        area: "Gains & Friendships",
        message: "Loss of income or gains, friendship issues, unfulfilled wishes.",
        severity: "medium"
      });
    }
  }

  // HOUSE 12 - Losses, Expenses, Foreign Lands, Bed Pleasures, Spirituality
  if (houses[12]) {
    const house12 = houses[12];
    if (house12.strength === "weak") {
      results.push({
        house: 12,
        area: "Expenses & Spirituality",
        message: "Excessive expenses, foreign travel issues, loss of wealth.",
        severity: "medium"
      });
    }
  }

  return results;
};
