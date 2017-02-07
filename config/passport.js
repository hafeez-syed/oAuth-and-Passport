/**
 * Created by Hafeez Syed on 2/10/2016.
 */
var passport = require('passport');

function passportConfig(app) {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	require('./strategies/google')(passport);
	require('./strategies/twitter')(passport);
	require('./strategies/facebook')(passport);
}

module.exports = passportConfig;
