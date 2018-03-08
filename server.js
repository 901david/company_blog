require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3002;
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('companyblog/dist'));
app.use(cors());
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3002/authorized"
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);

    }
));




require("./routes/authroutes.js")(app, passport);
require("./routes/apiroutes.js")(app);

// Server Listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
