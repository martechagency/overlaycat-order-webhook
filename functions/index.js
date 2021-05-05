const functions = require("firebase-functions");
const admin = require("firebase-admin"); // for firestore
const { Storage } = require("@google-cloud/storage");
const { validateBody, validateMethod } = require('./validate')
const { getOrderItens, getDownloadLink } = require('./api')
const { publishMessage } = require('./publish');
const { sendMailMessage } = require('./sendMail');
const { mailBuilder } = require('./build-email');
require('dotenv').config();

// inicializa o firestore
admin.initializeApp();
const db = admin.firestore();

exports.orderWebhook = functions.https.onRequest(async (req, res) => {

    if (!validateMethod(req.method, res)) return

    if (!validateBody(req.body, res)) return

    const response = await getOrderItens(req.body.id)
    const data = response.data;

    // salva no firestone
    const orderRef = db.collection('orders').doc(`${req.body.id}`);
    await orderRef.set({ 'receivedAt': new Date(), ...data });

    // publica no PubSub
    await publishMessage(data);

    res.json({
        "error": false
    }).status(200)
});

exports.listenForPaidOrders = functions.pubsub.topic('paid-orders').onPublish(async (message) => {
    const messageBody = message.data ? Buffer.from(message.data, 'base64').toString() : null;
    const orderInfo = JSON.parse(messageBody);

    // cria client para o storage
    const storage = new Storage({ keyFile: "./credentials/dev-overlaycat-credentials.json" });

    // pegar o id do produto e pegar as imagens dos packs
    const products = orderInfo['orderInfo']['products'];
    let products_id = [];

    for (let i = 0; i < products.length; i++) {
        const element = products[i]['product_id'];
        products_id.push(element);
    }

    let imgs = [];

    for (let i = 0; i < products_id.length; i++) {
        const id = products_id[i];
        const options = {
            prefix: `${id}/`,
            delimiter: '/'
        };
        // const files = await storage.bucket('dev-overlaycat-packs').getFiles(prefix = `${id}/`);
        const files = await storage.bucket('dev-overlaycat-packs').getFiles(options);

        for (let i = 1; i < files[0].length; i++) {
            const downloadURL = files[0][i].publicUrl();
            // console.log(downloadURL);
            imgs.push(downloadURL);
        }

    }

    const txt = 'mensagem-oculta';

    const response = await getDownloadLink(imgs, txt);
    const link = response.data;

    // constroi o corpo do email
    const emailInfo = mailBuilder(orderInfo, link);

    // envia email via AWS SES
    sendMailMessage(emailInfo[0], emailInfo[1], emailInfo[2]);

});
