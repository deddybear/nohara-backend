const express = require("express");
const router = express.Router();



/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Caraousel index");
});


router.get("/a", function (req, res, next) {
    res.send("Caraousel index");
  });
  
module.exports = router;
