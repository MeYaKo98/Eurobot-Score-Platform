const socketIo = require('socket.io');

function initWebSocket(server) {
	const io = socketIo(server, {
		cors: {
			origin: '*', // Replace with your client's origin
			methods: ['GET', 'POST'],
		},
	});

	io.on('connection', (socket) => {
		socket.on('startMatch', (msg) => {
			socket.broadcast.emit('startMatch', msg);
		});

		socket.on('stopMatch', (msg) => {
			socket.broadcast.emit('stopMatch', msg);
		});

		socket.on('matchResults', (msg) => {
			socket.broadcast.emit('matchResults', msg);
		});

		socket.on('roundResults', (msg) => {
			socket.broadcast.emit('roundResults', msg);
		});

		socket.on('disconnect', () => {
			socket.broadcast.emit('A user disconnected');
		});
	});
}

module.exports = initWebSocket;
