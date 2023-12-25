const jwt = require('jsonwebtoken');
const User = require('../models/user');

function checkTocken(roleList) {
	if (roleList)
		return async (req, res, next) => {
			//admin shall always have access
			if (!roleList.includes('admin')) {
				roleList.push('admin');
			}
			// collect the jwt tocket from the coockies
			const token = req.cookies['authToken'];
			if (!token) return res.status(401).json({ error: 'Access Denied' });
			try {
				// validate the tocken and check the role
				const decoded = jwt.verify(token, process.env.JTW_SECRET_KEY);
				const user = await User.findOne({ username: decoded.username });
				if (roleList.includes(user.role)) {
					req.userId = decoded.username;
					next();
				} else res.status(401).json({ error: 'Access Denied' });
			} catch (error) {
				res.status(401).json({ error: 'Invalid token' });
			}
		};
	else
		return async (req, res, next) => {
			// collect the jwt tocket from the coockies
			const token = req.cookies['authToken'];
			if (!token) return res.status(401).json({ error: 'Access Denied' });
			try {
				// validate the tocken and check the role
				const decoded = jwt.verify(token, process.env.JTW_SECRET_KEY);
				req.userId = decoded.username;
				next();
			} catch (error) {
				res.status(401).json({ error: 'Invalid token' });
			}
		};
}

module.exports = checkTocken;
