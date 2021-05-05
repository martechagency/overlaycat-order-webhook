function mailBuilder(data, link) {
    const toAddress = `${data['orderInfo']['customer']['name']} <${data['orderInfo']['customer']['email']}>`;
    const subject = `PEDIDO ${data['orderInfo']['id']} - Seu Stream Package chegou!`;
    let msg = '';
    msg += `<h1>Recebemos o pagamento de seu pedido.</h1><p>Baixe os arquivos de seu pedido pelo link: </p>`;
    msg += '<p>';
    msg += `<a href="${link}" target="_blank">Arquivos de seu pack</a>`
    msg += '</p>'
    return [toAddress, subject, msg];
}

module.exports = {
    mailBuilder
}