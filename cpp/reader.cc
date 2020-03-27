#include <iostream>

#include <pulsar/Client.h>

using namespace pulsar;
using namespace std;

int main() {

    std::string token = "eyJhbGciOiJSUzI Pulsar JWT";
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

    ReaderConfiguration readerConf;
    Reader reader;
    Result result = client.createReader(topicName, MessageId::earliest(), readerConf, reader);
    if (result != ResultOk) {
        cout << "Failed to subscribe: " << result << endl;
        return -1;
    }

    Message msg;
    Result res;

    while (true) {
        res = reader.readNext(msg, 1000);
        if (res != ResultTimeout) {
            // In case of timeout we keep calling receive() to simulate a
            // blocking call until a message is available, while breaking
            // every once in a while to check the Python signal status
            break;
        }
        cout << "Received: " << msg << "  with payload '" << msg.getDataAsString() << "'" << endl;

    }

    client.close();
}

