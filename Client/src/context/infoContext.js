import React, { useContext, useEffect, useState } from 'react';
import infoAPI from '../services/info';

//context definition
const infoContext = React.createContext();

//collect the context data
export function useInfo() {
	return useContext(infoContext);
}

//context wrapper
export function InfoProvider({ children }) {
	//define the the context value state
	const [info, setInfo] = useState({
		colors: {},
		tasks: [],
		notEstimatedTasks: [],
	});

	//collect the info data on creation
	useEffect(() => {
		infoAPI
			.getInfo()
			.then((response) => {
				const combinedData = {
					colors: response.primaryColors,
					tasks: response.taskList,
					notEstimatedTasks: response.notEstimatedTaskList,
				};
				setInfo(combinedData);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);

	return <infoContext.Provider value={info}>{children}</infoContext.Provider>;
}
