var http = require('http'),
	fs = require('fs'),
	sendTweet = require('./sendTweet'),
	formidable = require("formidable"),
	util = require('util'),
	server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processFormFieldsIndividual(req, res);
    }

});

var tweetedForm;

function displayForm(res){
	fs.readFile('dest/index.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processFormFieldsIndividual(req, res) {
    //Store the data from the fields in your data store.
    //The data store could be a file or database or any other store based
    //on your application.
    var fields = [];
    var form = new formidable.IncomingForm();
    var tweetValue;

    form.on('field', function (field, value) {
        // console.log('value of field ' + field);
        console.log('value of value ' + value);
        fields[field] = value;
        tweetedForm = value;
        fs.readFile('src/login.json', handleFile);
        console.log(fields[field]);
    });

    form.parse(req);
}
var obj;
var app_key, app_secret, access_tok, access_secret;
// Write the callback function
function handleFile(err, data) {
    if (err) throw err
    obj = JSON.parse(data)
    // You can now play with your datas
    console.log(obj.consumerKey);
    app_key = obj.consumerKey;
    app_secret = obj.consumerSecret;
    access_tok = obj.accessToken;
    access_secret = obj.accessTokenSecret
    sendTweet = new sendTweet(app_key, app_secret, 
	access_tok, access_secret, tweetedForm);
};


server.listen(8000);