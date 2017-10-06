'use strict';
// Setting Up Dependencies
const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    config = require('config'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    options = {
        useMongoClient: true
    },
    routes = require('./app/routes/studentRouting.js');


//mongoose setUp
mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost, options);

//Setting Up MiddleWare
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Routing
routes(app);

app.listen(port);
console.log('the api is running, catch it!!!!');


module.exports = app;