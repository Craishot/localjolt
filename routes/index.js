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
    // Redirect to root page
    res.redirect("/");

});

module.exports = router;
