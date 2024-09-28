import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';
import { useInfo } from '../../context/infoContext';

function DetailedScore({ onHide, DetailedScore }) {
	const taskList = useInfo().tasks;
	const notEstimatedTaskList = useInfo().notEstimatedTasks;
	return (
		<Modal
			show={DetailedScore ? true : false}
			onHide={onHide}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>
					{DetailedScore?.round_name} : {DetailedScore?.name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Table>
					<thead>
						<tr>
							<th className='col'>Task</th>
							<th className='col text-center'>{DetailedScore?.team1_name}</th>
							<th className='col-2 text-center'>{DetailedScore?.team2_name}</th>
						</tr>
					</thead>
					<tbody>
						{taskList.map((task, index) => (
							<tr key={`task_${index}`}>
								<td className='align-middle'>{task.name}</td>
								<td className='text-center align-middle'>
									{DetailedScore?.score1?.doneTasks.length
										? `${DetailedScore.score1.doneTasks[index]}`
										: '0'}
								</td>
								<td className='text-center align-middle'>
									{DetailedScore?.score2?.doneTasks.length
										? `${DetailedScore.score2.doneTasks[index]}`
										: '0'}
								</td>
							</tr>
						))}
						<tr style={{ borderTopColor: '#000000', borderTopWidth: 2 }}>
							<td className='align-middle'>Sub Total</td>
							<td className='text-center align-middle'>
								{DetailedScore?.score1?.total
									? `${DetailedScore.score1.total}`
									: '0'}
							</td>
							<td className='text-center align-middle'>
								{DetailedScore?.score2?.total
									? `${DetailedScore.score2.total}`
									: '0'}
							</td>
						</tr>
						<tr>
							<td className='align-middle'>Estimated Score</td>
							<td className='text-center align-middle'>
								{DetailedScore?.score1?.estimation
									? `${DetailedScore.score1.estimation}`
									: '0'}
							</td>
							<td className='text-center align-middle'>
								{DetailedScore?.score2?.estimation
									? `${DetailedScore.score2.estimation}`
									: '0'}
							</td>
						</tr>
						<tr>
							<td className='align-middle'>Estimation Bonus</td>
							<td className='text-center align-middle'>
								{DetailedScore?.score1?.bonus
									? `${DetailedScore.score1.bonus}`
									: '0'}
							</td>
							<td className='text-center align-middle'>
								{DetailedScore?.score2?.bonus
									? `${DetailedScore.score2.bonus}`
									: '0'}
							</td>
						</tr>
						<tr>
							<td className='align-middle'>Penality</td>
							<td className='text-center align-middle'>
								{DetailedScore?.score1?.penality
									? `${DetailedScore.score1.penality}`
									: '0'}
							</td>
							<td className='text-center align-middle'>
								{DetailedScore?.score2?.penality
									? `${DetailedScore.score2.penality}`
									: '0'}
							</td>
						</tr>
						{notEstimatedTaskList.map((task, index) => (
							<tr
								style={
									index === 0
										? { borderTopColor: '#000000', borderTopWidth: 2 }
										: {}
								}
								key={`notEstimatedTask_${index}`}
							>
								<td className='align-middle'>{task.name}</td>
								<td className='text-center align-middle'>
									{DetailedScore?.score1?.notEstimatedDoneTasks.length
										? `${DetailedScore.score1.notEstimatedDoneTasks[index]}`
										: '0'}
								</td>
								<td className='text-center align-middle'>
									{DetailedScore?.score2?.notEstimatedDoneTasks.length
										? `${DetailedScore.score2.notEstimatedDoneTasks[index]}`
										: '0'}
								</td>
							</tr>
						))}
						<tr style={{ borderTopColor: '#000000', borderTopWidth: 2 }}>
							<td className='align-middle'>Total</td>
							<td className='text-center align-middle'>
								{DetailedScore?.score1?.finalTotal
									? `${DetailedScore.score1.finalTotal}`
									: '0'}{' '}
							</td>
							<td className='text-center align-middle'>
								{DetailedScore?.score2?.finalTotal
									? `${DetailedScore.score2.finalTotal}`
									: '0'}
							</td>
						</tr>
					</tbody>
				</Table>
			</Modal.Body>
		</Modal>
	);
}

export default DetailedScore;
