// Direct test
const ephemeris = require('./services/ephemeris');

(async () => {
  console.log('Testing directly with 1992-11-14 05:30...');
  const chart = await ephemeris.generateChart('1992-11-14', '05:30', 'Visakhapatnam', 17.3667, 83.3167);
  console.log('\nMoon from generateChart:');
  console.log(JSON.stringify(chart.planets.Moon, null, 2));
  console.log('\nMoon Rashi:', chart.rashi);
  console.log('Moon Nakshatra:', chart.nakshatra);
})();
