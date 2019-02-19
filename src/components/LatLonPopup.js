import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class LatLonPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }
  createLatLon = event => {
    event.preventDefault();
    this.setState({ error: false });
    let latLonRe = /\-?[0-9]{1,3}\.[0-9]*\,\s*\-?[0-9]{1,3}\.[0-9]*/;
    let latLonRaw = event.currentTarget.latlon.value.replace(/ /g, "");
    if (latLonRe.test(latLonRaw)) {
      let latlon = latLonRaw.split(",");
      let e = { latlng: { lat: Number(latlon[0]), lng: Number(latlon[1]) } };
      this.props.addMarker(e);
      console.log("addMarker ran");
    } else {
    }
    event.currentTarget.reset();
  };
  render() {
    return (
      <Modal
        isOpen={this.props.show}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.props.toggle}>Enter Coordinates</ModalHeader>
        <ModalBody>
          {}
          <form className="latlon" id="latLonForm" onSubmit={this.createLatLon}>
            <input type="text" name="latlon" />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" form="latLonForm">
            Add Pin
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default LatLonPopup;
