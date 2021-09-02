import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


const IntroModal = props => (
  <Modal isOpen={props.show} toggle={props.toggle} className={props.className}>
    <ModalHeader toggle={props.toggle}>P3Aqua</ModalHeader>
    <ModalBody>
      <p>
        Welcome to P3Aqua - Preserve, Predict, and Protect our oceans! This is
        V0.1 of the Earth Data Store based Ocean application, built by the
        University of Victoria Mod Squad in collaboration with:
      </p>
          </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={props.toggle}>
        View Map
      </Button>{" "}
    </ModalFooter>
  </Modal>
);

export default IntroModal;
