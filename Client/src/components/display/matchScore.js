import { useInfo } from '../../context/infoContext';
import './matchScore.css';

function MatchScore({ matchResults }) {
	const colors = useInfo().colors;
	const taskList = useInfo().tasks;
	const notEstimatedTaskList = useInfo().notEstimatedTasks;

	return (
		<div className='score'>
			<div className='background fade'>
				<div className='header'>{matchResults.round_name} Eurobot 2024</div>
				<div className='teams'>
					Team 1:
					<span
						className='teamName'
						style={{
							backgroundColor: colors.team1,
						}}
					>
						{matchResults.team1_name}
					</span>{' '}
					- Team 2:{' '}
					<span
						className='teamName'
						style={{
							backgroundColor: colors.team2,
						}}
					>
						{matchResults.team2_name}
					</span>
				</div>
				<div className='scoreTable'>
					<table className='table'>
						{taskList.map((task, index) => (
							<tr
								key={`task_${index}`}
								className='scoreRow'
							>
								<td className='align-middle ps-3'>{task.name}</td>
								<td
									className='text-center align-middle scoreColumn'
									style={{
										backgroundColor: colors.team1,
									}}
								>
									{matchResults?.score1?.doneTasks.length
										? `${matchResults.score1.doneTasks[index] * task.score}`
										: '0'}
								</td>
								<td
									className='text-center align-middle scoreColumn'
									style={{
										backgroundColor: colors.team2,
									}}
								>
									{matchResults?.score2?.doneTasks.length
										? `${matchResults.score2.doneTasks[index] * task.score}`
										: '0'}
								</td>
							</tr>
						))}
						<tr className='scoreRow'>
							<td className='align-middle ps-3'>Sub Total</td>
							<td
								className='text-center align-middle'
								style={{
									backgroundColor: colors.team1,
								}}
							>
								{matchResults?.score1?.total
									? `${matchResults.score1.total}`
									: '0'}
							</td>
							<td
								className='text-center align-middle'
								style={{
									backgroundColor: colors.team2,
								}}
							>
								{matchResults?.score2?.total
									? `${matchResults.score2.total}`
									: '0'}
							</td>
						</tr>
						<tr className='scoreRow'>
							<td className='align-middle ps-3'>Estimated Score</td>
							<td
								className='text-center align-middle'
								style={{
									backgroundColor: colors.team1,
								}}
							>
								{matchResults?.score1?.estimation
									? `${matchResults.score1.estimation}`
									: '0'}
							</td>
							<td
								className='text-center align-middle'
								style={{
									backgroundColor: colors.team2,
								}}
							>
								{matchResults?.score2?.estimation
									? `${matchResults.score2.estimation}`
									: '0'}
							</td>
						</tr>
						<tr className='scoreRow'>
							<td className='align-middle ps-3'>Estimation Bonus</td>
							<td
								className='text-center align-middle'
								style={{
									backgroundColor: colors.team1,
								}}
							>
								{matchResults?.score1?.bonus
									? `${matchResults.score1.bonus}`
									: '0'}
							</td>
							<td
								className='text-center align-middle'
								style={{
									backgroundColor: colors.team2,
								}}
							>
								{matchResults?.score2?.bonus
									? `${matchResults.score2.bonus}`
									: '0'}
							</td>
						</tr>
						<tr className='scoreRow'>
							<td className='align-middle ps-3'>Penality</td>
							<td
								className='text-center align-middle'
								style={{
									backgroundColor: colors.team1,
								}}
							>
								{matchResults?.score1?.penality
									? `${matchResults.score1.penality}`
									: '0'}
							</td>
							<td
								className='text-center align-middle'
								style={{
									backgroundColor: colors.team2,
								}}
							>
								{matchResults?.score2?.penality
									? `${matchResults.score2.penality}`
									: '0'}
							</td>
						</tr>
						{notEstimatedTaskList.map((task, index) => (
							<tr
								key={`notEstimatedTask_${index}`}
								className='scoreRow'
							>
								<td className='align-middle ps-3'>{task.name}</td>
								<td
									className='text-center align-middle'
									style={{
										backgroundColor: colors.team1,
									}}
								>
									{matchResults?.score1?.notEstimatedDoneTasks.length
										? `${
												matchResults.score1.notEstimatedDoneTasks[index] *
												task.score
										  }`
										: '0'}
								</td>
								<td
									className='text-center align-middle'
									style={{
										backgroundColor: colors.team2,
									}}
								>
									{matchResults?.score2?.notEstimatedDoneTasks.length
										? `${
												matchResults.score2.notEstimatedDoneTasks[index] *
												task.score
										  }`
										: '0'}
								</td>
							</tr>
						))}
						<tr className='scoreRow'>
							<td className='align-middle ps-3'>Total</td>
							<td
								className='text-center align-middle'
								style={{
									backgroundColor: colors.team1,
								}}
							>
								{matchResults?.score1?.finalTotal
									? `${matchResults.score1.finalTotal}`
									: '0'}{' '}
							</td>
							<td
								className='text-center align-middle'
								style={{
									backgroundColor: colors.team2,
								}}
							>
								{matchResults?.score2?.finalTotal
									? `${matchResults.score2.finalTotal}`
									: '0'}
							</td>
						</tr>
					</table>
				</div>

				<div className='matchResult'>
					{matchResults?.score1?.hasOwnProperty('finalTotal') &&
						matchResults?.score2?.hasOwnProperty('finalTotal') &&
						(matchResults?.score1?.finalTotal > matchResults?.score2?.finalTotal
							? matchResults.team1_name
							: matchResults.team2_name) + ' WIN!'}
				</div>
			</div>
		</div>
	);
}

export default MatchScore;
