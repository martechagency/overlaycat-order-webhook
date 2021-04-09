const functions = require("firebase-functions");
const admin = require("firebase-admin"); // for firestore
const { validateBody, validateMethod } = require('./validate')
const { getOrderItens } = require('./api')
const { publishMessage } = require('./publish');
const { sendMailMessage } = require('./sendMail');
const { mailBuilder } = require('./build-email');

exports.orderWebhook = functions.https.onRequest(async (req, res) => {

    if (!validateMethod(req.method, res)) return

    if (!validateBody(req.body, res)) return

    const response = await getOrderItens(req.body.id)
    const data = response.data;

    // inicializa o firestore
    admin.initializeApp();
    const db = admin.firestore();

    for (let product of data.products) {
        console.log(`Produto a ser enviado --> id: ${product.id}, nome: ${product.name}`);
    }

    // salva no firestone
    const orderRef = db.collection('orders').doc(`order${req.body.id}`);
    await orderRef.set({'receivedAt': new Date(), 'body': data});

    // publica no PubSub
    publishMessage(JSON.stringify(data));

    res.json({
        "error": false 
    }).status(200)
});

exports.listenForPaidOrders = functions.pubsub.topic('paid-orders').onPublish((message) => {
    const messageBody = message.data ? Buffer.from(message.data, 'base64').toString() : null;
    // console.log(`body: ${messageBody}`);
    const mensagem = JSON.parse(messageBody);
    const orderInfo = JSON.parse(mensagem["orderInfo"]);

    // constroi o corpo do email
    const emailInfo = mailBuilder(orderInfo);

    // envia email via AWS SES
    sendMailMessage(emailInfo[0], emailInfo[1], emailInfo[2]);

});
