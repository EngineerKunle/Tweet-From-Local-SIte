var OAuth = require('oauth');
var sendTweet = function(app_key, app_secret, access_tok, access_secret, tweet){
	var self = this;

	var status = tweet;  // This is the tweet (ie status)

	var postBody = {
		'status': status
	};
	
	var oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	app_key,
	app_secret,
	'1.0A',
	null,
	'HMAC-SHA1'
	);

	oauth.post('https://api.twitter.com/1.1/statuses/update.json',
	access_tok,  // oauth_token (user access token)
    access_secret,  // oauth_secret (user secret)
    postBody,  // post body
    '',  // post content type ?
	function(err, data, res) {
		if (err) {
			console.log(err);
		} else {
			// console.log(data);
		}
	});
	console.log('send tweet file '+ app_key);
};

module.exports = sendTweet;