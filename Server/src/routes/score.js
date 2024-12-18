const express = require('express');
const router = express.Router();
const Score = require('../models/score');
const info = require('../config/info');
const requireAuth = require('../helpers/authMiddleware');

router.use(express.json());

router
	.route('/')
	.get(async (req, res) => {
		console.log('get scores: ', req.query);
		const scores = await Score.find(req.query);
		res.send(scores);
	})
	.delete(requireAuth(['admin']), async (req, res) => {
		console.log(req.userId, 'delete score: ', req.body);
		try {
			//Collecting the search target from the delete request body
			const targetData = req.body;
			//update and reset the matching score instances from the database
			const targetScore = await Score.updateMany(targetData, {
				$unset: {
					estimation: 1,
					penality: 1,
					total: 1,
					bonus: 1,
					finalTotal: 1,
				},
				$set: {
					doneTasks: [],
					notEstimatedDoneTasks: [],
					score_status: false,
				},
			});
			res.send(targetScore);
		} catch (error) {
			res.status(500).send(error);
		}
	})
	.patch(requireAuth(['referee']), async (req, res) => {
		console.log(req.userId, 'score patch: ', req.body);
		try {
			//Collecting the search target from the delete request body
			const targetData = req.body.target;
			const updateData = req.body.update;

			//Checking if updateData is complete
			if (
				!updateData ||
				!updateData.hasOwnProperty('doneTasks') ||
				!updateData.hasOwnProperty('notEstimatedDoneTasks') ||
				!updateData.hasOwnProperty('estimation') ||
				!updateData.hasOwnProperty('penality')
			) {
				throw new Error('Missing properties in updateData.');
			}

			if (
				updateData.doneTasks.length != info.taskList.length ||
				updateData.notEstimatedDoneTasks.length !=
					info.notEstimatedTaskList.length
			) {
				throw new Error('Evaluation length not matching');
			}

			//Calculate the socre
			updateData.total = 0;
			for (let i = 0; i < updateData.doneTasks.length; i++) {
				updateData.total += updateData.doneTasks[i] * info.taskList[i].score;
			}

			//Calculate the estimation bonus
			updateData.bonus = Math.min(
				updateData.total,
				Math.ceil(20 - Math.abs(updateData.total - updateData.estimation) / 2)
			);

			updateData.finalTotal = 0;
			for (let i = 0; i < updateData.notEstimatedDoneTasks.length; i++) {
				updateData.finalTotal +=
					updateData.notEstimatedDoneTasks[i] *
					info.notEstimatedTaskList[i].score;
			}

			//Calculate the final score
			updateData.finalTotal = Math.max(
				updateData.finalTotal +
					updateData.total +
					updateData.bonus -
					updateData.penality,
				0
			);

			//update the score instances with the input data
			const targetScore = await Score.updateMany(targetData, {
				$set: updateData,
			});
			res.send(targetScore);
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	});

router.route('/uptoRound:id').get(async (req, res) => {
	console.log('get up2round: ', req.params);
	try {
		const roundListId = Array.from(
			{ length: req.params.id },
			(_, index) => `R${index + 1}`
		);
		const ScoreList = await Score.aggregate([
			{ $match: { round_id: { $in: roundListId } } },
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
		]);
		res.send(ScoreList);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
