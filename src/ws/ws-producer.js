var WebSocket = require('ws');

const token='{pulsar jwt}';
const topic = 'wss://{pulsar-host-fqdn}:8001/ws/v2/producer/persistent/public/default/foobar-topic';

console.log(topic);
var options = {
    headers: {
        'Authorization' : 'Bearer ' + token
    }
};

const ws = new WebSocket(topic, options);

var message = {
  'payload' : Buffer.from('wss message').toString('base64'),
  'properties': {
    'key1' : 'value1',
    'key2' : 'value2'
  },
  'context' : '1'
};

try {
  ws.on('open', function() {
    // Send one message
    ws.send(JSON.stringify(message));
  });

  ws.on('message', function(message) {
    console.log('received ack: %s', message);
    ws.close()
  });

  ws.on('error', function (message) {
    console.log('my error ', message);
    ws.close();
  });
} catch (e) {
  console.log(e);
}
