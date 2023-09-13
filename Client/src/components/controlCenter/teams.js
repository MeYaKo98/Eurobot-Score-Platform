import { useEffect, useState } from 'react';
import TeamAPI from '../../services/team';
import {
	Container,
	ListGroup,
	ListGroupItem,
	Button,
	Form,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlus,
	faMinus,
	faPenToSquare,
	faCheck,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';

function Teams() {
	const [teamList, setTeamList] = useState([]);
	const [editIndex, setEditIndex] = useState(null);
	const [showCreateTeam, setCreateTeam] = useState(false);

	useEffect(() => {
		TeamAPI.get().then((data) => setTeamList(data));
	}, []);

	const deleteTeam = () => {
		if (teamList.length) {
			TeamAPI.delete(teamList.at(-1).team_id).then((data) => {
				if (data.deletedCount > 0) setTeamList(teamList.slice(0, -1));
			});
		}
	};

	const createTeam = (e) => {
		//prevent default behaviour (refresh)
		e.preventDefault();
		//collect data from form
		const formData = new FormData(e.target);
		const newTeamName = formData.get('teamName');
		//sending data to the api
		TeamAPI.create(`T${teamList.length + 1}`, newTeamName).then((data) => {
			if (data._id) {
				setTeamList([...teamList, data]);
				setCreateTeam(false);
			}
		});
	};

	const editTeam = (e, index) => {
		//prevent default behaviour (refresh)
		e.preventDefault();
		//collect data from form
		const formData = new FormData(e.target);
		const newName = formData.get('teamName');
		//sending data to the api
		TeamAPI.update(teamList[index].team_id, newName).then((data) => {
			if (data.matchedCount > 0) {
				//updating the list
				const updatedTeamList = [...teamList];
				updatedTeamList[index].name = newName;
				setTeamList(updatedTeamList);
				setEditIndex(null);
			}
		});
	};

	return (
		<Container>
			<h6
				variant='primary'
				className='d-flex align-items-center'
			>
				Teams List
				<Button
					variant='outline-success'
					size='sm'
					className='ms-auto mx-2'
					onClick={() => {
						setCreateTeam(true);
						setEditIndex(null);
					}}
				>
					<FontAwesomeIcon icon={faPlus} />
				</Button>
				<Button
					variant='outline-danger'
					size='sm'
					onClick={deleteTeam}
					disabled={teamList.length ? false : true}
				>
					<FontAwesomeIcon icon={faMinus} />
				</Button>
			</h6>
			<ListGroup key='teamList'>
				{teamList.map((singleTeam, index) => (
					<ListGroupItem
						className={`d-flex align-items-center ${
							index === editIndex ? 'p-2' : ''
						}`}
						key={singleTeam.team_id}
					>
						{index === editIndex ? (
							<Form
								onSubmit={(e) => {
									editTeam(e, index);
								}}
								className='d-flex align-items-center w-100'
							>
								<Form.Control
									placeholder='Enter team name'
									size='sm'
									name='teamName'
									defaultValue={singleTeam.name}
									autoFocus
								/>
								<Button
									style={{ marginLeft: '0.5rem' }}
									variant='outline-success'
									type='submit'
									size='sm'
								>
									<FontAwesomeIcon icon={faCheck} />
								</Button>
								<Button
									style={{ marginLeft: '0.5rem' }}
									variant='outline-danger'
									type='reset'
									size='sm'
									onClick={() => setEditIndex(null)}
								>
									<FontAwesomeIcon icon={faXmark} />
								</Button>
							</Form>
						) : (
							<>
								{singleTeam.name}
								<FontAwesomeIcon
									onClick={() => {
										setEditIndex(index);
										setCreateTeam(false);
									}}
									icon={faPenToSquare}
									className='ms-auto'
								/>
							</>
						)}
					</ListGroupItem>
				))}
				{showCreateTeam && (
					<ListGroupItem
						className='p-2'
						key='new'
					>
						<Form
							onSubmit={createTeam}
							className='d-flex align-items-center'
						>
							<Form.Control
								placeholder='Enter team name'
								size='sm'
								name='teamName'
								autoFocus
							/>
							<Button
								style={{ marginLeft: '0.5rem' }}
								variant='outline-success'
								type='submit'
								size='sm'
							>
								<FontAwesomeIcon icon={faCheck} />
							</Button>
							<Button
								style={{ marginLeft: '0.5rem' }}
								variant='outline-danger'
								type='reset'
								size='sm'
								onClick={() => setCreateTeam(null)}
							>
								<FontAwesomeIcon icon={faXmark} />
							</Button>
						</Form>
					</ListGroupItem>
				)}
			</ListGroup>
		</Container>
	);
}

export default Teams;
