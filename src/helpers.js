import {options} from './mapConfig';
import {transformExtent} from 'ol/proj';



// used to transform extents into different projections
export function transformExt(extent) {
  return transformExtent(extent, 'EPSG:3857', options.projection);
}



// helper to filter out inactive layers and return an array of active layer ID's
export function getActiveLayers(layers) {
  return Object.keys(layers).filter((layerID) => layers[layerID].display);
}


// helper to escape the trickiness of copying by reference, especially in loops...
export function updateLayers(val, propName, layerID, layers) {
  let layer = {...layers[layerID]}
  layer[propName] = val;
  let newLayers = {...layers, [layerID]:layer};
  return newLayers;
}
