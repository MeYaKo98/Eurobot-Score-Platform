const express = require('express');
const router = express.Router();
const Score = require('../models/score');
const Round = require('../models/round');
const Match = require('../models/match');
const createMatch = require('../helpers/createMatch');

router.use(express.json());

router.route('/').post(async (req, res) => {
	console.log('post final: ', req.body);
	//Define the list of teams that will play in this round
	let teamList;
	try {
		//Check if this is the first final round
		const newData = req.body;
		if (newData.roundData.round_id == 'F1') {
			teamList = await Score.aggregate([
				{ $match: { round_id: { $regex: '^R' } } },
				{
					$group: {
						_id: '$team_id',
						totalScore: { $sum: '$finalTotal' },
					},
				},
				{
					$lookup: {
						from: 'teams',
						localField: '_id',
						foreignField: 'team_id',
						as: 'teamDetails',
					},
				},
				{
					$unwind: {
						path: '$teamDetails',
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$project: {
						_id: 0,
						team_id: '$_id',
						totalScore: 1,
						name: '$teamDetails.name',
					},
				},
				{ $sort: { totalScore: -1 } },
				{ $limit: newData.teamsNumber },
			]);
			//verify that the number of teams is bigger than the teamsNumber entry
			if (teamList.length < newData.teamsNumber)
				throw new Error('Number of teams not enough');

			//verify that teamsNumber is a power of 2
			if (newData.teamsNumber & (newData.teamsNumber - 1 !== 0))
				throw new Error('Number of teams not power of 2');
		} else {
			//Get the wining teams from the previous round
			teamList = await Match.aggregate([
				{ $match: { round_id: newData.prevRound_id } },
				{
					$lookup: {
						from: 'scores',
						localField: '_score1_id',
						foreignField: '_id',
						as: 'score1',
					},
				},
				{
					$unwind: {
						path: '$score1',
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$lookup: {
						from: 'scores',
						localField: '_score2_id',
						foreignField: '_id',
						as: 'score2',
					},
				},
				{
					$unwind: {
						path: '$score2',
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$addFields: {
						winning_team: {
							$cond: {
								if: { $gt: ['$score1.finalTotal', '$score2.finalTotal'] },
								then: '$team1_id',
								else: '$team2_id',
							},
						},
					},
				},
				{
					$project: {
						_id: 0,
						team_id: '$winning_team',
					},
				},
				{ $sort: { match_id: 1 } },
			]);
		}
		//Create a round instance and save it into the database
		const newRound = new Round(newData.roundData);
		await newRound.save();

		const matchList = [];

		if (teamList.length > 2) {
			//Create Matches for normal Rounds
			for (let index = 0; index < teamList.length / 2; index++) {
				matchList.push(
					createMatch({
						name: `Match ${index + 1}`,
						match_id: `M${index + 1}`,
						round_id: newRound.round_id,
						team1_id: teamList[index].team_id,
						team2_id: teamList[teamList.length - 1 - index].team_id,
					})
				);
			}
		} else {
			//Create Matches for the final round
			for (let index = 0; index < 3; index++) {
				matchList.push(
					createMatch({
						name: `Match ${index + 1}`,
						match_id: `M${index + 1}`,
						round_id: newRound.round_id,
						team1_id: teamList[index % 2].team_id,
						team2_id: teamList[1 - (index % 2)].team_id,
					})
				);
			}
		}

		res.send(await Promise.all(matchList));
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

module.exports = router;
