// Extended debug to find Gemini/Ardra position
const ephemeris = require('./ephemeris.js');

async function findGeminiArdra() {
  console.log('Searching for Moon in Gemini/Ardra range (60-90°)...\n');

  // Test different times on same date
  const times = ['00:00', '02:00', '04:00', '05:00', '05:30', '06:00', '08:00', '10:00', '12:00'];
  
  for (const time of times) {
    const chart = await ephemeris.generateChart('1992-11-14', time, 'Visakhapatnam', 17.3667, 83.3167);
    const moon = chart.planets.Moon;
    console.log(`${time} UTC: Moon ${moon.longitude.toFixed(1)}° - ${moon.sign} ${moon.nakshatra}`);
  }

  console.log('\n--- Trying different date ---');
  
  // Maybe it's November 13?
  const times2 = ['20:00', '22:00', '23:00', '23:30'];
  console.log('1992-11-13:');
  for (const time of times2) {
    const chart = await ephemeris.generateChart('1992-11-13', time, 'Visakhapatnam', 17.3667, 83.3167);
    const moon = chart.planets.Moon;
    console.log(`${time} UTC: Moon ${moon.longitude.toFixed(1)}° - ${moon.sign} ${moon.nakshatra}`);
  }
}

findGeminiArdra();
