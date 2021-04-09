const functions = require("firebase-functions");
const admin = require("firebase-admin"); // for firestore
const { validateBody, validateMethod } = require('./validate')
const { getOrderItens } = require('./api')
const { publishMessage } = require('./publish');
const { sendMailMessage } = require('./sendMail');
const { mailBuilder } = require('./build-email');

// inicializa o firestore
admin.initializeApp();
const db = admin.firestore();

exports.orderWebhook = functions.https.onRequest(async (req, res) => {

    if (!validateMethod(req.method, res)) return

    if (!validateBody(req.body, res)) return

    const response = await getOrderItens(req.body.id)
    const data = response.data;

    for (let product of data.products) {
        console.log(`Produto a ser enviado --> id: ${product.id}, nome: ${product.name}`);
    }

    // salva no firestone
    const orderRef = db.collection('orders').doc(`${req.body.id}`);
    await orderRef.set({'receivedAt': new Date(), ...data});

    // publica no PubSub
    await publishMessage(data);

    res.json({
        "error": false 
    }).status(200)
});

exports.listenForPaidOrders = functions.pubsub.topic('paid-orders').onPublish((message) => {
    const messageBody = message.data ? Buffer.from(message.data, 'base64').toString() : null;
    const orderInfo = JSON.parse(messageBody);

    // constroi o corpo do email
    const emailInfo = mailBuilder(orderInfo);

    // envia email via AWS SES
    sendMailMessage(emailInfo[0], emailInfo[1], emailInfo[2]);

});
