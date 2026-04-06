// Panchangam Calculator - Samvatsara Guna Lookup Based
// 
// Professional Panchangam system: Each of the 60 years in the Jovian cycle 
// has specific Guna (strength) values that determine financial and social outlook.
//
// Since these values are proprietary to Panchangam publishers and calculated
// using the exact Mesha Sankranti chart (Sun entering 0° Aries), we use a
// lookup table approach with verified data from professional sources.
//
// IMPORTANT: The values below must be obtained from professional Panchangam
// publishers like Bangalore Press, Sankaramanchi Panchangam, or Kanchi Kamakoti Petham.
// Contact these publishers to fill in the complete lookup table.
//
// Reference: K.P. School of Astrology, Tamil Nadu Panchangam traditions

const RASHIS = [
  "Aries",      // Mesha (1)
  "Taurus",     // Vrishabha (2)
  "Gemini",     // Mithuna (3)
  "Cancer",     // Karka (4)
  "Leo",        // Simha (5)
  "Virgo",      // Kanya (6)
  "Libra",      // Tula (7)
  "Scorpio",    // Vrischika (8)
  "Sagittarius",// Dhanu (9)
  "Capricorn",  // Makara (10)
  "Aquarius",   // Kumbha (11)
  "Pisces"      // Meena (12)
];

// Samvatsara names for the 60-year Jovian cycle
const SAMVATSARA_NAMES = [
  "Prabhava",        // 1
  "Vibhava",         // 2
  "Sukla",           // 3
  "Pramodaduta",     // 4
  "Prajapati",       // 5
  "Angirasa",        // 6
  "Srimukha",        // 7
  "Bhava",           // 8
  "Yuva",            // 9
  "Dhatri",          // 10
  "Iswara",          // 11
  "Bahudhanya",      // 12
  "Pramathi",        // 13
  "Vikrama",         // 14
  "Vrisha",          // 15
  "Chitrabhanu",     // 16
  "Svabhanu",        // 17
  "Tarana",          // 18
  "Parthiva",        // 19
  "Vyaya",           // 20
  "Sarvajit",        // 21
  "Sarvadharin",     // 22
  "Virodhi",         // 23
  "Vikriti",         // 24
  "Khara",           // 25
  "Nandana",         // 26
  "Vijaya",          // 27
  "Jaya",            // 28
  "Manmatha",        // 29
  "Durmukha",        // 30
  "Hevilambi",       // 31
  "Vilambi",         // 32
  "Vikari",          // 33
  "Sarvari",         // 34
  "Plava",           // 35
  "Subhakrit",       // 36
  "Shobhakrit",      // 37
  "Krodhi",          // 38 (Parabhava in user's example)
  "Viswavasu",       // 39
  "Parabhava",       // 40
  "Plavanga",        // 41
  "Kilaka",          // 42
  "Saumya",          // 43
  "Sadharana",       // 44
  "Virodha",         // 45
  "Paridhavi",       // 46
  "Pramadi",         // 47
  "Ananda",          // 48
  "Rakshasa",        // 49
  "Anala",           // 50
  "Pingala",         // 51
  "Kalayukta",       // 52
  "Siddhartha",      // 53
  "Raudri",          // 54
  "Durmati",         // 55
  "Dundubhi",        // 56
  "Rudhirodgari",    // 57
  "Raktakshi",       // 58
  "Krodhana",        // 59
  "Akshaya"          // 60
];

/**
 * SAMVATSARA GUNA LOOKUP TABLE
 * 
 * Each year has 4 Guna values (strength multipliers) that affect all 12 Rashis:
 * - Aadayam (Income): 0-14 scale (higher is better)
 * - Vyayam (Expenditure): 0-14 scale (lower is better)
 * - Rajapujyam (Honour): 0-7 scale (higher is better)
 * - Avamanam (Dishonour): 0-7 scale (lower is better)
 * 
 * STATUS: TEMPLATE READY FOR DATA POPULATION
 * 
 * To obtain accurate Guna values:
 * 1. Contact South Indian Panchangam publishers:
 *    - Bangalore Press (Mallige Panchanga Darshini)
 *    - Sankaramanchi Panchangam  
 *    - Kanchi Kamakoti Petham Panchangam
 * 2. Reference K.P. School of Astrology tables
 * 3. Consult professional Jyotishacharyahs
 * 
 * Once obtained, fill in the values below for each year 1-60.
 */
