#YelpCamp

1.
* Add landing page
* Add campgrounds page that lists all the campgrounds

Each campground has a:
* Name
* Image

2. 
#Createing new campgrounds
* Setup new campground POST route
* add in body-parser
* Setup route to show form
* Add basic unstyled form

3.
#Style the campgrounds page
* add a better header/title
* make campgrounds display in a grid

4.
#Style the navbar and form
* add a navbar to all templates
* Style the new campground form

5.
#Intro in to Databases
* what is a database
* SQL(relational) vs. NoSQL(non-relational)

6.
#Intro into MongoDB
* what is MongoDB
    - non-SQL database - works with key:value pairs
    - 
* Why are we using it?
    - part of MEAN stack
    - very popular db in web development and full stack development
    - very good tools
* Let's install it!

7.
#Our first MongoDB commands
* mongod
* mongo
* help
* show dbs
* use 'name of db' (creates a new db) or use 'name of db' to swith to db
* insert (a collection) db.dogs.insert()
    - db is de current switched database
    - dogs is the object
    - insert (inserts a new dog ie.)
* find
* update
* remove

8.
#Mongoose
* What is Mongoose?
* Why are we using it?
* Interact with a Mongo Database using Mongoose

9.
# Add mongoose
* install and configure mongoose
* Setup campground model
* Use campground model inside of our routes

10.
#Show pages
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collecion.drop()
* Add a show route/template

RESTFUL ROUTES

name    url                  verb    description
===============================================================
INDEX   /campgrounds         GET     Display all campgrounds
NEW     /campgrounds/new     GET     Display form to make a new campground
CREATE  /campgrounds         POST    Add new campground to DB
SHOW    /campgrounds/:id     GET     Shows info about one campground, has an id in the url

#RESTful Routing
## Introduction
* Define REST andn explain WHY it matters
* List all 7 RESTful routes
* Show expample of RESTful routing in practice

REST  - a mapping between HTTP routes and CRUD (create, read, update and destroy)
CREATE
READ
UPDATE
DESTROY / DELETE

A table of all 7 RESTful routes

name            path                    HTTP verb       purpose
-----------------------------------------------------------------------------------------------------------------
Index           /campgrounds            GET             List of all campgrounds
New             /campgrounds/new        GET             Show new campground form
Create          /campgrounds            POST            Create a new campground, then redirect somewhere
Show            /campgrounds/:id        GET             show info about one specific campground
Edit            /campground/:id/edit    GET             show edit form for one campground
Update          /campground/:id         PUT             Update a particular campground, then redirect somewhere
Destroy         /campground/:id         DELETE          Delete a particular campground, then redirect somewhere  



