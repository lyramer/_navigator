import React, {useState, useEffect} from "react";
import {Map, MapLayer} from "./Map";
import { Layers, TileLayer, RasterLayer } from "./Layers";
import Static from 'ol/source/ImageStatic';
import { osm, vector, wmts } from "./DataSources";
import { Controls, FullScreenControl, ZoomControl } from "./Controls";
import Panel from "./Panel";
import "../style/App.scss";
import Projection from 'ol/proj/Projection'; 
import {getCenter} from 'ol/extent'; 
import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';
import {get as getProjection} from 'ol/proj';
import {getActiveLayers, updateLayers} from '../helpers';
import { options} from '../mapConfig';



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: options.projCenter,
            zoom: options.defaultZoom,
            layers: {...this.props.layers},
        };
        this.toggleLayer = this.toggleLayer.bind(this);
    }

    componentDidMount(){
      // grab the WMTS data from SDI
      fetch("https://cors-anywhere.herokuapp.com/http://basemap.arctic-sdi.org/mapcache/wmts/?request=GetCapabilities&service=wmts")
          .then(res => res.text())
          .then(async (text) => {
              console.log(text)
              const wmtsData = await wmts(text);
              console.log("wmtsData", wmtsData)
              let layers = {...this.state.layers};
              layers = updateLayers(wmtsData, "source", "sdi", layers)

              // ewwwww
              layers = updateLayers(true, "display", "sdi", layers)
              this.setState({layers})
          },
          (error) => {
          this.setState({
              error
          });
          }
      )
    }

    // Used in Panel to toggle layer visibility
    toggleLayer(layerID, val) {    
      let layers = this.state.layers;
      layers[layerID].display = val;
     this.setState(layers)

    }

render() {
    const layers = {...this.state.layers};
    const ActiveLayerList = getActiveLayers(layers).map((id) => 
        <MapLayer key={id} layer={{id, ...layers[id]}}/>
    )

    return (
      <div className="main">

        <div className="panel-container">
          <Panel layerList={this.state.layers} onLayerToggle={this.toggleLayer} />
        </div>
        
        <div className="ol-map-container">
          <Map 
            center={options.mapCenter} 
            zoom={this.state.zoom} 
            projection={options.projection}
            >

            <Layers>
                {ActiveLayerList}
            </Layers>

            <Controls>
              <ZoomControl/>
            </Controls>

          </Map>
        </div>

      </div>
      );
}

};

export default App;


