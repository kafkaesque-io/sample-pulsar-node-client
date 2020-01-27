const Pulsar = require('pulsar-client');

(async () => {
  // Token based authentication
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
 
  // Create Pulsar Client
  const client = new Pulsar.Client({
    serviceUrl: pulsarUri,
    authentication: auth,
    tlsTrustCertsFilePath: trustStore,
    operationTimeoutSeconds: 30,
  });

  // Create a producer
  const producer = await client.createProducer({
    topic: topicName,
  });

  // Send messages
  for (let i = 0; i < 10; i += 1) {
    producer.send({
      data: Buffer.from(`nodejs-message-${i}`)
    });
    console.log(`send message ${i}`);
  }
  await producer.flush();

  await producer.close();
  await client.close();
})();
