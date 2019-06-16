import React from "react";
import ReactDOM from "react-dom";
/* MOMENT */
import moment from "moment";
/* PDF */
import {
  PDFViewer,
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet
} from "@react-pdf/renderer";
/* EXTRA API RADARCONFIG */
import {
  getRadarObjByName,
  getDetectionObjByName
} from "../../assets/geoAssets/Radars/RadarsConfig-API.js";
/* ASSETS */
import logoTechnoSky from "../../assets/PDF_assets/images/technosky_logo.jpg";

export function generatePdfFromChartsData(reportConfiguration, chartsData) {
  ReactDOM.render(
    PDF_Document(reportConfiguration, chartsData),
    document.getElementById("root")
  );
}

function PDF_Document(reportConfiguration, chartsData) {
  return (
    <PDFViewer style={styles.pdfViewer}>
      <Document>
        {getInitialPage(reportConfiguration)}
        {getChartsPages(reportConfiguration, chartsData)}
      </Document>
    </PDFViewer>
  );
}

// Create Document Component
function getInitialPage(RC) {
  console.log(logoTechnoSky);
  let DS_m = moment(RC.date.startMoment);
  let DE_m = moment(RC.date.endMoment);
  let dateStart = DS_m.format("DD/MM/YYYY");
  let dateEnd = DE_m.format("DD/MM/YYYY");
  let week1 = DS_m.week();
  let week2 = DE_m.week();
  /* TODO create initialPage */
  return (
    <Page size="A4" style={I_P.page} ruler={false}>
      {/* HEADER CONTAINER */}
      <View style={I_P.container_}>
        {/* FIRST HEADER ROW */}
        {getHeader(dateStart, dateEnd, week1, week2)}
        {/* MAIN DESCRIPTION */}
        <View style={I_P.mainDescription}>
          <View style={I_P.primaParteDescrizione}>
            <Text>Report Quindicinale</Text>
          </View>
          <View style={I_P.secondaParteDescrizione}>
            <Text>
              delle settimane {week1}° e {week2}°
            </Text>
          </View>
        </View>
        {/* SIGN RESPONSIBLE  */}
        <View style={I_P.ResponsiblesSign}>
          <View style={I_P.descriptionSign}>
            <Text>Firma del Responsabile Technosky</Text>
          </View>
          <View style={I_P.Sign_}>
            <Text>FIRMA</Text>
          </View>
        </View>
      </View>
    </Page>
  );
}

function getChartsPages(RC, chartsData) {
  /* LOGICA DI CALCOLO DELLE PAGINE  */
  let numPagine = Math.ceil(chartsData.length / 4);
  let arrayOfPages = [];
  let numCharts = 0;

  for (let i = 0; i < numPagine; i++) {
    // numCharts non viene incrementato dentro una chiamata ad una funzione x.slice(numCharts,numCharts+4)
    let chartForSinglePage =
      numCharts === 0
        ? chartsData.slice(0, numCharts + 4)
        : chartsData.slice(numCharts, numCharts + 4);
    /* numcharts viene incrementato realmente */
    numCharts += 4;
    /* creo la pagina */
    let newPage = getNewChartPage(RC, chartForSinglePage);
    arrayOfPages.push(newPage);
  }
  return arrayOfPages;
}

