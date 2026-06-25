import './showRoundMatches.css';
import { useEffect, useState } from 'react';
import { useInfo } from '../../context/infoContext';

const teamPerPage = 6;

function ShowRoundMatches({ matchList }) {
    const colors = useInfo().colors;
    const [timer, setTimer] = useState(0);
    const [diplayIndex, setDisplayIndex] = useState(0);
    const [diplayedMatches, setDisplayedMatches] = useState([]);
    const centerMatches = diplayedMatches.length > 0 && diplayedMatches.length < teamPerPage;

    useEffect(() => {
        if (diplayIndex + teamPerPage < matchList.length) {
            setDisplayedMatches(
                matchList.slice(diplayIndex, diplayIndex + teamPerPage)
            );
        } else {
            setDisplayedMatches(matchList.slice(diplayIndex));
        }
    }, [matchList]);

    //update the diplay every 2 seconds
    useEffect(() => {
        // Define the time-based callback using setInterval
        const intervalId = setInterval(() => {
            if (timer > 0 && parseInt((timer - 1) / 2) === (timer - 1) / 2) {
                if (diplayIndex < matchList.length) {
                    if (diplayIndex + teamPerPage < matchList.length) {
                        setDisplayedMatches(
                            matchList.slice(diplayIndex, diplayIndex + teamPerPage)
                        );
                    } else {
                        setDisplayedMatches(matchList.slice(diplayIndex));
                    }
                    setDisplayIndex(diplayIndex + teamPerPage);
                }
            }
            setTimer(timer + 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [timer, diplayIndex, matchList.length]);

    return (
        <div className='matches-overlay'>
            <div className='matches-container'>
                <div className='m-header'>Current Round Matches</div>
                <div className={`m-list${centerMatches ? ' centered' : ''}`}>
                    {diplayedMatches.map((match, index) => (
                        <div
                            key={`match_${index}_${match.team1_name}`}
                            className='m-card'
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className='m-team left'>
                                <div className='m-team-bg' style={{ backgroundColor: colors.team1 }}></div>
                                <span style={{ zIndex: 2 }}>{match.team1_name}</span>
                            </div>
                            <div className='m-vs-badge'>VS</div>
                            <div className='m-team right'>
                                <div className='m-team-bg' style={{ backgroundColor: colors.team2 }}></div>
                                <span style={{ zIndex: 2 }}>{match.team2_name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ShowRoundMatches;
