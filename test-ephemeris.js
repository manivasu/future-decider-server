// Test script to verify zodiac sign calculations
const { generateChart } = require('./services/ephemeris');

async function testChart() {
  try {
    console.log("\n=== Test 1: May 15, 1990 at 14:30 in New York ===");
    const chart1 = await generateChart("1990-05-15", "14:30", "New York");
    console.log("\nPlanets:");
    Object.entries(chart1.planets).forEach(([name, planet]) => {
      console.log(`${name}: ${planet.sign} ${planet.degree.toFixed(1)}° (House ${planet.house})`);
    });
    console.log(`\nMoon Sign (Rashi): ${chart1.rashi}`);
    console.log(`Moon Nakshatra: ${chart1.nakshatra}`);

    console.log("\n\n=== Test 2: Same date/time, DIFFERENT place (Los Angeles) ===");
    const chart2 = await generateChart("1990-05-15", "14:30", "Los Angeles");
    console.log("\nPlanets:");
    Object.entries(chart2.planets).forEach(([name, planet]) => {
      console.log(`${name}: ${planet.sign} ${planet.degree.toFixed(1)}° (House ${planet.house})`);
    });

    console.log("\n\n=== Test 3: Different date (June 1, 1990) ===");
    const chart3 = await generateChart("1990-06-01", "14:30", "New York");
    console.log("\nPlanets:");
    Object.entries(chart3.planets).forEach(([name, planet]) => {
      console.log(`${name}: ${planet.sign} ${planet.degree.toFixed(1)}° (House ${planet.house})`);
    });

    console.log("\n\n=== Consistency Check ===");
    const chart1b = await generateChart("1990-05-15", "14:30", "New York");
    console.log("Same request twice should match:");
    console.log(`Test 1 Sun: ${chart1.planets.Sun.sign} vs Retest: ${chart1b.planets.Sun.sign} - ${chart1.planets.Sun.sign === chart1b.planets.Sun.sign ? '✓ MATCH' : '✗ MISMATCH'}`);
    console.log(`Test 1 Moon: ${chart1.planets.Moon.sign} vs Retest: ${chart1b.planets.Moon.sign} - ${chart1.planets.Moon.sign === chart1b.planets.Moon.sign ? '✓ MATCH' : '✗ MISMATCH'}`);

  } catch (error) {
    console.error("Error:", error.message);
  }
}

testChart();
