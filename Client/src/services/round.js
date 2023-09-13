import API from './API';

//get round
async function getRound(round_id) {
	const targetData = {
		round_id: round_id,
	};
	const response = await API.get('/round', targetData);
	return response;
}

//create round
async function createRound(round_id, name) {
	const newData = {
		name: name,
		round_id: round_id,
	};
	const response = await API.post('/round', newData);
	return response;
}

//delete round
async function deleteRound(round_id) {
	const targetData = {
		round_id: round_id,
	};
	const response = await API.delete('/round', targetData);
	return response;
}

//create 1st final round
async function createFirstFinal(name, teamsNumber) {
	const newData = {
		roundData: {
			round_id: 'F1',
			name: name,
		},
		teamsNumber: teamsNumber,
	};
	const response = await API.post('/finals', newData);
	return response;
}

//create final round
async function createFinalRound(name, round_id, prevRound_id) {
	const newData = {
		roundData: {
			round_id: round_id,
			name: name,
		},
		prevRound_id: prevRound_id,
	};
	const response = await API.post('/finals', newData);
	return response;
}

const RoundAPI = {
	get: getRound,
	create: createRound,
	delete: deleteRound,
	createFinalRound: createFinalRound,
	createFirstFinal: createFirstFinal,
};

export default RoundAPI;
