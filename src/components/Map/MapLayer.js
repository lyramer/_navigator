import React, {useState} from "react";
import { TileLayer, RasterLayer } from "../Layers";
import Static from 'ol/source/ImageStatic';


function MapLayer(props) {

    const {type, source, projection, extent, display, ...other} = props.layer;

    if (!display) return null;
    
    // for Raster Layers
    if (type === "Raster") {
        const img = new Static({
            url: source,
            projection: projection,
            imageExtent: extent,
        })
        return (<RasterLayer source={img} />)
    // for Tile Layers
    } else { 
        return (<TileLayer source={source} zIndex={0} />)
    }
}
export default MapLayer;