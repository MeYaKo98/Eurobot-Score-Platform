import { useInfo } from '../../context/infoContext';
import './finalRoundResults.css';

function FinalRoundResults({ finalRoundResults }) {
	const colors = useInfo().colors;

	return (
		<div className='finalDisplay'>
			<div className='background fade'>
				<div className='header'>
					{finalRoundResults && finalRoundResults[0].round_name} Eurobot 2024
				</div>
				<div className='scoreTable'>
					<table className='table'>
						{finalRoundResults.map((matchResult, index) => (
							<tr
								key={`team_${index}`}
								className='scoreRow text-center'
							>
								<td className='align-middle'>{matchResult.team1_name}</td>
								<td
									className='align-center scoreColumn'
									style={{
										backgroundColor: colors.team1,
									}}
								>
									{matchResult.score1.score_status === 'true'
										? matchResult.score1.finalTotal
										: 'NA'}
								</td>
								<td
									className='align-middle scoreColumn'
									style={{
										backgroundColor: colors.team2,
									}}
								>
									{matchResult.score2.score_status === 'true'
										? matchResult.score2.finalTotal
										: 'NA'}
								</td>
								<td className='align-middle'>{matchResult.team2_name}</td>
							</tr>
						))}
					</table>
				</div>
			</div>
		</div>
	);
}

export default FinalRoundResults;
