HTML5 Database Testbed
===============================

Allows for testing of sqlite database in a browser that supports the html5 database standard (Webkit, Opera?)

Some of the console stuff was ripped from firebug.lite (by way of ibug...)

_This is rough around the edges._

Tested running in Chrome and Safari.

Running
-------

* Download to the filesystem, or place on a webserver somewhere... 

* open database_testbed.html in your Webkit browser of choice.  You should see

<pre>Ready...
Success creating title
Success adding title
Success adding title
Success adding title
Success adding title
Success adding title
Success employee
Success adding employee
Success adding employee
Success adding employee
Success adding employee
Success adding employee
Success adding employee
Success adding employee
Success adding employee
Success adding employee
</pre>

* The command is a sql query, followed by a JSON string

* Run queries like:

- SELECT * FROM title
- SELECT * FROM employee WHERE employee_id = ?; [1]
- SELECT * FROM employee WHERE title_id = ? AND name LIKE ?;[5,"L%"] 
- INSERT INTO title VALUES (6, ?); ["Head Honcho"] 

* Extend, and enjoy!
