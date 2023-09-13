import { useEffect, useState } from 'react';
import RoundAPI from '../../services/round';
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
	faCheck,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';

function Rounds() {
	const [qualificationRoundList, setQualificationRoundList] = useState([]);
	const [finalsRoundList, setFinalsRoundList] = useState([]);
	const [showCreateQualificationRound, setCreateQualificationRound] =
		useState(false);
	const [showCreateFinalRound, setCreateFinalRound] = useState(false);

	useEffect(() => {
		RoundAPI.get().then((data) => {
			let index = 0;
			while (index < data.length && data[index].round_id[0] === 'F')
				index = index + 1;
			if (index === data.length) setQualificationRoundList(data);
			else {
				setFinalsRoundList(data.slice(0, index));
				setQualificationRoundList(data.slice(index));
			}
		});
	}, []);

	const deleteRound = () => {
		if (finalsRoundList.length) {
			RoundAPI.delete(finalsRoundList.at(-1).round_id).then((data) => {
				if (data.deletedCount > 0)
					setFinalsRoundList(finalsRoundList.slice(0, -1));
			});
		} else if (qualificationRoundList.length) {
			RoundAPI.delete(qualificationRoundList.at(-1).round_id).then((data) => {
				if (data.deletedCount > 0)
					setQualificationRoundList(qualificationRoundList.slice(0, -1));
			});
		}
	};

	const createQualifcationRound = (e) => {
		//prevent default behaviour (refresh)
		e.preventDefault();
		//collect data from form
		const formData = new FormData(e.target);
		const newRoundName = formData.get('roundName');
		//sending data to the api
		RoundAPI.create(`R${qualificationRoundList.length + 1}`, newRoundName).then(
			(data) => {
				if (data._id) {
					setQualificationRoundList([...qualificationRoundList, data]);
					setCreateQualificationRound(false);
				}
			}
		);
	};

	const createFinalRound = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const newRoundName = formData.get('roundName');
		//sending data to the api
		if (finalsRoundList.length) {
			RoundAPI.createFinalRound(
				newRoundName,
				`F${finalsRoundList.length + 1}`,
				finalsRoundList.at(-1).round_id
			).then((data) => {
				if (data[0]._id) {
					setFinalsRoundList([
						...finalsRoundList,
						{ name: newRoundName, round_id: `F${finalsRoundList.length + 1}` },
					]);
					setCreateFinalRound(false);
				}
			});
		} else {
			const teamsNumber = formData.get('teamNumbers');
			if (!teamsNumber) return;
			RoundAPI.createFirstFinal(newRoundName, Number(teamsNumber)).then(
				(data) => {
					if (data[0]._id) {
						setFinalsRoundList([
							...finalsRoundList,
							{ name: newRoundName, round_id: 'F1' },
						]);
						setCreateFinalRound(false);
					}
				}
			);
		}
	};

	return (
		<Container>
			<h6
				variant='primary'
				className='d-flex align-items-center'
			>
				Round List
				<Button
					variant='outline-success'
					size='sm'
					className='ms-auto mx-2'
					onClick={() => {
						setCreateQualificationRound(true);
						setCreateFinalRound(false);
					}}
					disabled={finalsRoundList.length ? true : false}
				>
					<FontAwesomeIcon icon={faPlus} />
				</Button>
				<Button
					variant='outline-danger'
					size='sm'
					onClick={deleteRound}
					disabled={
						finalsRoundList.length || !qualificationRoundList.length
							? true
							: false
					}
				>
					<FontAwesomeIcon icon={faMinus} />
				</Button>
			</h6>
			<ListGroup>
				{qualificationRoundList.map((singleRound, index) => (
					<ListGroupItem
						className='d-flex align-items-center'
						key={singleRound.round_id}
					>
						{singleRound.name}
					</ListGroupItem>
				))}
				{showCreateQualificationRound && (
					<ListGroupItem
						className='p-2'
						key='new'
					>
						<Form
							onSubmit={createQualifcationRound}
							className='d-flex align-items-center'
						>
							<Form.Control
								placeholder='Round name'
								size='sm'
								name='roundName'
								defaultValue={`Round ${qualificationRoundList.length + 1}`}
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
								onClick={() => setCreateQualificationRound(null)}
							>
								<FontAwesomeIcon icon={faXmark} />
							</Button>
						</Form>
					</ListGroupItem>
				)}
			</ListGroup>

			<h6
				variant='primary'
				className='d-flex align-items-center mt-2'
			>
				Final Round List
				<Button
					variant='outline-success'
					size='sm'
					className='ms-auto mx-2'
					onClick={() => {
						setCreateFinalRound(true);
						setCreateQualificationRound(false);
					}}
				>
					<FontAwesomeIcon icon={faPlus} />
				</Button>
				<Button
					variant='outline-danger'
					size='sm'
					onClick={deleteRound}
					disabled={finalsRoundList.length === 0 ? true : false}
				>
					<FontAwesomeIcon icon={faMinus} />
				</Button>
			</h6>
			<ListGroup>
				{finalsRoundList.map((singleRound, index) => (
					<ListGroupItem
						className='d-flex align-items-center'
						key={singleRound.round_id}
					>
						{singleRound.name}
					</ListGroupItem>
				))}
				{showCreateFinalRound && (
					<ListGroupItem
						className='p-2'
						key='new'
					>
						<Form
							onSubmit={createFinalRound}
							className='d-flex align-items-center'
						>
							<Form.Control
								placeholder='Round name'
								size='sm'
								name='roundName'
								autoFocus
							/>
							{!finalsRoundList.length && (
								<Form.Select
									size='sm'
									style={{ marginLeft: '0.5rem' }}
									name='teamNumbers'
									defaultValue='none'
								>
									<option
										disabled
										value='none'
										style={{
											display: 'none',
										}}
									>
										Number of finalist
									</option>
									<option value='2'>2</option>
									<option value='4'>4</option>
									<option value='8'>8</option>
									<option value='16'>16</option>
								</Form.Select>
							)}
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
								onClick={() => setCreateFinalRound(null)}
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

export default Rounds;
