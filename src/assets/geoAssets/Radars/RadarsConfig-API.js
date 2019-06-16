import radarsConfig from "./RadarsConfig.json";

export function getRadarObjByName(radarsName) {
  return radarsConfig.radarList.find(r => r.value === radarsName);
}
export function getDetectionObjByName(detectionName) {
  return radarsConfig.detentionList.find(r => r.value === detectionName);
}
