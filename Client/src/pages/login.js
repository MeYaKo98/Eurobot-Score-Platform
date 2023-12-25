import { useEffect, useState } from 'react';
import { useAuth } from '../context/userContext';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FloatingLabel, Alert } from 'react-bootstrap';

import API from '../services/API';

import eurobotLogo from '../assets/eurobot_tn.svg';

function Login() {
	const user = useAuth();
	const [cookies, setCookie] = useCookies(['authToken']);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';
	const [usernameInput, setUsernameInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {
		if (user.logged) navigate(from, { replace: true });
	}, [user]);

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
			<Container className='d-flex flex-column w-auto'>
				<img
					src={eurobotLogo}
					alt=''
					className='mb-5'
				/>
				<Form onSubmit={login}>
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
						/>
					</FloatingLabel>
					<FloatingLabel
						controlId='floatingPassword'
						label='Password'
						className='mb-3'
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
						/>
					</FloatingLabel>
					{errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
					<Button
						variant='outline-primary'
						size='lg w-100 px-5'
						type='submit'
					>
						Login
					</Button>
				</Form>
			</Container>
		</Container>
	);
}

export default Login;
