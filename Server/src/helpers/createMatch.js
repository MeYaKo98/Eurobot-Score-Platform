async function createMatch(newData) {
	//includes
	const Team = require('../models/team');
	const Round = require('../models/round');
	const Score = require('../models/score');
	const Match = require('../models/match');
	//Verify the existance of the corresponding round
	const corrRound = await Round.findOne({ round_id: newData.round_id });
	if (!corrRound) {
		throw new Error('Round id not found');
	}
	//Verify the existance of the corresponding teams
	const corrTeam1 = await Team.findOne({ team_id: newData.team1_id });
	if (!corrTeam1) {
		throw new Error('Team1 id not found');
	}
	const corrTeam2 = await Team.findOne({ team_id: newData.team2_id });
	if (!corrTeam2) {
		throw new Error('Team2 id not found');
	}
	//Create a match instance and save it into the database
	const newMatch = new Match(newData);
	//Create socres instances
	const score1 = new Score({
		match_id: newMatch.match_id,
		round_id: newMatch.round_id,
		team_id: newMatch.team1_id,
	});
	const score2 = new Score({
		match_id: newMatch.match_id,
		round_id: newMatch.round_id,
		team_id: newMatch.team2_id,
	});
	//set the score instances to the newly created match
	newMatch._score1_id = score1._id;
	newMatch._score2_id = score2._id;
	//save match and scores instances into the database
	await score1.save();
	await score2.save();
	await newMatch.save();
	//Update the corresponding round
	corrRound._matches_id.push(newMatch._id);
	await corrRound.save();
	//if (corrRound.round_id[0] == 'R')
	//push the score_id to the corresponding team scores_id
	corrTeam1._scores_id.push(score1._id);
	await corrTeam1.save();
	corrTeam2._scores_id.push(score2._id);
	await corrTeam2.save();
	//return the respond
	return newMatch;
}

module.exports = createMatch;
