// PROGRAMMER: Trentin Gillis
// DATE: April 10, 2018
// VERSION: 1.0

var mongoose = require("mongoose");

// Comment schema for user reviews on coffee shops
var reviewSchema = new mongoose.Schema({
    author: String,
    rating: { type: Number, default: 0 }
});

// Export review schema
module.exports = mongoose.model("Review", reviewSchema);