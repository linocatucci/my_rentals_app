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
var middleware = require('../middleware/index');

// NEW Form
router.get('/rentals/:id/comments/new', middleware.isLoggedIn, function(req, res) {
    Rental.findById(req.params.id, function(err, foundRental) {
        res.render('./comments/new', {
            rental: foundRental
        });
    });
});

// POST route
router.post('/rentals/:id/comments', middleware.isLoggedIn, function(req, res) {
    Rental.findById(req.params.id, function(err, foundRental) {
        if (err) {
            console.log(err);
            res.redirect('/rentals/:id');
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash('error', 'Something went wrong');
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
                    req.flash('success', 'Comment is successfully created');
                    res.redirect('/rentals/' + req.params.id);
                }
            });
        }
    });
});

// EDIT COMMENT ROUTE
router.get('/rentals/:id/comments/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
    Rental.findById(req.params.id, function(err, foundRental) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            res.render('./comments/edit', {
                comment: foundComment,
                rental: foundRental
            });
        });
    })
});

// UPDATE/PUT COMMENT ROUTE
router.put('/rentals/:id/comments/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            console.log(err);
            res.redirect('/rentals/' + req.params.id);
        } else {
            console.log('comment is updated!!!');
            res.redirect('/rentals/' + req.params.id);
        }
    });
});

// DESTROY / DELETE ROUTE 
router.delete('/rentals/:id/comments/:comment_id', function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err, deletedComment) {
        if (err) {
            console.log(err);
            res.redirect('back');
        } else {
            console.log('comment deleted');
            req.flash('success', 'Comment deleted');
            res.redirect('/rentals/' + req.params.id);
        }
    });
});
module.exports = router;