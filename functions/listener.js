const subscriptionName = 'projects/dev-overlaycat/subscriptions/paid-orders';
const { PubSub } = require('@google-cloud/pubsub');
const { sendMailMessage } = require('./sendMail');
const { mailBuilder } = require('./build-email');

const pubsub = new PubSub();

function listenForMessage() {
    const subscription = pubsub.subscription(subscriptionName);

    const messageHandler = message => {
        console.log(`Mensagem recebida:`, message.data.toString());

        // constroi o corpo do email
        // const email = mailBuilder(message.data);

        // envia email via AWS SES
        // sendMailMessage(email);   COMENTEI PARA NAO DAR ERRO NA HORA DE TESTAR (ESTOU DESENVOLVENDO ESSA PARTE AINDA)

        // informa o recebimento das mensagens
        message.ack();
    };

    // recebe callbacks para novas mensagens na subscription
    subscription.on('message', messageHandler);

}

module.exports = {
    listenForMessage
}