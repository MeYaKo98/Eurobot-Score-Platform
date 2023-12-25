import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import UserAPI from '../../services/users';
import UsersList from './usersList';
import CreateUser from './createUser';

function Index() {
	const [usersList, setUsersList] = useState([]);
	const [searchUsername, setSearchUsername] = useState('');
	const [showCreateNewUser, setShowCreateNewUser] = useState(false);

	const deleteUser = (index) => {
		UserAPI.delete(usersList.at(index).username).then((data) => {
			setUsersList([
				...usersList.slice(0, index),
				...usersList.slice(index + 1),
			]);
		});
	};

	useEffect(() => {
		UserAPI.get(searchUsername).then((data) => {
			setUsersList(data);
		});
	}, [searchUsername]);

	return (
		<>
			<CreateUser
				show={showCreateNewUser}
				onHide={() => setShowCreateNewUser(false)}
				onSuccessRegister={() =>
					UserAPI.get(searchUsername).then((data) => {
						setUsersList(data);
					})
				}
			/>
			<Container>
				<div className='d-flex align-items-center mb-2'>
					<h6
						style={{ whiteSpace: 'nowrap' }}
						className='my-0'
					>
						User List:
					</h6>
					<Form.Control
						style={{ marginLeft: '0.5rem' }}
						placeholder='Search by Username'
						size='sm'
						name='username'
						onChange={(e) => setSearchUsername(e.target.value)}
						value={searchUsername}
						autoComplete='off'
					/>
					<Button
						style={{ marginLeft: '0.5rem' }}
						variant='outline-success'
						type='submit'
						size='sm'
						onClick={() => setShowCreateNewUser(true)}
					>
						<FontAwesomeIcon icon={faPlus} />
					</Button>
				</div>
				<UsersList
					usersList={usersList}
					deleteUser={deleteUser}
				/>
			</Container>
		</>
	);
}

export default Index;
