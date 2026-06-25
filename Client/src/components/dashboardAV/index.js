import { useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import RoundAPI from '../../services/round';
import Round from './round';

import io from 'socket.io-client';
import server from '../../services/server';

function Index() {
	const socket = io(server);

	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
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

	const sendSetTimer = () => {
		const timer = minutes * 60 + seconds;
		console.log("Sending timer to the display: ", timer);
		socket.emit('setTimer', timer);
	};

	const sendClearTimer = () => {
		socket.emit('clearTimer');
	};

	return (
		<Container>
			<Form className='sticky-top my-3 d-flex align-items-center flex-nowrap'>
				<Form.Group className="me-3 d-flex align-items-center">
					<Form.Label className="mb-0 me-2">Minutes:</Form.Label>
					<Form.Control type="number" value={minutes} onChange={(e) => setMinutes(parseInt(e.target.value))}/>
				</Form.Group>

				<Form.Group className="me-3 d-flex align-items-center">
					<Form.Label className="mb-0 me-2">Seconds:</Form.Label>
					<Form.Control type="number" value={seconds} onChange={(e) => setSeconds(parseInt(e.target.value))}/>
				</Form.Group>

				<Button variant="primary" className="ms-auto" onClick={() => sendSetTimer()}>Set Timer</Button>
				<Button variant="secondary" className="ms-2" onClick={() => sendClearTimer()}>Clear Timer</Button>
			</Form>	

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
