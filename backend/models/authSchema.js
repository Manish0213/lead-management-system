const mongoose = require('mongoose');
const {Schema} = mongoose;

const authSchema = new Schema({
    userType: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
    }
})

const User = mongoose.model('user',authSchema);
module.exports = User;