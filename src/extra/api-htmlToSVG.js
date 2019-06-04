/* HTML TO SVG */
import html2canvas from "html2canvas";

export function getNewChartsSVG(chartsData) {
  return new Promise((res, reg) => {
    const chartsData_ = chartsData;

    /* get all svg Promises */
    let allPromises = chartsData.map(chart => {
      return getSVGByElementId(chart.id);
    });

    /* PROMISE ALL SERVE A CAPIRE QUANDO TUTTE LE PROMISE CHE GLI PASSIAMO VENGONO COMPLETATE */
    Promise.all(allPromises)
      .then(allPromisesValues => {
        /* analise data, and format then, adding svg inside old chartsDataArray */
        let formattedChartsDataWithSvg = getFormatChartsData(
          chartsData_,
          allPromisesValues
        );
        /* sending back formatted array */
        res(formattedChartsDataWithSvg);
      })
      .catch(function(error) {
        console.log(error);
        reg(error);
      });
  });
}

function getSVGByElementId(id) {
  let element = document.getElementById(id);
  return html2canvas(element);
}

function getFormatChartsData(oldChartsData, allPromisesValues) {
  /* format charts data and add svg */
  return oldChartsData.map((ChartsData, i) => {
    let newChartsDataObj_ = ChartsData;
    newChartsDataObj_.svgElement = allPromisesValues[i];
    return newChartsDataObj_;
  });
}
