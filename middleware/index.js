// require / add in the comment and rental models
var Rental = require('../models/rental');
var Comment = require('../models/comment');

// all middleware goes here
var middlewareObj = {}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    //check if the user is logged in 
    if (req.isAuthenticated()) {
        // find the comment in the database
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                console.log('something went wrong');
                req.flash('error', 'Comment not found');
                res.redirect('back');
            } else {
                // check if the logged in user is the same user (author) as the comment
                if (foundComment.author.id.equals(req.user._id)) {
                    return next();
                } else {
                    req.flash('error', 'You don\'t have permission to do that');
                    res.redirect('back');
                }
            }
        });
    } else {
        console.log('You are not logged in!');
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('/login')
    }
}

middlewareObj.checkRentalOwnership = function(req, res, next) {
    //check if the user is logged in 
    if (req.isAuthenticated()) {
        // find the rental in the database
        Rental.findById(req.params.id, function(err, foundRental) {
            if (err) {
                console.log(err);
                req.flash('error', 'Rental not found');
                res.redirect('back');
            } else {
                // does user own the rental with equals because object check against string.
                if (foundRental.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You don\'t have permission to do that');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    //if the user does not exist redirect to login page
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('/login')
    }
}
module.exports = middlewareObj;