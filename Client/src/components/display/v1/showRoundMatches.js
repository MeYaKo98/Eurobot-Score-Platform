import './roundResults.css';

import { useEffect, useState } from 'react';
import { useInfo } from '../../../context/infoContext';

const teamPerPage = 6;

function ShowRoundMatches({ matchList }) {
    const colors = useInfo().colors;
    const [timer, setTimer] = useState(0);
    const [diplayIndex, setDisplayIndex] = useState(0);
    const [diplayedMatches, setDisplayedMatches] = useState([]);

    useEffect(() => {
        if (diplayIndex + teamPerPage < matchList.length) {
            setDisplayedMatches(
                matchList.slice(diplayIndex, diplayIndex + teamPerPage)
            );
        } else {
            setDisplayedMatches(matchList.slice(diplayIndex));
        }
    }, [diplayIndex, matchList]);

    //update the diplay every 2 seconds
    useEffect(() => {
        // Define the time-based callback using setInterval
        const intervalId = setInterval(() => {
            if (timer > 0 && parseInt((timer - 1) / 2) === (timer - 1) / 2)
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
            setTimer(timer + 1);
            console.log(diplayIndex, matchList.length);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [timer, diplayIndex, matchList]);

    return (
        <div className='roundDisplay'>
            <div className='background fade'>
                <div className='header'>Current Round Matches</div>
                <div className='scoreTable'>
                    <table className='table'>
                        {diplayedMatches.map((match, index) => (
                            <tr
                                key={`match_${index}`}
                                className='scoreRow text-center'
                            >
                                <td className='align-center scoreColumn' style={{ backgroundColor: colors.team1 }}>{match.team1_name}</td>
                                <td className='align-center scoreColumn'>vs</td>
                                <td className='align-center scoreColumn' style={{ backgroundColor: colors.team2 }}>{match.team2_name}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ShowRoundMatches;
