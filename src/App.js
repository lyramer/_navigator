import React, { Component } from "react";
import "./style/App.css";
import "./style/Popup.css";
import IntroModal from "./components/Modal";
import Dashboard from "./components/Dashboard";
import CoaxMap from "./components/CoaxMap";
import LatLonPopup from "./components/LatLonPopup";

const DEFAULT_VIEWPORT = {
  center: [49.299, -124.695],
  zoom: 8
};

const CURSOR = {
  true: "crosshair",
  false: "grab"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorStyle: { cursor: "grab" },
      curOverlay: "",
      date: new Date("2017-07-10"),
      displayChlor: true,
      latLonPopup: false,
      markerAdd: false,
      markers: [],
      modal: false, //TODO make true. false for dev only
      viewport: {
        center: [49.299, -124.695],
        zoom: 8
      },
      zoneVisible: false
    };
  }
  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  toggleLatLonPopup = () => {
    this.setState({
      latLonPopup: !this.state.latLonPopup
    });
  };

  resetView = () => {
    this.setState({ viewport: DEFAULT_VIEWPORT });
  };

  onChangeDate = date => {
    this.setState({ date });
    console.log("new date is: ", date);

    let y = date.getFullYear().toString();
    let m = (date.getMonth() + 1).toString();
    let d = date.getDate().toString();
    d.length === 1 && (d = "0" + d);
    m.length === 1 && (m = "0" + m);
    let path = "/overlays/" + y + "/" + m + "/" + d + "/overlay.png";

    this.setState({
      curOverlay: path
    });
  };

  toggleAddMarker = () => {
    let toggle = this.state.markerAdd;
    this.setState({
      markerAdd: !toggle,
      cursorStyle: {
        cursor: CURSOR[!toggle]
      }
    });
  };

  toggleChlor = displayChlor => {
    this.setState({ displayChlor });
  };

  addMarker = e => {
    if (this.state.markerAdd || this.state.latLonPopup) {
      const { markers } = this.state;
      const newLat = e.latlng.lat.toFixed(6);
      const newLng = e.latlng.lng.toFixed(6);
      markers.push({ lat: newLat, lng: newLng });
      this.setState({
        markers,
        markerAdd: false,
        latLonPopup: false,
        cursorStyle: { cursor: "grab" }
      });
    }
  };

  render() {
    return (
      <div id="page">
        <IntroModal
          toggle={() => {
            this.toggleModal();
          }}
          show={this.state.modal}
        />
        <LatLonPopup
          toggle={() => {
            this.toggleLatLonPopup();
          }}
          show={this.state.latLonPopup}
          addMarker={this.addMarker}
        />
        <div className="info" onClick={this.toggleModal}>
          <i className="fas fa-info-circle" style={{ fontSize: "1.75em" }} />
        </div>

        <div className={"mapContainer"}>
          <CoaxMap
            viewport={this.state.viewport}
            curOverlay={this.state.curOverlay}
            displayChlor={this.state.displayChlor}
            zoneVisible={this.state.zoneVisible}
            markers={this.state.markers}
            addMarker={e => {
              this.addMarker(e);
            }}
            mapCursor={this.state.cursorStyle}
          />
        </div>
        <Dashboard
          displayChlor={this.state.displayChlor}
          toggleChlor={this.toggleChlor}
          toggleLatLonPopup={this.toggleLatLonPopup}
          toggleAddMarker={this.toggleAddMarker}
          markerAdd={this.state.markerAdd}
          onChangeDate={this.onChangeDate}
        />
      </div>
    );
  }
}

export default App;
