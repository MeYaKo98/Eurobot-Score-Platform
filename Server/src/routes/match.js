const express = require('express');
const router = express.Router();
const Match = require('../models/match');
const createMatch = require('../helpers/createMatch');

router.use(express.json());

router
	.route('/')
	.get(async (req, res) => {
		console.log('get match: ', req.query);
		const matches = await Match.aggregate([
			{ $match: req.query },
			{
				$lookup: {
					from: 'teams',
					localField: 'team1_id',
					foreignField: 'team_id',
					as: 'team1Details',
				},
			},
			{
				$unwind: {
					path: '$team1Details',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: 'teams',
					localField: 'team2_id',
					foreignField: 'team_id',
					as: 'team2Details',
				},
			},
			{
				$unwind: {
					path: '$team2Details',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: 'rounds',
					localField: 'round_id',
					foreignField: 'round_id',
					as: 'roundDetails',
				},
			},
			{
				$unwind: {
					path: '$roundDetails',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$project: {
					round_id: 1,
					round_name: '$roundDetails.name',
					match_id: 1,
					name: 1,
					team1_id: 1,
					team1_name: '$team1Details.name',
					team2_id: 1,
					team2_name: '$team2Details.name',
				},
			},
			{ $sort: { round_id: 1, match_id: 1 } },
		]);
		res.send(matches);
	})
	.post(async (req, res) => {
		console.log('post match: ', req.body);
		try {
			res.send(await createMatch(req.body));
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	})
	.delete(async (req, res) => {
		console.log('delete match: ', req.body);
		try {
			//Collecting the search target from the delete request body
			const targetData = req.body;
			//delete the matching match instances from the database
			const returnMessage = await Match.deleteMany(targetData);
			res.send(returnMessage);
		} catch (error) {
			res.status(500).send(error);
		}
	});

router.route('/Scores').get(async (req, res) => {
	const targetData = req.query;
	console.log('get match scores: ', targetData);
	try {
		const MatchList = await Match.aggregate([
			{ $match: targetData },
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
				$lookup: {
					from: 'teams',
					localField: 'team1_id',
					foreignField: 'team_id',
					as: 'team1Details',
				},
			},
			{
				$unwind: {
					path: '$team1Details',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: 'teams',
					localField: 'team2_id',
					foreignField: 'team_id',
					as: 'team2Details',
				},
			},
			{
				$unwind: {
					path: '$team2Details',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: 'rounds',
					localField: 'round_id',
					foreignField: 'round_id',
					as: 'roundDetails',
				},
			},
			{
				$unwind: {
					path: '$roundDetails',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$project: {
					round_id: 1,
					round_name: '$roundDetails.name',
					match_id: 1,
					name: 1,
					team1_id: 1,
					team1_name: '$team1Details.name',
					score1: 1,
					team2_id: 1,
					team2_name: '$team2Details.name',
					score2: 1,
				},
			},
			{ $sort: { round_id: 1, match_id: 1 } },
		]);
		res.send(MatchList);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

module.exports = router;
