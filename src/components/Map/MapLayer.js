import React, {useState} from "react";
import { TileLayer, RasterLayer } from "../Layers";
import Static from 'ol/source/ImageStatic';


// function MapLayer(layer) {
//     const [curLayer, changeLayer] = useState(layer);

//     if (!curLayer.display) return null;

//     // for Raster Layers
//     if (layer.type === "Raster") {
//         const img = new Static({
//             url: layer.source,
//             projection: layer.projection,
//             imageExtent: layer.extent,
//         })
//         return (<RasterLayer source={img} />)
//     // for Tile Layers
//     } else { 
//         return (<TileLayer source={layer.source} zIndex={0} />)
//     }
// }
// export default MapLayer;


// import React from "react";
// import { TileLayer, RasterLayer } from "../Layers";
// import Static from 'ol/source/ImageStatic';


class MapLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layer: {...props.layer},
        };
    }
    render() {
        const layer = {...this.state.layer}
        console.log("render called on MapLayer")

        // for Raster Layers
        if (layer.type === "Raster") {
            const img = new Static({
                url: layer.source,
                projection: layer.projection,
                imageExtent: layer.extent,
            })
            return (<RasterLayer source={img} />)
        // for Tile Layers
        } else { 
            return (<TileLayer source={layer.source} zIndex={0} />)
        }
    }
}

export default MapLayer;
