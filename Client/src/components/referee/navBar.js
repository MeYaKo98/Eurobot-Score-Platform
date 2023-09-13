import Container from 'react-bootstrap/Container';
import { useNavigate, useParams, NavLink } from 'react-router-dom';

import { ButtonGroup, Navbar, ToggleButton } from 'react-bootstrap';

function NavigationBar() {
	const link = useParams()['*'];
	const navigate = useNavigate();

	const navLinks = [
		{ linkContent: 'Team 1', link: '1' },
		{ linkContent: 'Team 2', link: '2' },
	];
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
					Referee Center
				</Navbar.Brand>
				{link.split('/').length <= 1 && (
					<ButtonGroup className='ms-auto'>
						{navLinks.map((navLink) => (
							<ToggleButton
								type='radio'
								checked={link === navLink.link}
								variant='primary'
								key={navLink.linkContent + '_navLink'}
								as={NavLink}
								to={`${navLink.link}`}
								size='sm'
								onClick={() => {
									navigate(`${navLink.link}`);
								}}
							>
								{navLink.linkContent}
							</ToggleButton>
						))}
					</ButtonGroup>
				)}
			</Container>
		</Navbar>
	);
}

export default NavigationBar;
