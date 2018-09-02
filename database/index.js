const mongoose = require('mongoose');
const glob = require('glob');

const config = require('./config');

db = {
    connect: (databaseUrl) => {
        return mongoose.connect(databaseUrl);
    }
};

let models = glob.sync(config.MODELS_URL);
models.forEach((model) => {
    require(model)(db);
});

module.exports = db;