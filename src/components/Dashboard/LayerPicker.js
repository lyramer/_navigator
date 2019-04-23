import React, { Component } from "react";
import { NavItem } from "reactstrap";

class LayerPicker extends Component {
  handleChange = event => {
    console.log(event.target);
    if (event.target.value == "chlor") {
      console.log("chlor selected");
      this.props.toggleChlor(true);
    } else {
      console.log("none selected");
      this.props.toggleChlor(false);
    }
  };
  render() {
    return (
      <NavItem id="nav_data" className="layers">
        <i className="fas fa-layer-group" />
        <form id="dataproducts">
          <div className="layer">
            <input
              type="radio"
              label="None"
              id="layer_null"
              value="none"
              name="layer"
              checked={!this.props.displayChlor}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />
            <label htmlFor="layer_chlor">Chlorophyll</label>
          </div>
        </form>
      </NavItem>
    );
  }
}

export default LayerPicker;
