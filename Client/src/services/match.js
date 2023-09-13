import API from './API';

//get match
async function getMatch(round_id, match_id) {
	const targetData = {
		round_id: round_id,
		match_id: match_id,
	};
	const response = await API.get('/match', targetData);
	return response;
}

//create match
async function createMatch(match_id, name, round_id, team1_id, team2_id) {
	const newData = {
		name: name,
		match_id: match_id,
		round_id: round_id,
		team1_id: team1_id,
		team2_id: team2_id,
	};
	const response = await API.post('/match', newData);
	return response;
}

//delete match
async function deleteMatch(match_id, round_id) {
	const targetData = {
		match_id: match_id,
		round_id: round_id,
	};
	const response = await API.delete('/match', targetData);
	return response;
}

//get match scores
async function getMatchResults(match_id, round_id) {
	const targetData = {
		match_id: match_id,
		round_id: round_id,
	};
	const response = await API.get('/match/scores', targetData);
	return response;
}

const MatchAPI = {
	get: getMatch,
	create: createMatch,
	delete: deleteMatch,
	results: getMatchResults,
};

export default MatchAPI;
