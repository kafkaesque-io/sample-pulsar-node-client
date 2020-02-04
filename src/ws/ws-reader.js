var WebSocket = require('ws');

const token='{pulsar jwt}';
const topic = 'wss://{pulsar-host-fqdn}:8001/ws/v2/reader/persistent/public/default/foobar-topic?messageId=earliest';

console.log(topic);
var options = {
    headers: {
        'Authorization' : 'Bearer ' + token
    }
};

const ws = new WebSocket(topic, options);

try {
  ws.on('open', function() {
    console.log('on open');
  });

  ws.on('message', function(message) {
    var receiveMsg = JSON.parse(message);
    console.log('Received: %s - payload: %s', message, new Buffer(receiveMsg.payload, 'base64').toString());
    var ackMsg = {"messageId" : receiveMsg.messageId};
    ws.send(JSON.stringify(ackMsg));
  });

  ws.on('error', function (message) {
    console.log('error ', message);
  });
} catch (e) {
  console.log(e);
}
