const subscriptionName = 'projects/dev-overlaycat/subscriptions/paid-orders';
const { PubSub } = require('@google-cloud/pubsub');

const pubsub = new PubSub();

function listenForMessage() {
    const subscription = pubsub.subscription(subscriptionName);

    const messageHandler = message => {
        // passar as informacoes do pedido para o email (aws sns)
        console.log(`Mensagem recebida:`, message.data.toString());

        // informa o recebimento das mensagens
        message.ack();
    };

    // recebe callbacks para novas mensagens na subscription
    subscription.on('message', messageHandler);

}

module.exports = {
    listenForMessage
}