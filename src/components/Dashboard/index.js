import React from "react";
import { Nav, Navbar } from "reactstrap";
import DateSelector from "./DateSelector";
import Coordinates from "./Coordinates";
import LayerPicker from "./LayerPicker";

const Dashboard = props => (
  <Navbar className="fixed-bottom navbar-light">
    <Nav>
      <a
        href="http://uvicspectral.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="logo"
          src="/images/spectral_logo.png"
          alt="UVic Spectral Lab Logo"
        />
      </a>
      <LayerPicker
        toggleChlor={props.toggleChlor}
        displayChlor={props.displayChlor}
      />
      <Coordinates
        markerAdd={props.markerAdd}
        toggleAddMarker={props.toggleAddMarker}
        toggleLatLonPopup={props.toggleLatLonPopup}
      />

      <DateSelector
        onChangeDate={props.onChangeDate}
        curDate={props.curDate}
        dateList={props.dateList}
      />
    </Nav>
  </Navbar>
);

export default Dashboard;
