## Offering Appointments
1. POST XHR to https://teachmore.org/irvington//callCreateOfferingAppointment.php
	Form data: offeringID, spaces
	Returns: HTML form
2. (button clicked) `makeOfferingEvent()` called
	a. Value of comment field is stored in `com`
	b. POST XHR to https://teachmore.org/irvington//createAppointmentSmall.php
		HTML Form:
			st: teacher ID,
			stDate: original date,
			idNum: blank,
			comments1: reason for appt,
			event: whatever the event's offeringEvent number is
		Returns: Nothing, or returns "You cannot make an appointment for a date in the past."

## Non-Offering Appointments
1. Hardcoded teacher list
2. (button clicked) `makeAppointment()` called
	a. URL-encoded form string is stored in `dataString`
		st: teacher ID,
		stDate: original date,
		event: whatever the event's offeringEvent number is
		comments1: reason for appt
		Returns: Nothing, or returns "You cannot make an appointment for a date in the past."
	b. POST XHR to https://teachmore.org/irvington//createAppointmentSmall.php