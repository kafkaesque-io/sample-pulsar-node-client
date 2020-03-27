#include <iostream>

#include <pulsar/Client.h>

using namespace pulsar;
using namespace std;

int main() {

    std::string token = "eyJhbGciOiJ Pulsar JWT";
    std::string serviceURL = "pulsar+ssl://useast2.aws.kafkaesque.io:6651";
    std::string topicName = "persistent://ming-luo/local-useast2-aws/test-topic2";

    AuthenticationPtr auth = pulsar::AuthToken::createWithToken(token);
    ClientConfiguration config = ClientConfiguration();
    config.setAuth(auth);
    config.setTlsTrustCertsFilePath("/etc/ssl/certs/ca-bundle.crt");
    /**
     *Use default CA certs for your environment
     * RHEL/CentOS:
     * trust_certs='/etc/ssl/certs/ca-bundle.crt'
     * Debian/Ubuntu:
     * trust_certs='/etc/ssl/certs/ca-certificates.crt'
     */
    Client client(serviceURL, config);

    Producer producer;
    Result result = client.createProducer(topicName, producer);
    if (result != ResultOk) {
        cout << "Error creating producer: " << result << endl;
        return -1;
    }

    // Send synchronously
    Message msg = MessageBuilder().setContent("content").build();
    Result res = producer.send(msg);
    cout << "Message sent: " << res << endl;

    client.close();
}
