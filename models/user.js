var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String

})

// used to run and use methods with User.authenticate()
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);