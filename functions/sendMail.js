require('dotenv').config();
const SES = require('aws-sdk/clients/ses');

async function sendMailMessage(toAddress, email) {
    const client = new SES({region: 'us-east-2',});
    await client
        .sendEmail({
            Source: 'Guilherme Tadashii <infra@martechagency.com.br>',
            Destination: {
                ToAddresses: ['Guilherme Tadashii <infra@martechagency.com.br>'],
            },
            Message: {
                Subject: {
                    Data: 'Email de Teste',
                },
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: email
                    }
                },
            },
        })
        .promise();
};

module.exports = {
    sendMailMessage
}