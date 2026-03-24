// Debug test for Visakhapatnam birth data
const ephemeris = require('./ephemeris.js');

async function debugVisakhapatnam() {
  console.log('Testing Visakhapatnam birth data: 1992-11-14 05:30');
  console.log('Expected: Moon in Gemini, Nakshatra Ardra\n');

  // Timezone consideration:
  // Visakhapatnam is in IST (UTC+5:30)
  // If the time is entered as 05:30 IST, we need to convert to UTC
  // 05:30 IST - 5:30 = 00:00 UTC
  
  console.log('Test 1: 05:30 (assuming UTC - CURRENT METHOD)');
  const chart1 = await ephemeris.generateChart('1992-11-14', '05:30', 'Visakhapatnam', 17.3667, 83.3167);
  console.log('Moon Position:', chart1.planets.Moon);
  console.log('Moon Rashi:', chart1.rashi);
  console.log('Moon Nakshatra:', chart1.nakshatra);
  console.log('');

  console.log('Test 2: 00:00 UTC (05:30 IST converted)');
  const chart2 = await ephemeris.generateChart('1992-11-14', '00:00', 'Visakhapatnam', 17.3667, 83.3167);
  console.log('Moon Position:', chart2.planets.Moon);
  console.log('Moon Rashi:', chart2.rashi);
  console.log('Moon Nakshatra:', chart2.nakshatra);
  console.log('');

  console.log('Test 3: Try different time (05:30 + 5:30 adjustment ahead)');
  const chart3 = await ephemeris.generateChart('1992-11-15', '10:00', 'Visakhapatnam', 17.3667, 83.3167);
  console.log('Moon Position:', chart3.planets.Moon);
  console.log('Moon Rashi:', chart3.rashi);
  console.log('Moon Nakshatra:', chart3.nakshatra);
  console.log('');

  console.log('Analysis:');
  console.log('- Check if times near Gemini/Ardra boundary');
  console.log('- Cancer/Pushya is ~30 degrees away from Gemini/Ardra');
  console.log('- This suggests systematic offset in Moon position calculation');
}

debugVisakhapatnam();
