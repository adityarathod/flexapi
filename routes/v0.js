var express = require('express');
var router = express.Router();

var flexGetter = require('../getters/flexGetter');

router.post('/:school/appointments', (req, res, next) => {
  if (!req.body || !req.body.username || !req.body.password) {
    res.status(400).json({ error: 'MISSING_CREDENTIALS' });
    next();
  }
  flexGetter.setSchool(req.params.school);
  flexGetter.login(req.body.username, req.body.password)
    .then(flexGetter.getAppointments)
    .then(body => {
      if (body === "" || !body) {
        res.status(400).json({ error: 'INVALID_CREDENTIALS' });
        res.end();
      } else {
        res.type('json').send(body);
      }
    })
    .catch(() => {
      res.status(400).json({ error: "REJECTED" });
    });
});

router.post('/:school/makeAppointment', (req, res, next) => {
  if (!req.body || !req.body.username || !req.body.password) {
    res.status(400).json({ error: 'MISSING_CREDENTIALS' });
    next();
  }
  if (!req.body.teacherID || !req.body.startDate || req.body.comments == null || !req.body.eventNum) {
    res.status(400).json({ error: 'REQUIRED_INFO_NOT_PRESENT' });
    next();
  }
  var requestData = {
    st: req.body.teacherID,
    stDate: req.body.startDate,
    comments1: req.body.comments,
    event: req.body.eventNum
  };
  flexGetter.setSchool(req.params.school);
  flexGetter.login(req.body.username, req.body.password)
    .then(jar => flexGetter.makeAppointment(jar, requestData))
    .then(body => {
      if (body === "" || !body) {
        res.json({ status: 'SUCCESSFUL' });
        res.end();
      } else {
        res.status(400).json({ error: 'INVALID_DATA' });
        res.end();
      }
    })
    .catch(() => {
      res.status(400).json({ error: "REJECTED" });
    });
});


router.post('/:school/offerings', (req, res, next) => {
  if (!req.body || !req.body.username || !req.body.password) {
    res.status(400).json({ error: 'MISSING_CREDENTIALS' });
    next();
  }
  flexGetter.setSchool(req.params.school)
  flexGetter.login(req.body.username, req.body.password)
    .then(flexGetter.getOfferings)
    .then(body => {
      if (body === "" || !body) {
        res.status(400).json({ error: 'INVALID_CREDENTIALS' });
        res.end();
      } else {
        res.type('json').send(body);
      }
    })
    .catch(() => {
      res.status(400).json({ error: "REJECTED" });
    });
});

router.get('/:school/teachers', (req, res) => {
  if (req.params.school !== 'irvington') {
    res.status(400).end();
  }
  res.sendFile(__dirname + '/rawIDs.json');
});

router.post('/:school/deleteAppointment', (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    res.status(400).json({ error: 'MISSING_CREDENTIALS' });
    next();
  }
  flexGetter.setSchool(req.params.school)
  if (!req.body.apptID) {
    res.status(400).json({ error: 'MISSING_APPT_ID' });
    next();
  }
  flexGetter.login(req.body.username, req.body.password)
    .then(cookieJar => flexGetter.deleteAppointment(cookieJar, req.body.apptID))
    .then(statusCode => {
      if (statusCode !== 200) {
        res.status(400).json({ error: 'REJECTED' }).end();
      } else {
        res.json({ status: 'SUCCESS' }).end();
      }
    })
});

module.exports = router;
