import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/userContext';

function RequireAuth({ allowedRole }) {
	const user = useAuth();
	const location = useLocation();

	if (user.logged) {
		//check if there is an allowedRole if so limit access to these role only + admin
		if (allowedRole) {
			if (allowedRole === user.role || user.role === 'admin') return <Outlet />;
			else
				return (
					<Navigate
						to='/'
						state={{ from: location }}
						replace
					/>
				);
		} else return <Outlet />;
	} else
		return (
			<Navigate
				to='/login'
				state={{ from: location }}
				replace
			/>
		);
}

export default RequireAuth;