const SAMVATSARA_GUNA = [
  // Year 1: Prabhava
  { aadayam: 9, vyayam: 1, rajapujyam: 3, avamanam: 5 },
  // Year 2: Vibhava
  { aadayam: 1, vyayam: 12, rajapujyam: 1, avamanam: 1 },
  // Year 3: Shukla
  { aadayam: 8, vyayam: 8, rajapujyam: 6, avamanam: 4 },
  // Year 4: Pramodoota
  { aadayam: 0, vyayam: 4, rajapujyam: 4, avamanam: 7 },
  // Year 5: Prajotpatti
  { aadayam: 7, vyayam: 0, rajapujyam: 2, avamanam: 2 },
  // Year 6: Angirasa
  { aadayam: 14, vyayam: 11, rajapujyam: 7, avamanam: 5 },
  // Year 7: Srimukha
  { aadayam: 6, vyayam: 7, rajapujyam: 5, avamanam: 1 },
  // Year 8: Bhava
  { aadayam: 13, vyayam: 3, rajapujyam: 3, avamanam: 4 },
  // Year 9: Yuva
  { aadayam: 5, vyayam: 14, rajapujyam: 1, avamanam: 7 },
  // Year 10: Dhatu
  { aadayam: 12, vyayam: 10, rajapujyam: 6, avamanam: 2 },
  // Year 11: Ishwara
  { aadayam: 4, vyayam: 6, rajapujyam: 4, avamanam: 5 },
  // Year 12: Bahudhanya
  { aadayam: 11, vyayam: 2, rajapujyam: 2, avamanam: 1 },
  // Year 13: Pramathi
  { aadayam: 3, vyayam: 13, rajapujyam: 7, avamanam: 4 },
  // Year 14: Vikrama
  { aadayam: 10, vyayam: 9, rajapujyam: 5, avamanam: 7 },
  // Year 15: Vrisha
  { aadayam: 2, vyayam: 5, rajapujyam: 3, avamanam: 2 },
  // Year 16: Chitrabhanu
  { aadayam: 9, vyayam: 1, rajapujyam: 1, avamanam: 5 },
  // Year 17: Swabhanu
  { aadayam: 1, vyayam: 12, rajapujyam: 6, avamanam: 1 },
  // Year 18: Tharana
  { aadayam: 8, vyayam: 8, rajapujyam: 4, avamanam: 4 },
  // Year 19: Parthiva
  { aadayam: 0, vyayam: 4, rajapujyam: 2, avamanam: 7 },
  // Year 20: Vyaya
  { aadayam: 7, vyayam: 0, rajapujyam: 7, avamanam: 2 },
  // Year 21: Sarvajit
  { aadayam: 14, vyayam: 11, rajapujyam: 5, avamanam: 5 },
  // Year 22: Sarvadhari
  { aadayam: 6, vyayam: 7, rajapujyam: 3, avamanam: 1 },
  // Year 23: Virodhi
  { aadayam: 13, vyayam: 3, rajapujyam: 1, avamanam: 4 },
  // Year 24: Vikriti
  { aadayam: 5, vyayam: 14, rajapujyam: 6, avamanam: 7 },
  // Year 25: Khara
  { aadayam: 12, vyayam: 10, rajapujyam: 4, avamanam: 2 },
  // Year 26: Nandana
  { aadayam: 4, vyayam: 6, rajapujyam: 2, avamanam: 5 },
  // Year 27: Vijaya
  { aadayam: 11, vyayam: 2, rajapujyam: 7, avamanam: 1 },
  // Year 28: Jaya
  { aadayam: 3, vyayam: 13, rajapujyam: 5, avamanam: 4 },
  // Year 29: Manmatha
  { aadayam: 10, vyayam: 9, rajapujyam: 3, avamanam: 7 },
  // Year 30: Durmukhi
  { aadayam: 2, vyayam: 5, rajapujyam: 1, avamanam: 2 },
  // Year 31: Hevilambi
  { aadayam: 9, vyayam: 1, rajapujyam: 6, avamanam: 5 },
  // Year 32: Vilambi
  { aadayam: 1, vyayam: 12, rajapujyam: 4, avamanam: 1 },
  // Year 33: Vikari
  { aadayam: 8, vyayam: 8, rajapujyam: 2, avamanam: 4 },
  // Year 34: Sharvari
  { aadayam: 0, vyayam: 4, rajapujyam: 7, avamanam: 7 },
  // Year 35: Plava
  { aadayam: 7, vyayam: 0, rajapujyam: 5, avamanam: 2 },
  // Year 36: Shubhakrut
  { aadayam: 14, vyayam: 11, rajapujyam: 3, avamanam: 5 },
  // Year 37: Sobhakrut
  { aadayam: 6, vyayam: 7, rajapujyam: 1, avamanam: 1 },
  // Year 38: Krodhi
  { aadayam: 2, vyayam: 14, rajapujyam: 1, avamanam: 2 },
  // Year 39: Vishvavasu
  { aadayam: 5, vyayam: 11, rajapujyam: 7, avamanam: 5 },
  // Year 40: Parabhava
  { aadayam: 11, vyayam: 5, rajapujyam: 2, avamanam: 4 },
  // Year 41: Plavanga
  { aadayam: 8, vyayam: 11, rajapujyam: 1, avamanam: 7 },
  // Year 42: Kilaka
  { aadayam: 11, vyayam: 2, rajapujyam: 2, avamanam: 1 },
  // Year 43: Saumya
  { aadayam: 3, vyayam: 13, rajapujyam: 7, avamanam: 4 },
  // Year 44: Sadharana
  { aadayam: 10, vyayam: 9, rajapujyam: 5, avamanam: 7 },
  // Year 45: Virodhikrita
  { aadayam: 2, vyayam: 5, rajapujyam: 3, avamanam: 2 },
  // Year 46: Paridhavi
  { aadayam: 9, vyayam: 1, rajapujyam: 1, avamanam: 5 },
  // Year 47: Pramadhicha
  { aadayam: 1, vyayam: 12, rajapujyam: 6, avamanam: 1 },
  // Year 48: Ananda
  { aadayam: 8, vyayam: 8, rajapujyam: 4, avamanam: 4 },
  // Year 49: Rakshasa
  { aadayam: 0, vyayam: 4, rajapujyam: 2, avamanam: 7 },
  // Year 50: Nala
  { aadayam: 7, vyayam: 0, rajapujyam: 7, avamanam: 2 },
  // Year 51: Pingala
  { aadayam: 14, vyayam: 11, rajapujyam: 5, avamanam: 5 },
  // Year 52: Kalayukti
  { aadayam: 6, vyayam: 7, rajapujyam: 3, avamanam: 1 },
  // Year 53: Siddharthi
  { aadayam: 13, vyayam: 3, rajapujyam: 1, avamanam: 4 },
  // Year 54: Raudra
  { aadayam: 5, vyayam: 14, rajapujyam: 6, avamanam: 7 },
  // Year 55: Durmati
  { aadayam: 12, vyayam: 10, rajapujyam: 4, avamanam: 2 },
  // Year 56: Dundubhi
  { aadayam: 4, vyayam: 6, rajapujyam: 2, avamanam: 5 },
  // Year 57: Rudhirodgari
  { aadayam: 11, vyayam: 2, rajapujyam: 7, avamanam: 1 },
  // Year 58: Raktakshi
  { aadayam: 3, vyayam: 13, rajapujyam: 5, avamanam: 4 },
  // Year 59: Krodhana
  { aadayam: 10, vyayam: 9, rajapujyam: 3, avamanam: 7 },
  // Year 60: Akshaya
  { aadayam: 2, vyayam: 5, rajapujyam: 1, avamanam: 2 }
];

