const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const mongoDB_URI =
	process.env.DB_CONNECTION_STRING || 'mongodb://mongodb:27017/EurobotDB';

async function connectToDatabase() {
	try {
		await mongoose.connect(mongoDB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB successfully!');
		//if there no users in the database create a default admin account
		const userCount = await User.countDocuments();
		if (!userCount) {
			new User({
				username: 'admin',
				password: await bcrypt.hash('admin', 10),
				role: 'admin',
			}).save();
			console.log('Created a default admin account!');
		}
	} catch (error) {
		console.error('Error connecting to MongoDB:', error.message);
	}
}

module.exports = connectToDatabase;
