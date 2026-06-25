import './currentMatch.css';
import { useInfo } from '../../../context/infoContext';

function CurrentMatchBanner({ matchInfo }) {
	const colors = useInfo().colors;

	return (
		<div className='currentMatch'>
			<div className={'teams teamBIG'}>
				<div className='team1_container'>
					<div
						className='team1'
						style={{ backgroundColor: colors.team1 }}
					>
						<div className='teamName'>{matchInfo.team1_name}</div>
					</div>
					<div
						className='team1_container_filler'
						style={{ backgroundColor: colors.team1 }}
					/>
				</div>
				<div className='team2_container'>
					<div
						className='team2'
						style={{ backgroundColor: colors.team2 }}
					>
						<div className='teamName'>{matchInfo.team2_name}</div>
					</div>
					<div
						className='team2_container_filler'
						style={{ backgroundColor: colors.team2 }}
					/>
				</div>
			</div>
		</div>
	);
}

export default CurrentMatchBanner;
