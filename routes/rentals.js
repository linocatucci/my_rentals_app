// ====================
// RENTAL ROUTES
// ====================

var express = require('express');
var router = express.Router();
var passport = require('passport');
var Rental = require('../models/rental');

// INDEX ROUTE view all Rentals
router.get('/rentals', function(req, res) {
    Rental.find({}, function(err, allRentals) {
        console.log(req.user);
        if (err) {
            console.log(err)
        } else {
            //eval(require('locus'));
            res.render('./rentals/index', {
                rentals: allRentals
            });
        }
    });
});

// FORM TO ADD NEW RENTALS
router.get('/rentals/new', isLoggedIn, function(req, res) {
    res.render('./rentals/new');
});

// POST ROUTE TO CREATE A NEW RENTAL
router.post('/rentals', isLoggedIn, function(req, res) {
    var newRental = req.body.rental;
    // var image = req.body.image;
    // var location = req.body.location;
    // var description = req.body.description;

    // var newRental = {
    //     name: name,
    //     image: image,
    //     location: location,
    //     description: description
    // }
    console.log(newRental);
    Rental.create(newRental, function(err, newCreatedRental) {
        if (err) {
            console.log(err);
        } else {
            // redirect to rentals page
            res.redirect('/rentals');
        }
    });
});

// SHOW ROUTE, SHOWS DETAIL INFORMATION OF ONE RENTAL
router.get('/rentals/:id', function(req, res) {
    console.log('id van de rental: ' + req.params.id);
    Rental.findById(req.params.id).populate('comments').exec(function(err, foundRental) {
        // console.log(foundRental);
        if (err) {
            console.log(err)
            res.redirect('/rentals')
        } else {
            res.render('./rentals/show', {
                rental: foundRental
            });
            // console.log(foundRental);
        }
    });
});
// EDIT RENTAL ROUTE
router.get('/rentals/:id/edit', function(req, res) {
    Rental.findById(req.params.id, function(err, foundRental) {
        if (err) {
            console.log(err)
            res.redirect('/rentals');
        } else {
            res.render('./rentals/edit', {
                rental: foundRental
            });
        }
    });
});

// UPDATE (PUT) RENTAL ROUTE
router.put('/rentals/:id', function(req, res) {
    Rental.findByIdAndUpdate(req.params.id, req.body.rental, function(err, updatedRental) {
        if (err) {
            console.log(err)
            res.redirect('/rentals');
        } else {
            console.log('Rental is updated');
            res.redirect('/rentals/' + req.params.id);
        }
    });
});

// DESTROY RENTAL ROUTE
router.delete('/rentals/:id', function(req, res) {
    Rental.findByIdAndRemove(req.params.id, function(err, deletedRental) {
        if (err) {
            console.log(err)
        } else {
            console.log('Rental has been removed from DB');
            res.redirect('/rentals');
        }
    });
});

// middleware allways has 3 inputs, req, res, next!
function isLoggedIn(req, res, next) {
    //if the user does not exist redirect to login page
    var user = req.user;
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login')
    }
}

module.exports = router;