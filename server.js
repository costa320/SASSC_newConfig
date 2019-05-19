require("dotenv").config();
const express = require("express");
const app = express();
var router = express.Router();
var upload_routes = require("./routes/upload-routes.js");
var radar_routes = require("./routes/radarsData-routes.js");
var react_routes = require("./routes/react-routes.js");
const path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");

app.use(logger(process.env.MORGANLEVEL));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

/* STATIC REACT BUILD */

/* STATIC REACT BUILD */
app.use(express.static(path.resolve(__dirname, "build")));

/* GESTIONE ROUTING REACT E VARI REFRESH RICHIESTI DAL BROWSER */
router.get("*", function(req, res, next) {
  var i = path.resolve(__dirname, "build/index.html");
  res.sendFile(i, function(err) {
    if (err) {
      console.log("INDEX.HTML NOT FOUND ERROR!");
      res.status(500).send(err);
    }
  });
});



/* ROUTES */
app.use(upload_routes);
app.use(radar_routes);
app.use(react_routes);

var port = process.env.PORT;
app.listen(port);

app.use("/static", express.static(path.resolve(__dirname, "build")));

console.log("Server running at http://localhost:%d", port);
