require('dotenv').config();

const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

async function publishMessage(order_id) {
    const date = new Date();
    const data = `O pedido ${order_id} foi pago no dia ${date}`;
    const dataBuffer = Buffer.from(data);
    const topicName = 'projects/dev-overlaycat/topics/orders';

    try {
        const messageId = await pubsub.topic(topicName).publish(dataBuffer);
        console.log(`Mensagem ${messageId} publicada`);
    } catch (error) {
        console.error(`Erro recebido ao publicar: ${error.message}`);
        process.exitCode = 1;
    }
}

// exporta a funcao modulo
module.exports = {
    publishMessage
}
