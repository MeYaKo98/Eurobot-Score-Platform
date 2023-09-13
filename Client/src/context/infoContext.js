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
	const [info, setInfo] = useState({ colors: {}, tasks: [] });

	//collect the info data on creation
	useEffect(() => {
		const colorsPromise = infoAPI.getColors();
		const tasksPromise = infoAPI.getTasks();

		Promise.all([colorsPromise, tasksPromise])
			.then(([colorsData, tasksData]) => {
				const combinedData = {
					colors: colorsData,
					tasks: tasksData,
				};
				setInfo(combinedData);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);

	return <infoContext.Provider value={info}>{children}</infoContext.Provider>;
}
