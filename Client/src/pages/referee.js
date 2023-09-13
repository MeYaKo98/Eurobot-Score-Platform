import { Routes, Route } from 'react-router-dom';

import Index from '../components/referee/index';
import Evaluate from '../components/referee/evaluate';
import NavigationBar from '../components/referee/navBar';

function Referee() {
	return (
		<>
			<NavigationBar />
			<Routes>
				<Route
					index
					element={<Index />}
				/>
				<Route path=':referee_id'>
					<Route
						index
						element={<Index />}
					/>
					<Route
						path=':round_id/:match_id'
						element={<Evaluate />}
					/>
				</Route>
			</Routes>
		</>
	);
}

export default Referee;
