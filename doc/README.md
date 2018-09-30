FlexTime API (v0)
=================

This API stores no data and self-erases every 24 hours or after 15 minutes of no activity.

API Documentation
-----------------

**`POST /:school/appointments`**

Get all the appointments for a student in JSON form.

##### URL Parameters

**`:school`** `URL-encoded string` The short name of the school. _Required._

##### POST Payload (JSON)

**`username`** `string` The username of the student. _Required._

**`password`** `string` The password corresponding to the student. _Required._

**`POST /:school/offerings`**

Get all the public offerings for a school in JSON form.

##### URL Parameters

**`:school`** `URL-encoded string` The short name of the school. _Required._

##### POST Payload (JSON)

**`username`** `string` The username of the student. _Required._

**`password`** `string` The password corresponding to the student. _Required._


**`GET /:school/teachers`**

Get all the teachers for a school in JSON form.

##### URL Parameters

**`:school`** `URL-encoded string` The short name of the school. _Required._

**`POST /:school/makeAppointment`**

Makes a FLEX appointment.

##### URL Parameters

**`:school`** `URL-encoded string` The short name of the school. _Required._

##### POST Payload (JSON)

**`username`** `string` The username of the student. _Required._

**`password`** `string` The password corresponding to the student. _Required._

**`teacherID`** `string or Number` The ID of the teacher to make an appointment for. _Required._

**`startDate`** `string` The date of the appointment, formatted as `YYYY-MM-DD`. _Required._

**`comments`** `string` Any comments as to the reason for the appointment. _Required._

**`eventNum`** `string or Number` The type of the appointment. (`1` for FLEX, others vary) _Required._

