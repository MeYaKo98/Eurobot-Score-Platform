import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

import { Navbar } from 'react-bootstrap';

function NavigationBar() {
	return (
		<Navbar
			bg='dark'
			data-bs-theme='dark'
			className='mb-3'
		>
			<Container>
				<Navbar.Brand
					as={NavLink}
					to={''}
				>
					User Accounts Center
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
}

export default NavigationBar;
