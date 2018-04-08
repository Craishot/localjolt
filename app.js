// PROGRAMMER: Trentin Gillis
// DATE: March 17, 20187
// VERSION: 1.0

/*
*  Main file to be called to start and run the server. File contains all needed setup for all packages being used
*  in the application. File also contains all current routes being used in the web application.
*/

// Include needed packages
var express    = require("express"),
    bodyParser = require("body-parser"),
    app        = express();

// Include all needed routes
var indexRoutes = require("./routes/index.js");

// Tell express what packages we are using
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Tell express to use needed routes
app.use(indexRoutes);

// Start server and listen for request
app.listen(3000, function() {
   console.log("LocalJolt Server Started...");
});