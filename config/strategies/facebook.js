/**
 * Created by Hafeez Syed on 2/10/2016.
 */

var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/user');

function facebookStrategy(passport) {
	passport.use(new FacebookStrategy({
		clientID: '< CLIENT ID HERE >',
		clientSecret: '< CLIENT SECRET HERE >',
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		passReqToCallback: true,
		profileFields: ['id', 'displayName', 'photos', 'email'],
		enableProof: true
	},
	function(req, accessToken, refreshToken, profile, done) {
		var query = {
			'facebook.id': profile.id
		};

		User.findOne(query, function (error, user) {
			if (user) {
				done(null, user);
			} else {
				var user = new User;
				user.email = profile.emails[0].value;
				user.image = profile.photos[0].value;
				user.displayName = profile.displayName;

				user.facebook = {};
				user.facebook.id = profile.id;
				user.facebook.token = accessToken;
				user.save();
				done(null, user);
			}
		});
	}));
}

module.exports = facebookStrategy;