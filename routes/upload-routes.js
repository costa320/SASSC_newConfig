var express = require("express");
var router = express.Router();
var { UUID } = require("../Server/UUID.js");
var {
  UpdateDataBase,
  DELETE_ALL_FILES_INSIDE_UPLOAD
} = require("../Server/FileWorker_");
const fs = require("fs");
const path = require("path");
var glob = require("glob");
/* CONFIG FOR FILE UPLOADER */
var multer = require("multer");
var bodyParser = require("body-parser");

express().use(bodyParser.json());

var storage = multer.diskStorage({
  //multers disk storage settings
  destination: function(req, file, cb) {
    cb(null, path.resolve(__dirname, "../Server/Upload"));
  },
  filename: (req, file, cb) => {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        file.originalname.split(".")[0] +
        "-" +
        UUID() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  }
});

var upload = multer({
  //multer settings
  storage: storage,
  fileFilter: (req, file, callback) => {
    //file filter
    if (
      ["html", "htm"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  }
}).array("files", 31);
/* END CONFIG FILE UPLOADER */

express().use(bodyParser.json());
/* restituisce il numero di file per il mese richiesto */
router.post("/upload", (req, res, next) => {
  upload(req, res, function(err) {
    if (err) {
      res.json({
        error_code: 1,
        err_desc: err
      });
      return;
    }
    /** Multer gives us file info in req.file object */
    if (!req.files) {
      res.json({
        error_code: 1,
        err_desc: "No file passed"
      });
      return;
    }

    /* TODO 1 main rout */

    UpdateDataBase()
      .then(result => {
        /* START PROMISE DELETE ALL FILES */
        DELETE_ALL_FILES_INSIDE_UPLOAD()
          .then(result => {
            console.log(result);
            /* FINAL RESULT FOR WEBAPP */
            res.json({
              error_code: 0,
              err_desc: null
            });
          })
          .catch(function(error) {
            /* ERROR THAT CAN BE PASSED LIKE IT */
            console.log(error);
          });
        /* END PROMISE DELETE ALL FILES */
        console.log("Database Successfully updated!");
      })
      .catch(function(error) {
        console.log("Alert!! Update action failed!");
        res.json({
          error_code: 1,
          err_desc: error
        });
      });

    /* END CATCH */
  });
});

/* router.get("/update", (req, res, next) => {
  try {
    HtmlJsonUtils.ParseAllFilesInDirectory();
    UpdateDataBase();
    res.status(200).send("OK");
  } catch (err) {
    console.log(err);
    res.status(500).send({
      Error: "error"
    });
  }
}); */

module.exports = router;