function getHeader(dateStart, dateEnd, week1, week2) {
  return [
    <View style={I_P.row}>
      {/* COL1 */}
      <View style={I_P.logo}>
        <Image src={logoImage} style={I_P.imageLogo} />
      </View>
      {/* COL2 */}
      <View style={I_P.DescrizioneACC}>
        <Text>Centro Operativo Roma ACC Analisi SASSC</Text>
      </View>

      {/* COL3 */}
      <View style={I_P.InfoDocumento}>
        <View style={I_P.DocRef}>
          <Text>Doc. Ref.: 721_RTP-QUI-{week1 + "" + week2}-RM-ACC</Text>
        </View>
        <View style={I_P.row}>
          <View style={I_P.Versione}>
            <Text>Ed.: 01 Rev.: 00</Text>
          </View>
          <View style={I_P.DataCreazione}>
            <Text>{moment().format("DD/MM/YYYY")}</Text>
          </View>
        </View>
      </View>
    </View>,
    <View style={I_P.row}>
      <View style={I_P.periodoOsservazione}>
        <Text>Periodo di osservazione dal {dateStart + "-" + dateEnd}</Text>
      </View>
      <View style={I_P.descrizioneDati}>
        <Text>Dati Radar registrati sul sistema OPEN OPS</Text>
      </View>
    </View>
  ];
}

function getNewChartPage(RC, chartsData) {
  let DS_m = moment(RC.date.startMoment),
    DE_m = moment(RC.date.endMoment),
    dateStart = DS_m.format("DD/MM/YYYY"),
    dateEnd = DE_m.format("DD/MM/YYYY"),
    week1 = DS_m.week(),
    week2 = DE_m.week();

  return (
    <Page size="A4" style={C_F.page} ruler={true}>
      {/* HEADER CONTAINER */}
      <View style={C_F.container_}>
        {/* FIRST HEADER ROW */}
        {getHeader(dateStart, dateEnd, week1, week2)}
        {/* MAIN CHARTS PAGE */}
        {chartsData.map((chartD, i) => {
          return getChartFrame(RC, chartD, i);
        })}
      </View>
    </Page>
  );
}

function getChartFrame(RC, objChartData, numChartInPage) {
  let localChartImage = {
    uri: objChartData.pngChartImage,
    method: "GET",
    headers: {},
    body: ""
  };
  return (
    <View
      style={!numChartInPage ? C_F.row_ChartFrame : C_F.rowNormalChartFrame}
      key={objChartData.id}
    >
      <View style={C_F.InfoContainer}>
        {/* DESCRIPTION SECTION*/}
        <View style={C_F.row}>
          <View style={C_F.DescriptionSec}>
            <Text>
              {"Valore medio " +
                getRadarObjByName(objChartData.radarName).text +
                " " +
                getDetectionObjByName(objChartData.detectionName).text +
                " "}
            </Text>
          </View>
        </View>
        {/* MIDDLE VALUE SECTION*/}
        <View style={C_F.row}>
          <View style={C_F.MiddleValueSec}>
            <Text>99</Text>
          </View>
        </View>
        {/* NOTES SECTION*/}
        <View style={C_F.row}>
          <View style={C_F.NotesSec}>
            <Text>Note: </Text>
          </View>
        </View>
      </View>
      <View style={C_F.chartContainer}>
        <Image src={localChartImage} style={C_F.chartImage} />
      </View>
    </View>
  );
}

const logoImage = {
  uri:
    "data:image/jpeg;base64,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",
  method: "GET",
  headers: {},
  body: ""
};

