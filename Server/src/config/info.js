//Here we define the principal colors for each team
primaryColors = {
	team1: '#f7b500',
	team2: '#005b8c',
};

//Here we define the tasks list
taskList = [
	{
		name: 'Plant valid in zone',
		type: 'N',
		score: 3,
	},
	{
		name: 'Plant in pot ',
		type: 'N',
		score: 1,
	},
	{
		name: 'Valid plant in planter',
		type: 'N',
		score: 1,
	},
	{
		name: 'Solar panel',
		type: 'N',
		score: 5,
	},
	{
		name: 'Lady Bugs in zone occupied',
		type: 'N',
		score: 5,
	},
	{
		name: 'Lady Bugs in contact',
		type: 'N',
		score: 5,
	},
	{
		name: 'Robot in final zone',
		type: 'B',
		score: 10,
	},
];

notEstimatedTaskList = [];

const isEstimationActive = 0;

const year = 2026;

//Here we define the function that calculate the estimation score bonus
function estimationBonus(total, estimation) {
	return Math.min(total, Math.ceil(20 - Math.abs(total - estimation) / 2));
}

module.exports = {
    year,
	primaryColors,
	taskList,
	notEstimatedTaskList,
	isEstimationActive,
	estimationBonus,
};
