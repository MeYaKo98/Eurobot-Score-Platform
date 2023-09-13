import { Routes, Route } from 'react-router-dom';

import NavigationBar from '../components/controlCenter/navBar';
import Teams from '../components/controlCenter/teams';
import Rounds from '../components/controlCenter/rounds';
import Matches from '../components/controlCenter/matches';
import Index from '../components/controlCenter/index';

function ControlCenter() {
	return (
		<>
			<NavigationBar />
			<Routes>
				<Route
					path='/'
					element={<Index />}
				/>
				<Route
					path='/Teams'
					element={<Teams />}
				/>
				<Route
					path='/Rounds'
					element={<Rounds />}
				/>
				<Route
					path='/Matches'
					element={<Matches />}
				/>
			</Routes>
		</>
	);
}

export default ControlCenter;
