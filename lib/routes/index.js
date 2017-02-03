'use strict';

const InfoRoute = require('./info.route');

module.exports = express => {
    const router = express.Router();

    // Setup routes.
    InfoRoute(router);

    return router;
};
