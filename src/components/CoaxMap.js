import React, { Component } from "react";
import {
  Map,
  TileLayer,
  ScaleControl,
  ImageOverlay,
  Marker,
  Popup
} from "react-leaflet";
import { mapboxAccessToken } from "../mapboxAccessToken.json";

class CoaxMap extends Component {
  onViewportChanged = viewport => {};

  render() {
    return (
      <Map
        // mousemove={e => this.mouseMove(e)}
        mouseMove={this.props.mouseMove}
        onViewportChanged={this.onViewportChanged()}
        viewport={this.props.viewport}
        doubleClickZoom={true}
        onClick={this.props.addMarker}
        minZoom={6}
        maxBounds={[
          [44.887012, -111.137695], // southwest corner
          [59.92199, -144.624023] // northeast corner
        ]}
        style={{ cursor: this.props.pointer }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
          id="mapbox.satellite"
          accessToken={mapboxAccessToken}
        />

        <ScaleControl imperial={false} maxWidth={200} />
        {this.props.displayChlor && (
          <ImageOverlay
            bounds={[[59.5, -139.001], [47.001, -121.502]]}
            url={this.props.curOverlay}
            opacity={0.9}
            onLoad={() => this.props.loading()}
            onChange={() => this.props.loading()}
          />
        )}

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
