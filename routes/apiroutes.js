const path = require('path');

module.exports = (app) => {
    app.get('/', (req, res) => {
       res.sendFile(path.join(__dirname, 'landing.html'));
    });
    app.get('/main', (req, res) => {
       res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
    });

};
