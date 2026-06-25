import React, { useState, useEffect } from 'react';
import server from '../services/server';
import io from 'socket.io-client';
import MatchAPI from '../services/match';
import ScoreAPI from '../services/score';

const displayVersion = process.env.REACT_APP_DISPLAY_VERSION === 'v1' ? 'v1' : 'v2';

let Timer;
let ShowRoundMatches;
let CurrentMatchBanner;
let CurrentMatch;
let MatchScore;
let RoundResults;
let FinalRoundResults;

if (displayVersion === 'v1') {
	Timer = require('../components/display/v1/timer').default;
	ShowRoundMatches = require('../components/display/v1/showRoundMatches').default;
	CurrentMatchBanner = require('../components/display/v1/currentMatchBanner').default;
	CurrentMatch = require('../components/display/v1/currentMatch').default;
	MatchScore = require('../components/display/v1/matchScore').default;
	RoundResults = require('../components/display/v1/roundResults').default;
	FinalRoundResults = require('../components/display/v1/finalRoundResults').default;
} else {
	Timer = require('../components/display/v2/timer').default;
	ShowRoundMatches = require('../components/display/v2/showRoundMatches').default;
	CurrentMatchBanner = require('../components/display/v2/currentMatchBanner').default;
	CurrentMatch = require('../components/display/v2/currentMatch').default;
	MatchScore = require('../components/display/v2/matchScore').default;
	RoundResults = require('../components/display/v2/roundResults').default;
	FinalRoundResults = require('../components/display/v2/finalRoundResults').default;
}

function Display() {
	const [current, setCurrent] = useState();

	useEffect(() => {
		const socket = io(server);

		socket.on('startMatch', (match_info) => {
			MatchAPI.get(match_info.round_id, match_info.match_id).then((data) => {
				setCurrent(<CurrentMatch matchInfo={data[0]} />);
			});
		});
		socket.on('stopMatch', (match_info) => {
			setCurrent();
		});
		socket.on('matchResults', (match_info) => {
			MatchAPI.results(match_info.match_id, match_info.round_id).then(
				(data) => {
					setCurrent(<MatchScore matchResults={data[0]} />);
				}
			);
		});
		socket.on('roundResults', (round_id) => {
			if (round_id[0] === 'R') {
				ScoreAPI.up2round(round_id.slice(1)).then((data) => {
					setCurrent(<RoundResults roundResults={data} />);
				});
			} else if (round_id[0] === 'F') {
				MatchAPI.results(null, round_id).then((data) => {
					setCurrent(<FinalRoundResults finalRoundResults={data} />);
				});
			}
		});

		socket.on('showRoundMatches', (round_id) => {
			MatchAPI.get(round_id).then((data) => {
				console.log('Data received from the backend:', data);
				setCurrent(<ShowRoundMatches matchList={data} />);
			});
		});

		socket.on('setTimer', (timer) => {
			console.log('received timer from the backend: ', timer);
			setCurrent(<Timer timer={parseInt(timer)} />);
		});

		socket.on('clearTimer', () => {
			setCurrent();
		});

		socket.on('showMatchBanner', (match_info) => {
			MatchAPI.get(match_info.round_id, match_info.match_id).then((data) => {
				setCurrent(<CurrentMatchBanner matchInfo={data[0]} />);
			});
		});
	}, []);

	return (
		<div style={{ height: '100vh', width: '100vw', backgroundColor: 'none' }}>
			{current}
		</div>
	);
}

export default Display;
