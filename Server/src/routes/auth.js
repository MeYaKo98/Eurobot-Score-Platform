const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const requireAuth = require('../helpers/authMiddleware');

router.use(express.json());

router.route('/login').get(async (req, res) => {
	console.log('login user:', req.query.username);
	try {
		const user = await User.findOne({ username: req.query.username });
		if (!user) {
			return res.status(500).send({ error: 'User Not Found.' });
		}
		const passwordMatch = await bcrypt.compare(
			req.query.password,
			user.password
		);
		if (!passwordMatch) {
			return res.status(500).send({ error: 'Wrong Password.' });
		}
		const token = jwt.sign(
			{ username: user.username, role: user.role },
			process.env.JTW_SECRET_KEY,
			{
				expiresIn: '24h',
			}
		);
		return res.send({ token });
	} catch (error) {
		res.status(500).send(error);
	}
});

router
	.route('/user')
	.get(requireAuth(['admin']), async (req, res) => {
		console.log(req.userId, 'get user:', req.query);
		try {
			const users = await User.aggregate([
				{
					$match: {
						username: { $regex: `^${req.query?.username || ''}` },
						...(req.query.role && { role: req.query.role }),
					},
				},
				{
					$project: {
						_id: 0,
						username: 1,
						role: 1,
					},
				},
				{ $sort: { username: 1 } },
			]);
			res.send(users);
		} catch (error) {
			res.status(500).send(error);
		}
	})
	.post(requireAuth(['admin']), async (req, res) => {
		try {
			console.log(req.userId, 'register user:', req.body.username);
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			const newUser = new User({
				username: req.body.username,
				password: hashedPassword,
				role: req.body.role,
			});
			await newUser.save();
			res.send(newUser);
		} catch (error) {
			res.status(500).send(error);
		}
	})
	.delete(requireAuth(['admin']), async (req, res) => {
		console.log(req.userId, 'delete user: ', req.body);
		try {
			//Collecting the search target from the delete request body
			const targetData = req.body;
			//delete the matching user instance from the database
			const returnMessage = await User.deleteOne(targetData);
			res.send(returnMessage);
		} catch (error) {
			res.status(500).send(error);
		}
	});

module.exports = router;
