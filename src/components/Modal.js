import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const FunderLogo = props => (
  <a href={props.url} target="_blank" rel="noopener noreferrer">
    <img className="logo" src={props.path} alt={props.alt} />
  </a>
);

const LogoList = [
  {
    url: "https://www.uvic.ca/socialsciences/geography/index.php",
    path: "/images/uvic_logo_white.png",
    alt: "Logo for University of Victoria"
  },
  {
    url: "http://meopar.ca/",
    path: "/images/meopar_logo_white.png",
    alt: "Logo for MEOPAR"
  },

  {
    url: "http://www.oceannetworks.ca/",
    path: "/images/onc_logo.png",
    alt: "Logo for Ocean Network Canada"
  }
];

const IntroModal = props => (
  <Modal isOpen={props.show} toggle={props.toggle} className={props.className}>
    <ModalHeader toggle={props.toggle}>Algae Explorer</ModalHeader>
    <ModalBody>
      <p>
        Welcome to Algae Explorer! This is v1.0 of the map, built in
        collaboration with UVic's ModSquad from the Computer Science Department.
      </p>
      <p>Funding for this project comes from</p>
      <div className="logos">
        {LogoList.map((logo, index) => (
          <FunderLogo
            url={logo.url}
            path={logo.path}
            alt={logo.alt}
            key={index}
          />
        ))}
      </div>
      <p>
        Special thanks to the European Space Agency for providing the data which
        makes this project possible.
      </p>
      <div className="esa">
        <a
          href="https://www.esa.int/ESA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/eesa_logo_white.png"
            alt="Logo for European Space Agency"
          />
        </a>
      </div>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={props.toggle}>
        View Map
      </Button>{" "}
    </ModalFooter>
  </Modal>
);

export default IntroModal;
