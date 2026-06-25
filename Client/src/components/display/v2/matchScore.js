import { useInfo } from '../../../context/infoContext';
import './matchScore.css';

function MatchScore({ matchResults }) {
	const colors = useInfo().colors;
	const taskList = useInfo().tasks;
	const notEstimatedTaskList = useInfo().notEstimatedTasks;
	const isEstimationActive = useInfo().isEstimationActive;

	return (
		<div className='match-score-overlay'>
			<div className='match-score-card'>
				<div className='ms-header'>{matchResults.round_name} Eurobot 2026</div>

				<div className='ms-content'>
					<div className='ms-teams-header'>
						<div className='ms-task-name'> </div>
						<div className='ms-score-col' style={{ backgroundColor: 'transparent', padding: 0 }}>
							<div className='ms-team-badge' style={{ backgroundColor: colors.team1 }}>
								{matchResults.team1_name}
							</div>
						</div>
						<div className='ms-score-col' style={{ backgroundColor: 'transparent', padding: 0 }}>
							<div className='ms-team-badge' style={{ backgroundColor: colors.team2 }}>
								{matchResults.team2_name}
							</div>
						</div>
					</div>

					<div className='ms-grid'>
					{/* Main Tasks */}
					{taskList.map((task, index) => (
						<div key={`task_${index}`} className='ms-row'>
							<div className='ms-task-name'>{task.name}</div>
							<div className='ms-score-col' style={{ color: colors.team1 }}>
								{matchResults?.score1?.doneTasks?.length
									? `${matchResults.score1.doneTasks[index] * task.score}`
									: '0'}
							</div>
							<div className='ms-score-col' style={{ color: colors.team2 }}>
								{matchResults?.score2?.doneTasks?.length
									? `${matchResults.score2.doneTasks[index] * task.score}`
									: '0'}
							</div>
						</div>
					))}
					
					{/* Sub Total */}
					<div className='ms-row ms-row-total'>
						<div className='ms-task-name'>Sub Total</div>
						<div className='ms-score-col'>
							{matchResults?.score1?.total ? `${matchResults.score1.total}` : '0'}
						</div>
						<div className='ms-score-col'>
							{matchResults?.score2?.total ? `${matchResults.score2.total}` : '0'}
						</div>
					</div>

					{/* Estimations */}
					{!!isEstimationActive && (
						<>
							<div className='ms-row'>
								<div className='ms-task-name'>Estimated Score</div>
								<div className='ms-score-col'>{matchResults?.score1?.estimation || '0'}</div>
								<div className='ms-score-col'>{matchResults?.score2?.estimation || '0'}</div>
							</div>
							<div className='ms-row'>
								<div className='ms-task-name'>Estimation Bonus</div>
								<div className='ms-score-col'>{matchResults?.score1?.bonus || '0'}</div>
								<div className='ms-score-col'>{matchResults?.score2?.bonus || '0'}</div>
							</div>
						</>
					)}

					{/* Penality */}
					<div className='ms-row'>
						<div className='ms-task-name'>Penality</div>
						<div className='ms-score-col' style={{ color: '#ff4d4d' }}>{matchResults?.score1?.penality || '0'}</div>
						<div className='ms-score-col' style={{ color: '#ff4d4d' }}>{matchResults?.score2?.penality || '0'}</div>
					</div>

					{/* Not Estimated Tasks */}
					{notEstimatedTaskList.map((task, index) => (
						<div key={`notEstimatedTask_${index}`} className='ms-row'>
							<div className='ms-task-name'>{task.name}</div>
							<div className='ms-score-col' style={{ color: colors.team1 }}>
								{matchResults?.score1?.notEstimatedDoneTasks?.length
									? `${matchResults.score1.notEstimatedDoneTasks[index] * task.score}`
									: '0'}
							</div>
							<div className='ms-score-col' style={{ color: colors.team2 }}>
								{matchResults?.score2?.notEstimatedDoneTasks?.length
									? `${matchResults.score2.notEstimatedDoneTasks[index] * task.score}`
									: '0'}
							</div>
						</div>
					))}

					{/* Final Total */}
					<div className='ms-row ms-row-total'>
						<div className='ms-task-name' style={{ fontWeight: 'bold' }}>FINAL TOTAL</div>
						<div className='ms-score-col'>
							{matchResults?.score1?.finalTotal || '0'}
						</div>
						<div className='ms-score-col'>
							{matchResults?.score2?.finalTotal || '0'}
						</div>
					</div>
					</div>

					{/* Winner Banner */}
					{matchResults?.score1?.hasOwnProperty('finalTotal') &&
						matchResults?.score2?.hasOwnProperty('finalTotal') && (
						<div className='ms-winner-banner'>
							{(matchResults?.score1?.finalTotal > matchResults?.score2?.finalTotal
								? matchResults.team1_name
								: matchResults.team2_name) + ' WINS!'}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default MatchScore;
