// ====================
// COMMENT ROUTES
// ====================

var express = require('express');
var router = express.Router({
    mergeParams: true
});
var Comment = require('../models/comment');
var Rental = require('../models/rental');
var passport = require('passport');

// NEW Form
router.get('/rentals/:id/comments/new', isLoggedIn, function(req, res) {
    Rental.findById(req.params.id, function(err, foundRental) {
        res.render('./comments/new', {
            rental: foundRental
        });
    });
});

// POST route
router.post('/rentals/:id/comments', isLoggedIn, function(req, res) {
    Rental.findById(req.params.id, function(err, foundRental) {
        if (err) {
            console.log(err);
            res.redirect('/rentals/:id');
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err)
                } else {
                    // before to push the comment
                    // add the username and id to the comment 
                    // console.log('new user comment username: ' + req.user.username)
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // save the comment.
                    foundRental.comments.push(comment);
                    foundRental.save();
                    console.log(comment)
                    console.log('Comment is created!');
                    res.redirect('/rentals/' + req.params.id);
                }
            });
        }
    });
});

// middleware allways has 3 inputs, req, res, next!
function isLoggedIn(req, res, next) {
    //if the user does not exist redirect to login page
    var user = req.user;
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/login')
    }
}

module.exports = router;