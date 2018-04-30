// PROGRAMMER: Trentin Gillis
// DATE (LAST UPDATED): April 16, 2018
// VERSION: 1.0

/*
* All routes needed for displaying reviews for a specific coffee shop using the Google Place Details API
*/

// Require all needed packages
const express = require("express"),
      router  = express.Router(),
      request = require("request");

// Show route that fetches and displays reviews about a specific coffee shop using the Google Place Details API
router.get("/reviews/:id", function (req, res) {
    // Get place id from request URL
    var placeId = req.params.id;

    // Google Place Details URL with the placeId added to the URL
    var placeDetailsAPI = "https://maps.googleapis.com/maps/api/place/details/json?placeid="
        + placeId + "&key=AIzaSyDbNh0OwL91LzF1NPRpA6L7kHMfFtZ7HEc";

    // Make request to Google Place Details API to get all place data for a specific place_id
    request(placeDetailsAPI, function (error, response, body) {
        // Make sure there are not errors and we receive a status code of OK (200)
        if(!error && response.statusCode == 200) {
            // Parse the response body to JSON
            var parsedData = JSON.parse(body);

            // Store all needed data returned from API in variables
            var reviews = parsedData["result"]["reviews"];
            var rating = parsedData["result"]["rating"];
            var name = parsedData["result"]["name"];

            // Create object using stored data from API
            var reviewData = {
                reviews: reviews,
                rating: rating,
                name: name
            };

            // Render review page using the obtained review data
            res.render("reviews", { reviewData: reviewData });
        }

    });
});

// Export all review routes for use in app.js file
module.exports = router;