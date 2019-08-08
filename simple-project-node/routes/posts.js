const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('./verify-token');
const db = require("../models");
const bcrypt = require('bcryptjs');
const process = require('process');

router.get('/', verifyToken, (req, res) => {
    db.posts.findAll().then(userss => {
        res.send(userss);
    });

});

module.exports = router;