import { useEffect, useState } from 'react';
import MatchAPI from '../../services/match';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import DetailedScore from './detailedScore';

function Round({ round_id }) {
	const [matchList, setMatchList] = useState([]);
	const [showDetailedScore, setShowDetailedScore] = useState(null);

	useEffect(() => {
		MatchAPI.results(null, round_id)
			.then((data) => setMatchList(data))
			.catch((error) => console.error('Error fetching data:', error));
	}, [round_id]);
	return (
		<>
			<DetailedScore
				DetailedScore={showDetailedScore}
				onHide={() => setShowDetailedScore(null)}
			/>
			<ListGroup className='my-3'>
				{matchList.map((singleMatch, index) => (
					<ListGroupItem
						className='d-flex align-items-center justify-content-between'
						key={singleMatch.round_id + singleMatch.match_id}
						onClick={() => setShowDetailedScore(singleMatch)}
					>
						<div style={{ whiteSpace: 'nowrap' }}>
							{singleMatch.team1_name} :{' '}
							{singleMatch.score1.score_status === 'true'
								? singleMatch.score1.finalTotal
								: 'N/A'}
						</div>
						<div style={{ whiteSpace: 'nowrap' }}>
							{singleMatch.score2.score_status === 'true'
								? singleMatch.score2.finalTotal
								: 'N/A'}{' '}
							: {singleMatch.team2_name}
						</div>
					</ListGroupItem>
				))}
			</ListGroup>
		</>
	);
}

export default Round;
