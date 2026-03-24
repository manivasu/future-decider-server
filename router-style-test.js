// Test as router calls it
const ephemeris = require('./services/ephemeris');

(async () => {
  console.log('Testing AS ROUTER CALLS IT (no lat/lon)...');
  const chart = await ephemeris.generateChart('1992-11-14', '05:30', 'Visakhapatnam');
  console.log('\nMoon from generateChart (router style):');
  console.log(JSON.stringify(chart.planets.Moon, null, 2));
  console.log('\nChart.rashi:', chart.rashi);
  console.log('Chart.nakshatra:', chart.nakshatra);
})();
