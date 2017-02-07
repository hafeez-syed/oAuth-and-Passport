/**
 * Created by Hafeez Syed on 2/10/2016.
 */
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/user');

function googleStrategy(passport) {
	passport.use(new GoogleStrategy(
		{
			clientID: '< CLIENT ID HERE >',
			clientSecret: '< CLIENT SECRET HERE >',
			callbackURL: 'http://localhost:3000/auth/google/callback'
		},
		function(req, accessToken, refreshToken, profile, done) {
			var query = {
				'google.id': profile.id
			};

			User.findOne(query, function (error, user) {
				if(user) {
					done(null, user);
				} else {
					var user = new User;
					user.email = profile.emails[0].value;
					user.image = profile._json.image.url;
					user.displayName = profile.displayName;

					user.google = {};
					user.google.id = profile.id;
					user.google.token = accessToken;
					user.save();
					done(null, user);
				}
			});
		}
	));
}

module.exports = googleStrategy;
