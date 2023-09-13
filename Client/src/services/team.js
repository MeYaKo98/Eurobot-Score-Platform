import API from './API';

//get team
async function getTeam(team_id) {
	const targetData = {
		team_id: team_id,
	};
	const response = await API.get('/team', targetData);
	return response;
}

//create team
async function createTeam(team_id, name) {
	const newData = {
		name: name,
		team_id: team_id,
	};
	const response = await API.post('/team', newData);
	return response;
}

//delete team
async function deleteTeam(team_id) {
	const targetData = {
		team_id: team_id,
	};
	const response = await API.delete('/team', targetData);
	return response;
}

//update team name
async function updateTeam(target_team_id, new_name) {
	const targetData = {
		team_id: target_team_id,
	};
	const updateData = {
		name: new_name,
	};
	const response = await API.patch('/team', targetData, updateData);
	return response;
}

const TeamAPI = {
	get: getTeam,
	create: createTeam,
	delete: deleteTeam,
	update: updateTeam,
};

export default TeamAPI;
