var fs = require("fs");
var path = require("path");
var moment = require("moment");

exports.getFilesContentByDateRangeByRadarsByDetections = array_YY_MM => {
  return new Promise((res, reg) => {
    console.log(array_YY_MM);

    /* TODO  ho già i filenames ("array_YY_MM") che mi servono per leggere tutti i file dalle cartelle, devo solo fare un 
    try&catch block per vedere se quei file esistono o meno se esistono prendo i loro risultati, se non esistono creo un 
    oggetto vuoto al loro posto*/
  });
};

function readDirAsync(dirname) {
  return new Promise(function(resolve, reject) {
    fs.readdir(dirname, function(err, filenames) {
      if (err) reject(err);
      else resolve(filenames);
    });
  });
}

function readFileAsync(filename, enc = "UTF-8") {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, enc, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// let result = array_YY_MM.map(month => {
//   let DirPath = month.date.split("-");
//   DirPath = DirPath[0] + "_yy/" + DirPath[1] + "_mm";

//   let dir = path.resolve(__dirname, "./database/Years", DirPath);

//   readDirAsync(dir)
//     .then(result => {
//       /* abbiamo i filename della prima cartella letta */
//       console.log(result);
//       let fileNames = result;

//       /* READING FILES FROM ONE FOLDER MONTH */

//       /* END READING FROM ONE FOLDER MONTH */
//     })
//     .catch(function(error) {
//       console.log(error);
//     });

//   console.log("BREAKPOINT");
// });
