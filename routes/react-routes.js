var express = require("express");
var router = express.Router();
const path = require("path");
var bodyParser = require("body-parser");
express().use(bodyParser.json());

/* GESTIONE ROUTING REACT E VARI REFRESH RICHIESTI DAL BROWSER */
router.get("/", function(req, res, next) {
  /* tutto quello che sta sul path /users non è di react */
  /*   res.header("Pragma", "no-cache");
  res.header("Expires", -1);
  res.header('Cache-Control', "private, no-cache, no-store, must-revalidate"); */
  res.sendFile(path.join(__dirname, "../build/index.html"), function(err) {
    if (err) {
      console.log("INDEX.HTML NOT FOUND ERROR!");
      res.status(500).send(err);
    }
  });
});
router.get("/uploadFiles", function(req, res, next) {
  /* tutto quello che sta sul path /users non è di react */
  /*   res.header("Pragma", "no-cache");
  res.header("Expires", -1);
  res.header('Cache-Control', "private, no-cache, no-store, must-revalidate"); */
  res.sendFile(path.join(__dirname, "../build/index.html"), function(err) {
    if (err) {
      console.log("INDEX.HTML NOT FOUND ERROR!");
      res.status(500).send(err);
    }
  });
});
router.get("/configureReport", function(req, res, next) {
  /* tutto quello che sta sul path /users non è di react */
  /*   res.header("Pragma", "no-cache");
  res.header("Expires", -1);
  res.header('Cache-Control', "private, no-cache, no-store, must-revalidate"); */
  res.sendFile(path.join(__dirname, "../build/index.html"), function(err) {
    if (err) {
      console.log("INDEX.HTML NOT FOUND ERROR!");
      res.status(500).send(err);
    }
  });
});

/* END GESTIONE ROUTING REACT */

module.exports = router;