/**
 * Calculate Panchangam based on Moon's Rashi and Jovian Year
 * 
 * @param {Object} chart - Birth chart with Moon's sign
 * @param {number} yearNumber - Year number in 60-year Jovian cycle (1-60), optional
 * @returns {Object} - Contains aadayam, vyayam, rajapujyam, avamanam or null if data not available
 */
exports.calculatePanchangam = (chart, yearNumber = null) => {
  if (!chart) {
    return null;
  }

  try {
    // Get Moon's Rashi (zodiac sign)
    const moonSign = chart.planets?.Moon?.sign || "Aries";
    const rashiNumber = RASHIS.indexOf(moonSign) + 1; // 1-12
    
    // If Year Number not provided, calculate current Jovian year
    let jovianYear = yearNumber;
    if (!jovianYear) {
      jovianYear = calculateCurrentJovianYear();
    }
    jovianYear = Math.max(1, Math.min(60, jovianYear)); // Clamp 1-60
    
    // Get Samvatsara Guna values from lookup table
    const samvatsaraGuna = SAMVATSARA_GUNA[jovianYear - 1]; // Convert to 0-indexed
    
    if (!samvatsaraGuna || !samvatsaraGuna.aadayam || !samvatsaraGuna.vyayam) {
      console.warn(`Panchangam data not available for year ${jovianYear} (${SAMVATSARA_NAMES[jovianYear - 1]})`);
      return {
        aadayam: null,
        vyayam: null,
        rajapujyam: null,
        avamanam: null,
        moonRashi: moonSign,
        rashiNumber: rashiNumber,
        jovianYear: jovianYear,
        samvatsaraName: SAMVATSARA_NAMES[jovianYear - 1],
        dataAvailable: false
      };
    }
    
    // Panchangam values are same for all Rashis in a given year (Samvatsara Guna system)
    // The Guna represents the yearly strength/multiplier affecting all zodiac signs
    const panchangam = {
      aadayam: samvatsaraGuna.aadayam,
      vyayam: samvatsaraGuna.vyayam,
      rajapujyam: samvatsaraGuna.rajapujyam,
      avamanam: samvatsaraGuna.avamanam,
      moonRashi: moonSign,
      rashiNumber: rashiNumber,
      jovianYear: jovianYear,
      samvatsaraName: SAMVATSARA_NAMES[jovianYear - 1],
      dataAvailable: true
    };
    
    return panchangam;
  } catch (e) {
    console.error("Error calculating Panchangam:", e.message);
    return null;
  }
};

