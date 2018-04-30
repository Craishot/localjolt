// PROGRAMMER: Trentin Gillis
// DATE (LAST UPDATED): April 29, 2018
// VERSION: 1.1

/*
* All functions needed to make request to Google places API to get the local coffee shops in the area specified
* by the user
*/

// Require all needed packages
const request = require('request');

// Variable holding all local coffee shops names to not be displayed as part of the data set
var corporateCoffeeShops = [
    "Starbucks",
    "Dunkin' Donuts",
    "Dutch Bros",
    "McDonald's"
];

// Create object for exporting of functions for use in other files
var exports = { };

// Function that makes request to Google Places Text Search API using passed in lat and lng coordinates
exports.getCoffeeShops = function(lat, lng, callback) {
    // Google Places API url with user defined lat and lng coordinates
    var googlePlacesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
        + lat + "," + lng + "&radius=5000&type=cafe&keyword=coffee&key=AIzaSyDbNh0OwL91LzF1NPRpA6L7kHMfFtZ7HEc";

    // Array that will be used to store all local coffee shops
    var coffeeShopArray = [];

    // Make request to Google Places API
    request(googlePlacesAPI, function(error, response, body) {
        // Check for errors and a status code of OK (200)
        if(!error && response.statusCode == 200) {
            // Store returned data as parsed JSON from google places API
            var APIData = JSON.parse(body);

            // Loop through results obtained from API storing needed data in variables
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

                // Add coffee shops to data set only if its name is not included in the cooperate coffee shop array
                if(corporateCoffeeShops.includes(newCoffeeShop["name"])) {
                    // Print message for debugging
                    console.log("CORPORATE COFFEE: " + newCoffeeShop["name"] + " removed from data set");
                }
                else {
                    // Print message for debugging
                    console.log("LOCAL COFFEE " + newCoffeeShop["name"] + " added to data set");

                    // Push local coffee shops data into coffee shop array
                    coffeeShopArray.push(newCoffeeShop);
                }
            }
        }

        // Run specified callback function with the coffee shop array as a parameter
        return callback(coffeeShopArray);
    });
};

// Export functions for use in other files
module.exports = exports;