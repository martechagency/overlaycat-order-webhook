const subscriptionName = 'projects/dev-overlaycat/subscriptions/orders-sub';
const timeout = 60;
const { PubSub } = require('@google-cloud/pubsub');

const pubsub = new PubSub();

function listenForMessage() {
    const subscription = pubsub.subscription(subscriptionName);

    let messageCount = 0;
    const messageHandler = message => {
        console.log(`Mensagem ${message.id} recebida.`);
        console.log(`\tData: ${message.data}`);
        messageCount += 1;
        // "Ack" (acknowledge receipt of) the message
        message.ack();
    };

    // listen for new messages until timeout is hit
    subscription.on('message', messageHandler);

    setTimeout(() => {
        subscription.removeListener('message', messageHandler);
        console.log(`${messageCount} mensagem(s) recebida(s).`);
    }, timeout * 1000)
}

module.exports = {
    listenForMessage
}