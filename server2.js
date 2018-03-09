require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const GitHubStrategy = require('passport-github2').Strategy;
const path = require('path');
const cookieParser = require('cookie-parser');
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const PORT = process.env.PORT || 3002;
const firebase = require('firebase');

firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
});
const db = firebase.database();

// Passport session setup.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

let profileInfo;
passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3002/auth/github/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        profileInfo = profile;

        process.nextTick(function () {

            return done(null, profile);
        });
    }
));




const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'companyblog', 'dist')));


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'companyblog', 'dist', 'index.html'));
});



//Auth routes
app.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }),
    function(req, res){
        // The request will be redirected to GitHub for authentication, so this
        // function will not be called.
    });

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {

    const gitProfile = {
        id: profileInfo.id,
        displayName: profileInfo.displayName,
        userName: profileInfo.username,
        profileUrl: profileInfo.profileUrl,
        email: profileInfo.emails[0].value ? profileInfo.emails[0].value : '',
        avatar: profileInfo.photos[0].value ? profileInfo.photos[0].value : '',
        bio: profileInfo._json.bio,
        viewed: []
    };
        db.ref(`/users/${profileInfo.username}`).set(gitProfile);
        res.cookie('currentUser', {userName: gitProfile.userName, displayName: gitProfile.displayName, id: gitProfile.id}, {expire: 360000 + Date.now()}).redirect('/');
    });

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.listen(PORT, (err) => {
    if(!err) {
        console.log(`Listening on port:  ${PORT}`);
    }
    else {
        console.log(err);
    }
});

