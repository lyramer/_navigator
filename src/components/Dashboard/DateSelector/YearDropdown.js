import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class YearDropdown extends Component {
  updateYear = year => {
    let curDay = this.props.curDate.getDate();
    let curMonth = this.props.curDate.getMonth();
    let newDate = new Date(year, curMonth, curDay);
    let error = "";
    if (newDate > new Date()) {
      error = "You may not select a date in the future.";
    } else {
      this.props.onChangeDate(newDate);
    }
    this.props.updateErrorMsg(error);
  };

  render() {
    return (
      <Dropdown isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <DropdownToggle caret>
          {this.props.curDate.getFullYear()}
        </DropdownToggle>
        {this.props.dateList && (
          <DropdownMenu>
            {Object.keys(this.props.dateList).map(year => (
              <DropdownItem key={year} onClick={() => this.updateYear(year)}>
                {year}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </Dropdown>
    );
  }
}

export default YearDropdown;
