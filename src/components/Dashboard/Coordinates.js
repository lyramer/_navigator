import React from "react";
import { NavItem, Button } from "reactstrap";

const Coordinates = props => (
  <NavItem className="coordinates">
    <i className="fa fa-fw fa-map-marker" />
    <div className="options">
      <Button color="secondary" onClick={props.toggleLatLonPopup}>
        Enter Coordinates
      </Button>
      <Button color="secondary" onClick={props.toggleAddMarker}>
        {props.markerAdd ? "Cancel" : "Drop Pin"}
      </Button>
    </div>
  </NavItem>
);

export default Coordinates;
