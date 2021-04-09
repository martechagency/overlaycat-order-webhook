// require('dotenv').config();

const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

async function publishMessage(orderData) {
    const date = new Date();
    const data = {"paymentDate": date, "orderInfo": orderData};
    // const dataBuffer = Buffer.from(JSON.stringify(data));
    // const topicName = 'paid-orders';

    try {
        //const messageId = await pubsub.topic(topicName).publish(dataBuffer);
        const messageId = await pubsub.topic('paid-orders').publishJSON(data);
        console.log(`Mensagem ${messageId} publicada`);
    } catch (error) {
        console.error(`Erro recebido ao publicar: ${error.message}`);
        throw error
    }
}

// exporta a funcao modulo
module.exports = {
    publishMessage
}