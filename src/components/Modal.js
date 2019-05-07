import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const IntroModal = props => (
  <Modal isOpen={props.show} toggle={props.toggle} className={props.className}>
    <ModalHeader toggle={props.toggle}>Algae Explorer</ModalHeader>
    <ModalBody>
      Welcome to Algae Explorer! This is v0.1 of the map. More information
      should go here.
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={props.toggle}>
        View Map
      </Button>{" "}
    </ModalFooter>
  </Modal>
);

export default IntroModal;
