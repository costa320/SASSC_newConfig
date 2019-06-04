import React from "react";
import ReactDOM from "react-dom";
/* MOMENT */
import moment from "moment";
/* PDF */
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet
} from "@react-pdf/renderer";

export function generatePdfFromChartsData(reportConfiguration, chartsData) {
  ReactDOM.render(
    PDF_Document(reportConfiguration, chartsData),
    document.getElementById("root")
  );
}

function PDF_Document(reportConfiguration, chartsData) {
  return (
    <PDFViewer style={styles.pdfViewer}>
      {getInitialPage(reportConfiguration)}
    </PDFViewer>
  );
}

// Create styles
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

// Create Document Component
function getInitialPage(RC) {
  let dateStart = moment(RC.date.startMoment).format("DD/MM/YYYY");
  let dateEnd = moment(RC.date.endMoment).format("DD/MM/YYYY");
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{dateStart}</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
}
