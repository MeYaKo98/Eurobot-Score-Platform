import { useEffect, useState } from 'react';
import MatchAPI from '../../services/match';
import TeamAPI from '../../services/team';
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

function Matches() {
	const [matchList, setMatchList] = useState([]);
	const [teamList, setTeamList] = useState([]);
	const [roundList, setRoundList] = useState([]);
	const [seletedRound_id, setSelectedRound_id] = useState();
	const [showCreateMatch, setCreateMatch] = useState(false);

	//collect all the data using the api(s)
	useEffect(() => {
		// collect the team list
		TeamAPI.get().then((data) => setTeamList(data));
		//collect round list (no finals)
		RoundAPI.get().then((data) => {
			let index = 0;
			while (index < data.length && data[index].round_id[0] === 'F')
				index = index + 1;
			if (index === data.length) setRoundList(data);
			else setRoundList([...data.slice(index), ...data.slice(0, index)]);
		});
	}, []);

	const updateRound_id = (round_id) => {
		MatchAPI.get(round_id).then((data) => {
			setMatchList(data);
			setSelectedRound_id(round_id);
			setCreateMatch(false);
		});
	};

	const deleteMatch = () => {
		if (matchList.length) {
			MatchAPI.delete(
				matchList.at(-1).match_id,
				matchList.at(-1).round_id
			).then((data) => {
				if (data.deletedCount > 0) setMatchList(matchList.slice(0, -1));
			});
		}
	};

	const createMatch = (e) => {
		//prevent default behaviour (refresh)
		e.preventDefault();
		//collect data from form
		const formData = new FormData(e.target);
		const newMatchName = formData.get('matchName');
		const team1_index = formData.get('team1');
		const team2_index = formData.get('team2');
		//sending data to the api
		MatchAPI.create(
			`M${matchList.length + 1}`,
			newMatchName,
			seletedRound_id,
			teamList[team1_index].team_id,
			teamList[team2_index].team_id
		).then((data) => {
			if (data._id) {
				data.team1_name = teamList[team1_index].name;
				data.team2_name = teamList[team2_index].name;
				setMatchList([...matchList, data]);
				setCreateMatch(false);
			}
		});
	};

	return (
		<Container>
			<div className='d-flex align-items-center mb-2'>
				<h6
					style={{ whiteSpace: 'nowrap' }}
					className='my-0'
				>
					Match List for:
				</h6>
				<Form.Select
					size='sm'
					name='round'
					defaultValue='none'
					className='mx-2'
					onChange={(e) => updateRound_id(e.target.value)}
				>
					<option
						disabled
						value='none'
						style={{
							display: 'none',
						}}
					>
						Select Round
					</option>
					{roundList.map((singleRound, index) => (
						<option
							key={singleRound.round_id}
							value={singleRound.round_id}
						>
							{singleRound.name}
						</option>
					))}
				</Form.Select>
				<Button
					variant='outline-success'
					size='sm'
					className='ms-auto mx-2'
					onClick={() => {
						setCreateMatch(true);
					}}
					disabled={
						!seletedRound_id || seletedRound_id[0] === 'F' ? true : false
					}
				>
					<FontAwesomeIcon icon={faPlus} />
				</Button>
				<Button
					variant='outline-danger'
					size='sm'
					onClick={deleteMatch}
					disabled={
						!seletedRound_id || !matchList.length || seletedRound_id[0] === 'F'
							? true
							: false
					}
				>
					<FontAwesomeIcon icon={faMinus} />
				</Button>
			</div>
			<ListGroup>
				{matchList.map((singleMatch, index) => (
					<ListGroupItem
						className='d-flex align-items-center'
						key={singleMatch.round_id + singleMatch.match_id}
					>
						{singleMatch.name} : {singleMatch.team1_name} - {''}
						{singleMatch.team2_name}
					</ListGroupItem>
				))}
				{showCreateMatch && (
					<ListGroupItem
						className='p-2'
						key='new'
					>
						<Form
							onSubmit={createMatch}
							className='d-flex align-items-center'
						>
							<Form.Control
								placeholder='Match name'
								size='sm'
								name='matchName'
								defaultValue={`Match ${matchList.length + 1}`}
							/>
							<Form.Select
								size='sm'
								style={{ marginLeft: '0.5rem' }}
								name='team1'
								defaultValue='none'
								autoFocus
							>
								<option
									disabled
									value='none'
									style={{
										display: 'none',
									}}
								>
									First team
								</option>
								{teamList.map((singleTeam, index) => (
									<option
										key={singleTeam.team_id}
										value={index}
									>
										{singleTeam.name}
									</option>
								))}
							</Form.Select>
							<Form.Select
								size='sm'
								style={{ marginLeft: '0.5rem' }}
								name='team2'
								defaultValue='none'
							>
								<option
									disabled
									value='none'
									style={{
										display: 'none',
									}}
								>
									Second team
								</option>
								{teamList.map((singleTeam, index) => (
									<option
										key={singleTeam.team_id}
										value={index}
									>
										{singleTeam.name}
									</option>
								))}
							</Form.Select>
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
								onClick={() => setCreateMatch(null)}
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

export default Matches;
