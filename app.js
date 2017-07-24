var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('Method-Override');
var flash = require('connect-flash');
var session = require('express-session');
var mongoose = require('mongoose');
var moment = require('moment');
var Rental = require('./models/rental');
var Comment = require('./models/comment');
var seedDB = require('./seeds');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./models/user');
require('locus');

// requiring routes
var rentalRoutes = require('./routes/rentals');
var commentRoutes = require('./routes/comments');
var indexRoutes = require('./routes/index');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
// tell nodejs to use the public folder with js and css files.
// old style to use the public directory
// app.use(express.static('public'));
// __dirname is the directory where the app.js application is started from
app.use(express.static(__dirname + '/public'));

// use flash messages. Install and require connect-flash
app.use(flash());

// MethodOverride
app.use(methodOverride('_method'));

// to avoid the deprecated warning message 
mongoose.Promise = global.Promise;


// create the database yelp_camp with the db connection 
// {useMongoClient: true} to prevent deprecated message
mongoose.connect('mongodb://localhost/myrental_app', {
    useMongoClient: true
});
//  get notified if we connect successfully or if a connection error occurs:
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('We are connected to DB!');
});

// create seed data
// seedDB(); // seeds the database with test data
// for local testing without a database

// Rental.remove({}, function (err) {
//     if (err) {
//         console.log(err)
//     }
// });

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Julia is een hele lieve schat!',
    resave: 'false',
    saveUninitialized: 'false',
    cookie: {
        maxAge: 300000
    }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MIDDLEWARE ON THE APPLICATION WHICH PASSES THE currentUser to be used on every route!
app.use(function(req, res, next) {
    // whatever we put in res.locals can be used in our templates
    res.locals.currentUser = req.user;
    // you need to have next otherwise it will stop. And it needs to move to the rest of the code in 
    // the route!
    next();
});

// use the different route files
app.use(rentalRoutes);
app.use(commentRoutes);
app.use(indexRoutes);


app.listen(3000, function() {
    console.log('My Favorite Rentals app has started!');
});