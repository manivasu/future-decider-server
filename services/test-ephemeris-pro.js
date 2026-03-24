// Test the new Astronomy Engine-based ephemeris
const ephemeris = require('./ephemeris.js');

async function testEphemeris() {
  console.log('Testing new professional ephemeris with Astronomy Engine...\n');

  try {
    // Test 1: May 15, 1990 - Should show Sun in Taurus
    console.log('Test 1: May 15, 1990 at 14:30');
    const chart1 = await ephemeris.generateChart('1990-05-15', '14:30', 'New York', 40.7128, -74.0060);
    console.log('Sun Position:', chart1.planets.Sun);
    console.log('Moon Position:', chart1.planets.Moon);
    console.log('Moon Rashi (Sign):', chart1.rashi);
    console.log('Moon Nakshatra:', chart1.nakshatra);
    console.log('');

    // Test 2: June 1, 1990 - Should show Sun in Gemini
    console.log('Test 2: June 1, 1990 at 10:00');
    const chart2 = await ephemeris.generateChart('1990-06-01', '10:00', 'London', 51.5074, -0.1278);
    console.log('Sun Position:', chart2.planets.Sun);
    console.log('Moon Position:', chart2.planets.Moon);
    console.log('Lunar Nodes:');
    console.log('Rahu:', chart2.planets.Rahu);
    console.log('Ketu:', chart2.planets.Ketu);
    console.log('');

    // Test 3: December 31, 2000 - Y2K
    console.log('Test 3: December 31, 2000 at 23:59');
    const chart3 = await ephemeris.generateChart('2000-12-31', '23:59', 'Tokyo', 35.6762, 139.6503);
    console.log('Sun Position:', chart3.planets.Sun);
    console.log('Jupiter Position:', chart3.planets.Jupiter);
    console.log('Saturn Position:', chart3.planets.Saturn);
    console.log('');

    console.log('✓ All tests completed successfully!');
    console.log('Ephemeris is now using professional Astronomy Engine calculations.');

  } catch (error) {
    console.error('✗ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run tests
testEphemeris();
