import API from './API';

//get user
async function getUsers(username, role) {
	const targetData = {
		username: username,
		role: role,
	};
	const response = await API.get('/user', targetData);
	return response;
}

//create user
async function createUser(username, password, role) {
	const newData = {
		username: username,
		password: password,
		role: role,
	};
	const response = await API.post('/user', newData);
	return response;
}

//delete match
async function deleteUser(username) {
	const targetData = {
		username: username,
	};
	const response = await API.delete('/user', targetData);
	return response;
}

const UserAPI = {
	get: getUsers,
	create: createUser,
	delete: deleteUser,
};

export default UserAPI;
