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

// Root page route
router.get("/", function(req, res){
    res.render("index");
});

// Route that handles getting information from Google API's and rendering HTML page to display local coffee shops
router.post("/customlocation", function(req, res) {
    // Get location data from from
    var customLocation = req.body.location;
    var latitude, longitude;

    // Google API URL"s
    var googleGeocodingAPI = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + customLocation + '&key=AIzaSyDbNh0OwL91LzF1NPRpA6L7kHMfFtZ7HEc';
    var googlePlacesAPI = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDbNh0OwL91LzF1NPRpA6L7kHMfFtZ7HEc&keyword=coffee&radius=500&location=';

    // Make request to the Google Places API
    request(googleGeocodingAPI, function(error, response, body) {
        // Check for error and good response code
        if(!error && response.statusCode == 200) {
            // Convert request to JSON format
            var parsedGeocode = JSON.parse(body);

            // Store geolocation coordinates in variables
            // latitude = JSON.stringify(parsedGeocode['results'][0]['geometry']['location']['lat']);
            // longitude = JSON.stringify(parsedGeocode['results'][0]['geometry']['location']['lng']);

            // Print formatted address and lat/lng coordinates for debugging
            console.log(parsedGeocode['results'][0]['formatted_address']);
            console.log("Lat: " + parsedGeocode['results'][0]['geometry']['location']['lat']);
            console.log("Lng: " + parsedGeocode['results'][0]['geometry']['location']['lng']);
        }
    });

    console.log(googlePlacesAPI + latitude + ',' + longitude);

    // Redirect to root page
    res.redirect("/");
});

router.post("/userlocation", function(req, res) {

    if(!req.body.lat && !req.body.lng) {
        // Print error message (REFACTOR TO PRINT MESSAGE TO USER USING FLASH MESSAGES)
        console.log("Something went wrong when getting the lat/lng coordinates...");
    }
    else {
        // Print users geolocation for debugging
        console.log("Latitude: " + req.body.lat);
        console.log("Longitude: " + req.body.lng);
    }

    // Reload index page with updated information
    res.redirect("/");
});

// Export all index routes to main file
module.exports = router;
