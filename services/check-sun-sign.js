// Check Sun sign for November 14, 1992
const ephemeris = require('./ephemeris.js');

async function checkSunSign() {
  console.log('Birth: November 14, 1992 at 05:30 in Visakhapatnam\n');

  const chart = await ephemeris.generateChart('1992-11-14', '05:30', 'Visakhapatnam', 17.3667, 83.3167);
  
  console.log('☀️  SUN SIGN (Zodiac Sign - Tropical):');
  console.log('Position:', chart.planets.Sun);
  console.log('This is your main zodiac sign!\n');

  console.log('🌙 MOON SIGN (Rashi - Vedic):');
  console.log('Position:', chart.planets.Moon);
  console.log('This is your moon sign (Rashi) used in Vedic astrology\n');

  // Check all planetary signs for context
  console.log('📍 All Planetary Positions:');
  Object.keys(chart.planets).forEach(planet => {
    if (chart.planets[planet] && chart.planets[planet].sign) {
      console.log(`${planet}: ${chart.planets[planet].sign} ${chart.planets[planet].degree.toFixed(1)}° - ${chart.planets[planet].nakshatra}`);
    }
  });
}

checkSunSign();
