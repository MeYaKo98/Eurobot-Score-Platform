import Modal from 'react-bootstrap/Modal';
import { Button, Form, FloatingLabel, Alert } from 'react-bootstrap';
import { useState } from 'react';
import UserAPI from '../../services/users';

function CreateUser({ show, onHide, onSuccessRegister }) {
	const [usernameInput, setUsernameInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [secondPasswordInput, set2ndPasswordInput] = useState('');
	const [userRole, setUserRole] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const rolesList = [
		{
			display: 'Admin',
			value: 'admin',
		},
		{
			display: 'AV',
			value: 'av',
		},
		{
			display: 'Referee',
			value: 'referee',
		},
		{
			display: 'Visiter',
			value: 'visiter',
		},
	];

	const register = async (e) => {
		e.preventDefault();
		if (passwordInput !== secondPasswordInput) {
			setErrorMsg('Verify the password');
		} else {
			UserAPI.create(usernameInput, passwordInput, userRole)
				.then(() => {
					setUsernameInput('');
					setPasswordInput('');
					set2ndPasswordInput('');
					setUserRole('');
					setErrorMsg('');
					onSuccessRegister();
					onHide();
				})
				.catch(() => {
					setErrorMsg('Registration failed');
				});
		}
	};

	return (
		<Modal
			show={show}
			onHide={() => {
				setUsernameInput('');
				setPasswordInput('');
				set2ndPasswordInput('');
				setUserRole('');
				setErrorMsg('');
				onHide();
			}}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>Create a new user</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={register}>
					<Form.Group className='mb-3'>
						<Form.Label>Role</Form.Label>
						<Form.Select
							name='round'
							onChange={(e) => {
								setUserRole(e.target.value);
								setErrorMsg('');
							}}
							value={userRole}
							required
						>
							<option
								disabled
								value=''
								style={{
									display: 'none',
								}}
							>
								Select Role
							</option>
							{rolesList.map((role) => (
								<option
									key={role.value}
									value={role.value}
								>
									{role.display}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Username</Form.Label>
						<Form.Control
							type='text'
							placeholder=''
							onChange={(e) => {
								setUsernameInput(e.target.value);
								setErrorMsg('');
							}}
							value={usernameInput}
							autoComplete='off'
							required
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder=''
							onChange={(e) => {
								setPasswordInput(e.target.value);
								setErrorMsg('');
							}}
							value={passwordInput}
							autoComplete='off'
							required
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder=''
							onChange={(e) => {
								set2ndPasswordInput(e.target.value);
								setErrorMsg('');
							}}
							value={secondPasswordInput}
							autoComplete='off'
							required
						/>
					</Form.Group>
					{errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
					<Button
						variant='primary'
						size='lg w-100 px-5'
						type='submit'
					>
						Register
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default CreateUser;
