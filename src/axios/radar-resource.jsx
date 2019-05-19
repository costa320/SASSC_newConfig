import { Axios_Post } from "./modelAxios.jsx";

export function radar_getRadarDataByDateAndDetection(reportConfiguration) {
  return new Promise((res, reg) => {
    /* chiamata al server in post*/
    /* let queryString = `?page=${selectedPage}&pageSize=${pageSize}`; */
    let queryString = ``;
    let data = {
        queryString: queryString,
        dati: reportConfiguration
    }
    Axios_Post('/getRadarDataByDateAndDetection', data).then((success) => {
        res(success);
    }).catch(
    // Log the rejection reason
    (error) => {
        console.log(error);
        reg(error);
    });
})
}
