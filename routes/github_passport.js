
const GitHubStrategy = require('passport-github2').Strategy;

module.exports = (passport) => {
    passport.use(new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "http://127.0.0.1:3002/authorized"
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOrCreate({ githubId: profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    ));
};
