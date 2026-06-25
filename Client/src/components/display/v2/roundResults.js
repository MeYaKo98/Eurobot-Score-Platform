import { useEffect, useState } from 'react';
import './roundResults.css';

const teamPerPage = 6;
const SUFFLE_DELAY = 2;

function RoundResults({ roundResults }) {
	const [diplayedTeams, setDisplayedTeams] = useState([]);
	const [diplayIndex, setDisplayIndex] = useState(0);

	useEffect(() => {
		setDisplayIndex(0);
	}, [roundResults]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setDisplayIndex((currentIndex) => {
				const nextIndex = currentIndex + teamPerPage;

				if (nextIndex >= roundResults.length) {
					return currentIndex;
				}

				return nextIndex;
			});
		}, SUFFLE_DELAY * 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [roundResults]);

	useEffect(() => {
		if (diplayIndex + teamPerPage < roundResults.length) {
			setDisplayedTeams(
				roundResults.slice(diplayIndex, diplayIndex + teamPerPage)
			);
		} else {
			setDisplayedTeams(roundResults.slice(diplayIndex));
		}
	}, [diplayIndex, roundResults]);

    return (
        <div className='leaderboard-overlay'>
            <div className='leaderboard-card'>
                <div className='lb-header'>Cumulative Score Eurobot 2026</div>
                <div className='lb-list'>
                    {diplayedTeams.map((team, index) => (
                        <div
                            key={`team_${team.name}_${index}`}
                            className='lb-row'
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className='lb-rank'>#{diplayIndex + index + 1}</div>
                            <div className='lb-team'>{team.name}</div>
                            <div className='lb-score'>{team.totalScore}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RoundResults;
