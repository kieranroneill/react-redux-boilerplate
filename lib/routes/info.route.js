'use strict';

const strings = require('../../config/strings.json');
const packageJson = require('../../package.json');

module.exports = router => {
    return router
        .route(strings.endpoints.INFO)
        .get((request, response) => {
            response.json({
                author: packageJson.author.name,
                description: packageJson.description,
                source: packageJson.repository.url,
                version: packageJson.version
            });
        });
};
