/**
 * Created by Hafeez Syed on 2/10/2016.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	UserSchema = Schema({
		displayName: {
			type: String
		},
		image: {
			type: String
		},
		email: {
			type: String
		},
		facebook: {
			type: Object
		},
		twitter: {
			type: Object
		},
		google: {
			type: Object
		}
	});


module.exports = mongoose.model('User', UserSchema);