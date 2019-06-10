import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class LayerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  };

  handleChange = e => {
    this.props.onChange(e);
    this.setState(prevState => ({
      show: !prevState.show
    }));
  };

  render() {
    return (
      <div className="modal-btn">
        <Button onClick={this.toggle} className="layer-btn">
          <i className="fas fa-layer-group" />
        </Button>
        <Modal
          isOpen={this.state.show}
          toggle={this.state.toggle}
          className="layer-modal"
        >
          <ModalHeader toggle={this.toggle}>Select Layers</ModalHeader>
          <ModalBody>
            <form id="dataproducts">
              <div className="layer">
                <input
                  type="radio"
                  label="None"
                  id="layer_null"
                  value="none"
                  name="layer"
                  checked={!this.props.displayChlor}
                  onChange={e => this.handleChange(e)}
                />
                <label htmlFor="layer_null">None</label>
              </div>
              <div className="layer">
                <input
                  type="radio"
                  label="Chlorophyll"
                  id="layer_chlor"
                  value="chlor"
                  name="layer"
                  checked={this.props.displayChlor}
                  onChange={e => this.handleChange(e)}
                />
                <label htmlFor="layer_chlor">Chlorophyll</label>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default LayerModal;
