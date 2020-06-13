const https = require('https');

const options = {
  'hostname': '{host}',
  'port': 8085,
  'path': '/v2/sse/p/{tenant}/{namespace}/{topic}?SubscriptionInitialPosition=earliest&SubscriptionName=fixed123&SubscriptionType=exclusive',
  'headers': {
    'Authorization': 'Bearer {JWT token}',
    'Accept': 'text/event-stream'
  },
}

https.get(options, (response) => {

    var result = ''
    response.on('data', function (chunk) {
        console.log(chunk.toString())
    });

    response.on('error', function(err) {
        console.error(err)
    });

    response.on('end', function () {
        console.log('end');
    });

});