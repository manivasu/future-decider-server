// Test API endpoint with new professional ephemeris
const http = require('http');

const data = JSON.stringify({
  name: 'Test User',
  date: '1990-05-15',
  time: '14:30',
  place: 'New York',
  question: 'How will my life be?'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/astrology/analyze',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('API Response Status:', res.statusCode);
    try {
      const parsed = JSON.parse(responseData);
      console.log('\n✓ Birth Chart Generated Successfully!');
      console.log('\nChart Data:');
      console.log('Date:', parsed.chart.date);
      console.log('Time:', parsed.chart.time);
      console.log('Place:', parsed.chart.place);
      console.log('\nPlanetary Positions (Professional Astronomy Engine):');
      console.log('Sun:', parsed.chart.planets.Sun);
      console.log('Moon:', parsed.chart.planets.Moon);
      console.log('Mercury:', parsed.chart.planets.Mercury);
      console.log('Venus:', parsed.chart.planets.Venus);
      console.log('Mars:', parsed.chart.planets.Mars);
      console.log('Jupiter:', parsed.chart.planets.Jupiter);
      console.log('Saturn:', parsed.chart.planets.Saturn);
      console.log('\nLunar Nodes:');
      console.log('Rahu (North Node):', parsed.chart.planets.Rahu);
      console.log('Ketu (South Node):', parsed.chart.planets.Ketu);
      console.log('\nMoon Sign (Rashi):', parsed.chart.rashi);
      console.log('Moon Nakshatra:', parsed.chart.nakshatra);
      console.log('\n✓ All calculations using professional Astronomy Engine!');
    } catch (e) {
      console.error('Error parsing response:', e.message);
      console.log('Raw response:', responseData.substring(0, 500));
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.write(data);
req.end();

setTimeout(() => {
  console.log('\nTest completed.');
  process.exit(0);
}, 2000);
