import * as olSource from "ol/source";
import {equivalent, get as getProjection} from 'ol/proj';
import {getTopLeft, getWidth} from 'ol/extent';
import { WMTSTileGrid, createFromCapabilitiesMatrixSet} from 'ol/tilegrid/WMTS';
import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
// import { createFromCapabilitiesMatrixSet } from 'ol/tilegrid/WMTS.js';
import WMTSRequestEncoding from 'ol/source/WMTSRequestEncoding';
// import {optionsFromCapabilities} from 'ol/source/WMTS';


// can't figure out how to pass through a proper projection defined
// in proj4 so it's being instantiated both here and in App. ugh.
proj4.defs("EPSG:3573","+proj=laea +lat_0=90 +lon_0=-100 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs");
register(proj4);
const projection = getProjection('EPSG:3573');


const ZOOM = 18;
var parser = new WMTSCapabilities();

async function wmts(text) {
  var result = parser.read(text);
  var options = optionsFromCapabilities(result, {
    layer: 'arctic_cascading',
    matrixSet: 'EPSG:3573',
    projection
  });

  return new olSource.WMTS(options);


}

export default wmts;

// var projectionExtent = projection.getExtent();
// var size = getWidth(projectionExtent) / 256;
// var resolutions = new Array(ZOOM);
// var matrixIds = new Array(ZOOM);
// for (var z = 0; z < ZOOM; ++z) {
//   // generate resolutions and matrixIds arrays for this WMTS
//   resolutions[z] = size / Math.pow(2, z);
//   matrixIds[z] = z;
// }

// function wmts() {

  // ARCTIC-SDI WMTS

  // return new olSource.WMTS ({
  //     attributions:
  //           'Tiles © <a href="https://services.arcgisonline.com/arcgis/rest/' +
  //           'services/Demographics/USA_Population_Density/MapServer/">ArcGIS</a>',
  //     url: 'http://basemap.arctic-sdi.org/mapcache/wmts/?request=GetCapabilities&service=wmts',
  //     layer: '0',
  //     matrixSet: 'EPSG:3573',
  //     format: 'image/png',
  //     projection: projection,
  //     tileGrid: new WMTSTileGrid({
  //       origin: getTopLeft(projectionExtent),
  //       resolutions: resolutions,
  //       matrixIds: matrixIds,
  //     }),
  //     style: 'default',
  //     wrapX: true,
  // });

  // ARCGIS WMTS

//   return new olSource.WMTS({
//     attributions:
//       'Tiles © <a href="https://services.arcgisonline.com/arcgis/rest/' +
//       'services/Demographics/USA_Population_Density/MapServer/">ArcGIS</a>',
//     url:
//       'https://services.arcgisonline.com/arcgis/rest/' +
//       'services/Demographics/USA_Population_Density/MapServer/WMTS/',
//     layer: '0',
//     matrixSet: 'EPSG:3857',
//     format: 'image/png',
//     projection: projection,
//     tileGrid: new WMTSTileGrid({
//       origin: getTopLeft(projectionExtent),
//       resolutions: resolutions,
//       matrixIds: matrixIds,
//     }),
//     style: 'default',
//     wrapX: true,
//   })
// }

// export default wmts;

