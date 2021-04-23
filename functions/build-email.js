function mailBuilder(data, link) {
    const toAddress = `${data['orderInfo']['customer']['name']} <${data['orderInfo']['customer']['email']}>`;
    const subject = `PEDIDO ${data['orderInfo']['id']} - Seu Stream Package chegou!`;
    let msg = '';
    msg += `<h1>Recebemos o pagamento de seu pedido.</h1><p>Baixe os arquivos de seu pedido pelo link: </p>`;
    msg += '<p>';
    // for (let i = 0; i < data['orderInfo']['products'].length; i++) {
    //     const produto = data['orderInfo']['products'][i]['name'];
    //     msg += `<a>${produto}</a><br>`
    // }
    msg += link
    msg += '</p>'
    return [toAddress, subject, msg];
}

module.exports = {
    mailBuilder
}