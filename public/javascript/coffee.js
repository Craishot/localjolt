// PROGRAMMER: Trentin Gillis
// DATE: April 3, 2018
// VERSION: 1.0

/*
* All functions needed to make request to Google places API to get the local coffee shops in the users area.
*/

// Require needed packages
var request = require('request');

var exports = { };

// Function that makes request to Google Places text search API using passed in lat and lng coordinates
exports.getCoffeeShops = function(lat, lng, callback) {
    // Google Places API url with user defined lat and lng coordinates
    var googlePlacesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
        + lat + "," + lng + "&radius=5000&type=cafe&keyword=coffee&key=AIzaSyDbNh0OwL91LzF1NPRpA6L7kHMfFtZ7HEc";

    // Variable that will be used to store all of the returned coffee shop data from the Google Places API
    var coffeeShops= "sad day";

    // Make request to Google Places API
    request(googlePlacesAPI, function(error, response, body) {
        console.log(response.statusCode);
        if(!error && response.statusCode == 200) {
            // Store returned data as parsed JSON from google places API
            coffeeShops = JSON.parse(body);

            // Log some simple data about the coffee shops to the console for debugging
            for(var i = 0; i < coffeeShops["results"].length; i++)
            {
                console.log(i+1 + ' ' + coffeeShops["results"][i]["name"]);
                console.log(coffeeShops["results"][i]["geometry"]["location"]["lat"]);
                console.log(coffeeShops["results"][i]["geometry"]["location"]["lng"]);
            }
        };

        var localCoffeeShops = getLocalCoffeeShops(coffeeShops);

        // Run specified callback function
        return callback(localCoffeeShops);
    });
};

// Function to create an array containing only the local coffee shops returned from the Google Places API
function getLocalCoffeeShops(data) {
    // Array to store all local coffee shops
    var localCoffeeShops = [];

    // Loop through all coffee shops passed into the function
    for(var i = 0; i < data["results"].length; i++) {
        // Remove all starbucks from data set
        if(data["results"][i]["name"] === "Starbucks") {
            console.log("Starbucks removed from data set...");
        }
        else {
            console.log("Local coffee shop added to data set...");
            localCoffeeShops.push(data["results"][i]);
        }
    }

    // Return array containing coffee shops with all non-local coffee shops removed from the data set
    return localCoffeeShops;
}

// Export needed functions
module.exports = exports;