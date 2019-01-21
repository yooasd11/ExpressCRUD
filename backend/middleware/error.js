const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const { env } = require('../config/vars');

const handler = (err, req, res, next) => {
    const { status, message, errors, stack } = err;
    const code = status || httpStatus.INTERNAL_SERVER_ERROR;
    const response = {
        code,
        message: message || httpStatus[code],
        errors,
        stack,
    };

    if (env !== 'development') {
        delete response.stack;
    }

    console.log(response);

    if (err.status) {
        res.status(err.status);
    }

    res.json(response);
}

exports.handler = handler;

exports.notFound = (req, res) => {
    const err = new APIError({
        message: 'Not found',
        status: httpStatus.NOT_FOUND,
    });
    return handler(err, req, res);
};