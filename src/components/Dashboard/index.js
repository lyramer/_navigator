import React, { Component } from "react";
import { Nav, Navbar } from "reactstrap";
import DateSelector from "./DateSelector";
import Coordinates from "./Coordinates";
import LayerPicker from "./LayerPicker";

class Dashboard extends Component {
  render() {
    return (
      <Navbar className="fixed-bottom navbar-light">
        <Nav>
          <LayerPicker
            toggleChlor={this.props.toggleChlor}
            displayChlor={this.props.displayChlor}
          />
          <Coordinates
            markerAdd={this.props.markerAdd}
            toggleAddMarker={this.props.toggleAddMarker}
            toggleLatLonPopup={this.props.toggleLatLonPopup}
          />

          <DateSelector onChangeDate={this.props.onChangeDate} />
        </Nav>
      </Navbar>
    );
  }
}

export default Dashboard;
