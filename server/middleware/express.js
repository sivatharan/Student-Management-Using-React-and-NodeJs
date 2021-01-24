'use strict';
var bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    useragent = require('express-useragent');

module.exports = function (app) {

    app.use(bodyParser.json({ limit: '50mb' })); //maximum request body size
    app.use(expressValidator([])); // body param validator
    app.use(bodyParser.urlencoded(
        { limit: '50mb', extended: true }
    ));
    app.use(useragent.express());

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Credentials', true);

        res.setHeader('Access-Control-Allow-Origin', '*');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
         next();  // Pass to next layer of middleware
    });
    // validate the request
    app.use(function (error, req, res, next) { // Caught the syntax error
        if (error instanceof SyntaxError) {
            res.status(400).json(
                appFun.errorRes([{ message: "Syntax Error" }])

            );
        } else {
            next();
        }
    });
    //all the defined urls
    require('./route')(app);// all routing here
    //hanle unwated urls
    app.all('*', function (req, res) {  //entered incorrect get url
        res.status(404).json(
            appFun.errorRes([{ message: "Please check your method or url" }])
        );
    });    

}