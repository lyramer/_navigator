import React, { Component } from "react";
import "../style/App.css";
import "../style/Dashboard.css";
import "../style/Popup.css";
import "../style/ColorBar.css";
import IntroModal from "./Modal";
import Dashboard from "./Dashboard";
import CoaxMap from "./CoaxMap";
import LatLonPopup from "./Dashboard/LatLonPopup";
import ColorBar from "./ColorBar";
import {
  getImgPath,
  getDateJson,
  createValidDateList,
  findLatestDate
} from "../helpers";
//import { getPixelData } from "./Coordinates";

const DEFAULT_VIEWPORT = {
  center: [49.299, -124.695],
  zoom: 8
};

const DEFAULT_DATE = new Date(2019, 4, 28);

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
      date: DEFAULT_DATE,
      dateList: undefined,
      displayChlor: true,
      latLonPopup: false,
      markerAdd: false,
      markers: [],
      modal: false, //TODO make true. false for dev only
      viewport: DEFAULT_VIEWPORT,
      zoneVisible: false,
      error: false
    };
  }

  componentDidMount() {
    // gets the latest list of dates
    fetch("/OLCI/curDates.txt")
      .then(res => res.text())
      .then(
        result => {
          let dates = getDateJson(result.split("\n"));
          let dateList = createValidDateList(dates);
          let date = findLatestDate(dateList);
          let curOverlay = getImgPath(date);
          this.setState({ dateList, date, curOverlay });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            error
          });
        }
      );
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

  onChangeDate = date => {
    let path = getImgPath(date);
    this.setState({
      curOverlay: path,
      date
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

  mouseMove = e => {
    console.log(e);
  };

  addMarker = e => {
    if (this.state.markerAdd || this.state.latLonPopup) {
      const { markers } = this.state;
      const imgOrigin = { lat: 59.5, lng: -139.001 };
      const newLat = e.latlng.lat.toFixed(6);
      const newLng = e.latlng.lng.toFixed(6);
      const imgLat = imgOrigin.lat - e.latlng.lat;
      const imgLng = -1 * (imgOrigin.lng - e.latlng.lng);
      const x = Math.round(imgLat * (6493 / 12.499));
      const y = Math.round(imgLng * (7823 / 17.499));
      markers.push({ lat: newLat, lng: newLng, x: x, y: y });

      console.log("lt/ln value is: " + x + " and " + y);

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
        <div className={"mapContainer"} id="mapContainer">
          <CoaxMap
            mouseMove={e => {
              this.mouseMove(e);
            }}
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
        <ColorBar toggleInfo={this.toggleModal} />
        <Dashboard
          displayChlor={this.state.displayChlor}
          toggleChlor={this.toggleChlor}
          toggleLatLonPopup={this.toggleLatLonPopup}
          toggleAddMarker={this.toggleAddMarker}
          markerAdd={this.state.markerAdd}
          onChangeDate={this.onChangeDate}
          curDate={this.state.date}
          dateList={this.state.dateList}
        />
      </div>
    );
  }
}

export default App;
