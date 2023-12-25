import { useEffect, useState } from 'react';
import ScoreAPI from '../../services/score';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

function Up2Round({ round_id }) {
	const [scoreList, setScoreList] = useState([]);

	useEffect(() => {
		ScoreAPI.up2round(round_id.slice(1)).then((data) => setScoreList(data));
	}, [round_id]);

	return (
		<ListGroup className='my-3'>
			{scoreList.map((singleTeam, index) => (
				<ListGroupItem
					className='d-flex align-items-center justify-content-between'
					key={singleTeam.round_id + singleTeam.match_id}
				>
					<div style={{ whiteSpace: 'nowrap' }}>{singleTeam.name} :</div>
					<div style={{ whiteSpace: 'nowrap' }}>{singleTeam.totalScore}</div>
				</ListGroupItem>
			))}
		</ListGroup>
	);
}

export default Up2Round;
