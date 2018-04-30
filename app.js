// PROGRAMMER: Trentin Gillis
// DATE (LAST UPDATED): April 17, 2018
// VERSION: 1.1

/*
*  Main application file to be called to start and run the server. File contains all needed setup for all
*  packages being used in the application. File also contains all current routes being used in the application.
*/

// Include needed packages
const express    = require("express"),
      session    = require("express-session"),
      bodyParser = require("body-parser"),
      app        = express();

// Include all http routes
const indexRoutes = require("./routes/index.js"),
      reviewRoutes = require("./routes/reviews.js");

// Tell express what packages we are using
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// Tell express to use included route files
app.use(indexRoutes);
app.use(reviewRoutes);

// Start server and listen for request on localhost:3000
app.listen(process.env.PORT || 3000, function() {
   console.log("LocalJolt Server Started...");
});