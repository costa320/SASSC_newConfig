var fs = require("fs");
var path = require("path");
var util = require("util");
var HtmlJsonUtils = require("./ParseHtmlFile");
var {
  getFilesContentByDateRangeByRadarsByDetections
} = require("./FileReader");
var moment = require("moment");

const dataBaseDIR = "./dataBase/Years";
let fileNum = 0;
/* date:Object {startMoment: "2019-05-01T11:32:59.183Z", endMoment: "2019-05-31T11:32:59.183Z"}
DetectionsValues:Array(2) ["pdRC", "pdPR"]
RadarsValues:Array(2) ["fm", "mc"]
ReportMode:"personalizzato" */
exports.getRadarDataByDateRange = requestConfig => {
  let start = requestConfig.date.startMoment,
    end = requestConfig.date.endMoment;
  let D_start = moment(requestConfig.date.startMoment),
    D_end = moment(requestConfig.date.endMoment),
    detections = requestConfig.DetectionsValues,
    radars = requestConfig.RadarsValues;

  return new Promise((res, reg) => {
    console.log("START PROCESSING FILES...");
    /* months and years involved in this date range */
    let array_YY_MM = getMonthsBeetweenTwoDates(D_start, D_end);
    array_YY_MM = whatMonthsArePartial(start, end, array_YY_MM);
    /*     console.log("MM && YY involved: ");
    console.log(array_YY_MM); */

    /* new promise that is need for async read file */
    getFilesContentByDateRangeByRadarsByDetections(array_YY_MM)
      .then(result => {
        /*         console.log(result); */
        res(result);
      })
      .catch(function(error) {
        /*         console.log(error); */
        reg(error);
      });
  });
};

exports.manageArrayDays = arrayDays => {
  /* TODO 4 manageArrayDays */

  return new Promise((res, reg) => {
    try {
      let formattedArrayOfDays = arrayDays.map(day => {
        let formattedDay = {};
        /* console.log(day.data); */
        formattedDay["data"] = day.data;

        let RadarsOBJ = {};
        day.Radars.map((i, radar) => {
          let formattedValues = {};
          radar.values.map((x, det) => {
            let detenzionePulita = det.detenzione.replace(/\s/g, "");
            detenzionePulita = detenzionePulita.replace("/\\n/g", "");
            x !== 0
              ? (formattedValues[detenzionePulita] = det.value
                  .replace("/\\n/g", "")
                  .replace(/\s/g, ""))
              : "";
          });
          i !== 0 ? (RadarsOBJ[radar.radar] = formattedValues) : "";
        });

        formattedDay["radars"] = RadarsOBJ;
        return formattedDay;
      });
      formattedArrayOfDays.map(day => {
        manageNewDay(day);
      });
      fileNum = 0;
      res();
    } catch (err) {
      fileNum = 0;
      reg(err);
    }
  });
};

exports.UpdateDataBase = () => {
  /* TODO 2 updateDataBase */
  return new Promise((res, reg) => {
    /* NEW PROMISE */
    HtmlJsonUtils.ParseAllFilesInDirectory()
      .then(result => {
        /* console.log("Database Successfully updated!"); */
        res();
      })
      .catch(function(error) {
        console.log(error);
        /* console.log("Alert!! Update action failed!"); */
        reg(error);
      });
  });
};

function getMonthsBeetweenTwoDates(startDate_moment, endDateMoment) {
  var startDate = startDate_moment;
  var endDate = endDateMoment;

  var result = [];

  if (!endDate.isBefore(startDate)) {
    /* if start date is before end date or if start date is same as end date*/
    while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
      /* controll if the YYYY-MM is already inside result array */
      let includes_ = result.includes(startDate.format("YYYY-MM"));
      if (!includes_) {
        result.push(startDate.format("YYYY-MM"));
      }
      startDate.add(1, "day");
    }
  } else {
    throw "End date must be greated than start date.";
  }
  return result;
}

function whatMonthsArePartial(startDate, endDate, months) {
  if (months.length > 0 && months.length >= 1) {
    /* PROBABILMENTE IL PRIMO MESE E l'ULTIMO SONO PARZIALI */
    let firstMonth = months[0],
      lastMonth = months[months.length - 1];
    let results = months.map((elem, i) => {
      if (elem === firstMonth || elem === lastMonth) {
        if (i === 0) {
          /* FIRST ELEMENT/MONTH  */
          let daysToAnalize = new getDaysToBeInMonthAnalized(
            startDate,
            "remaining",
            endDate,
            months
          );

          return {
            date: elem,
            partial: true,
            daysToAnalize: daysToAnalize
          };
        } else {
          /* LAST ELEMENT/MONTH */
          let daysToAnalize = new getDaysToBeInMonthAnalized(endDate, "passed");

          return {
            date: elem,
            partial: true,
            daysToAnalize: daysToAnalize
          };
        }
      } else {
        return {
          date: elem,
          partial: false
        };
      }
    });

    return results;
  }
}

