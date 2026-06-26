import { useEffect, useState } from 'react';
import { useAuth } from '../context/userContext';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FloatingLabel, Alert, Card } from 'react-bootstrap';

import API from '../services/API';

import eurobotLogo from '../assets/eurobot_tn.svg';

function Login() {
	const user = useAuth();
	const [, setCookie] = useCookies(['authToken']);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';
	const [usernameInput, setUsernameInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {
		if (user.logged) navigate(from, { replace: true });
	}, [user.logged, from, navigate]);

	const login = async (e) => {
		e.preventDefault();
		try {
			const response = await API.get('/login', {
				username: usernameInput,
				password: passwordInput,
			});
			setCookie('authToken', response.token, { path: '/' });
		} catch (e) {
			setErrorMsg(e.response.data.error);
		}
		setPasswordInput('');
	};

	return (
		<Container
			className='d-flex flex-column align-items-center justify-content-center'
			style={{ height: '100svh' }}
		>
			<Card className='p-4 shadow-lg rounded-4 border-0' style={{ width: '100%', maxWidth: '400px', background: 'rgba(38, 42, 46, 0.8)', backdropFilter: 'blur(10px)' }}>
				<Card.Body className='d-flex flex-column align-items-center'>
					<img
						src={eurobotLogo}
						alt='Eurobot'
						className='mb-4'
						style={{ width: '180px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.15))' }}
					/>
					<Form onSubmit={login} className='w-100'>
						<FloatingLabel
							controlId='floatingInput'
							label='Username'
							className='mb-3'
						>
							<Form.Control
								type='text'
								placeholder='Username'
								autoFocus
								onChange={(e) => {
									setUsernameInput(e.target.value);
									setErrorMsg('');
								}}
								value={usernameInput}
								autoComplete='off'
								required
								className='rounded-3'
							/>
						</FloatingLabel>
						<FloatingLabel
							controlId='floatingPassword'
							label='Password'
							className='mb-4'
						>
							<Form.Control
								type='password'
								placeholder='Password'
								onChange={(e) => {
									setPasswordInput(e.target.value);
									setErrorMsg('');
								}}
								value={passwordInput}
								autoComplete='off'
								required
								className='rounded-3'
							/>
						</FloatingLabel>
						{errorMsg && <Alert variant='danger' className='rounded-3'>{errorMsg}</Alert>}
						<Button
							variant='primary'
							size='lg'
							className='w-100 py-2 mt-2 fw-bold rounded-pill shadow'
							type='submit'
						>
							Login
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default Login;