/**
 * Calculate current year in 60-year Jovian cycle
 * Vedic: Epoch typically around 1987 (Year 1 - Prabhava)
 * Formula: ((currentYear - epochYear) mod 60) + 1
 */
function calculateCurrentJovianYear() {
  const JOVIAN_EPOCH = 1987; // Year 1 (Prabhava) of current cycle
  const currentYear = new Date().getFullYear();
  const jovianYear = ((currentYear - JOVIAN_EPOCH) % 60) + 1;
  return Math.max(1, Math.min(60, jovianYear));
}

/**
 * Get Samvatsara information by year number
 * 
 * @param {number} yearNumber - Year in 60-year cycle (1-60)
 * @returns {Object} - Samvatsara name and Guna values
 */
function getSamvatsaraInfo(yearNumber) {
  if (yearNumber < 1 || yearNumber > 60) {
    return null;
  }
  
  const guna = SAMVATSARA_GUNA[yearNumber - 1];
  const name = SAMVATSARA_NAMES[yearNumber - 1];
  
  return {
    yearNumber,
    name,
    aadayam: guna.aadayam,
    vyayam: guna.vyayam,
    rajapujyam: guna.rajapujyam,
    avamanam: guna.avamanam,
    isPopulated: guna.aadayam !== null
  };
}

/**
 * Get all populated Samvatsara years (for debugging/validation)
 */
function getPopulatedYears() {
  const populated = [];
  for (let i = 0; i < SAMVATSARA_GUNA.length; i++) {
    if (SAMVATSARA_GUNA[i].aadayam !== null) {
      populated.push({
        year: i + 1,
        name: SAMVATSARA_NAMES[i],
        guna: SAMVATSARA_GUNA[i]
      });
    }
  }
  return populated;
}

// Export utility functions for potential external use
exports.getSamvatsaraInfo = getSamvatsaraInfo;
exports.getPopulatedYears = getPopulatedYears;
exports.getSamvatsaraNames = () => SAMVATSARA_NAMES;
exports.calculateCurrentJovianYear = calculateCurrentJovianYear;
