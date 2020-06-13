const https = require('https');

const options = {
  'hostname': '{host}',
  'port': 8085,
  'path': '/v2/firehose/p/{tenant}/{namespace}/{topic}',
  'method': 'POST',
  'headers': {
    'Authorization': 'Bearer {JWT token}',
  },
};

var req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (data) => {
    process.stdout.write(data);
  });
});

req.on('error', (err) => {
  console.error(err)
});

req.write("testmessage");
req.end();