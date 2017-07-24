var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./models/user');
var flash = require('connect-flash');
mongoose.connect('mongodb://localhost/auth_demo_app_1');

var app = express();

app.set('view engine', 'ejs');
app.use(require('express-session')({
    secret: 'Fly fishing is awesome!',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
// encoding the data, serialize the data and putting it back in the session (serialize it)
// reading the session, taking the data from the session, unencoding it (deserialize) it
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//// ROUTES

app.get('/', function(req, res) {
    res.render('home')
});

app.get('/secret', isLoggedIn, function(req, res) {
    res.render('secret')
});

//// AUTH ROUTES

app.get('/register', function(req, res) {
    res.render('register')
});

app.post('/register', function(req, res) {
    req.body.username;
    req.body.password;
    // the password is outside the new User creation, it's passed in as an argument
    User.register(new User({
        username: req.body.username
    }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            // use the return to short circuit the flow. Immediatly bail out of the flow.
            return res.redirect('/register');
        } else {
            // runs the serialize method (passport.serializeUser(User.serializeUser()
            // use local strategy
            passport.authenticate('local')(req, res, function() {
                res.redirect('/secret');
            });
        }
    });
});

// LOGIN ROUTES
app.get('/login', function(req, res) {
    res.render('login')
});

app.post('/login', passport.authenticate('local', {
        successRedirect: '/secret',
        failureRedirect: '/login',
        failureFlash: true
    }),
    function(req, res) {

    });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

app.get('/flash', function(req, res) {
    // Set a flash message by passing the key, followed by the value, to req.flash().
    req.flash('info', 'Flash is back!')
    res.redirect('/');
});

app.get('/', function(req, res) {
    // Get an array of flash messages by passing the key to req.flash()
    res.render('index', {
        messages: req.flash('info')
    });
});

app.listen('3010', function() {
    console.log('Authentication app has started!');
});

// // bij cloud 9 met je dit gebruiken, dit is geen hardcoded
// app.listen(process.env.PORT, process.env.IP, function () {
//     console.log('Server has started for Express ESJ Assignment!')
// });