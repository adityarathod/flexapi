/*	flexGetter.js
*	(C) 2018 AppleCrazy. All rights reserved.
*	This file may not be distributed without the accompanying license
*   located in the repository https://github.com/applecrazy/flexapi.
*/

var request = require('request')

var flexGetter = {}

flexGetter.school = ""

flexGetter.setSchool = school => {
    this.school = school
}


flexGetter.login = (username, password) => {
    var school = this.school
    if (school === "") return
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'development') {
            if (username === 'flexer' && password === 'testing') {
                resolve({})
            } else {
                reject('Test credentials are incorrect')
            }
        }
        var cookieJar = request.jar()
        var options = {
            method: 'POST',
            url: `https://teachmore.org/${school}/students/studentLoginCheck.php`,
            headers: {
                "referer": `https://teachmore.org/${school}/students/`,
                "content-type": "application/x-www-form-urlencoded"
            },
            form: {
                "access_login": username,
                "access_password": password
            },
            jar: cookieJar
        }
        request(options, (err, res, body) => {
            if (err) reject(err)

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
        var options = {
            method: 'GET',
            url: `https://teachmore.org/${school}//students/getEventsPerStudent.php`,
            jar: cookieJar
        }

        if (process.env.NODE_ENV === 'development') {
            resolve([
                {
                    "start": "2019-02-24",
                    "$allDay": true,
                    "backgroundColor": "#4C9937",
                    "teacherEvent": 0,
                    "title": "Testing with AppleCrazy for Flex Time",
                    "uniqueID": "8758"
                },
                {
                    "start": "2019-03-24",
                    "$allDay": true,
                    "backgroundColor": "#4C9937",
                    "teacherEvent": 1,
                    "title": "Testing with AppleCrazy for Flex Time",
                    "uniqueID": "8759"
                }
            ])
        }

        request(options, (err, _, body) => {
            if (err) reject(err)
            resolve(body)
        })
    })
}

flexGetter.getOfferings = cookieJar => {
    var school = this.school
    if (school === "" || !cookieJar) {
        return
    }

    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            url: `https://teachmore.org/${school}/getAllOfferings.php`,
            qs: { _: '0' },
            headers: { 'x-requested-with': 'XMLHttpRequest' },
            jar: cookieJar
        }

        request(options, (err, _, body) => {
            if (err) reject(err)
            resolve(body)
        })
    })
}

flexGetter.makeAppointment = (cookieJar, reqData) => {
    var school = this.school
    if (school === "" || !cookieJar) {
        return
    }

    return new Promise((resolve, reject) => {
        var options = {
            method: 'POST',
            url: `https://teachmore.org/${school}/students/createAppointmentSmall.php`,
            headers: {
                "referer": `https://teachmore.org/${school}/students/makeStudentAppointments.php`,
                "content-type": "application/x-www-form-urlencoded"
            },
            form: reqData,
            jar: cookieJar
        }
        request(options, (err, res, body) => {
            if (err) reject(err)

            if (res.statusCode !== 200) reject(statusCode)

            resolve(body)
        })
    })
}

flexGetter.deleteAppointment = (cookieJar, apptID) => {
    var school = this.school
    return new Promise((resolve, reject) => {
        var options = {
            method: 'POST',
            url: `https://teachmore.org/${school}/deleteTeacherAppointmentSQL.php`,
            headers: {
                "referer": `https://teachmore.org/${school}/students/makeStudentAppointments.php`,
                "content-type": "application/x-www-form-urlencoded"
            },
            form: {
                num: apptID
            },
            jar: cookieJar
        }
        request(options, (err, res, _) => {
            if (err) reject(err)
            resolve(res.statusCode)
        })
    })
}

module.exports = flexGetter