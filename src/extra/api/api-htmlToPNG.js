/* HTML TO SVG */
import html2canvas from "html2canvas";

export function getNewChartsPNG(chartsData, formattedRadarsData) {
  return new Promise((res, reg) => {
    const chartsData_ = chartsData;
    const formattedRadarsData_ = formattedRadarsData;

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
          allPromisesValues,
          formattedRadarsData_
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

function getFormatChartsData(
  oldChartsData,
  allPromisesValues,
  formattedRadarsData_
) {
  /* format charts data and add svg */
  return oldChartsData.map((ChartsData, i) => {
    let newChartsDataObj_ = ChartsData;
    let pngChart = allPromisesValues[i].toDataURL("image/png");
    /* cerco il valore average */
    let average = formattedRadarsData_.find(
      x => x.radar === ChartsData.radarName
    ).average[ChartsData.detectionName];
    /*  */
    newChartsDataObj_.pngChartImage = pngChart;
    newChartsDataObj_.average = average;
    return newChartsDataObj_;
  });
}