function optionsFromCapabilities(wmtsCap, config) {
  var layers = wmtsCap['Contents']['Layer'];
  var layer = layers.find(function (elt, index, array) {
      return elt['Identifier'] == config['layer'];
  });
  if (layer === null) {
      return null;
  }
  var tileMatrixSetLinks = layer['TileMatrixSetLink'];
  var tileMatrixSets = wmtsCap['Contents']['TileMatrixSet'];

  var idx;

  if (layer['TileMatrixSetLink'].length > 1) {
      if ('projection' in config) {
          idx = tileMatrixSetLinks.findIndex(elt => {
              var tileMatrixSet = tileMatrixSets.find((el) => el['Identifier'] == elt['TileMatrixSet']);
              var supportedCRS = tileMatrixSet['SupportedCRS'];

              var proj1 = getProjection(supportedCRS);
              var proj2 = getProjection(config['projection']);
              if (proj1 && proj2) {
                  return equivalent(proj1, proj2);
              }
              else {
                  return supportedCRS == config['projection'];
              }
          });
      }
      else {
          idx = tileMatrixSetLinks.findIndex(elt => {return elt['TileMatrixSet'] == config['matrixSet']});
      }
  }
  else {
      idx = 0;
  }
  if (idx < 0) {
      idx = 0;
  }
  var matrixSet = 
  /** @type {string} */
  (layer['TileMatrixSetLink'][idx]['TileMatrixSet']);
  var matrixLimits = 
  /** @type {Array<Object>} */
  (layer['TileMatrixSetLink'][idx]['TileMatrixSetLimits']);
  var format = /** @type {string} */ (layer['Format'][0]);
  if ('format' in config) {
      format = config['format'];
  }
  idx = layer['Style'].findIndex(function (elt) {
      if ('style' in config) {
          return elt['Title'] == config['style'];
      }
      else {
          return elt['isDefault'];
      }
  });
  if (idx < 0) {
      idx = 0;
  }
  var style = /** @type {string} */ (layer['Style'][idx]['Identifier']);
  var dimensions = {};
  if ('Dimension' in layer) {
    layer['Dimension'].forEach(function (elt, index, array) {
          var key = elt['Identifier'];
          var value = elt['Default'];
          if (value === undefined) {
              value = elt['Value'][0];
          }
          dimensions[key] = value;
      });
  }
  var matrixSets = wmtsCap['Contents']['TileMatrixSet'];

  console.log("matrixSets", matrixSets);
  console.log("matrixSet", matrixSet);

  var matrixSetObj = matrixSets.find(function (elt, index, array) {
      return elt['Identifier'] == matrixSet;
  });
  var projection;
  var code = matrixSetObj['SupportedCRS'];

  console.log("getProjection(code)", getProjection(code))

  if (code) {
      projection = getProjection(code);
  }
  if ('projection' in config) {
      var projConfig = getProjection(config['projection']);
      if (projConfig) {
          if (!projection || equivalent(projConfig, projection)) {
              projection = projConfig;
          }
      }
  }
  var wrapX = false;
  var switchOriginXY = projection.getAxisOrientation().substr(0, 2) == 'ne';
  var matrix = matrixSetObj.TileMatrix[0];
  // create default matrixLimit
  var selectedMatrixLimit = {
      MinTileCol: 0,
      MinTileRow: 0,
      // substract one to end up at tile top left
      MaxTileCol: matrix.MatrixWidth - 1,
      MaxTileRow: matrix.MatrixHeight - 1,
  };
  //in case of matrix limits, use matrix limits to calculate extent
  if (matrixLimits) {
      selectedMatrixLimit = matrixLimits[matrixLimits.length - 1];
      var m = matrixSetObj.TileMatrix.find(tileMatrixValue => {
          return tileMatrixValue.Identifier === selectedMatrixLimit.TileMatrix ||
              matrixSetObj.Identifier + ':' + tileMatrixValue.Identifier ===
                  selectedMatrixLimit.TileMatrix;
      });
      if (m) {
          matrix = m;
      }
  }
  var resolution = (matrix.ScaleDenominator * 0.00028) / projection.getMetersPerUnit(); // WMTS 1.0.0: standardized rendering pixel size
  var origin = switchOriginXY
      ? [matrix.TopLeftCorner[1], matrix.TopLeftCorner[0]]
      : matrix.TopLeftCorner;
  var tileSpanX = matrix.TileWidth * resolution;
  var tileSpanY = matrix.TileHeight * resolution;
  var extent = [
      origin[0] + tileSpanX * selectedMatrixLimit.MinTileCol,
      // add one to get proper bottom/right coordinate
      origin[1] - tileSpanY * (1 + selectedMatrixLimit.MaxTileRow),
      origin[0] + tileSpanX * (1 + selectedMatrixLimit.MaxTileCol),
      origin[1] - tileSpanY * selectedMatrixLimit.MinTileRow,
  ];
  if (projection.getExtent() === null) {
      projection.setExtent(extent);
  }
  var tileGrid = createFromCapabilitiesMatrixSet(matrixSetObj, extent, matrixLimits);
  /** @type {!Array<string>} */
  var urls = [];
  var requestEncoding = config['requestEncoding'];
  requestEncoding = requestEncoding !== undefined ? requestEncoding : '';
  if ('OperationsMetadata' in wmtsCap &&
      'GetTile' in wmtsCap['OperationsMetadata']) {
      var gets = wmtsCap['OperationsMetadata']['GetTile']['DCP']['HTTP']['Get'];
      for (var i = 0, ii = gets.length; i < ii; ++i) {
          if (gets[i]['Constraint']) {
              var constraint = gets[i]['Constraint'].find(function (element) {
                  return element['name'] == 'GetEncoding';
              });
              var encodings = constraint['AllowedValues']['Value'];
              if (requestEncoding === '') {
                  // requestEncoding not provided, use the first encoding from the list
                  requestEncoding = encodings[0];
              }
              if (requestEncoding === WMTSRequestEncoding.KVP) {
                  if (encodings.includes(WMTSRequestEncoding.KVP)) {
                      urls.push(/** @type {string} */ (gets[i]['href']));
                  }
              }
              else {
                  break;
              }
          }
          else if (gets[i]['href']) {
              requestEncoding = WMTSRequestEncoding.KVP;
              urls.push(/** @type {string} */ (gets[i]['href']));
          }
      }
  }
  if (urls.length === 0) {
      requestEncoding = WMTSRequestEncoding.REST;
      layer['ResourceURL'].forEach(function (element) {
          if (element['resourceType'] === 'tile') {
              format = element['format'];
              urls.push(/** @type {string} */ (element['template']));
          }
      });
  }
  return {
      urls: urls,
      layer: config['layer'],
      matrixSet: matrixSet,
      format: format,
      projection: projection,
      requestEncoding: requestEncoding,
      tileGrid: tileGrid,
      style: style,
      dimensions: dimensions,
      wrapX: wrapX,
      crossOrigin: config['crossOrigin'],
  };
}
//# sourceMappingURL=WMTS.js.map