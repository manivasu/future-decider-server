// Find the actual date when Moon is in Gemini/Ardra
const ephemeris = require('./ephemeris.js');

async function findCorrectDateForGeminiArdra() {
  console.log('Searching for Moon in Gemini/Ardra (60-90°) in November 1992...\n');

  for (let day = 1; day <= 20; day++) {
    const dateStr = `1992-11-${String(day).padStart(2, '0')}`;
    const chart = await ephemeris.generateChart(dateStr, '12:00', 'Visakhapatnam', 17.3667, 83.3167);
    const moon = chart.planets.Moon;
    
    if (moon.sign === 'Gemini' || moon.sign === 'Taurus') {
      console.log(`📍 ${dateStr}: Moon ${moon.longitude.toFixed(1)}° - ${moon.sign} ${moon.nakshatra} ✓`);
    } else {
      console.log(`${dateStr}: Moon ${moon.longitude.toFixed(1)}° - ${moon.sign}`);
    }
  }

  console.log('\n--- Testing November 11 specifically ---');
  const chart11 = await ephemeris.generateChart('1992-11-11', '08:00', 'Visakhapatnam', 17.3667, 83.3167);
  console.log('1992-11-11 08:00:', chart11.planets.Moon);
}

findCorrectDateForGeminiArdra();
