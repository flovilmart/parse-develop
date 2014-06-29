/*jshint node:true */

// Load Parse
var Parse = require("parse-cloud").Parse;
global.Parse = Parse;

var appName = process.argv[3];
if (appName && appName !== "undefined") {
    console.log("Starting app "+appName);
}

var start = function(config) {
    'use strict';

    console.log("[%s] Running...", process.pid);
    Parse.initialize(config.applicationId, config.javascriptKey, config.masterKey);

    require("cloud/main");
};

// 4 is the stringified config file, passed from previous script (i.e. parse-develop)
if (process.argv[4]) {
    start(JSON.parse(process.argv[4]));
} else {
    var path = process.argv[2];
    var keys = require("./lib/utils").getConfiguration(path, appName);
    start(keys);
}
