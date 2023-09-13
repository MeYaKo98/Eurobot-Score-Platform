const express = require('express');
const router = express.Router();
const Team = require('../models/team');

router.use(express.json());

router
	.route('/')
	.get(async (req, res) => {
		console.log('get teams: ', req.query);
		const teams = await Team.find(req.query).sort({ team_id: 1 });
		res.send(teams);
	})
	.post(async (req, res) => {
		console.log('post team: ', req.body);
		try {
			//Collecting the data from the post request body
			const newData = req.body;
			//Create a match instance and save it into the database
			const newTeam = new Team(newData);
			await newTeam.save();
			res.send(newTeam);
		} catch (error) {
			res.status(500).send(error);
		}
	})
	.delete(async (req, res) => {
		console.log('delete team: ', req.body);
		try {
			//Collecting the search target from the delete request body
			const targetData = req.body;
			//delete the matching team instance from the database
			const returnMessage = await Team.deleteOne(targetData);
			res.send(returnMessage);
		} catch (error) {
			res.status(500).send(error);
		}
	})
	.patch(async (req, res) => {
		console.log('patch team: ', req.body);
		try {
			//Collecting the search target from the delete request body
			const targetData = req.body.target;
			const updateData = req.body.update;
			//update the team instances with the input data
			const targetTeam = await Team.updateMany(targetData, {
				$set: updateData,
			});
			res.send(targetTeam);
		} catch (error) {
			res.status(500).send(error);
		}
	});

module.exports = router;