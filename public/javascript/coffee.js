// PROGRAMMER: Trentin Gillis
// DATE: April 3, 2018
// VERSION: 1.0

/*
* All functions needed to make request to Google places API to get the local coffee shops in the users area.
*/

// Require needed packages
const request = require('request');

// Variable holding all local coffee shops names not to be added to database
var corporateCoffeeShops = [
    "Starbucks",
    "Dunkin' Donuts",
    "Dutch Bros"
];

// Exports object for exporting of functions
var exports = { };

// Function that makes request to Google Places text search API using passed in lat and lng coordinates
exports.getCoffeeShops = function(lat, lng, callback) {
    // Google Places API url with user defined lat and lng coordinates
    var googlePlacesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
        + lat + "," + lng + "&radius=5000&type=cafe&keyword=coffee&key=AIzaSyDbNh0OwL91LzF1NPRpA6L7kHMfFtZ7HEc";

    // Variable that will be used to store all of the returned coffee shop data from the Google Places API
    var APIData;
    var coffeeShopArray = [];

    // Make request to Google Places API
    request(googlePlacesAPI, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            // Store returned data as parsed JSON from google places API
            APIData = JSON.parse(body);

            // Log some simple data about the coffee shops to the console for debugging
            for(var i = 0; i < APIData["results"].length; i++) {
                // Create coffee shop object using data obtained from Google Places API
                var newCoffeeShop = {
                    name: APIData["results"][i]["name"],
                    address: APIData["results"][i]["vicinity"],
                    place_id: APIData["results"][i]["place_id"],
                    latitude: APIData["results"][i]["geometry"]["location"]["lat"],
                    longitude: APIData["results"][i]["geometry"]["location"]["lng"],
                    rating: APIData["results"][i]["rating"]
                };

                // Add coffee shops to database only if it is both local and doesn't already exist in database
                if(corporateCoffeeShops.includes(newCoffeeShop["name"])) {
                    // Print message for debugging
                    console.log("CORPORATE COFFEE: " + newCoffeeShop["name"] + " removed from data set");
                }
                else {
                    // Print message for debugging
                    console.log("LOCAL COFFEE " + newCoffeeShop["name"] + " added to data set");

                    // Push data into coffeeShopArray as data to be displayed on map
                    coffeeShopArray.push(newCoffeeShop);
                }
            }
        }

        // Run specified callback function
        return callback(coffeeShopArray);
    });
};

// Export needed functions
module.exports = exports;