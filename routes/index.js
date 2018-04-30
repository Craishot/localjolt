// PROGRAMMER: Trentin Gillis
// DATE (LAST UPDATED): April 29, 2018
// VERSION: 1.1

/*
* Index routes to be used in application. File contains functionality for users to make searches using their location,
* as well as to make searches using a location of their choosing. Also contains functionality for rendering html page
* containing all needed coffee shop data.
*/

// Require needed packages
const express = require("express"),
      router  = express.Router(),
      request = require("request"),
      coffee = require("../public/javascript/coffee");

// Variable to store all local coffee shop data
var coffeeShops;

// Variables to store lat and lng coordinates of user location or searched location
var latitude, longitude;

// INDEX ROUTE - loads index page with coffee shop data
router.get("/", function(req, res) {
    // Render ejs index template using current coffee shops data
    res.render("index", { coffeeShops: coffeeShops, latitude: latitude, longitude: longitude });
});

// CUSTOM LOCATION ROUTE - get data about coffee shops around an area specified by the user
router.post("/customlocation", function(req, res) {
    // Get location data from from request body
    var customLocation = req.body.location;

    // Google Geocoding API URL with user input passed as a query
    var googleGeocodingAPI = 'https://maps.googleapis.com/maps/api/geocode/json?address='
        + customLocation + '&key=AIzaSyDbNh0OwL91LzF1NPRpA6L7kHMfFtZ7HEc';

    // Make request to the Google Place Search API
    request(googleGeocodingAPI, function(error, response, body) {
        // Check for error and response code of OK (200)
        if(!error && response.statusCode == 200) {
            // Parse response body to JSON format
            var parsedGeocode = JSON.parse(body);

            // Store geolocation coordinates in global variables
            latitude = parsedGeocode['results'][0]['geometry']['location']['lat'];
            longitude = parsedGeocode['results'][0]['geometry']['location']['lng'];

            // Use getCoffeeShops function from coffee.js file to get coffee shops at searched location
            // from Google Places API
            coffee.getCoffeeShops(latitude, longitude, function(data) {
                // Update coffeeShop variable with new information received from Google Places API
                coffeeShops = data;

                // Redirect to the root page
                res.redirect("/");
            });
        }
    });
});

// USER LOCATION ROUTE - gets data about coffee shops around the users location
router.post("/userlocation", function(req, res) {

    // Check that users lat/lng coordinates were successfully retrieved from browser
    if(!req.body.lat && !req.body.lng) {
        // Print error message
        console.log("Something went wrong when getting the lat/lng coordinates...");
    }
    else {
        // Store users lat and lng coordinates in global variables
        latitude = req.body.lat;
        longitude = req.body.lng;

        // Use getCoffeeShops function from coffee.js to get coffee shops at users location from Google Places API
        coffee.getCoffeeShops(latitude, longitude, function(data) {
            // Update coffeeShops variable with updated information from Google Places API
            coffeeShops = data;

            // Redirect to the root page
            res.redirect("/");
        });
    }
});

// Export all index routes for use in app.js file
module.exports = router;