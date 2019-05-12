import RadarsConfig from '../../assets/geoAssets/Radars/RadarsConfig.json';

export function getRadarByID(id) {

    return RadarsConfig
        .radarList
        .find(radar => radar.value === id);

}
export function getRadarIndexByRadarID(arrayRadar, radarID) {

    return arrayRadar.findIndex(radar => radar.radarValue === radarID);

}