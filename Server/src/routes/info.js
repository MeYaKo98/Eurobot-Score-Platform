const express = require('express');
const router = express.Router();
const info = require('../config/info');

router.use(express.json());

router.route('/tasks').get(async (req, res) => {
	console.log('get tasks');
	res.send(info.taskList);
});

router.route('/primaryColors').get(async (req, res) => {
	console.log('get primary colors');
	res.send(info.primaryColors);
});

router.route('/').get(async (req, res) => {
	console.log('get info');
	res.send(info);
});

module.exports = router;
