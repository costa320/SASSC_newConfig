var fs = require("fs");
var cheerio = require("cheerio");
var FileWorker = require("./FileWorker_");
const path = require("path");

/* CONFIG */

let url = path.resolve(__dirname, "./Upload");
/* 
const url = './Upload'; */

exports.ParseAllFilesInDirectory = () => {
  var arrayGIORNI = [];
  fs.readdirSync(url).forEach(file => {
    var newDay = HtmlFileToJsonFile(url + "/" + file);
    arrayGIORNI = [...arrayGIORNI, newDay];
  });
  /*     return arrayGIORNI; */
  FileWorker.manageArrayDays(arrayGIORNI);
  return;
};

var TableTH = [];

function HtmlFileToJsonFile(HtmlFileName) {
  /*     console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        console.log(HtmlFileName) */
  var fileData = fs.readFileSync(HtmlFileName, "utf8");
  var $ = cheerio.load(fileData);
  var dataDelDocumento = $("body h3")
    .eq(0)
    .text();
  /* var dataDelDocCLEAN = dataDelDocumentoEL.text(); */
  if (dataDelDocumento) {
    var regEXP = /[0-9]{0,2}\/[0-9]{0,2}/gi;
    var regEXP_forData = dataDelDocumento.match(regEXP);
    regEXP_forData = regEXP_forData.join("");

    /* console.log("dataDelDocumento: " + regEXP_forData); */

    var tableRows = $("table")
      .eq(0)
      .children()
      .children();

    var arrayRadars = tableRows.map((i, row) => {
      if (i === 0) {
        TableTH = getAllTH(row).slice(1);
      } else {
        return ROW_In_Obj(row);
      }
    });

    var objDAY = {
      data: [],
      Radars: []
    };
    objDAY.data = regEXP_forData;
    objDAY.Radars = arrayRadars;

    /*     console.log(objDAY)
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++') */
    return objDAY;
  }
}

function getAllTH(row) {
  var $ = cheerio.load(row);
  return $("th").map((i, val) => {
    /* console.log($(this).text()); */
    return $(val).text();
  });
}

function ROW_In_Obj(row) {
  var $ = cheerio.load(row);

  var radar_name = $("td")
    .eq(0)
    .text();
  var completOBJ_ofRadar = {
    radar: radar_name.trim(),
    values: []
  };

  var allTD = $("td");
  var count = 0;
  completOBJ_ofRadar.values = allTD.map((i, val) => {
    /* console.log($(val).text()); */
    var obj;
    if (i !== 0) {
      obj = {
        detenzione: TableTH[count],
        value: $(val)
          .text()
          .trim()
      };
      count++;
    }
    return obj;
  });
  /* console.log(completOBJ_ofRadar) */
  return completOBJ_ofRadar;
}
