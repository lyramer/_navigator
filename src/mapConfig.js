

import { osm } from "./components/DataSources";
import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';
import {get} from 'ol/proj';
import {getCenter} from 'ol/extent'; 




// PROJECTION DEFINITIONS 
proj4.defs("EPSG:3573","+proj=laea +lat_0=90 +lon_0=-100 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs");
register(proj4);

function getProjection() {
  const proj3573 = get('EPSG:3573');
  proj3573.setExtent(extent);
  return proj3573;
}
const extent = [-5326849.0625,-5326849.0625,5326849.0625,5326849.0625];
const center = getCenter(extent);




// MAP OPTIONS
export const options = {
  projection: getProjection(),
  projExtent: extent,
  projCenter: center,
  mapCenter: center,
  defaultZoom: 4
}





// LAYER DEFINITIONS
export const layerDefs = {
    osm: {
      type: 'Tile',
      label: 'OSM',
      source: osm(),
      display: false,
      colorbar: false
    },
    sdi: {
      type: 'Tile',
      label: 'Arctic SDI',
      source: null,
      display: true, 
      colorbar: false
    },
    fcst: {
      type: 'Raster',
      label: 'FCST',
      source: '/assets/im052021_fcst_dataonly.png',
      display: false,
      colorbar: true,
      projection: options.projection,
      extent: [-4209333.51, -5235786.93, 2933382.10, 4619514.19]
    },
    fcss: {
      type: 'Raster',
      label: 'FCSS',
      display: false,
      source: '/assets/rainbow.png',
      colorbar: false,
      projection: options.projection,
      extent: [-1000000, -2000000, 1000000, 2000000]
    }
  }