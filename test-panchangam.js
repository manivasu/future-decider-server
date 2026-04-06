const panchangam = require('./services/ruleEngine/panchangamRules.js');

console.log('Panchangam Lookup Table System');
console.log('='.repeat(90));
console.log('');

// Test with different Rashis
const rashis = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

console.log('Current Jovian Year:', panchangam.calculateCurrentJovianYear());
console.log('');

console.log('Testing Panchangam for year 26 (2012-2013):');
console.log('-'.repeat(90));

rashis.forEach((rashi, idx) => {
  const chart = { planets: { Moon: { sign: rashi } } };
  const result = panchangam.calculatePanchangam(chart, 26); // Year 26: Nandana
  
  if (result.dataAvailable) {
    console.log(`${rashi.padEnd(15)} | Aadayam: ${result.aadayam}, Vyayam: ${result.vyayam}, Rajapujyam: ${result.rajapujyam}, Avamanam: ${result.avamanam}`);
  } else {
    console.log(`${rashi.padEnd(15)} | ⚠️  Data not populated for year ${result.jovianYear} (${result.samvatsaraName})`);
  }
});

console.log('');
console.log('Samvatsara Names (60-year cycle):');
console.log('-'.repeat(90));
const names = panchangam.getSamvatsaraNames();
for (let i = 0; i < 60; i += 6) {
  const chunk = names.slice(i, i + 6);
  console.log(
    chunk
      .map((name, idx) => `${(i + idx + 1).toString().padStart(2)}: ${name}`)
      .join(' | ')
  );
}

console.log('');
console.log('Status: Lookup table is ready for data population.');
console.log('         Fill in SAMVATSARA_GUNA array with values from professional Panchangam sources.');

