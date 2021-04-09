function mailBuilder(data) {
    const toAddress = `${data['customer']['name']} <${data['customer']['email']}>`
    let msg = '';
    msg += `<h1>Recebemos o pagamento de seu pedido.</h1><p>Baixe os arquivos de seu pedido ${data['id']} nos links a seguir: </p>`;
    msg += '<p>';
    for (let i = 0; i < data['products'].length; i++) {
        const produto = data['products'][i]['name'];
        msg += `<a>${produto}</a>`
    }
    msg += '</p>'
    return [toAddress, msg];
}

module.exports = {
    mailBuilder
}