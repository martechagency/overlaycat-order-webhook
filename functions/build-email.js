function mailBuilder(data, link) {
  const toAddress = `${data['orderInfo']['customer']['name']} <${data['orderInfo']['customer']['email']}>`;
  const subject = `PEDIDO ${data['orderInfo']['id']} - Seu Stream Package chegou!`;
  const customerName = `${data['orderInfo']['customer']['name']}`;
  let msg = '';
  // msg += `<h1>Recebemos o pagamento de seu pedido.</h1><p>Baixe os arquivos de seu pedido pelo link: </p>`;
  // msg += '<p>';
  // msg += `<a href="${link}" target="_blank">Arquivos de seu pack</a>`
  // msg += '</p>'

  msg += `<html>

  <meta name="viewport" content="width=device-width" />
  
  <title>Entrega do pedido</title>
  
  <head>
  
  
      <!DOCTYPE html
          PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" lang="pt">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
      <style>
          /* Style the header, colors:#6701e1 and #8aff59 */
  
          .header {
  
              padding: 0px;
  
          }
  
          img {
              /*border: none;*/
              -ms-interpolation-mode: bicubic;
              max-width: 35%;
              max-height: 35%;
              text-align: center;
  
          }
  
          /* Padding defoult*/
          body {
  
              background-color: #ffff;
              font-family: "Montserrat";
              -webkit-font-smoothing: antialiased;
              line-height: 1.0;
  
  
          }
  
  
          .container {
              display: inline-block;
              margin: 0 auto !important;
              /* makes it centered */
              max-width: 900px;
              padding: 1px;
              width: 900px;
          }
  
          /*Ativacao de conta*/
          .line0 {
  
              background-color: #ffff;
              margin-top: 100px;
              color: black;
              text-align: center;
              font-size: 16px;
          }
  
          /*Image Overlaycat*/
          .line1 {
  
              background-color: #6701e1;
              padding: 0px;
  
          }
  
          /*
  
          Texto principal
          */
  
          .line2 {
  
              background-color: #ffff;
              text-align: left;
              margin-top: 20px;
              font-size: 26px;
              /* font-style: normal;     */
              margin-left: auto;
              margin-right: auto;
              padding: 20;
              width: 30rem;
              opacity: 0.7;
          }
  
  
          /*
  
          Rodape
          */
  
          .line3 {
  
              background-color: #6701e1;
              text-align: center;
              color: white;
              margin-top: 20px;
              padding: 100px;
              font-size: 25px;
              margin-left: auto;
              margin-right: auto;
              width: 35rem
          }
  
          /* Footer */
          .footer {
              padding: 0px;
          }
  
          /* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other */
          @media screen and (max-width: 800px) {
  
              .leftcolumn,
              .rightcolumn {
                  width: 100%;
                  padding: 0;
              }
          }
  
          /* Responsive layout - when the screen is less than 400px wide, make the navigation links stack on top of each other instead of next to each other */
          @media screen and (max-width: 400px) {
              .topnav a {
                  float: none;
                  width: 100%;
              }
          }
  
  
          /*  */
          /* Force Outlook to provide a "view in browser" message */
          .ReadMsgBody {
              width: 100%;
          }
  
          .ExternalClass {
              width: 100%;
          }
  
          /* Force Hotmail to display emails at full width */
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
              line-height: 100%;
          }
  
          /* Force Hotmail to display normal line spacing */
          body,
          table,
          td,
          p,
          a,
          li,
          blockquote {
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
          }
  
          /* Prevent WebKit and Windows mobile changing default text sizes */
          table,
          td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
          }
  
          /* Remove spacing between tables in Outlook 2007 and up */
          img {
              -ms-interpolation-mode: bicubic;
          }
  
          /* /\/\/\/\/\/\/ MOBILE RESET STYLES /\/\/\/\/\/\/ */
          #bodyCell {
              padding: 10px !important;
          }
  
          /* ======== Page Styles ======== */
      </style>
  </head>
  
  <body>
      <table class="container" border="0">
          <tr class="line0">
              <th>
                  <h1>
                      Entrega do pedido
                  </h1>
              </th>
          </tr>
          <tr class="line1">
              <th>
                  <center>
                      <a href=" http://Overlaycat.com.br"><img
                              src="https://firebasestorage.googleapis.com/v0/b/dev-overlaycat.appspot.com/o/cat2.jpg?alt=media&token=2b9211d8-5542-4a62-8c56-83973227d13a">
                      </a>
                  </center>
              </th>
          </tr>
          <tr>
              <th>
                  <div class="line2">
  
                      <p>Olá Streamer ${customerName},</p>
                      <p> Obrigado por escolher os produtos da Overlay Cat, recebemos a confirmacao de pagamento.
                      </p>`

  msg += `<p>Arquivos de seu pedido disponiveis atraves do link: <a href=" ${link}" target="_blank"> Packs</a></p>`

  msg += `<p> Atenciosamente,</p>
  <p> Overlay Cat</p>

  </div>
  </th>
  </tr>
  <tr class="line3">
  <th>
  <div class="line3">
    <p>Se você não criou uma conta em nosso site, desconsidere este e-mail. </p>
  </th>
  </div>
  </tr>

  <div class="Inferior">
  <p>
  </p>
  </div>
  <div class="footer">
  </div>


  </table>


  </body>

  </html>`

  return [toAddress, subject, msg];
}

module.exports = {
  mailBuilder
}