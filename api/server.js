const express = require('express');

const apiRouter = require('./router.js');
const configureMiddleware = require('./middleware.js');

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);

module.exports = server;