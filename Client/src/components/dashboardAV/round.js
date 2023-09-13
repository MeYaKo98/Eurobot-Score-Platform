import { useEffect, useState } from 'react';
import MatchAPI from '../../services/match';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faPlay, faRepeat } from '@fortawesome/free-solid-svg-icons';

import io from 'socket.io-client';
import server from '../../services/server';

function Round({ round_info }) {
	const socket = io(server);
	//differet messages
	const startMatch = (singleMatch) => {
		socket.emit('startMatch', {
			match_id: singleMatch.match_id,
			round_id: singleMatch.round_id,
		});
	};
	const stopMatch = (singleMatch) => {
		socket.emit('stopMatch', {
			match_id: singleMatch.match_id,
			round_id: singleMatch.round_id,
		});
	};
	const matchResults = (singleMatch) => {
		socket.emit('matchResults', {
			match_id: singleMatch.match_id,
			round_id: singleMatch.round_id,
		});
	};
	const roundResults = (round_id) => {
		socket.emit('roundResults', round_id);
	};

	const [matchList, setMatchList] = useState([]);

	useEffect(() => {
		MatchAPI.get(round_info.round_id)
			.then((data) => setMatchList(data))
			.catch((error) => console.error('Error fetching data:', error));
	}, []);

	return (
		<>
			<h6
				style={{ whiteSpace: 'nowrap' }}
				className='my-0'
			>
				{round_info.name}
			</h6>
			<ListGroup className='my-3'>
				{matchList.map((singleMatch, index) => (
					<ListGroupItem
						className='d-flex align-items-center pe-2'
						key={singleMatch.round_id + singleMatch.match_id}
					>
						{singleMatch.name}: {singleMatch.team1_name} - {''}
						{singleMatch.team2_name}
						<Button
							variant='outline-primary'
							size='sm'
							className='ms-auto me-2'
							onClick={() => matchResults(singleMatch)}
						>
							Results
						</Button>
						<Button
							variant='outline-success'
							size='sm'
							className='me-2'
							onClick={() => startMatch(singleMatch)}
						>
							<FontAwesomeIcon icon={faPlay} />
						</Button>
						<Button
							variant='outline-danger'
							size='sm'
							className='me-2'
							onClick={() => stopMatch(singleMatch)}
						>
							<FontAwesomeIcon icon={faStop} />
						</Button>
						<Button
							variant='outline-warning'
							size='sm'
							className=''
						>
							<FontAwesomeIcon icon={faRepeat} />
						</Button>
					</ListGroupItem>
				))}
				<ListGroupItem className='d-flex align-items-center pe-2'>
					Round Results
					<Button
						variant='outline-primary'
						size='sm'
						className='ms-auto'
						onClick={() => roundResults(round_info.round_id)}
					>
						Show
					</Button>
				</ListGroupItem>
			</ListGroup>
		</>
	);
}

export default Round;
