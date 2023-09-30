const mongoose = require('mongoose');

const mongoDB_URI = 'mongodb://mongodb:27017/EurobotDB';

async function connectToDatabase() {
	try {
		await mongoose.connect(mongoDB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB successfully!');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error.message);
	}
}

module.exports = connectToDatabase;
