//Here we define the principal colors for each team
primaryColors = {
	team1: '#ffffff',
	team2: '#e0e0e0',
};

//Here we define the tasks list
taskList = [
	{
		name: 'Gateau Valide',
		type: 'N',
		score: 5,
	},
	{
		name: 'Cerise dans paneau',
		type: 'N',
		score: 7,
	},
	{
		name: 'Estimation cerise correcte',
		type: 'B',
		score: 1,
	},
	{
		name: 'Combinaison Magique',
		type: 'B',
		score: 2,
	},
];

//Here we define the function that calculate the estimation score bonus
function estimationBonus(score, estimation) {
	return Math.max(0, 20 - Math.abs(score - estimation));
}

module.exports = {
	primaryColors,
	taskList,
	estimationBonus,
};
