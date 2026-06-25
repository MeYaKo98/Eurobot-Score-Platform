import { useInfo } from '../../context/infoContext';
import './finalRoundResults.css';

function FinalRoundResults({ finalRoundResults }) {
    const colors = useInfo().colors;
    const shouldCenterRows = finalRoundResults?.length > 0 && finalRoundResults.length < 6;

    return (
        <div className='leaderboard-overlay'>
            <div className='leaderboard-card'>
                <div className='lb-header'>
                    {finalRoundResults && finalRoundResults[0]?.round_name} Eurobot 2026
                </div>
                <div className={`lb-list${shouldCenterRows ? ' centered' : ''}`}>
                    {finalRoundResults.map((matchResult, index) => (
                        <div
                            key={`match_${index}`}
                            className='lb-match-row'
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className='lb-match-team'>{matchResult.team1_name}</div>
                            <div className='lb-match-score' style={{ color: colors.team1 }}>
                                {matchResult.score1.score_status === 'true'
                                    ? matchResult.score1.finalTotal
                                    : 'NA'}
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>VS</div>
                            <div className='lb-match-score' style={{ color: colors.team2 }}>
                                {matchResult.score2.score_status === 'true'
                                    ? matchResult.score2.finalTotal
                                    : 'NA'}
                            </div>
                            <div className='lb-match-team right'>{matchResult.team2_name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FinalRoundResults;
