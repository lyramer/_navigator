import React, { useState } from "react";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer, ImageLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Static from 'ol/source/ImageStatic';
import Point from "ol/geom/Point";
import { osm, vector, wmts } from "./DataSources";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl } from "./Controls";
import FeatureStyles from "./Features/Styles";
import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';
import {get as getProjection} from 'ol/proj';
import mapConfig from "./DataSources/geojson_data.json";
import "./App.css";
import { getWidth, getHeight } from "ol/extent";


register(proj4);
proj4.defs("EPSG:3573","+proj=laea +lat_0=90 +lon_0=-100 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs");

const projection = getProjection('EPSG:3573');



const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

const newCenter = [-101.608420, 78.447431];
//const imgExtent = transform([[-178.85389931430257, 84.6673593606421],[-41.94695494774296, 36.265663798516556]])
const imgExtent = [[-584160.94, -115096.01], [4896529.62, -3053391.61]]
const img = new Static({
  url:"/assets/MAP_IFD_PROB_0.5_CanSIPSv2_NCGR_calibrated_im052021_fcst.png",
  projection: projection,
  imageExtent: imgExtent,
  imageLoadFunction: function (image, src) {
    image.getImage().src = src;
    image.getImage().width = getWidth(imgExtent);;
    image.getImage().height = getHeight(imgExtent);
  }
})

console.log("img", img)

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: mapConfig.center,
            zoom: 4,
            wmtsData: null,
            showLayer1: true,
            showLayer2: false,
            showMarker: false,
            features: addMarkers(markersLonLat),
            error: null
        };
    }

    componentDidMount(){
        fetch("https://cors-anywhere.herokuapp.com/http://basemap.arctic-sdi.org/mapcache/wmts/?request=GetCapabilities&service=wmts")
            .then(res => res.text())
            .then(async (text) => {
                console.log(text)
                const wmtsData = await wmts(text);
                this.setState({ wmtsData });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            this.setState({
                error
            });
            }
        )
        
    }


//   const [center, setCenter] = useState(mapConfig.center);
//   const [zoom, setZoom] = useState(2);

//   const [showLayer1, setShowLayer1] = useState(true);
//   const [showLayer2, setShowLayer2] = useState(true);
//   const [showMarker, setShowMarker] = useState(false);

//   const [features, setFeatures] = useState(addMarkers(markersLonLat));


      toggleLayerMarker = (objectID, val) => {
        console.log(objectID + " has changed to " + val)
            this.setState({[objectID]: val})
      }



render() {
    let features = this.state.features;
    return (
        <div>
          {/* <Map center={fromLonLat(center)} zoom={zoom}> */}
          <Map center={fromLonLat(newCenter)} zoom={this.state.zoom}>
            <Layers>
            <TileLayer source={osm()} zIndex={0} />
            { this.state.wmtsData && 
            <TileLayer source={this.state.wmtsData} zIndex={0} />}

              {this.state.showLayer1 && (
                <ImageLayer
                  source={img}
                  style={FeatureStyles.MultiPolygon}
                />
              )}
              {this.state.showLayer2 && (
                <VectorLayer
                  source={vector({
                    features: new GeoJSON().readFeatures(geojsonObject2, {
                      featureProjection: get("EPSG:3857"),
                    }),
                  })}
                  style={FeatureStyles.MultiPolygon}
                />
              )}
              {this.state.showMarker && <VectorLayer source={vector({ features })} />}
            </Layers>
            <Controls>
              <FullScreenControl />
            </Controls>
          </Map>
          <div>
            <input
              type="checkbox"
              checked={this.state.showLayer1}
              onChange={(event) => this.toggleLayerMarker("showLayer1", event.target.checked)}
            />{" "}
            Johnson County
          </div>
          <div>
            <input
              type="checkbox"
              checked={this.state.showLayer2}
              onChange={(event) => this.toggleLayerMarker("showLayer2", event.target.checked)}
            />{" "}
            Wyandotte County
          </div>
          <hr />
          <div>
            <input
              type="checkbox"
              checked={this.state.showMarker}
              onChange={(event) => this.toggleLayerMarker("showMarker", event.target.checked)}
            />{" "}
            Show markers
          </div>
        </div>
      );
}

};

export default App;