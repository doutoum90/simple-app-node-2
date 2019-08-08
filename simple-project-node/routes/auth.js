const router = require('express').Router();
const db = require("../models");
const bcrypt = require('bcryptjs');
const process = require('process');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(req.body.password, salt)
        const data = req.body;
        const savedUser = await db.user.build({
            password: hashedPwd,
            title: data.title,
            login: data.login
        }).save();
        res.send(savedUser)
    } catch (err) {
        res.status(400).send(err)
    }

});

router.post('/login', async (req, res) => {
    try {
        const data = req.body;
        const existedUser = await db.user.findOne({ login: data.login });
        if (!existedUser) return res.status(400).send('incorrect login');

        const validPass = await bcrypt.compare(req.body.password, existedUser.password);

        if (!validPass) return res.status(400).send('incorrect password');

    
        jwt.sign({ id: existedUser.id,  }, process.env.SECRET_KEY, (err, token) => {
            res.json({
                user: existedUser,
                token
            })
        });
    } catch (err) {
        res.status(400).send(err)
    }
});



module.exports = router;