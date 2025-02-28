const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const userDetails = Mongoose.model("userDetails", userSchema);
module.exports = userDetails;