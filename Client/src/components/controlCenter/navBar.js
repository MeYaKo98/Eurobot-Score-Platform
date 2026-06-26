import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

import { Nav, Navbar } from 'react-bootstrap';
import eurobotLogo from '../../assets/eurobot_tn.svg';

function NavigationBar() {
	const navLinks = [
		{ linkContent: 'Teams', link: 'teams' },
		{ linkContent: 'Rounds', link: 'rounds' },
		{ linkContent: 'Matches', link: 'matches' },
	];
	return (
		<Navbar
			bg='dark'
			data-bs-theme='dark'
			expand='lg'
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
						Control Center
					</Navbar.Brand>
				</div>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto'>
						{navLinks.map((navLink) => (
							<Nav.Link
								key={navLink.linkContent + '_navLink'}
								as={NavLink}
								to={`${navLink.link}`}
							>
								{navLink.linkContent}
							</Nav.Link>
						))}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavigationBar;
