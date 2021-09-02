import React from "react";
import {Map, MapLayer} from "./Map";
import {ColorBar} from "./Features";
import { Layers } from "./Layers";
import { wmts } from "./DataSources";
import { Controls, ZoomControl } from "./Controls";
import Panel from "./Panel";
import { getActiveLayers, updateLayers} from '../helpers';
import { options } from '../mapConfig';
import "../style/App.scss";



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
    let showColorBar = false;
    const ActiveLayerList = getActiveLayers(layers).map((id) => {
      if ( layers[id].colorbar ) showColorBar = true;
      return <MapLayer key={id} layer={layers[id]}/>
    })

    return (
        
      <div className="ol-map-container">

          {/* <Panel layerList={this.state.layers} onLayerToggle={this.toggleLayer} /> */}

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

          {showColorBar && <ColorBar/>}

      </div>

    );
}

};

export default App;


