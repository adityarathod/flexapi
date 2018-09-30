/*	server.js
*	(C) 2018 AppleCrazy. All rights reserved.
*	This file may not be distributed without the accompanying license
*   located in the repository https://github.com/applecrazy/flexapi.
*/

const flexGetter = require('./flexGetter')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 8080

var app = express()

app.use(bodyParser.json())
app.use(express.static(__dirname + '/doc'))
app.use(cors())

app.post('/:school/appointments', (req, res, next) => {
	if (!req.body || !req.body.username || !req.body.password) {
		res.status(400).json({ error: 'MISSING_CREDENTIALS' })
		next()
	}
	flexGetter.setSchool(req.params.school)
	flexGetter.login(req.body.username, req.body.password)
		.then(flexGetter.getAppointments)
		.then(body => {
			if (body === "" || !body) {
				res.status(400).json({ error: 'INVALID_CREDENTIALS' })
				res.end()
			} else {
				res.type('json').send(body)
			}
		})
		.catch(() => {
			res.status(400).json({ error: "REJECTED" })
		})
})

app.post('/:school/makeAppointment', (req, res, next) => {
	if (!req.body || !req.body.username || !req.body.password) {
		res.status(400).json({ error: 'MISSING_CREDENTIALS' })
		next()
	}
	if (!req.body.teacherID || !req.body.startDate || req.body.comments == null || !req.body.eventNum) {
		res.status(400).json({ error: 'REQUIRED_INFO_NOT_PRESENT' })
		next()
	}
	var requestData = {
		st: req.body.teacherID,
		stDate: req.body.startDate,
		comments1: req.body.comments,
		event: req.body.eventNum
	}
	flexGetter.setSchool(req.params.school)
	flexGetter.login(req.body.username, req.body.password)
		.then(jar => flexGetter.makeAppointment(jar, requestData))
		.then(body => {
			if (body === "" || !body) {
				res.json({ status: 'SUCCESSFUL' })
				res.end()
			} else {
				res.status(400).json({ error: 'INVALID_DATA' })
				res.end()
			}
		})
		.catch(() => {
			res.status(400).json({ error: "REJECTED" })
		})
})


app.post('/:school/offerings', (req, res, next) => {
	if (!req.body || !req.body.username || !req.body.password) {
		res.status(400).json({ error: 'MISSING_CREDENTIALS' })
		next()
	}
	flexGetter.setSchool(req.params.school)
	flexGetter.login(req.body.username, req.body.password)
		.then(flexGetter.getOfferings)
		.then(body => {
			if (body === "" || !body) {
				res.status(400).json({ error: 'INVALID_CREDENTIALS' })
				res.end()
			} else {
				res.type('json').send(body)
			}
		})
		.catch(() => {
			res.status(400).json({ error: "REJECTED" })
		})
})

app.get('/:school/teachers', (req, res) => {
	if (req.params.school !== 'irvington') {
		res.status(400).end()
	}
	res.sendFile(__dirname + '/rawIDs.json')
})


app.listen(PORT, () => {
	console.log(`Now listening on ${PORT}...`)
})