// Require needed packages
var express = require("express"),
    router  = express.Router();

// Root page route
router.get("/", function(req, res){
   res.send("Hello world!");
});

module.exports = router;
