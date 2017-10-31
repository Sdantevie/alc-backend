'use strict';
// Setting Up Dependencies
const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    config = require('config'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3001,
    options = {
        useMongoClient: true
    },
    routes = require('./app/routes/studentRouting.js');


//mongoose setUp
mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost, options);

//Setting Up MiddleWare
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token');
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE')
    next();
});
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routing
routes(app);

app.listen(port);
console.log(`the api is running on ${port}`);


module.exports = app;