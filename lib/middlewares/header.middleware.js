'use strict';

const strings = require('../../config/strings.json');

module.exports = {
    addResponseHeaders: (request, response, next) => {
        response.set(strings.headers.POWERED_BY, strings.APP_TITLE);

        next();
    },

    addStaticResponseHeaders: response => response.set(strings.headers.POWERED_BY, strings.APP_TITLE)
};
