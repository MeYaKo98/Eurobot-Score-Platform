const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		enum: ['admin', 'referee', 'visiter', 'av'],
	},
});

module.exports = mongoose.model('AppUser', userSchema);
