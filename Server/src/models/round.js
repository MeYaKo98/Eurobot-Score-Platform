const mongoose = require('mongoose');

const roundSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	round_id: {
		type: String,
		required: true,
	},
	_matches_id: [mongoose.Schema.Types.ObjectId],
});

roundSchema.pre('deleteMany', async function (next) {
	try {
		//includes
		const Match = require('./match');
		//Collect the target rounds
		const targetRounds = await this.model.find(this._conditions);
		if (targetRounds) {
			// Get all match IDs referenced in this round
			const _matches_id = targetRounds.reduce((acc, round) => {
				return acc.concat(round._matches_id);
			}, []);
			// Delete all matches associated with the round
			await Match.deleteMany({ _id: { $in: _matches_id } });
		}
		//continue with the delete operation
		next();
	} catch (error) {
		next(error);
	}
});

module.exports = mongoose.model('Round', roundSchema);
