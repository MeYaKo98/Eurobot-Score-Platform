import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './context/userContext';
import { InfoProvider } from './context/infoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<UserProvider>
			<InfoProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</InfoProvider>
		</UserProvider>
	</React.StrictMode>
);
