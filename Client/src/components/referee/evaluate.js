import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Container, Table, Form, Row, Col, Button } from 'react-bootstrap';

import { useInfo } from '../../context/infoContext';
import MatchAPI from '../../services/match';
import ScoreAPI from '../../services/score';

function Evaluate() {
	const navigation = useNavigate();
	const score_info = useParams();

	const taskList = useInfo().tasks;

	const [teamName, setTeamName] = useState();
	const [roundName, setRoundName] = useState();
	const [matchName, setMatchName] = useState();
	const [score, setScore] = useState();
	useEffect(() => {
		MatchAPI.results(score_info.match_id, score_info.round_id)
			.then((match) => {
				if (score_info.referee_id === '1') {
					setScore(match[0].score1);
					setTeamName(match[0].team1_name);
				} else {
					setScore(match[0].score2);
					setTeamName(match[0].team2_name);
				}
				setMatchName(match[0].name);
				setRoundName(match[0].round_name);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);

	const submitScore = (e) => {
		//prevent default behaviour (refresh)
		e.preventDefault();
		//collect data from form
		const formData = new FormData(e.target);
		let doneTasks = [];
		taskList.map((task, index) => {
			if (task.type === 'N') {
				doneTasks = [...doneTasks, Number(formData.get(`task_${index}`))];
			} else if (formData.get(`task_${index}`)) {
				doneTasks = [...doneTasks, 1];
			} else {
				doneTasks = [...doneTasks, 0];
			}
			return NaN;
		});
		const estimation = formData.get('estimation');
		const penality = formData.get('penality');
		//send data to the db
		ScoreAPI.update(
			score.round_id,
			score.match_id,
			score.team_id,
			doneTasks,
			estimation,
			penality
		).then((data) => {
			if (data.matchedCount > 0) {
				navigation(`/referee/${score_info.referee_id}`);
			}
		});
	};
	return (
		<Container>
			<Row>
				<Col
					xs={12}
					md={6}
					className='h6'
				>
					Evaluation: {roundName} / {matchName}
				</Col>
				<Col
					xs={12}
					md={6}
					className='h6 text-end'
				>
					Team name: {teamName}
				</Col>
			</Row>
			<Form onSubmit={submitScore}>
				<Table>
					<thead>
						<tr>
							<th className='col'>Task</th>
							<th className='col text-center'>Points</th>
							<th className='col-2 text-center'>Evaluation</th>
						</tr>
					</thead>
					<tbody>
						{taskList.map((task, index) => (
							<tr key={`task_${index}`}>
								<td className='align-middle'>
									{task.name}
									<Form.Control style={{ display: 'none' }} />
								</td>
								<td className='text-center align-middle'>{task.score}</td>
								<td className='text-center'>
									{task.type === 'N' ? (
										<Form.Control
											type='number'
											step='1'
											placeholder='Repetition'
											size='sm'
											min='0'
											className='text-center'
											defaultValue={
												score && score.doneTasks.length
													? `${score.doneTasks[index]}`
													: ''
											}
											name={`task_${index}`}
										/>
									) : (
										<Form.Check
											inline
											label='Done'
											type='checkbox'
											className='m-0'
											defaultChecked={
												score &&
												score.doneTasks.length &&
												Number(score.doneTasks[index])
											}
											name={`task_${index}`}
										/>
									)}
								</td>
							</tr>
						))}
						<tr>
							<td className='align-middle'>Score Estimation</td>
							<td className='text-center align-middle'> N/A </td>
							<td className='text-center align-middle'>
								<Form.Control
									type='number'
									step='1'
									placeholder='Estimation'
									size='sm'
									min='0'
									className='text-center'
									defaultValue={
										score && score.hasOwnProperty('estimation')
											? `${score.estimation}`
											: ''
									}
									name='estimation'
								/>
							</td>
						</tr>
						<tr>
							<td className='align-middle'>Penality</td>
							<td className='text-center align-middle'> N/A </td>
							<td className='text-center align-middle'>
								<Form.Control
									type='number'
									step='1'
									placeholder='Penality'
									size='sm'
									min='0'
									className='text-center'
									defaultValue={
										score && score.hasOwnProperty('penality')
											? `${score.penality}`
											: ''
									}
									name='penality'
								/>
							</td>
						</tr>

						<tr>
							<td />
							<td />
							<td className='text-center align-middle'>
								<Button
									variant='primary'
									size='sm'
									className='w-100'
									type='submit'
								>
									Submit
								</Button>
							</td>
						</tr>
					</tbody>
				</Table>
			</Form>
		</Container>
	);
}

export default Evaluate;
