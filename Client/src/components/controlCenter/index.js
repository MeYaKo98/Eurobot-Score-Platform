import { useEffect, useState } from 'react';
import {
	Container,
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	Badge,
} from 'react-bootstrap';
import TeamAPI from '../../services/team';
import RoundAPI from '../../services/round';

function Index() {
	const [teamList, setTeamList] = useState([]);
	const [roundList, setRoundList] = useState([]);

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

	const circleStyle = {
		width: '15rem',
		fontSize: `5rem`,
	};
	return (
		<Container>
			<Row>
				<Col
					xs={12}
					md={6}
					className='d-flex flex-column align-items-center'
				>
					<div
						className='h1 d-flex flex-column justify-content-center align-items-center rounded border border-5 border-black'
						style={circleStyle}
					>
						{teamList.length}
						<h5>Teams</h5>
					</div>
					<ListGroup className='w-100'>
						{teamList.map((singleTeam, index) => (
							<ListGroupItem
								className='d-flex align-items-center'
								key={singleTeam.team_id}
							>
								{singleTeam.name}
								<Badge
									className='ms-auto'
									bg='primary'
								>
									{singleTeam._scores_id.length}
								</Badge>
							</ListGroupItem>
						))}
					</ListGroup>
				</Col>
				<Col
					xs={12}
					md={6}
					className='d-flex flex-column align-items-center mt-md-0 mt-3'
				>
					<div
						className='h1 d-flex flex-column justify-content-center align-items-center rounded border border-5 border-black'
						style={circleStyle}
					>
						{roundList.length}
						<h5>Rounds</h5>
					</div>
					<ListGroup className='w-100'>
						{roundList.map((singleRound, index) => (
							<ListGroupItem
								className='d-flex align-items-center'
								key={singleRound.round_id}
							>
								{singleRound.name}
								<Badge
									className='ms-auto'
									bg='primary'
								>
									{singleRound._matches_id.length}
								</Badge>
							</ListGroupItem>
						))}
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
}

export default Index;