function getDaysToBeInMonthAnalized(dateString, RP, endDate, months) {
  /* RP = remaining(till the end of the month) or passed(already passed till now) */
  /* endDate serve solo nel caso in cui sono <= 30gg , e quindi se ci sono piu di due elementi all'interno del array months*/
  if (RP === "remaining") {
    var a = moment(dateString, "YYYY-MM-GG").endOf("month"),
      b,
      numberOfDays;

    if (months.length > 1) {
      b = moment(dateString, "YYYY-MM-GG");
      numberOfDays = a.diff(b, "days");
    } else {
      a = moment(dateString);
      b = moment(endDate);

      numberOfDays = moment.duration(b.diff(a)).asDays();
    }

    let daysToBeAnalized = [];

    let dateToBeEncreased = moment(dateString, "YYYY-MM-DD");
    for (let i = 0; i <= numberOfDays; i++) {
      daysToBeAnalized.push(dateToBeEncreased.format("DD"));
      dateToBeEncreased.add(1, "day");
    }
    return daysToBeAnalized;
  } else {
    var a_ = moment(dateString).startOf("month");
    var b_ = moment(dateString);
    var numberOfDays_ = b_.diff(a_, "days");

    let dateToBeEncreased_ = moment("01", "GG");
    let daysToBeAnalized_ = [];

    for (let i_ = 0; i_ <= numberOfDays_; i_++) {
      daysToBeAnalized_.push(dateToBeEncreased_.format("DD"));
      dateToBeEncreased_.add(1, "day");
    }
    return daysToBeAnalized_;
  }
}

const isDirectory = source => fs.lstatSync(source).isDirectory();
const getDirectories = source =>
  fs
    .readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);

function manageNewDay(dayOBJ) {
  let data_yy =
      moment(dayOBJ.data.substring(0, 2), "YY").format("YYYY") + "_yy",
    data_mm = dayOBJ.data.substring(3, 5) + "_mm",
    data_gg = dayOBJ.data.substring(6, 8) + "_gg";

  /* Se la directory di Questo Anno non esiste la creo */

  let yearNewDirPath = path.resolve(
    __dirname,
    "../Server/dataBase/Years/" + data_yy
  );
  /* TODO control if server is uploading right file, and why its not displaying anymore console logs...  */
  let yearDirExist = fs.existsSync(yearNewDirPath);
  if (!yearDirExist) {
    console.log("++++++++++++++++++++++++++++++++++++++++");
    console.log("CARTELLA DEL ANNO ESISTE? ", yearDirExist);
    console.log("CREO LA CARTELLA DELL ANNO", yearNewDirPath);
    console.log("++++++++++++++++++++++++++++++++++++++++");

    fs.mkdirSync(yearNewDirPath);
  }
  /* Se la directory di questo mese non esiste la creo */
  let monthNewDirPath = path.resolve(
    __dirname,
    "../Server/dataBase/Years/" + data_yy,
    data_mm
  );
  let monthDirExist = fs.existsSync(monthNewDirPath);
  if (!monthDirExist) {
    console.log("++++++++++++++++++++++++++++++++++++++++");
    console.log("CARTELLA DEL MESE ESISTE? ", monthDirExist);
    console.log("CREO LA CARTELLA DELL MESE", monthNewDirPath);
    console.log("++++++++++++++++++++++++++++++++++++++++");
    fs.mkdirSync(monthNewDirPath);
  }
  /* A QUESTO PUNTO ESISTE SIA LA DIRECTORY DELL'ANNO IN QUESTIONE CHE LA DIRECTORY DEL MESE IN QUESTIONE ESISTONO*/

  let data = JSON.stringify(dayOBJ);

  let pathOfFile = path.resolve(
    __dirname,
    "../Server/dataBase/Years/" + data_yy,
    data_mm,
    data_gg + ".json"
  );
  /* se non esiste il file di questo giorno lo crea, se ce ne gia uno lo sovrascrive */
  writeFile(pathOfFile, data);
}

function writeFile(urlOfFile, data) {
  fs.writeFile(urlOfFile, data, "utf8", err => {
    fileNum++;
    if (err) {
      console.log("----------------------------------------------");
      console.log("ERROR : File number " + fileNum);
      /* console.log("FILE PATH: " + urlOfFile);
      console.log("----------------------------------------------"); */
      throw err;
    }
    console.log("----------------------------------------------");
    console.log("The file number: ", fileNum, " has been saved!");
    /*  console.log("FILE PATH: ", urlOfFile);
    console.log("----------------------------------------------"); */
  });
}

exports.DELETE_ALL_FILES_INSIDE_UPLOAD = () => {
  return new Promise((res, reg) => {
    let directory = path.resolve(__dirname, "Upload");
    try {
      fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
          });
        }
        /* CREATE FILE TO KEEP FOLDER ON GIT */
        fs.writeFile(
          directory + "\\.dontDelete",
          "DONT DELETE THIS FILE",
          "utf8",
          err => {}
        );
      });
      res("DIRECTORY UPLOAD CLEANED/all files inside DELETED");
    } catch (err) {
      reg("ALERT: cant clean/delete all files inside directory UPLOAD");
    }
  });
};
