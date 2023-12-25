const express = require('express');
const router = express.Router();
const Round = require('../models/round');
const requireAuth = require('../helpers/authMiddleware');

router.use(express.json());

router
	.route('/')
	.get(async (req, res) => {
		console.log('get rounds: ', req.query);
		try {
			const rounds = await Round.find(req.query).sort({ round_id: 1 });
			res.send(rounds);
		} catch (error) {
			res.status(500).send(error);
		}
	})
	.post(requireAuth(['admin']), async (req, res) => {
		try {
			console.log(req.userId, 'post round: ', req.body);
			//Collecting the data from the post request body
			const newData = req.body;
			//Create a round instance and save it into the database
			const newRound = new Round(newData);
			await newRound.save();
			res.send(newRound);
		} catch (error) {
			res.status(500).send(error);
		}
	})
	.delete(requireAuth(['admin']), async (req, res) => {
		console.log(req.userId, 'delete round: ', req.body);
		try {
			//Collecting the search target from the delete request body
			const targetData = req.body;
			//delete the matching round instances from the database
			const returnMessage = await Round.deleteMany(targetData);
			res.send(returnMessage);
		} catch (error) {
			res.status(500).send(error);
		}
	});

module.exports = router;