/* STYLES OF INITIAL PAGE AND HEADER*/
const I_P = StyleSheet.create({
  page: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#ffffff"
  },
  container_: {
    marginTop: "50pt",
    marginBottom: "50pt",
    marginLeft: "5pt",
    marginRight: "5pt",

    border: "2pt solid black"
  },
  row: {
    flexDirection: "row"
  },
  imageLogo: {
    height: "90%",
    width: "90%",
    marginVertical: "5pt",
    marginHorizontal: "10pt"
  },
  logo: {
    border: "1pt solid black",
    borderLeft: "0pt solid black",
    borderTop: "0pt solid black",
    width: "194pt",
    height: "53pt"
  },
  DescrizioneACC: {
    border: "1pt solid black",
    borderTop: "0pt solid black",
    width: "193pt",
    textAlign: "center",
    paddingTop: "9pt",
    fontSize: "14pt",
    height: "53pt"
  },
  InfoDocumento: {
    border: "1pt solid black",
    borderTop: "0pt solid black",
    borderRight: "0pt solid black",
    width: "193pt",
    fontSize: "3pt",
    height: "53pt"
  },
  DocRef: {
    borderBottom: "2pt solid black",
    flexDirection: "row",
    textAlign: "center",
    fontSize: "10pt",
    height: "50%",
    paddingTop: "3pt"
  },
  Versione: {
    width: "95,8pt",
    textAlign: "center",
    fontSize: "10pt",
    height: "50%",
    paddingTop: "10pt"
  },
  DataCreazione: {
    width: "95,8pt",
    textAlign: "center",
    fontSize: "10pt",
    height: "50%",
    paddingTop: "10pt"
  },
  periodoOsservazione: {
    width: "290pt",
    height: "25pt",
    fontSize: "10pt",
    textAlign: "center",
    paddingTop: "10pt",
    border: "1pt solid black",
    borderLeft: "0pt solid black",
    borderBottom: "2pt solid black"
  },
  descrizioneDati: {
    border: "1pt solid black",
    borderRight: "0pt solid black",
    borderBottom: "2pt solid black",
    width: "290pt",
    height: "25pt",
    fontSize: "10pt",
    textAlign: "center",
    paddingTop: "10pt"
  },
  /* MAIN CONTAINER DESCRIPTION */
  mainDescription: {
    border: "2pt solid black",
    marginTop: "100pt",
    marginLeft: "120pt",
    width: "344,334pt",
    height: "125pt"
  },
  primaParteDescrizione: {
    flexDirection: "row",
    textAlign: "center",
    fontSize: "20pt",
    marginTop: "25pt"
  },
  secondaParteDescrizione: {
    flexDirection: "row",
    textAlign: "center",
    fontSize: "20pt",
    marginTop: "15pt"
  },
  /* MAIN CONTAINER RESPONSIBLES SIGN */
  ResponsiblesSign: {
    marginTop: "150pt",
    marginLeft: "120pt",
    border: "2pt solid black",
    height: "125pt",
    width: "344,334pt"
  },
  descriptionSign: {
    width: "100%",
    textAlign: "center",
    height: "50%",
    paddingTop: "10%"
  },
  Sign_: {
    width: "100%",
    textAlign: "center",
    height: "50%",
    paddingTop: "5%"
  }
});
/* STYLES OF CHART FRAMES */
const C_F = StyleSheet.create({
  page: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#ffffff"
  },
  container_: {
    marginRight: "5pt",
    marginBottom: "10pt",
    border: "2pt solid black"
  },
  row: {
    flexDirection: "row"
  },
  rowNormalChartFrame: {
    flexDirection: "row",
    marginBottom: "2pt"
  },
  row_ChartFrame: {
    marginTop: "20pt",
    flexDirection: "row",
    marginBottom: "2pt"
  },
  chartContainer: {
    border: "1pt solid black",
    /*   borderLeft: "0pt solid black", */
    width: "55%",
    height: "180pt",
    /* like float right */
    justifyContent: "center",
    right: "0pt"
  },
  chartImage: {
    height: "100%",
    width: "100%"
  },
  /* SECTION CONTAINER */
  InfoContainer: {
    border: "2pt solid black",
    width: "43%",
    height: "180pt"
  },
  /* SECTIONS */
  DescriptionSec: {
    borderBottom: "2pt solid black",
    height: "45pt",
    width: "100%",
    textAlign: "center",
    fontSize: "10pt"
  },
  MiddleValueSec: {
    fontSize: "15pt",
    borderBottom: "2pt solid black",
    height: "60pt",
    width: "100%",
    textAlign: "center"
  },
  NotesSec: {
    fontSize: "10pt",
    height: "75pt",
    width: "100%"
  }
});

// GENERAL STYLES
const styles = StyleSheet.create({
  pdfViewer: {
    width: "100%",
    height: "100%"
  },
  page: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});
