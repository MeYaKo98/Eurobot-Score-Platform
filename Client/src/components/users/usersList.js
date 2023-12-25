import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/userContext';

function UserList({ usersList, deleteUser }) {
	const currentUser = useAuth();
	return (
		<ListGroup className='my-3'>
			{usersList.map(
				(user, index) =>
					user.username != currentUser.username && (
						<ListGroupItem
							className='d-flex align-items-center justify-content-between'
							key={user.username}
						>
							<div
								style={{ whiteSpace: 'nowrap' }}
							>{`[${user.role}] ${user.username}`}</div>
							<div>
								<FontAwesomeIcon
									onClick={() => deleteUser(index)}
									icon={faXmark}
									className='ms-auto'
								/>
							</div>
						</ListGroupItem>
					)
			)}
		</ListGroup>
	);
}

export default UserList;
