import React from "react";
import Map from "./Map";
import { Layers, RasterLayer } from "./Layers";
import Static from 'ol/source/ImageStatic';
import { fromLonLat, get } from "ol/proj";
import { Controls, FullScreenControl } from "./Controls";
import "./App.css";
import Projection from 'ol/proj/Projection'; 
import {getCenter} from 'ol/extent'; 


const extent = [0, 0, 1024, 968];
const projection = new Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent: extent,
});
const newCenter = getCenter(extent);

const img = new Static({
  attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
  url: 'https://imgs.xkcd.com/comics/online_communities.png',
  projection: projection,
  imageExtent: extent,
});

// const imgExtent = [-134.208984375, 52.951172590256, -74.619140625, 74.044922590256]
// const img = new Static({
//   url:"/assets/im052021_fcstx.png",
//   crossOrigin: '',
//   projection: projection,
//   imageExtent: imgExtent,
//   // imageSize: [4000,5000]
//   // imageLoadFunction: function (image, src) {
//   //   image.getImage().src = src;
//   //   image.getImage().width = getWidth(imgExtent);;
//   //   image.getImage().height = getHeight(imgExtent);
//   // }
// })

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
            projection={projection}
          >
            <Layers>
                <RasterLayer source={img} />
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