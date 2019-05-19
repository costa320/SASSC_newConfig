var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
var bodyParser = require("body-parser");
var { getRadarDataByDateRange } = require("../Server/FileWorker_.js");

express().use(bodyParser.json());
express().use(bodyParser.urlencoded({ extended: true }));

router.post("/getRadarDataByDateAndDetection", function(req, res) {
  /* i dati passano fino a qui */
  let D = req.body.dati;
  console.log(req.body.dati);

  getRadarDataByDateRange(D)
    .then(result => {
      res.status(200).send(body);
    })
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    });
});

/* restituisce il numero di file per il mese richiesto */
router.get("/getNumberOfAllScannedDays", (req, res, next) => {
  var directory = path.resolve(__dirname, "../Server", "dataBase", "Years");
  let detailedResult = getFilesFromDir_Dettagli(directory, [".json"]);
  res.status(200).send({
    detailedResults: detailedResult
  });
});

router.get("/getLastMonthData", (req, res, next) => {
  let choosenRadar = req.query.radar;
  let choosenDetection = req.query.detezione;
  if (choosenRadar && choosenDetection) {
    let lastMonth = getLastMonth();
    let directory = path.resolve(
      __dirname,
      "../Server",
      "dataBase",
      "Years",
      lastMonth
    );
    if (lastMonth === "/") {
      /* MONTH DONT FOUND */
      res.status(404).send({
        error: "ERROR, i parametri devono essere stringhe e valorizzati"
      });
    } else {
      let lastMonthFilesPath = getFilesFromDir_LastMonth(
        directory,
        [".json"],
        choosenRadar,
        choosenDetection
      );
      res.status(200).send({
        result: lastMonthFilesPath
      });
    }
  } else {
    res.status(404).send({
      error: "ERROR, i parametri devono essere stringhe e valorizzati"
    });
  }
});

router.get("/getYear/:year", (req, res, next) => {
  console.log(req.params.year);
});

router.get("/getDay/:data", (req, res, next) => {
  var fullData = req.params.data;

  var directory = path.resolve(__dirname, "../Server", "dataBase", "Years");

  let daydata = getFilesFromDir(directory, [".json"]);
  res.status(200).send({
    day: daydata
  });
});

router.get("/getMonthByRadars/:month/:radars", (req, res, next) => {
  /*  month: 01 
        radars: ['FM']
    */
  console.log(req.params.data);
});

router.post("/getPeriodByRadars", (req, res, next) => {
  console.log(req.params.data);
});

function getLastYear() {
  let biggestYear = 0;
  let latestYearPath = "";
  fs.readdirSync(
    path.resolve(__dirname, "../Server", "dataBase", "Years")
  ).forEach(year => {
    let c = Number(year.substring(0, 2));
    if (c >= biggestYear) {
      latestYearPath = year.substring(0.2);
    }
  });
  return latestYearPath;
}

function getLastMonth() {
  let LastYear = getLastYear();
  let biggerMonth = 0;
  let latestMonthPath = "";
  fs.readdirSync(
    path.resolve(__dirname, "../Server", "dataBase", "Years", LastYear)
  ).forEach(year => {
    let c = Number(year.substring(0, 2));
    if (c >= biggerMonth) {
      latestMonthPath = year.substring(0.2);
    }
  });
  return LastYear + "/" + latestMonthPath;
}

// Return a list of files of the specified fileTypes in the provided dir, with
// the file path relative to the given dir dir: path of the directory you want
// to search the files for fileTypes: array of file types you are search files,
// ex: ['.txt', '.jpg']
function getFilesFromDir(dir, fileTypes) {
  var filesToReturn = [];

  function walkDir(currentPath) {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      var curFile = path.join(currentPath, files[i]);
      if (
        fs.statSync(curFile).isFile() &&
        fileTypes.indexOf(path.extname(curFile)) != -1
      ) {
        filesToReturn.push(curFile.replace(dir, ""));
      } else if (fs.statSync(curFile).isDirectory()) {
        walkDir(curFile);
      }
    }
  }
  walkDir(dir);
  return filesToReturn;
}

function getFilesFromDir_LastMonth(
  dir,
  fileTypes,
  radarChosen,
  detenzioneChosen
) {
  let objRadarMonth = {
    radar: "",
    data_mm: "",
    data_yy: "",
    values: []
  };

  function walkDir(currentPath) {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      let k = Number(i);
      var curFile = path.join(currentPath, files[k]);

      if (
        fs.statSync(curFile).isFile() &&
        fileTypes.indexOf(path.extname(curFile)) != -1
      ) {
        var obj = JSON.parse(fs.readFileSync(curFile, "utf8"));
        if (k === 0) {
          objRadarMonth.radar = Object.keys(obj.radars)[0];
          objRadarMonth.data_yy = obj.data.substring(0, 2);
          objRadarMonth.data_mm = obj.data.substring(3, 5);
        }
        objRadarMonth.values.push({
          day: obj.data.substring(6, 8),
          value: Number(obj.radars[radarChosen][detenzioneChosen])
        });
      } else if (fs.statSync(curFile).isDirectory()) {
        walkDir(curFile);
      }
    }
  }

  walkDir(dir);
  return objRadarMonth;
}

function getFilesFromDir_Dettagli(dir, fileTypes) {
  var filesToReturn = [];
  let objYears = {};

  function walkDir(currentPath) {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      var curFile = path.join(currentPath, files[i]);
      if (
        fs.statSync(curFile).isFile() &&
        fileTypes.indexOf(path.extname(curFile)) != -1
      ) {
        filesToReturn.push(curFile.replace(dir, ""));
      } else if (fs.statSync(curFile).isDirectory()) {
        if (files[i].split("_")[1] === "yy") {
          objYears[files[i]] = getFilesFromDir(curFile, [".json"]).length;
        }
        walkDir(curFile);
      }
    }
  }
  walkDir(dir);
  return {
    TotalFiles: filesToReturn.length,
    yearDetails: objYears
  };
}

module.exports = router;
