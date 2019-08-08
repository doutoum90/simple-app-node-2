const jwt = require('jsonwebtoken');
module.exports = function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        // to be filled

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        try {
            const verified = jwt.verify(bearerToken, process.env.SECRET_KEY);
            req.token = verified;
            next();

        } catch (err) {

            res.status(400).send('invalid token');
        }

    } else {
        res.sendStatus(403);
    }

}