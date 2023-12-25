import { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import RoundAPI from '../../services/round';
import Round from './round';
import Up2Round from './up2Round';

function Index() {
	const [qualificationRoundList, setQualificationRoundList] = useState([]);
	const [seletedRound_id, setSelectedRound_id] = useState();
	const [cumul, setCumul] = useState(false);

	useEffect(() => {
		RoundAPI.get().then((data) => {
			let index = 0;
			while (index < data.length && data[index].round_id[0] === 'F')
				index = index + 1;
			if (index === data.length) setQualificationRoundList(data);
			else {
				setQualificationRoundList(data.slice(index));
			}
		});
	}, []);

	return (
		<Container>
			<div className='d-flex align-items-center mb-2'>
				<h6
					style={{ whiteSpace: 'nowrap' }}
					className='my-0'
				>
					Score List for:
				</h6>
				<Form.Select
					size='sm'
					name='round'
					defaultValue='none'
					className='mx-2'
					onChange={(e) => setSelectedRound_id(e.target.value)}
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
					{qualificationRoundList.map((singleRound, index) => (
						<option
							key={singleRound.round_id}
							value={singleRound.round_id}
						>
							{singleRound.name}
						</option>
					))}
				</Form.Select>
				<Form.Check
					inline
					label='Cumul'
					type='checkbox'
					className='m-0'
					style={{ whiteSpace: 'nowrap' }}
					onChange={(e) => setCumul(e.target.checked)}
				/>
			</div>
			{seletedRound_id &&
				(cumul ? (
					<Up2Round round_id={seletedRound_id} />
				) : (
					<Round round_id={seletedRound_id} />
				))}
		</Container>
	);
}

export default Index;
