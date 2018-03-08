const fetch = require('node-fetch');


module.exports = (app, passport) => {

    app.get('/authorized',() => {
        passport.authenticate('github', { failureRedirect: '/fail' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.sendFile(path.join(__dirname, '..', 'companyblog', 'dist', 'index.html'));
        };
    });
};





