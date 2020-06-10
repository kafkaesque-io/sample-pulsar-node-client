const https = require('https');

const options = {
  'hostname': '{host}',
  'port': 8085,
  'path': '/v1/sse',
  'headers': {
    'Authorization': 'Bearer {JWT token}',
    'TopicFn': 'persistent://{tenant}/{namespace}/{topic}',
    'SubscriptionInitialPosition': 'earliest', // or latest
    'SubscriptionName': 'fixed123', // optional
    'SubscriptionType': 'exclusive', // optional
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