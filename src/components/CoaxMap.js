import React, { Component } from "react";
import {
  Map,
  TileLayer,
  ScaleControl,
  ImageOverlay,
  Marker,
  Popup
} from "react-leaflet";
import L from "leaflet";
import "proj4";
import "proj4leaflet";
//import { mapboxAccessToken } from "../mapboxAccessToken.json";
import { azureMapsKey } from "../azureMapsKey.json";
import { accessToken } from "../mapboxAccessToken.json";
var p1 = L.point(-948.75 -543592.47);
var p2 = L.point(5817.41 -3333128.95);
var bounds = L.bounds(p1, p2)


const crs = new L.Proj.CRS(
  "EPSG:3573",
  "+proj=laea +lat_0=90 +lon_0=-100 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs",
  {
      // resolutions: [
      //     8192, 4096, 2048, 1024, 512, 256, 128,
      //     64, 32, 16, 8, 4, 2, 1, 0.5
      // ],
      resolutions: [ 8192, 4096, 2048 ],
      bounds: L.Bounds([[-948.75 -543592.47],[5817.41 -3333128.95]])
     // bounds: {bounds}
     // origin: [0.00, 1915741.27]
      //transformation: L.Transformation(1, 0, -1, 0)
  }

);
console.log(crs);

class CoaxMap extends Component {
  onViewportChanged = viewport => {};

  render() {
    console.log("wwoww: ",accessToken);
    return (
      <Map
        // mousemove={e => this.mouseMove(e)}
        // mouseMove={this.props.mouseMove}
        onViewportChanged={this.onViewportChanged()}
        viewport={this.props.viewport}
        doubleClickZoom={true}
        onClick={this.props.addMarker}
        crs={crs}
        //minZoom={1}
        maxBounds={[
        //   [44.887012, -111.137695], // southwest corner
        //   [59.92199, -144.624023] // northeast corner
              [59.9, -179.9], // southwest corner
              [89.9, 179] // northeast corner
        ]}
        style={{ cursor: this.props.pointer }}
      >
        {/* <TileLayer
         attribution='&amp;copy 1992 - 2020 TomTom'
         url="https://atlas.microsoft.com/map/tile?subscription-key={subscriptionKey}&api-version=2.0&zoom={z}&x={x}&y={y}&tileSize=256&tilesetId={tilesetId}&language={language}&view={view}"
         id="azure.satellite"
         subscriptionKey= {azureMapsKey}
         tilesetId= "microsoft.base.darkgrey"
         language = "en-US"
         view = "Auto"
        /> */}
        {/* <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
          id="mapbox.satellite"
          accessToken={accessToken}
        /> */}
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
          id="mapbox.satellite"
          accessToken={accessToken}
          //crs={crs}
        />
{/* https://api.mapbox.com/styles/v1/YOUR_USERNAME/YOUR_STYLE_ID/wmts?access_token=pk.eyJ1IjoibHlyYW1lciIsImEiOiJjanN2OGhpMXYwNGc5NDRvOWI2aGdlaDB0In0.37CIrccCWs-G95d7yEuNEA */}

        <ScaleControl imperial={false} maxWidth={200} />
        {/* {this.props.displayChlor && (
          <ImageOverlay
            bounds={[[59.5, -139.001], [47.001, -121.502]]}
            url={
              this.props.curOverlay
              // <img src={this.props.curOverlay} onLoad={this.props.loading} />
              // <MapImg
              //   imageURL={this.props.curOverlay}
              //   onLoad={this.props.loading}
              // />
            }
            opacity={0.9}
            onLoad={this.props.loading}
            onAdd={() => {
              console.log("wheee add! this is the fastest one");
            }}
          />
        )} */}

        {this.props.markers.map((position, idx) => (
          <Marker key={`marker-${idx}`} position={position}>
            <Popup>
              {position.lat}, {position.lng}
            </Popup>
          </Marker>
        ))}
      </Map>
    );
  }
}

export default CoaxMap;
