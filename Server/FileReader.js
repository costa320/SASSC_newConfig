var fs = require("fs");
var path = require("path");
var moment = require("moment");

exports.getFilesContentByDateRangeByRadarsByDetections = array_YY_MM => {
  return new Promise((res, reg) => {
    console.log(array_YY_MM);

    let allFiles = [];
    var allPromises = [];

    /* CICLO I MESI PER PRENDERE I GIORNI CHE MI SERVONO DI QUESTO MESE */
    array_YY_MM.map(month => {
      let date_YYYY = month.date.split("-")[0] + "_yy";
      let date_MM = month.date.split("-")[1] + "_mm";
      let dirPath = path.resolve(
        __dirname,
        "./database/Years/",
        date_YYYY,
        date_MM
      );

      let days = month.daysToAnalize;

      /* CICLO I GIORNI DI UN MESE PARTICOLARE */
      days.map(day => {
        let tempPath = path.resolve(dirPath, day + "_gg.json");

        /* VADO A LEGGERE IL FILE, SE NON ESISTE NON RITORNO NULLA SE ESISTE RITORNO IL SUO CONTENUTO */
        let newFilePromise = readFileAsync(tempPath);
        allPromises.push(newFilePromise);
      });
    });

    /* PROMISE ALL SERVE A CAPIRE QUANDO TUTTE LE PROMISE CHE GLI PASSIAMO VENGONO COMPLETATE */
    Promise.all(allPromises)
      .then(allPromisesValues => {
        /*         console.log(allPromisesValues); */
        res(allPromisesValues);
      })
      .catch(function(error) {
        /*         console.log(error); */
        reg(error);
      });
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
      if (err) {
        let dateRegex = /(?!_yy|_mm|_gg)([0-9]+)/gi;
        let fileErrorDate = err.path.match(dateRegex).join("/");
        fileErrorDate = fileErrorDate.substring(2, fileErrorDate.length);
        /*      fileErrorDate = /[0-9]/gi.exec(fileErrorDate).join("-"); */

        /* non faccio reject se no tutto il Promise.all va in errore, faccion resolve e ritorno l'errore con la data del giorno in considerazione */
        resolve({
          data: fileErrorDate,
          error: err
        });
      } else resolve(JSON.parse(data));
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
