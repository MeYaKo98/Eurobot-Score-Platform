import { useEffect, useState } from 'react';
import './roundResults.css';

const teamPerPage = 6;
const SUFFLE_DELAY = 2;

function RoundResults({ roundResults }) {
	const [timer, setTimer] = useState(0);
	const [diplayedTeams, setDisplayedTeams] = useState([]);
	const [diplayIndex, setDisplayIndex] = useState(0);

	//display the list from the start
	useEffect(() => {
		if (diplayIndex + teamPerPage < roundResults.length) {
			setDisplayedTeams(
				roundResults.slice(diplayIndex, diplayIndex + teamPerPage)
			);
		} else {
			setDisplayedTeams(roundResults.slice(diplayIndex));
		}
	}, []);

	//update the diplay every 2 seconds
	useEffect(() => {
		// Define the time-based callback using setInterval
		const intervalId = setInterval(() => {
			if (timer > 0 && parseInt((timer - 1) / 2) === (timer - 1) / 2)
				if (diplayIndex < roundResults.length) {
					if (diplayIndex + teamPerPage < roundResults.length) {
						setDisplayedTeams(
							roundResults.slice(diplayIndex, diplayIndex + teamPerPage)
						);
					} else {
						setDisplayedTeams(roundResults.slice(diplayIndex));
					}
					setDisplayIndex(diplayIndex + teamPerPage);
				}
			setTimer(timer + 1);
			console.log(diplayIndex, roundResults.length);
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [timer]);

	return (
		<div className='roundDisplay'>
			<div className='background fade'>
				<div className='header'>Cumulative Score Eurobot 2024</div>
				<div className='scoreTable'>
					<table className='table'>
						{diplayedTeams.map((team, index) => (
							<tr
								key={`team_${index}`}
								className='scoreRow text-center'
							>
								<td className='align-middle scoreRow'>{team.name}</td>
								<td className='align-center scoreColumn'>{team.totalScore}</td>
							</tr>
						))}
					</table>
				</div>
			</div>
		</div>
	);
}

export default RoundResults;
