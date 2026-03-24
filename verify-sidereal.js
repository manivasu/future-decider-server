// Verify sidereal conversion
const ephemeris = require('./services/ephemeris.js');

async function verifySiderealConversion() {
  console.log('Verifying Sidereal (Vedic) Asterology Conversion\n');
  console.log('Lahiri Ayanamsa = 23.3333°\n');

  const chart = await ephemeris.generateChart('1992-11-14', '05:30', 'Visakhapatnam', 17.3667, 83.3167);
  
  console.log('Date: 1992-11-14 at 05:30');
  console.log('Expected: Moon Gemini Ardra (as Vedic/Sidereal)\n');

  console.log('SUN:');
  console.log('  Tropical Longitude:', chart.planets.Sun.tropicalLongitude, '°');
  console.log('  Sidereal Longitude (displayed):', chart.planets.Sun.longitude, '°');
  console.log('  Sidereal Sign:', chart.planets.Sun.sign);
  console.log('  Nakshatra:', chart.planets.Sun.nakshatra);
  console.log('');

  console.log('MOON:');
  console.log('  Tropical Longitude:', chart.planets.Moon.tropicalLongitude, '°');
  console.log('  Sidereal Longitude (displayed):', chart.planets.Moon.longitude, '°');
  console.log('  Sidereal Sign:', chart.planets.Moon.sign);
  console.log('  Nakshatra:', chart.planets.Moon.nakshatra);
  console.log('');

  console.log('Calculation verification:');
  console.log('  Tropical Moon (96.67°) - Ayanamsa (23.3333°) = ', (96.67 - 23.3333).toFixed(2), '° (should be ~73.3° = Gemini)');
  console.log('  Tropical Sun (229.55°) - Ayanamsa (23.3333°) = ', (229.55 - 23.3333).toFixed(2), '° (should be ~206.2° = Libra)');
}

verifySiderealConversion();
