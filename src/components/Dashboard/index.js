import React from "react";
import { Nav, Navbar } from "reactstrap";
import DateSelector from "./DateSelector";
import Coordinates from "./Coordinates";
import LayerPicker from "./LayerPicker";

const Dashboard = props => (
  <Navbar className="fixed-bottom navbar-light">
    <Nav>
      <li className="logos">
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
        <a
          href="http://yvonnecoady.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="logo"
            src="/images/modsquad_light.png"
            alt="MOD Squad Lab Logo"
          />
        </a>
      </li>

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
