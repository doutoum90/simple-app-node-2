/* const router = require('express').Router();
const db = require("../models");
const bcrypt = require('bcryptjs');
const process = require('process');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwtStrategy = passportJWT.Strategy;
const extractJwt = passportJWT.ExtractJwt;

const opt = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'gheeghgherghheh'
}
const strategy = new jwtStrategy(opt, (payload, next) => {
    console.log('strategy', payload);
    next(null, existedUser);
});
passport.use(strategy);
router.use(passport.initialize());


router.get('/protected', passport.authenticate('jwt', { session: false }), async (req, res) => {
    res.send('connected')
});

router.post('/connect', (req, res) => {
    try {
        db.user.findOne({ where: { login: req.body.login } }).then(result => {
            console.log(result);
            result.authenticate(req.body.password).then((user) => {
                const payload = { id: user.id };
                const token = jwt.sign(payload, 'gheeghgherghheh');
                res.send(token)
            }).catch(err => {
                res.send(401).send('tesr');
            });
        });
    } catch (err) {
        res.status(400).send(err)
    }
});


module.exports = router; */