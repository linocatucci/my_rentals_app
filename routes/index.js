// ====================
// AUTH ROUTES
// ====================

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Rental = require('../models/rental');
var passport = require('passport');

// landing page
router.get('/', function(req, res) {
    res.render('landing');
});

//show register form
router.get('/register', function(req, res) {
    res.render('./rentals/register');
});

// handle sign up logic
router.post('/register', function(req, res) {
    var newUser = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        avatar: req.body.avatar,
    });
    User.register(newUser, req.body.password,
        function(err, user) {
            if (err) {
                // console.log(err.message)
                req.flash('error', err.message);
                return res.redirect('/register');
            }
            // login the user in after he has been created!
            passport.authenticate('local')(req, res, function() {
                req.flash('success', 'Welcome to My Rentals' + ' ' + req.body.username);
                res.redirect('/rentals');
            });
        });
});

// LOGIN ROUTE
router.get('/login', function(req, res) {
    res.render('./rentals/login');
});

// LOGIN THE USER
router.post('/login', passport.authenticate('local', {
    successRedirect: '/rentals',
    failureRedirect: '/login'
}), function(req, res) {

});

// logout route
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'Logged you out!')
    res.redirect('/rentals');
});

router.get('/users/:id', function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        if (err) {
            console.log(err);
            req.flash('error', err.message);
            res.redirect('/');
        }
        Rental.find().where('author.id').equals(foundUser._id).exec(function(err, rentals) {
            console.log(foundUser)
            console.log(rentals);
            if (err) {
                console.log(err);
                req.flash('error', err.message);
                res.redirect('/');
            }
            res.render('./users/show', {
                user: foundUser,
                rentals: rentals
            })
        });
    });
});

// middleware allways has 3 inputs, (req, res, next)

module.exports = router;