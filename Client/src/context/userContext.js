import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { decodeToken, isExpired } from 'react-jwt';

//context definition
const userContext = React.createContext();

//collect the context data
export function useAuth() {
	return useContext(userContext);
}

//context wrapper
export function UserProvider({ children }) {
	//define the the context value state
	const [user, setUser] = useState({
		logged: false,
		role: null,
		username: null,
	});
	// the tocken cookies
	const [cookies, setCookie] = useCookies(['authToken']);

	//collect the user data on creation
	useEffect(() => {
		/*setCookie(
			'authToken',
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1leWFrbyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMjc2NTUxMSwiZXhwIjoxNzAyNzY5MTExfQ.MtaZLgkj58eJg0KY1uV-x4_z8foOCdpS80Nn895eY6U',
			{ path: '/' }
		);*/
		try {
			const decodedToken = decodeToken(cookies.authToken);
			if (isExpired(cookies.authToken)) {
				setUser({
					logged: false,
					role: null,
					username: null,
				});
				setCookie('authToken', '', { path: '/' });
			} else
				setUser({
					logged: true,
					role: decodedToken.role,
					username: decodedToken.username,
				});
		} catch (error) {
			setUser({
				logged: false,
				role: null,
				username: null,
			});
		}
	}, [cookies]);

	return <userContext.Provider value={user}>{children}</userContext.Provider>;
}
