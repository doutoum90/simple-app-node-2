const express = require('express');
const jwt = require('jsonwebtoken');
// const user = require('./models/users.model');

const process = require('process')
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres'
    // process.env.POSTGRES_DIALECT

});

const Model = Sequelize.Model;
class User extends Model { }
User.init({
    // attribute
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    password: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
        sequelize,
        modelName: 'user'
        // options
    });
const app = express();
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world'
    })
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            User.create({id: 2, name: "Jane", login: "Doe", password: 'testtysy' }).then(jane => {
                console.log("Jane's auto-generated ID:", jane.id);

                res.json({
                    message: 'Post created',
                    authData
                });
            });
           
        }
    });

});


app.get('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {

        if (err) {
            res.sendStatus(403);
        } else {
            pool.query('SELECT * FROM posts', (error, results) => {
                if (error) {
                    res.json({ error });
                }
                res.json({
                    results: results.rows
                })
            })
        }
    });


});
app.post('/api/login', (req, res) => {

    // mock user
    const user = {
        id: 1,
        username: 'test',
        email: 'test@test.com'
    }
    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({
            token
        })
    });
});




app.listen(1245, () => console.log(`Server started on port 1245 ${process.env.POSTGRES_DIALECT}`));



/******************************************* */


//const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const strategy = new Auth0Strategy(
    {
        domain: 'dev-edu2u23v.eu.auth0.com',
        clientID: 'qmmYr0J3NoExVVhPOF1ugwGZTw9i2NXf',
        clientSecret: 'I9AKOSvuINxxzDKKz16pVAQ1PfqccDcazxMs89IH1QcZ3rlxA45odUOI6kIsl57z',
        callbackUrl: 'http://localhost:5000/api/callback'

    },
    function (accessToken, refeshToken, extraParam, profile, done) {
        return done(null, profile);
    }
);

passport.use(strategy);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// const app = express();

passport.use(new BearerStrategy(
    function(token, done) {
      User.findOne({ token: token }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));

app.get('/api/login', passport.authenticate('auth0', {
    clientId: myVars.clientID,
    domain: myVars.clientID,
    redirectUri: myVars.clientID,
    responseType: 'code',
    audience: 'http://dev-edu2u23v.eu.auth0.com/userinfo',
    scope: 'openid profile',
    function(req, res) {
        res.redirect('/');
    }
})
);
app.get('/api/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


app.get('/api/callback',
    passport.authenticate('auth0', {
        failureRedirect: '/failure'
    }),
    function (req, res) {
        res.redirect('/user')
    }
);
app.listen(1245, () => console.log(`Server started on port 1245 ${process.env.POSTGRES_DIALECT}`));



/***************************************** */



// var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var db = require('./db');



// after authentication.
passport.use(new Strategy(
    function (token, cb) {
        db.users.findByToken(token, function (err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            return cb(null, user);
        });
    }));





app.use(require('morgan')('combined'));

// curl -v -H "Authorization: Bearer 123456789" http://127.0.0.1:3000/
// curl -v http://127.0.0.1:3000/?access_token=123456789
app.get('/api',
    passport.authenticate('bearer', { session: false }),
    function (req, res) {
        res.json({ username: req.user.username, email: req.user.emails[0].value });
    });

