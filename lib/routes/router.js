'use strict';

const _ = require('underscore');

const InfoRoute = require('./info.route');

module.exports = express => {
    const router = express.Router();

    // Register routes.
    _.each([
        new InfoRoute(router)
    ], element => element.registerRoutes());

    return router;
};
