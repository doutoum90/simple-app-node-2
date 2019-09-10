var express = require('express');
var app = express();
const process = require('process');
const db = require("./models");

app.use(express.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const authroute = require('./routes/auth');
const postsRoutes = require('./routes/posts');
// const passportAuth = require('./routes/auth-bis');
app.use('/api/user', authroute);
// app.use('/api/passport', passportAuth);
app.use('/api/posts', postsRoutes);

app.listen(1245, () => {
    console.log('Server Api bien demarée sur le port 1245');
    db.sequelize.sync().then(() => {
        console.log('Server de base de données bien demarée sur le port 15432');
    });
});