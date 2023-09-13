const mongoose = require('mongoose');

const mongoDB_URI = 'mongodb://0.0.0.0:27017/testdb';

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
