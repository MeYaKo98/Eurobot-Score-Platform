import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

import { Navbar } from 'react-bootstrap';
import eurobotLogo from '../../assets/eurobot_tn.svg';

function NavigationBar() {
	return (
		<Navbar
			bg='dark'
			data-bs-theme='dark'
			className='mb-3 custom-navbar'
		>
			<Container>
				<div className="d-flex align-items-center">
					<Navbar.Brand
						as={NavLink}
						to={'/'}
						className="me-3"
					>
						<img
							src={eurobotLogo}
							width="30"
							height="30"
							className="d-inline-block align-top"
							alt="Eurobot Logo"
						/>
					</Navbar.Brand>
					<Navbar.Brand
						as={NavLink}
						to={''}
						className="mb-0"
					>
						User Accounts Center
					</Navbar.Brand>
				</div>
			</Container>
		</Navbar>
	);
}

export default NavigationBar;
