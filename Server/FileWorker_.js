var fs = require("fs");
var path = require("path");
var util = require("util");
var HtmlJsonUtils = require("./ParseHtmlFile");
var moment = require("moment");

const dataBaseDIR = "./database/Years";

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
    console.log("MM && YY involved: ");
    console.log(array_YY_MM);
    //TODO andare a leggere i file che ci siamo estrapolati nella struttura dati => array_YY_MM
  });
};

exports.manageArrayDays = arrayDays => {
  let formattedArrayOfDays = arrayDays.map(day => {
    let formattedDay = {};
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
};

exports.UpdateDataBase = () => {
  try {
    HtmlJsonUtils.ParseAllFilesInDirectory();
    console.log("Database Successfully updated!");
  } catch (err) {
    console.log(err);
    console.log("Update action failed!");
  }
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
            "remaining"
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

function getDaysToBeInMonthAnalized(dateString, RP) {
  /* RP = remaining(till the end of the month) or passed(already passed till now) */

  if (RP === "remaining") {
    var a = moment(dateString, "YYYY-MM-GG").endOf("month"),
      b = moment(dateString, "YYYY-MM-GG"),
      numberOfDays = a.diff(b, "days");

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
  if (
    !fs.existsSync(path.resolve(__dirname, "../Server/database/Years", data_yy))
  ) {
    fs.mkdirSync(path.resolve(__dirname, "../Server/database/Years", data_yy));
  }
  if (
    !fs.existsSync(
      path.resolve(__dirname, "../Server/database/Years/" + data_yy, data_mm)
    )
  ) {
    fs.mkdirSync(
      path.resolve(__dirname, "../Server/database/Years/" + data_yy, data_mm)
    );
  }
  /* A QUESTO PUNTO ESISTE SIA LA DIRECTORY DELL'ANNO IN QUESTIONE CHE LA DIRECTORY DEL MESE IN QUESTIONE ESISTONO*/

  let data = JSON.stringify(dayOBJ);

  let pathOfFile = path.resolve(
    __dirname,
    "../Server/database/Years/" + data_yy,
    data_mm,
    data_gg + ".json"
  );
  /* se non esiste il file di questo giorno lo crea, se ce ne gia uno lo sovrascrive */
  writeFile(pathOfFile, data);
}

let fileNum = 0;

function writeFile(urlOfFile, data) {
  fs.writeFile(urlOfFile, data, "utf8", err => {
    fileNum++;
    if (err) {
      console.log("ERROR : File number " + fileNum);
      throw err;
    }
    console.log("The file number: " + fileNum + " has been saved!");
  });
}
