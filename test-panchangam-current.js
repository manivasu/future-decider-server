const panchangam = require('./services/ruleEngine/panchangamRules.js');

console.log('✅ Panchangam Data - Current Year (2026-2027)');
console.log('='.repeat(90));
console.log('');

const currentYear = panchangam.calculateCurrentJovianYear();
console.log(`Jovian Year: ${currentYear} (Parabhava)`);
console.log('');

// Test with all Rashis for current year
const rashis = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

console.log('Panchangam values for all Rashis in Parabhava (Year 40):');
console.log('-'.repeat(90));

rashis.forEach((rashi) => {
  const chart = { planets: { Moon: { sign: rashi } } };
  const result = panchangam.calculatePanchangam(chart); // Uses current year automatically
  
  console.log(`${rashi.padEnd(15)} | Aadayam: ${result.aadayam.toString().padStart(2)}/14 | Vyayam: ${result.vyayam.toString().padStart(2)}/14 | Rajapujyam: ${result.rajapujyam}/7 | Avamanam: ${result.avamanam}/7`);
});

console.log('');
console.log('Note: All Rashis have SAME Panchangam values in a given year.');
console.log('      This is correct - Panchangam is Samvatsara-specific, not Rashi-specific.');
console.log('');

// Test specific example
console.log('Example: Parabhava (Year 40) Interpretation:');
console.log('-'.repeat(90));
const virgoChart = { planets: { Moon: { sign: 'Virgo' } } };
const virgoResult = panchangam.calculatePanchangam(virgoChart);
console.log(`Aadayam (Income):  ${virgoResult.aadayam}/14 - ${virgoResult.aadayam >= 7 ? 'Good income year' : 'Moderate income'}`);
console.log(`Vyayam (Losses):   ${virgoResult.vyayam}/14 - ${virgoResult.vyayam >= 7 ? 'High expenses' : 'Low expenses'}`);
console.log(`Rajapujyam (Honour): ${virgoResult.rajapujyam}/7 - ${virgoResult.rajapujyam >= 5 ? 'High social standing' : virgoResult.rajapujyam >= 3 ? 'Moderate honour' : 'Low honour'}`);
console.log(`Avamanam (Dishonour): ${virgoResult.avamanam}/7 - ${virgoResult.avamanam <= 2 ? 'Low risk' : virgoResult.avamanam <= 4 ? 'Moderate risk' : 'High risk'}`);
