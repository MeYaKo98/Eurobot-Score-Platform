const mongoose = require('mongoose');
const Match = require('./match');

const teamSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	team_id: {
		type: String,
		required: true,
	},
	_scores_id: [mongoose.Schema.Types.ObjectId],
});

teamSchema.pre('deleteOne', async function (next) {
	try {
		const targetTeam_id = (await this.model.findOne(this._conditions)).team_id;
		if (targetTeam_id) {
			// Delete all matches played by this team
			await Match.deleteMany({
				$or: [{ team1_id: targetTeam_id }, { team2_id: targetTeam_id }],
			});
		}
		//continue with the delete operation
		next();
	} catch (error) {
		next(error);
	}
});

module.exports = mongoose.model('Team', teamSchema);
