// Include needed packages
var express    = require("express"),
    bodyParser = require("body-parser"),
    request    = require("request"),
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