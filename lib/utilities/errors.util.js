'use strict';

const _ = require('underscore');
const httpCodes = require('http-codes');

class RequestError extends Error {
    constructor(status, errors, message) {
        super(message);

        this.status = status;
        this.errors = errors;
    }
}

module.exports = {
    /**
     * Creates a extended error that is used for http request errors.
     * @param status a HTTP request error code.
     * @param errors an array of error messages.
     * @param message the message to provide the standard Error class.
     * @return {RequestError} a valid RequestError.
     */
    createRequestError: (status, errors, message) => {
        if(!status || status < 400 || status >= 600) {
            status = httpCodes.BAD_REQUEST;
        }

        if(!_.isArray(errors)) {
            errors = [];
        }

        return new RequestError(status, errors, message);
    }
};
