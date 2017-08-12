var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    password: String,
    email: String,
    avatar: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQATNv8dEK4DXXSAKCCD4Ipfc5_OeSrrKF11yOT4du9rLtItVqyVA'
    }
});

// plugin used to run and use methods with User.authenticate()
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);