import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

import { Nav, Navbar } from 'react-bootstrap';

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
			className='mb-3'
		>
			<Container>
				<Navbar.Brand
					as={NavLink}
					to={''}
				>
					Control Center
				</Navbar.Brand>
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
