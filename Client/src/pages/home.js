import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/userContext';
import { useCookies } from 'react-cookie';

import eurobotLogo from '../assets/eurobot_tn.svg';

function Home({ linkList }) {
	//display on role related links
	const user = useAuth();
	const [, setCookie] = useCookies(['authToken']);

	return (
		<Container
			className='d-flex flex-column align-items-center justify-content-center'
			style={{ height: '100svh' }}
		>
			<Container className='d-flex flex-column w-auto mt-5 text-center'>
				<img
					src={eurobotLogo}
					alt='Eurobot'
					className='mb-5 mx-auto'
					style={{ width: '250px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.15))' }}
				/>
				<div className="d-grid gap-3" style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                    {linkList.map(
                        (buttonData) =>
                            (!buttonData.requiredRole ||
                                user.role === 'admin' ||
                                user.role === buttonData.requiredRole) && (
                                <Link
                                    to={buttonData.link}
                                    key={buttonData.btnContent + '_link'}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Button
                                        variant='primary'
                                        size='lg'
                                        className='w-100 fw-bold rounded-pill shadow'
                                        key={buttonData.btnContent + '_button'}
                                    >
                                        {buttonData.btnContent}
                                    </Button>
                                </Link>
                            )
                    )}
                    <Button
                        variant='outline-danger'
                        size='lg'
                        className='w-100 mt-4 fw-bold rounded-pill'
                        onClick={() => setCookie('authToken', '', { path: '/' })}
                    >
                        Logout
                    </Button>
				</div>
			</Container>
		</Container>
	);
}

export default Home;
