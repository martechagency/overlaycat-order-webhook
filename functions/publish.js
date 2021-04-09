require('dotenv').config();

const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

async function publishMessage(orderData) {
    const date = new Date();
    // const data = `O pedido ${order_id} foi pago no dia ${date}`;
    const data = {"paymentDate": date, "orderInfo": orderData};
    const dataBuffer = Buffer.from(JSON.stringify(data));
    const topicName = 'projects/dev-overlaycat/topics/paid-orders';

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
