global.express = require('express')
var http = require('http');
var app = express();

var port = process.env.PORT || 9000;

process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // check the envirment


global.config = require('./config/config'); //all the configurations
global.appFun = require('./app/app_function');
global.globalJs = require('./config/global'); 
const server = http.Server(app);

require('./middleware/express')(app); //

server.listen(port, function() {
	console.log('app running ', port)
});
