import React, { useState } from "react";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector, wmts } from "./DataSources";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl } from "./Controls";
import FeatureStyles from "./Features/Styles";

import mapConfig from "./DataSources/geojson_data.json";
import "./App.css";

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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: mapConfig.center,
            zoom: 4,
            wmtsData: null,
            showLayer1: true,
            showLayer2: true,
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
                <VectorLayer
                  source={vector({
                    features: new GeoJSON().readFeatures(geojsonObject, {
                      featureProjection: get("EPSG:3857"),
                    }),
                  })}
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