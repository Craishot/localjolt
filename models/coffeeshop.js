// PROGRAMMER: Trentin Gillis
// DATE: April 10, 2018
// VERSION: 1.0

var mongoose = require("mongoose");

// Coffee shop schema for coffee shops to be stored in database
var coffeeShopSchema = new mongoose.Schema({
   name: String,
   address: String,
   reviews: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "comment"
       }
   ]
});

// Export coffee shop schema
module.exports = mongoose.model("CoffeeShop", coffeeShopSchema);