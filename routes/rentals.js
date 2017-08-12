// ====================
// RENTAL ROUTES
// ====================

var express = require('express');
var router = express.Router();
var passport = require('passport');
var Rental = require('../models/rental');
var middleware = require('../middleware');
var geocoder = require('geocoder');

// INDEX ROUTE view all Rentals
router.get('/rentals', function(req, res) {
    Rental.find({}, function(err, allRentals) {
        // console.log(req.user);
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
router.get('/rentals/new', middleware.isLoggedIn, function(req, res) {
    res.render('./rentals/new');
});

// POST ROUTE TO CREATE A NEW RENTAL
router.post("/rentals", middleware.isLoggedIn, function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    geocoder.geocode(req.body.location, function(err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newRental = {
            name: name,
            image: image,
            description: description,
            author: author,
            location: location,
            lat: lat,
            lng: lng
        };
        // Create a new campground and save to DB
        Rental.create(newRental, function(err, newlyCreated) {
            if (err) {
                console.log(err);
            } else {
                //redirect back to campgrounds page
                req.flash('success', 'Successfully created a rental!');
                res.redirect('/rentals');
            }
        });
    });
});

// SHOW ROUTE, SHOWS DETAIL INFORMATION OF ONE RENTAL
router.get('/rentals/:id', function(req, res) {
    // console.log('id van de rental: ' + req.params.id);
    Rental.findById(req.params.id).populate('comments').exec(function(err, foundRental) {
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
router.get('/rentals/:id/edit', middleware.checkRentalOwnership, function(req, res) {
    Rental.findById(req.params.id, function(err, foundRental) {
        res.render('./rentals/edit', {
            rental: foundRental
        });
    });
});

// UPDATE (PUT) RENTAL ROUTE
// router.put('/rentals/:id', middleware.checkRentalOwnership, function(req, res) {
//     Rental.findByIdAndUpdate(req.params.id, req.body.rental, function(err, updatedRental) {
//         if (err) {
//             console.log(err)
//             res.redirect('/rentals');
//         } else {
//             console.log('Rental is updated');
//             res.redirect('/rentals/' + req.params.id);
//         }
//     });
// });
router.put("/rentals/:id", middleware.checkRentalOwnership, function(req, res) {
    geocoder.geocode(req.body.location, function(err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            location: location,
            lat: lat,
            lng: lng
        };
        Rental.findByIdAndUpdate(req.params.id, {
            $set: newData
        }, function(err, rental) {
            if (err) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                req.flash("success", "Successfully Updated!");
                res.redirect("/rentals/" + rental._id);
            }
        });
    });
});

// DESTROY RENTAL ROUTE
router.delete('/rentals/:id', middleware.checkRentalOwnership, function(req, res) {
    Rental.findByIdAndRemove(req.params.id, function(err, deletedRental) {
        if (err) {
            console.log(err)
        } else {
            console.log('Rental has been removed from DB');
            res.redirect('/rentals');
        }
    });
});

module.exports = router;