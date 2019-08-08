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
app.use('/api/user', authroute);
app.use('/api/posts', postsRoutes);

app.listen(1245, () => {
    db.sequelize.sync().then(() => {
        console.log('base de données bien demarée')
        console.log(`Server started on port 1245 ${process.env.POSTGRES_PASSWORD}`)
    });
});