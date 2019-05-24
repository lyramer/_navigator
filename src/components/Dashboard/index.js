import React from "react";
import { Nav, Navbar } from "reactstrap";
import DateSelector from "./DateSelector";
import Coordinates from "./Coordinates";
import LayerPicker from "./LayerPicker";

const Dashboard = props => (
  <Navbar className="fixed-bottom navbar-light">
    <Nav>
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
