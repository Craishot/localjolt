// Require needed packages
var express = require("express"),
    router  = express.Router();
    request = require("request");

// Root page route
router.get("/", function(req, res){
    res.render("index");
});

// Post route
router.post("/", function(req, res) {
    // Google API URL"s
    var geolocationAPI = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDbNh0OwL91LzF1NPRpA6L7kHMfFtZ7HEc";

    // Get users location using Google Geolocation API
    request(geolocationAPI, function (error, request, body) {
        console.log(error);
        console.log(request.statusCode);
        console.log(body);
    });

    // Redirect to root page
    res.redirect("/");
});

// SEARCH - Post route to search for and get all retrieve all local coffee shops in the searched area
router.post("/", function (req, res) {

    // Redirect user to home with new data
   res.redirect("/");
});

// Export all index routes to main file
module.exports = router;
