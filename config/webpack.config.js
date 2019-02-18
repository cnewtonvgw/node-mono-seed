const serverBuilder = require('./webpack.server.config');
const clientBuilder = require('./webpack.webapp.config');

module.exports = env => {
    return [
        ...serverBuilder(env),
        ...clientBuilder(env),
    ];
};