// PROGRAMMER: Trentin Gillis
// DATE: March 15, 2018
// VERSION: 1.0

/*
* Index routes to be used in application. Includes all needed Google Maps API functionality, and invokes needed search
* algorithms to parse through acquired data to only show local coffee shops and not display corporate coffee shops.
*/

// Require needed packages
var express = require("express"),
    router  = express.Router();
    request = require("request");
    coffee = require("../public/javascript/coffee");

// Variable to store all local coffee shop data
var coffeeShops;

// Root page route
router.get("/", function(req, res){
    // Render ejs template depending of if there is data in the coffee shops variable
    if(coffeeShops) {
        console.log("Rendering with data...");
        res.render("index", coffeeShops)
    }
    else {
        console.log("Rendering without data...");
        res.render("index")
    }
});

// Route that handles getting information from Google API's and rendering HTML page to display local coffee shops
router.post("/customlocation", function(req, res) {
    // Get location data from from
    var customLocation = req.body.location;
    var latitude, longitude;

    // Google API URL"s
    var googleGeocodingAPI = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + customLocation + '&key=AIzaSyDbNh0OwL91LzF1NPRpA6L7kHMfFtZ7HEc';

    // Make request to the Google Places API
    request(googleGeocodingAPI, function(error, response, body) {
        // Check for error and good response code
        if(!error && response.statusCode == 200) {
            // Convert request to JSON format
            var parsedGeocode = JSON.parse(body);

            // Store geolocation coordinates in variables
            latitude = JSON.stringify(parsedGeocode['results'][0]['geometry']['location']['lat']);
            longitude = JSON.stringify(parsedGeocode['results'][0]['geometry']['location']['lng']);

            // Print formatted address and lat/lng coordinates for debugging
            console.log(parsedGeocode['results'][0]['formatted_address']);
            console.log("Lat: " + parsedGeocode['results'][0]['geometry']['location']['lat']);
            console.log("Lng: " + parsedGeocode['results'][0]['geometry']['location']['lng']);

            // Use getCoffeeShops function from coffee.js to get coffee shops from Google Places API
            coffee.getCoffeeShops(latitude, longitude, function(data) {
                // Update coffee shop variable with new information from Google Places API
                coffeeShops = data;

                // Redirect to the root page
                res.redirect("/");
            });
        }
    });
});

router.post("/userlocation", function(req, res) {
    // Variables to store lat and lng coordinates
    var latitude, longitude;

    if(!req.body.lat && !req.body.lng) {
        // Print error message (REFACTOR TO PRINT MESSAGE TO USER USING FLASH MESSAGES)
        console.log("Something went wrong when getting the lat/lng coordinates...");
    }
    else {
        // Store users lat and lng coordinates
        latitude = req.body.lat;
        longitude = req.body.lng;

        // Print users geolocation for debugging
        console.log("Latitude: " + req.body.lat);
        console.log("Longitude: " + req.body.lng);

        // User getCoffeeShops function from coffee.js to get coffee shops from Google Places API
        coffee.getCoffeeShops(latitude, longitude, function(data) {
            // Update  coffeeShops variable with updated information from Google Places API
            coffeeShops = data;

            // Redirect to the root page
            res.redirect("/");
        });
    }
});

// Export all index routes to main file
module.exports = router;