const functions = require("firebase-functions");
const admin = require("firebase-admin"); // for firestore
const { validateBody, validateMethod } = require('./validate')
const { getOrderItens } = require('./api')
const { publishMessage } = require('./publish');

exports.orderWebhook = functions.https.onRequest(async (req, res) => {

    if (!validateMethod(req.method, res)) return

    if (!validateBody(req.body, res)) return

    const response = await getOrderItens(req.body.id)
    const data = response.data;

    // firestore config
    admin.initializeApp();
    const db = admin.firestore();

    for (let product of data.products) {
        console.log(`Produto a ser enviado --> id: ${product.id}, nome: ${product.name}`)

        // salva no firestone
        const orderRef = db.collection('orders').doc(`order${req.body.id}`);
        await orderRef.set({
            'receivedAt': new Date(),
            'body': data
        });

        // TASK 2: APOS SALVAR PUBLICAR NO PUB SUB UMA MENSAGEM EM UMA FILA
        publishMessage(req.body.id)

        // TASK 3: CRIAR UM FUNCTION QUE ESCUTA UMA FILA PUB SUB PARA ENVIAR EMAIL, USAR O AWS SNS
    }

    res.json({
        "error": false 
    }).status(200)
});
