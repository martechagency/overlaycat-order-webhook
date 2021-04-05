const functions = require("firebase-functions");

const validateMethod = (method, res) => {
    if (method != 'POST') {
        functions.logger.info(`[request-method-error] - ${method}`);
        res.json({
            "error": "method not allowed"
        }).status(422)
        return false
    }
    return true
}

const validateBody = (body, res) => {
    if (!body || !body.id) {
        functions.logger.info(`[request-body-error] - ${JSON.stringify(body)}`);
        res.json({
            "error": "body not allowed"
        }).status(422)
        return false
    }
    return true
}

module.exports = { validateMethod, validateBody }
