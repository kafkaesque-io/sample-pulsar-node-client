const https = require('https');

const options = {
  'hostname': '{host}',
  'port': 8085,
  'path': '/v1/firehose',
  'method': 'POST',
  'headers': {
    'Authorization': 'Bearer {JWT token}',
    'TopicFn': 'persistent://{tenant}/{namespace}/{topic}',
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