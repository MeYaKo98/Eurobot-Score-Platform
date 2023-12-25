import axios from 'axios';
import server from './server';

const api = axios.create({
	baseURL: server,
	withCredentials: true,
});

async function postData(relativePath, newData) {
	const response = await api.post(relativePath, newData);
	return response.data;
}

async function getData(relativePath, targetData) {
	const response = await api.get(relativePath, {
		params: targetData,
	});
	return response.data;
}

async function delData(relativePath, targetData) {
	const response = await api.delete(relativePath, {
		data: targetData,
	});
	return response.data;
}

async function patchData(relativePath, targetData, updateData) {
	const response = await api.patch(relativePath, {
		target: targetData,
		update: updateData,
	});
	return response.data;
}

// Export the functions as an object
const API = {
	post: postData,
	get: getData,
	delete: delData,
	patch: patchData,
};

export default API;
