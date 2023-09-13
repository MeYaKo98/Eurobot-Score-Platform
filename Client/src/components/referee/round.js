import { useEffect, useState } from 'react';
import MatchAPI from '../../services/match';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function Round({ round_info }) {
	const navigation = useNavigate();
	const [matchList, setMatchList] = useState([]);
	const referee_info = useParams();

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
						className='d-flex align-items-center justify-content-between'
						key={singleMatch.round_id + singleMatch.match_id}
					>
						{(referee_info.referee_id === '1' || !referee_info.referee_id) && (
							<Button
								variant='outline-primary'
								size='sm'
								className='me-3'
								onClick={() =>
									navigation(
										`/referee/1/${round_info.round_id}/${singleMatch.match_id}`
									)
								}
							>
								Evaluate
							</Button>
						)}
						{singleMatch.team1_name} - {''}
						{singleMatch.team2_name}
						{(referee_info.referee_id === '2' || !referee_info.referee_id) && (
							<Button
								variant='outline-primary'
								size='sm'
								className='ms-3'
								onClick={() =>
									navigation(
										`/referee/2/${round_info.round_id}/${singleMatch.match_id}`
									)
								}
							>
								Evaluate
							</Button>
						)}
					</ListGroupItem>
				))}
			</ListGroup>
		</>
	);
}

export default Round;
