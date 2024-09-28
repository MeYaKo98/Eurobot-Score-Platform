import { useEffect, useState } from 'react';
import { useInfo } from '../../context/infoContext';
import './currentMatch.css';

const MATCH_DURATION = 100;
const INTRO_DURATION = 2;
const COUNTDOWN_DURATION = 5;

function CurrentMatch({ matchInfo }) {
	const [state, setState] = useState('start');
	const [timer, setTimer] = useState(0);
	const colors = useInfo().colors;

	useEffect(() => {
		// Define the time-based callback using setInterval
		const intervalId = setInterval(() => {
			if (timer === INTRO_DURATION - 1) setState('countDown');
			if (timer === INTRO_DURATION + COUNTDOWN_DURATION - 1) setState('count');
			if (timer < MATCH_DURATION + COUNTDOWN_DURATION + INTRO_DURATION)
				setTimer(timer + 1);
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [timer]);

	const formatTime = (seconds) => {
		const s = seconds % 60;
		const mn = parseInt(seconds / 60);
		if (s > 9) return `0${mn}:${s}`;
		return `0${mn}:0${s}`;
	};

	return (
		<div className='currentMatch'>
			<div className='font timer'>
				{(state === 'count' || state === 'starting') &&
					formatTime(timer - INTRO_DURATION - COUNTDOWN_DURATION)}
			</div>
			<div className={state === 'count' ? 'teams teamSMALL' : 'teams teamBIG'}>
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
			<div className='font countdown'>
				{state === 'countDown' && INTRO_DURATION + COUNTDOWN_DURATION - timer}
			</div>
		</div>
	);
	//<h1>{JSON.stringify(matchInfo)}</h1>;
}

export default CurrentMatch;
