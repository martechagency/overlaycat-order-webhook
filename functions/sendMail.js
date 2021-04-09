require('dotenv').config();
const SES = require('aws-sdk/clients/ses');

async function sendMailMessage(toAddress, subject, email) {
    const client = new SES({region: 'us-east-2',});
    await client
        .sendEmail({
            Source: 'Overlaycat <infra@martechagency.com.br>',
            Destination: {
                ToAddresses: [toAddress],
            },
            Message: {
                Subject: {
                    Data: subject,
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