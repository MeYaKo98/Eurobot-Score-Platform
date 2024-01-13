import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import './App.css';

import { Routes, Route } from 'react-router-dom';
import RequireAuth from './features/requireAuth';
import Home from './pages/home';
import Display from './pages/display';
import ControlCenter from './pages/controlCenter';
import Referee from './pages/referee';
import DashboardAV from './pages/dashboardAV';
import Login from './pages/login';
import Scores from './pages/scores';
import Users from './pages/users';

function App() {
	const linkList = [
		{
			btnContent: 'Scores',
			link: '/scores',
			component: <Scores />,
		},
		{
			btnContent: 'Control Center',
			link: '/controlCenter',
			component: <ControlCenter />,
			requiredRole: 'admin',
		},
		{
			btnContent: 'Referee',
			link: '/referee',
			component: <Referee />,
			requiredRole: 'referee',
		},
		{
			btnContent: 'Dashboard AV',
			link: '/dashboard',
			component: <DashboardAV />,
			requiredRole: 'av',
		},
		{
			btnContent: 'Users',
			link: '/users',
			component: <Users />,
			requiredRole: 'admin',
		},
	];
	return (
		<Routes>
			<Route element={<RequireAuth />}>
				<Route
					path='/'
					element={<Home linkList={linkList} />}
				/>
			</Route>
			{linkList.map((link) => (
				<Route
					element={<RequireAuth allowedRole={link.requiredRole} />}
					key={link.btnContent + '_route_auth'}
				>
					<Route
						path={link.link + '/*'}
						element={link.component}
					/>
				</Route>
			))}
			<Route
				path='/display'
				element={<Display />}
			/>

			<Route
				path='/login'
				element={<Login />}
			/>
		</Routes>
	);
}

export default App;
