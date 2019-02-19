import React, { Component } from "react";
import "./style/App.css";
import "./style/Popup.css";
import IntroModal from "./components/Modal";
import NavMenu from "./components/NavMenu";
import CoaxMap from "./components/CoaxMap";
import DateSelector from "./components/DateSelector";
import LatLonPopup from "./components/LatLonPopup";

import "@trendmicro/react-sidenav/dist/react-sidenav.css";

const DEFAULT_VIEWPORT = {
  center: [49.299, -124.695],
  zoom: 8
};
const farmAViewport = {
  center: [49.835, -124.602],
  zoom: 10
};

const mapContainerStyle = {
  marginLeft: "64px",
  position: "relative"
};

const farmAPolygon = [
  [-124.63559, 49.80121],
  [-124.73984, 49.89259],
  [-124.95712, 49.7919],
  [-124.76486, 49.65252],
  [-124.63559, 49.80121]
];

/*function CoaxCalendar(props) {
  if (props.isVisible) {
    return <div className="calendarContainer" style={calendarStyle}>
    <Calendar
      onChange={this.onChangeDate}
      value={this.state.date}
    />
  </div>
  }
  return null;
}*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chloroOpacity: 0.9,
      cursorStyle: { cursor: "grab" },
      curOverlay: "",
      date: new Date("2017-07-10"),
      displayCalendar: true,
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

    let y = date.getFullYear().toString();
    let m = (date.getMonth() + 1).toString();
    let d = date.getDate().toString();
    d.length === 1 && (d = "0" + d);
    m.length === 1 && (m = "0" + m);
    let path = "overlays/" + y + "/" + m + "/" + d + "/overlay.png";

    this.setState({
      curOverlay: path,
      displayCalendar: false
    });
  };

  onNavSelected = selected => {
    if (selected === "home") {
      this.resetView();
    }
    if (selected === "zonesOfInterest") {
      this.setState({ viewport: farmAViewport, zoneVisible: true });
    }
    if (selected === "info") {
      this.toggleModal();
    }
    if (selected === "dataProducts/chlorophyll") {
      this.setState({
        chloroOpacity: 0.9
      });
    }
    if (selected === "calendar") {
      this.setState({ displayCalendar: !this.state.displayCalendar });
    }

    if (selected === "marker/dropPin") {
      this.toggleAddMarker();
    }

    if (selected === "marker/typePin") {
      this.toggleLatLonPopup();
    }
  };

  toggleAddMarker() {
    this.setState({
      markerAdd: true,
      cursorStyle: {
        cursor: "crosshair"
      }
    });
  }

  addMarker = e => {
    if (this.state.markerAdd || this.state.latLonPopup) {
      const { markers } = this.state;
      const newLat = e.latlng.lat.toFixed(6);
      const newLng = e.latlng.lng.toFixed(6);
      markers.push({ lat: newLat, lng: newLng });
      console.log(markers);
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
        <NavMenu
          onSelect={selected => {
            this.onNavSelected(selected);
          }}
        />

        <div className={"mapContainer"} style={mapContainerStyle}>
          {this.state.displayCalendar && (
            <DateSelector
              date={this.state.date}
              onChangeDate={selectedDate => {
                this.onChangeDate(selectedDate);
              }}
            />
          )}

          <CoaxMap
            viewport={this.state.viewport}
            curOverlay={this.state.curOverlay}
            opacity={this.state.chloroOpacity}
            zoneVisible={this.state.zoneVisible}
            markers={this.state.markers}
            addMarker={e => {
              this.addMarker(e);
            }}
            mapCursor={this.state.cursorStyle}
          />
        </div>
      </div>
    );
  }
}

export default App;
