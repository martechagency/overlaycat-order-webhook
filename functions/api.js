const axios = require('axios')

const config = {
    headers: {
        "Authentication": "bearer 722e9d274134d4be7fba4be3fed5c931f7a3fe8c",
        "User-Agent": "Order Status Test (developer@martechagency.com.br)",
        "Content-Type": "application/json"
    }
}

const getOrderItens = (id) => axios.get(`https://api.nuvemshop.com.br/v1/1605982/orders/${id}`, config);

module.exports = {
    getOrderItens
}