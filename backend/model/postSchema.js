const Mongoose = require("mongoose");

const postSchema = new Mongoose.Schema({
    posts: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    }
});

const postDetails = Mongoose.model("postDetails", postSchema);
module.exports = postDetails;
