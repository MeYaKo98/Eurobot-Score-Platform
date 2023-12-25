require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Creating the websocket and initializing it
const server = http.createServer(app);
const initWebSocket = require('./routes/webSocket');
initWebSocket(server);
//Adding the required middleware
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);
app.use(cookieParser());

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
const authRouter = require('./routes/auth');
app.use('/', authRouter);

//Server opening communication port
server.listen(3001, () => {
	console.log('SERVER IS RUNNING');
});
