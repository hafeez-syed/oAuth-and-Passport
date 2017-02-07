/**
 * Created by Hafeez Syed on 2/10/2016.
 */
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/user');

function twitterStrategy(passport) {
	passport.use(new TwitterStrategy(
		{
			consumerKey: '< CONSUMER ID HERE >',
			consumerSecret: '< CONSUMER SECRET HERE >',
			callbackURL: 'http://localhost:3000/auth/twitter/callback',
			passReqToCallback: true
		},
		function(req, token, tokenSecret, profile, done) {
			var query = {
				'twitter.id': profile.id
			};

			User.findOne(query, function (error, user) {
				if (user) {
					done(null, user);
				} else {
					var user = new User;
					//user.email = profile.emails[0].value;
					user.image = profile._json.profile_image_url;
					user.displayName = profile.displayName;

					user.twitter = {};
					user.twitter.id = profile.id;
					user.twitter.token = token;
					user.save();
					done(null, user);
				}
			});
		}
	));
}

module.exports = twitterStrategy;
