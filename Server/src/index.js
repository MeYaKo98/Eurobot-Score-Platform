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

/*
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	console.log(`user connected: ${socket.id}`);

	socket.on('send_message', (data) => {
		socket.broadcast.emit('receive_message', data);
	});
});
*/

/*
io.of('/test').on('connection', (socket) => {
	console.log(`test user connected: ${socket.id}`);
});

*/
