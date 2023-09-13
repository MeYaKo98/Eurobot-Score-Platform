const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	match_id: {
		type: String,
		required: true,
	},
	round_id: {
		type: String,
		required: true,
	},
	team1_id: {
		type: String,
		required: true,
	},
	_score1_id: mongoose.Schema.Types.ObjectId,
	team2_id: {
		type: String,
		required: true,
	},
	_score2_id: mongoose.Schema.Types.ObjectId,
});

matchSchema.pre('deleteMany', async function (next) {
	try {
		//includes
		const Round = require('./round');
		const Score = require('./score');
		//Collect the target matches
		const targetMatchs = await this.model.find(this._conditions);
		if (targetMatchs) {
			//Delete the target matches ids from every matches_id list in the corresponding round
			for (const targetMatch of targetMatchs) {
				await Round.updateOne(
					{ round_id: targetMatch.round_id },
					{ $pull: { _matches_id: { $in: targetMatch._id } } }
				);
			}
			// Get all scores IDs referenced in these matches
			const _scores_id = targetMatchs.reduce((acc, match) => {
				return acc.concat(match._score1_id, match._score2_id);
			}, []);
			// Delete all scores associated with these matches
			await Score.deleteMany({ _id: { $in: _scores_id } });
		}
		//continue with the delete operation
		next();
	} catch (error) {
		next(error);
	}
});

module.exports = mongoose.model('Match', matchSchema);
