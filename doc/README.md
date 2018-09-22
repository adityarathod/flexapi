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