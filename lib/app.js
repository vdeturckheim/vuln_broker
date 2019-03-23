'use strict';
const Express = require('express');
const Pino = require('express-pino-logger')();
const BP = require('body-parser');

const routes = require('./routes');

const app = Express();

app.use(BP.json());
app.use(Pino);
app.use(routes);

app.use((err, req, res, next) => {

    req.log.error(err);
    if (!err.isBoom || err.isServer) {
        return res.sendStatus(500);
    }
    res.status(err.output.statusCode);
    return res.json(err.output);
});

module.exports = app;
