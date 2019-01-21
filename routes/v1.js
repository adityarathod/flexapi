var express = require('express');
var router = express.Router();

var flexSuite = require('../getters/flexSuite');


router.post('/:school/login', (req, res, next) => {
    res.set('Content-Type', 'text/plain');
    flexSuite.setSchool('irvington');
    flexSuite.login('***REMOVED***', '***REMOVED***').then(cookieJar => {
        res.send(Buffer.from(cookieJar).toString('base64'));
        res.end();
    }).catch(err => {
        if (err === 'Incorrect username/password') {
            res.status(400).send('Incorrect credentials');
        }
        res.end();
    })
})
module.exports = router;