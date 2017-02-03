'use strict';

const _ = require('underscore');

module.exports = {
    /**
     * Returns the express validation errors as a string array.
     * @param errors the express validation errors.
     * @return a string array of the express validation error messages.
     */
    getExpressValidationErrors: errors => _.map(errors, object => object.msg),

    /**
     * Returns a random port between the ranges of 49152–65535.
     * @return a random port.
     */
    randomPort: () => _.random(49152, 65535)
};
