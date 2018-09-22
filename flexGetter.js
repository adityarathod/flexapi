/*	flexGetter.js
*	(C) 2018 AppleCrazy. All rights reserved.
*	This file may not be distributed without the accompanying license
*   located in the repository https://github.com/applecrazy/flexapi.
*/

var unirest = require('unirest')

var flexGetter = {}

flexGetter.school = ""

flexGetter.setSchool = school => {
	this.school = school
}


flexGetter.login = (username, password) => {
	var school = this.school
	if (school === "") {
		return
	}
	return new Promise((resolve, reject) => {
		var req = unirest("POST", `https://teachmore.org/${school}/students/studentLoginCheck.php`)
		var cookieJar = unirest.jar()
		req.jar(cookieJar)
		req.headers({
			"referer": `https://teachmore.org/${school}/students/`,
			"content-type": "application/x-www-form-urlencoded"
		})
		req.form({
			"access_login": username,
			"access_password": password
		})
		req.end(function (res) {
			if (res.error) reject(res.error);

			resolve(cookieJar)
		})
	})
}

flexGetter.getAppointments = cookieJar => {
	var school = this.school
	if (school === "" || !cookieJar) {
		return
	}
	return new Promise((resolve, reject) => {
		var req = unirest("GET", `https://teachmore.org/${school}//students/getEventsPerStudent.php`)
		req.jar(cookieJar)
		req.end(function (res) {
			if (res.error) reject(res.error);

			resolve(res.body)
		})
	})
}

module.exports = flexGetter