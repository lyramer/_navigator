import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class LatLonPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorType: ""
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
    } else {
      if (!latLonRaw || latLonRaw == "") {
        this.setState({
          error: true,
          errorType:
            "Please enter a latitude and longitude, separated by a comma"
        });
        return;
      }
      this.setState({
        error: true,
        errorType:
          "There seems to be something unusual with the coordinates you gave. Please provide a latitude then longitude, separated by a comma."
      });
      return;
    }
    event.currentTarget.reset();
  };
  render() {
    return (
      <Modal
        isOpen={this.props.show}
        toggle={this.props.toggle}
        className="latlon-modal"
      >
        <ModalHeader toggle={this.props.toggle}>Enter Coordinates</ModalHeader>
        <ModalBody>
          {this.state.error && <div class="error">{this.state.errorType}</div>}
          <form className="latlon" id="latLonForm" onSubmit={this.createLatLon}>
            <input type="text" name="latlon" />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="submit"
            form="latLonForm"
            class="add-pin"
          >
            Add Pin <i class="fas fa-arrow-right" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default LatLonPopup;
