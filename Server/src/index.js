const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

//Creating the websocket and initializing it
const server = http.createServer(app);
const initWebSocket = require('./routes/webSocket');
initWebSocket(server);

//Adding the required middleware
app.use(cors());

//Connecting to mangoDB
const connectToDatabase = require('./config/connectDB');
connectToDatabase();

//Connect Router
const infoRouter = require('./routes/info');
app.use('/info', infoRouter);
const roundRouter = require('./routes/round');
app.use('/round', roundRouter);
const matchRouter = require('./routes/match');
app.use('/match', matchRouter);
const teamRouter = require('./routes/team');
app.use('/team', teamRouter);
const scoreRouter = require('./routes/score');
app.use('/score', scoreRouter);
const finalsRouter = require('./routes/finals');
app.use('/finals', finalsRouter);

//Server opening communication port
server.listen(3001, () => {
	console.log('SERVER IS RUNNING');
});
