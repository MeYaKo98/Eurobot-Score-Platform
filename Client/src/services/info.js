import API from './API';

//get tasks info
async function getTasks() {
	const response = await API.get('/info/tasks');
	return response;
}

//get colors
async function getColors() {
	const response = await API.get('/info/primaryColors');
	return response;
}

async function getInfo() {
	const response = await API.get('/info');
	return response;
}

const Info = {
	getTasks: getTasks,
	getColors: getColors,
	getInfo: getInfo,
};

export default Info;
