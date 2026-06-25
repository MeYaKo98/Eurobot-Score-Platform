import './currentMatch.css';
import { useInfo } from '../../../context/infoContext';

function CurrentMatchBanner({ matchInfo }) {
	const colors = useInfo().colors;

	return (
		<div className='scoreboard-overlay'>
			<div className='scoreboard-container'>
				<div className='team-side'>
					<div className='team-color-accent' style={{ backgroundColor: colors.team1 }}></div>
					<div className='team-color-bottom-border' style={{ backgroundColor: colors.team1 }}></div>
					<span className='team-name'>{matchInfo.team1_name}</span>
				</div>
				<div className='center-timer'>
					<span className='font timer'>VS</span>
				</div>
				<div className='team-side'>
					<div className='team-color-accent' style={{ backgroundColor: colors.team2 }}></div>
					<div className='team-color-bottom-border' style={{ backgroundColor: colors.team2 }}></div>
					<span className='team-name'>{matchInfo.team2_name}</span>
				</div>
			</div>
		</div>
	);
}

export default CurrentMatchBanner;
