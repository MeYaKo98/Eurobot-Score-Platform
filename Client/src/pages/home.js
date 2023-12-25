import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/userContext';
import { useCookies } from 'react-cookie';

import eurobotLogo from '../assets/eurobot_tn.svg';

function Home({ linkList }) {
	//display on role related links
	const user = useAuth();
	const [cookies, setCookie] = useCookies(['authToken']);

	return (
		<Container
			className='d-flex flex-column align-items-center justify-content-center'
			style={{ height: '100svh' }}
		>
			<Container className='d-flex flex-column w-auto'>
				<img
					src={eurobotLogo}
					alt=''
					className='mb-5'
				/>
				{linkList.map(
					(buttonData) =>
						(!buttonData.requiredRole ||
							user.role === 'admin' ||
							user.role === buttonData.requiredRole) && (
							<Link
								to={buttonData.link}
								key={buttonData.btnContent + '_link'}
							>
								<Button
									variant='outline-primary'
									size='lg my-2 w-100 px-5'
									key={buttonData.btnContent + '_button'}
								>
									{buttonData.btnContent}
								</Button>
							</Link>
						)
				)}
				<Button
					variant='primary'
					size='lg my-2 w-100 px-5'
					onClick={() => setCookie('authToken', '', { path: '/' })}
				>
					Logout
				</Button>
			</Container>
		</Container>
	);
}

export default Home;
