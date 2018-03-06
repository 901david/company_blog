module.exports = (app, passport) => {
    app.post('/authorize', (req, res) => {
        passport.authenticate('github', { scope: ['user:email'] });
    });
};
