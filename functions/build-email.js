function mailBuilder(data) {
    // const infoPedido = JSON.parse(data["orderInfo"]);
    // const email = `<h1>Recebemos seu pagamento para o pedido ${infoPedido["id"]}</h1>`;
    const email = '<h1>email teste</h1>'
    return email.toString()
}

module.exports = {
    mailBuilder
}