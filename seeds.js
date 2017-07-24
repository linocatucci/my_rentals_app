// 1. require mongoose first, so that there can be a database connection and find(), remove() etc.
var mongoose = require('mongoose');
// 2. require rental and comment to manipulate campground and comments.
var Rental = require('./models/rental');
var Comment = require('./models/comment');

// 3. remove everything from the database.

// Rental.remove({}, function (err) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('all rentals are removed!')
//     }
// });

function removeComment() {
    Comment.remove({}, function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log('all comments are removed!')
        }
    });
}


// 4. require the seed file to be run from app.js
// var seedDB = require('seed');

// 5. create a function which holds all the code
// bv. function seedDB(){

// 8. Create them from a var with an array of objects. See 8

var data = [{
        name: 'Fernie!',
        image: 'https://odis.homeaway.com/odis/listing/c70a8524-cc38-44de-8660-a2573e397dac.c10.jpg',
        location: 'Fernie',
        description: 'mooi he?!'
    }, {
        name: 'Vancouver!!',
        image: 'https://odis.homeaway.com/odis/listing/12f1d3c4-f09a-4bda-b15d-ef17eb2f35f2.c10.jpg',
        location: 'Vancouver',
        description: 'cool!'
    },
    {
        name: 'Peachland!!!',
        image: 'https://odis.homeaway.com/odis/listing/c03252cb-75c5-4c38-860b-e283258aada8.c10.jpg',
        location: 'Peachland',
        description: 'relaxed!'
    }
];

function seedDB() {
    removeComment();
    Rental.remove({}, function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log('all rentals are removed!')
        }
        // add a few campgrounds
        data.forEach(function(rental) {
            Rental.create(rental, function(err, newlyCreatedRental) {
                if (err) {
                    console.log(err)
                } else {
                    // code...
                    // add a few comments
                    console.log('a Rental is created!');
                    Comment.create({
                        author: 'linocatucci@gmail.com',
                        text: 'this place is great!'
                    }, function(err, newComment) {
                        if (err) {
                            console.log(err);
                        } else {
                            newlyCreatedRental.comments.push(newComment);
                            newlyCreatedRental.save();
                            console.log('Rental and Comment are created!');
                        }
                    });
                }
            });
        });
    });
}

// 6. module.export the seedDB function
// -> done see end of file

// 7. in the function after the remove in the else create new rentals. 
//  Create them from a var with an array of objects. See 8

// 8. var rentals = [{
//         name: 'Fernie!',
//         image: 'https://odis.homeaway.com/odis/listing/c70a8524-cc38-44de-8660-a2573e397dac.c10.jpg',
//         location: 'Fernie',
//         description: 'mooi he?!'
//     }, {
//         name: 'Vancouver',
//         image: 'https://odis.homeaway.com/odis/listing/12f1d3c4-f09a-4bda-b15d-ef17eb2f35f2.c10.jpg',
//         location: 'Vancouver',
//         description: 'cool!'
//     },
//     {
//         name: 'Peachland',
//         image: 'https://odis.homeaway.com/odis/listing/c03252cb-75c5-4c38-860b-e283258aada8.c10.jpg',
//         location: 'Peachland',
//         description: 'relaxed!'
//     }
// ];

// 9. loop tru the rentals array and create a rental with every iteration.
// add this code in the callback function of the remove.

// rentals.forEach(function(rental){
//     Rental.create(rental, function(err, newlyCreatedRental){
//         if(err){
//             console.log(err)
//         } else {
//             console.log('a Rental is created!')
//         }
//     })
// })

// 10. then in the else of the create rental, after console.log('a Rental is created!'), create
// a comment.
// Comment.create({
//     author:'linocatucci@gmail.com',
//     text:'this place is greate!'
// }, function(err, newComment){
//     if (err){
//         console.log(err)
//     } else{
//         newlyCreatedRental.comments.push(newComment)
//         newlyCreatedRental.save();
//         console.log('Rental and Comment created!')
//     }
// })



// 5. run the code: 
// local testing with a local database
// Rental.create({
//     name: 'Peachland',
//     image: 'https://odis.homeaway.com/odis/listing/c03252cb-75c5-4c38-860b-e283258aada8.c10.jpg',
//     location: 'Peachland',
//     description: 'relaxed!'
// }, {
//     name: 'fernie',
//     image: 'https://odis.homeaway.com/odis/listing/c70a8524-cc38-44de-8660-a2573e397dac.c10.jpg',
//     location: 'Fernie',
//     description: 'mooi he?!'
// }, {
//     name: 'Vancouver',
//     image: 'https://odis.homeaway.com/odis/listing/12f1d3c4-f09a-4bda-b15d-ef17eb2f35f2.c10.jpg',
//     location: 'Vancouver',
//     description: 'cool!'
// }, function (err, newCampground) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('Newly created Rental: ')
//     }
// });

module.exports = seedDB;