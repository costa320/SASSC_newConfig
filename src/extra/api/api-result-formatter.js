import { UUID } from "../UUID.js";

var RESULT = null;

export function getFormattedRadarsData(rawData, configFilter) {
  /* console.log(rawData); */

  RESULT = getInitRESULT(rawData, configFilter);

  /* add inside result days that have to be filled up with data after*/
  RESULT.map((radar, i_) => {
    Object.keys(radar.detections).map(detectionKey => {
      RESULT[i_].detections[detectionKey] = getNewArrayOfValues(rawData);
    });
  });

  /* Fill up all detections with data */

  RESULT = getValuedResult(RESULT, rawData);
  /*  console.log(RESULT); */
  return RESULT;
}

function getValuedResult(result, rawData) {
  let localResult = result;

  result.map((radar, i_) => {
    Object.keys(radar.detections).map(detectionKey => {
      result[i_].detections[detectionKey].map((detection, i) => {
        /* detection {data:"",value:number} */
        let date = detection.date;
        let id = detection.id;
        let dayData = rawData.find(x => x.data === date);
        let VALUE;
        if (dayData.error) {
          VALUE = 0;
        } else {
          VALUE = Number(dayData.radars[radar.radar][detectionKey]);
        }
        /* cerco il giorno dove bisognava cambiare il valore */
        let index = result[i_].detections[detectionKey].findIndex(
          x => x.id === id
        );
        /* date è opzionale */
        aggiornaUnValoreNelRESULT(i_, detectionKey, index, VALUE, date);
      });
    });
  });
  return localResult;
}

function getNewArrayOfValues(rawData) {
  /* without values */
  return rawData.map((day, i) => {
    return {
      id: UUID(),
      date: day.data,
      value: 0
    };
  });
}

function aggiornaUnValoreNelRESULT(
  radarIndex,
  detectionKey,
  dayIndex,
  value,
  date
) {
  /*   console.log(JSON.stringify(RESULT)); */
  RESULT[radarIndex].detections[detectionKey][dayIndex].value = value;
  /*   console.log("++++++++++++++++++++++++++++++++++++++");
  console.log("++++++++++++++++++++++++++++++++++++++");
  console.log("date: " + date);
  console.log("dateIndex: " + dayIndex);
  console.log("detezione: " + detectionKey);
  console.log("radar: " + radarIndex);
  console.log("valore: " + value);
  console.log(RESULT); */
}

function getInitRESULT(rawData, configFilter) {
  return configFilter.RadarsValues.map(radar => {
    let newRadar = {
      radar: radar,
      detections: {}
    };
    configFilter.DetectionsValues.map(detection => {
      newRadar.detections[detection] = [];
    });

    return newRadar;
  });
}
