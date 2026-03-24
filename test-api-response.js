// Test exactly what the API is returning for your birth data
const http = require('http');

const data = JSON.stringify({
  date: '1992-11-14',
  time: '05:30',
  place: 'Visakhapatnam'
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
    try {
      const parsed = JSON.parse(responseData);
      console.log('MOON DATA FROM API:');
      console.log('Rashi:', parsed.chart.rashi);
      console.log('Nakshatra:', parsed.chart.nakshatra);
      console.log('\nFull Moon Object:');
      console.log(JSON.stringify(parsed.chart.planets.Moon, null, 2));
    } catch (e) {
      console.error('Error parsing:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
  console.error('Make sure backend is running on port 5000');
});

req.write(data);
req.end();

setTimeout(() => process.exit(0), 2000);
