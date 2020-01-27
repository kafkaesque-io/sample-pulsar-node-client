const Pulsar = require('pulsar-client');

(async () => {
  // Token based on authentication
  const tokenStr = '{JWT token}';
	const pulsarUri = 'pulsar+ssl://{host}:6651';
	const topicName = 'persistent://{tenant}/{namespace}/{topic}';

	const trustStore = '/etc/ssl/certs/ca-bundle.crt';
  // Debian Ubuntu:
  // const trustStore = '/etc/ssl/certs/ca-certificates.crt'
  // OSX:
  // Export the default certificates to a file, then use that file:
  // security find-certificate -a -p /System/Library/Keychains/SystemCACertificates.keychain > ./ca-certificates.crt
  // trust_certs='./ca-certificates.crt'

  const auth = new Pulsar.AuthenticationToken({token: tokenStr});

  // Create a client
  const client = new Pulsar.Client({
    serviceUrl: pulsarUri,
    authentication: auth,
    tlsTrustCertsFilePath: trustStore,
    operationTimeoutSeconds: 30,
  });

  // Create consumer
  const consumer = await client.subscribe({
    topic: topicName,
    subscription: 'my-subscription',
    subscriptionType: 'Exclusive',
    ackTimeoutMs: 10000,
  });

  // Receive and acknowledge messages
  for (let i = 0; i < 1000; i += 1) {
    const msg = await consumer.receive();
    console.log(msg.getData().toString());
    consumer.acknowledge(msg);
  }

  await consumer.close();
  await client.close();
})();
