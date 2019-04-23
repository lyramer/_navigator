import React, { Component } from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

class NavMenu extends Component {
  render() {
    return (
      <SideNav onSelect={this.props.onSelect} selected={this.props.selected}>
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
          <NavItem id="nav_home" eventKey="home">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>

          <NavItem id="nav_data" eventKey="dataProducts">
            <NavIcon>
              <i
                className="fas fa-layer-group"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>

            <NavItem eventKey="dataProducts/chlorophyll">
              <NavText>
                Chlorophyll{" "}
                {this.props.displayChlor && <i class="fas fa-eye" />}
              </NavText>
            </NavItem>

            <NavItem eventKey="dataProducts/surfaceTemp">
              <NavText>Sea Surface Temp</NavText>
            </NavItem>
          </NavItem>

          <NavItem id="nav_zone" eventKey="zonesOfInterest">
            <NavIcon>
              <i className="fas fa-chart-area" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Time Series Data</NavText>
          </NavItem>

          <NavItem id="nav_cal" eventKey="calendar">
            <NavIcon>
              <i className="fas fa-calendar" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Date Range</NavText>
          </NavItem>

          <NavItem id="nav_mark" eventKey="marker">
            <NavIcon>
              <i
                className="fa fa-fw fa-map-marker"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>

            <NavItem eventKey="marker/typePin">
              <NavText>Enter Coordinates</NavText>
            </NavItem>

            <NavItem eventKey="marker/dropPin">
              <NavText>Drop Pin</NavText>
            </NavItem>
          </NavItem>

          <NavItem id="nav_info" eventKey="info">
            <NavIcon>
              <i
                className="fas fa-info-circle"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>Info</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  }
}

export default NavMenu;
