import { useEffect, useState } from 'react';
import { useInfo } from '../../../context/infoContext';
import './roundResults.css';

const teamPerPage = 6;
const SUFFLE_DELAY = 2;

function RoundResults({ roundResults }) {
	const year = useInfo().year;
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
	}, [diplayIndex, roundResults]);

	//update the diplay every 2 seconds
	useEffect(() => {
		// Define the time-based callback using setInterval
		const intervalId = setInterval(() => {
			if (diplayIndex+teamPerPage < roundResults.length) {
				setDisplayIndex(diplayIndex + teamPerPage);
            }
			console.log(diplayIndex, roundResults.length);
		}, SUFFLE_DELAY*1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [diplayIndex, roundResults]);

	return (
		<div className='roundDisplay'>
			<div className='background fade'>
				<div className='header'>Cumulative Score Eurobot {year}</div>
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
