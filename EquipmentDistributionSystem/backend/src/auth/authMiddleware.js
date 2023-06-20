const jwt = require('jsonwebtoken')
require('dotenv').config()

const KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, KEY)

        req.user = decoded.user;
        next()
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid token' })
    }
}


module.exports = verifyToken;