const functions = require("firebase-functions");
const admin = require("firebase-admin"); // for firestore
const axios = require("axios");
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
    await orderRef.set({ 'receivedAt': new Date(), ...data });

    // publica no PubSub
    await publishMessage(data);

    res.json({
        "error": false
    }).status(200)
});

exports.listenForPaidOrders = functions.pubsub.topic('paid-orders').onPublish((message) => {
    const messageBody = message.data ? Buffer.from(message.data, 'base64').toString() : null;
    const orderInfo = JSON.parse(messageBody);
    // baixa o arquivo com as images do pack
    const imgs = [
        'https://d2r9epyceweg5n.cloudfront.net/stores/001/605/982/products/copia-de-copia-de-stream-11-6300d55101cc6f8b1516159914975265-1024-1024.png',
        'https://d2r9epyceweg5n.cloudfront.net/stores/001/605/982/products/211-7f0b325e7d1791c08516159929528911-1024-1024.png',
        'https://d2r9epyceweg5n.cloudfront.net/stores/001/605/982/products/111-04fdad1f872b272ec116159929535565-1024-1024.png',
        'https://d2r9epyceweg5n.cloudfront.net/stores/001/605/982/products/411-83acfb7b2b030e146016159929533612-1024-1024.png',
        'https://d2r9epyceweg5n.cloudfront.net/stores/001/605/982/products/311-3e6884934061211fc016159929534701-1024-1024.png'
    ]
    const txt = 'mensagem-oculta'

    const link = await axios.post('https://us-central1-dev-overlaycat.cloudfunctions.net/steganography', {
        imgs: imgs,
        message: txt
    })

    console.log(link)

    // constroi o corpo do email
    const emailInfo = mailBuilder(orderInfo, link);

    // envia email via AWS SES
    sendMailMessage(emailInfo[0], emailInfo[1], emailInfo[2]);

});
