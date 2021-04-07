const subscriptionName = 'projects/dev-overlaycat/subscriptions/paid-orders';
const { PubSub } = require('@google-cloud/pubsub');

const pubsub = new PubSub();

function listenForMessage() {
    const subscription = pubsub.subscription(subscriptionName);

    const messageHandler = message => {
        // chama o sns para envio de emails
        console.log(`Mensagem ${message.id} recebida.`);
        console.log(`Os itens do pedido ${message.data.orderInfo.id} precisam ser enviados`);
        // informa o recebimento das mensagens
        message.ack();
    };

    // listen for new messages
    subscription.on('message', messageHandler);

    // setTimeout(() => {
    //     subscription.removeListener('message', messageHandler);
    //     console.log(`${messageCount} mensagem(s) recebida(s).`);
    // }, timeout * 1000)
}

module.exports = {
    listenForMessage
}