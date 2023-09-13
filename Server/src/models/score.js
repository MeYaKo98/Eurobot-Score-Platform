const mongoose = require('mongoose');
const info = require('../config/info');

const scoreSchema = mongoose.Schema({
	match_id: {
		type: String,
		required: true,
	},
	round_id: {
		type: String,
		required: true,
	},
	team_id: {
		type: String,
		required: true,
	},
	score_status: {
		type: String,
		required: true,
		default: false,
	},
	doneTasks: [Number],
	total: Number,
	estimation: Number,
	bonus: Number,
	penality: Number,
	finalTotal: Number,
});

scoreSchema.pre('deleteMany', async function (next) {
	try {
		//includes
		const Team = require('./team');
		//Collect the target matches
		const targetScores = await this.model.find(this._conditions);
		if (targetScores) {
			//Delete the target matches ids from every matches_id list in the corresponding round
			for (const targetScore of targetScores) {
				await Team.updateOne(
					{ team_id: targetScore.team_id },
					{ $pull: { _scores_id: { $in: targetScore._id } } }
				);
			}
		}
		//continue with the delete operation
		next();
	} catch (error) {
		next(error);
	}
});

module.exports = mongoose.model('Score', scoreSchema);
