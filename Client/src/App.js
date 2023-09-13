import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import './App.css';

import { InfoProvider } from './context/infoContext';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Display from './pages/display';
import ControlCenter from './pages/controlCenter';
import Referee from './pages/referee';
import DashboardAV from './pages/dashboardAV';

function App() {
	return (
		<InfoProvider>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/display'
					element={<Display />}
				/>
				<Route
					path='/controlCenter/*'
					element={<ControlCenter />}
				/>
				<Route
					path='/referee/*'
					element={<Referee />}
				/>
				<Route
					path='/dashboard'
					element={<DashboardAV />}
				/>
			</Routes>
		</InfoProvider>
	);
}

export default App;
