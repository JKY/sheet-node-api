/**
 * Module dependencies.
 */
var express = require('express'),
	Promise = require('bluebird'),
	util = require('util'),
	settings = require('./settings');

var app =  express();
/**
 * logs 
 */
app.use((req,resp,next)=>{
	util.log(req.url.yellow);
	next();
});

/**
 * start service 
 */
if (!module.parent) {
	app.use(require('./service'));
	app.listen(settings.port);
  	util.log(settings['appname']+' runnng port:' + settings.port);
}

