import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import RoundAPI from '../../services/round';
import Round from './round';

function Index() {
	const [roundList, setRoundList] = useState([]);

	useEffect(() => {
		RoundAPI.get()
			.then((data) => {
				let index = 0;
				while (index < data.length && data[index].round_id[0] === 'F')
					index = index + 1;
				if (index === data.length) setRoundList(data);
				else {
					setRoundList([...data.slice(index), ...data.slice(0, index)]);
				}
			})
			.catch((error) => console.error('Error fetching data:', error));
	}, []);
	return (
		<Container>
			{roundList.map((round_info) => (
				<Round
					round_info={round_info}
					key={round_info.round_id}
				/>
			))}
		</Container>
	);
}

export default Index;
