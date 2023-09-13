const socketIo = require('socket.io');

//get the ip adress of your machine
const os = require('os');
const networkInterfaces = os.networkInterfaces();
const hostIpAddresses = Object.keys(networkInterfaces).reduce(
	(ipAddresses, interfaceName) => {
		const interfaceInfo = networkInterfaces[interfaceName];
		for (const iface of interfaceInfo) {
			if (iface.family === 'IPv4' && !iface.internal) {
				ipAddresses.push('http://' + iface.address + ':3000');
			}
		}
		return ipAddresses;
	},
	[]
);

function initWebSocket(server) {
	const io = socketIo(server, {
		cors: {
			origin: ['http://localhost:3000', ...hostIpAddresses], // Replace with your client's origin
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
