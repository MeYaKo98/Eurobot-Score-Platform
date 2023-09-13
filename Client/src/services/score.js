import API from './API';

//get score
async function getScore(round_id, match_id, team_id) {
	const targetData = {
		round_id: round_id,
		match_id: match_id,
		team_id: team_id,
	};
	const response = await API.get('/score', targetData);
	return response;
}

//delete score
async function deleteScore(round_id, match_id, team_id) {
	const targetData = {
		round_id: round_id,
		match_id: match_id,
		team_id: team_id,
	};
	const response = await API.delete('/score', targetData);
	return response;
}

//update score
async function updateScore(
	round_id,
	match_id,
	team_id,
	doneTasks,
	estimation,
	penality
) {
	const targetData = {
		round_id: round_id,
		match_id: match_id,
		team_id: team_id,
	};
	const updateData = {
		doneTasks: doneTasks,
		estimation: estimation,
		penality: penality,
		score_status: true,
	};
	const response = await API.patch('/score', targetData, updateData);
	return response;
}

async function totalScore(round_id) {
	const response = await API.get(`/score/uptoRound${round_id}`);
	return response;
}

const ScoreAPI = {
	get: getScore,
	reset: deleteScore,
	update: updateScore,
	up2round: totalScore,
};

export default ScoreAPI;
