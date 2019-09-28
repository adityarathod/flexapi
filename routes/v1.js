var express = require('express');
var router = express.Router();

var flexSuite = require('../getters/flexGetter2');


router.post('/:school/login', (req, res, next) => {
    if (!req.body || !req.body.username || !req.body.password) {
        res.status(400).json({ error: 'MISSING_CREDENTIALS' });
        next();
    }
    flexSuite.setSchool(req.params.school);
    res.set('Content-Type', 'text/plain');
    flexSuite.login(username, password).then(cookieJar => {
        res.send(Buffer.from(cookieJar).toString('base64'));
        res.end();
    }).catch(err => {
        if (err === 'Incorrect username/password') {
            res.status(400).json({ error: 'INCORRECT_CREDENTIALS' });
        } else {
            res.status(400).json({ error: 'ERROR' });
        }
        res.end();
    });
});
module.exports = router;
