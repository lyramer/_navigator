import React from "react";
import Map from "./Map";
import { Layers, TileLayer, RasterLayer } from "./Layers";
import Static from 'ol/source/ImageStatic';
import { osm, vector, wmts } from "./DataSources";
import { Controls, FullScreenControl } from "./Controls";
import "./App.css";
import Projection from 'ol/proj/Projection'; 
import {getCenter} from 'ol/extent'; 
import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';
import {get as getProjection} from 'ol/proj';


proj4.defs("EPSG:3573","+proj=laea +lat_0=90 +lon_0=-100 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs");
register(proj4);
const proj3573 = getProjection('EPSG:3573');
// const extent = [-5326849.0625,-5326849.0625,5326849.0625,5326849.0625];
const extent = [-4209333.51,-5235786.93, 2933382.10, 4619514.19]
proj3573.setExtent(extent);
const newCenter = getCenter(extent);

// const img = new Static({
//   attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
//   url: 'https://imgs.xkcd.com/comics/online_communities.png',
//   projection: proj3573,
//   imageExtent: extent,
// });
const imgExtentOffset = [
  -4209333.51 - 1250000,
  -5235786.93 - 200000, 
  2933382.10 + 450000, 
  4619514.19 + 1300000]


const imgExtent = [-4209333.51, -5235786.93, 2933382.10, 4619514.19]

const img = new Static({
  attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
  url:"/assets/im052021_fcst_dataonly.png",
  //url: 'https://imgs.xkcd.com/comics/online_communities.png',
  projection: proj3573,
  imageExtent: imgExtent,
  // imageSize: [4000,5000]
  // imageLoadFunction: function (image, src) {
  //   image.getImage().src = src;
  //   image.getImage().width = getWidth(imgExtent);;
  //   image.getImage().height = getHeight(imgExtent);
  // }
})

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 4,
        };
    }

render() {

    return (
        <div>
          <Map 
            center={newCenter} 
            zoom={this.state.zoom} 
            projection={proj3573}
          >
            <Layers>
                <RasterLayer source={img} />
                <TileLayer source={osm()} zIndex={0} />
            </Layers>
            <Controls>
              <FullScreenControl />
            </Controls>
          </Map>
        </div>
      );
}

};

export default App;