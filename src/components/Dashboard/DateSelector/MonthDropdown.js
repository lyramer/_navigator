import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const MONTHS = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
};

class MonthDropdown extends Component {
  updateMonth = month => {
    let curDay = this.props.curDate.getDate();
    let curYear = this.props.curDate.getFullYear();
    let newDate = new Date(curYear, month, curDay);
    let error = "";
    if (newDate > new Date()) {
      error = "You may not select a date in the future.";
    }

    this.props.onChangeDate(newDate);
    this.props.updateErrorMsg(error);
  };

  render() {
    let curMonth = this.props.curDate.getMonth();
    let curYear = this.props.curDate.getFullYear();
    return (
      <Dropdown isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <DropdownToggle caret>{MONTHS[curMonth]}</DropdownToggle>
        <DropdownMenu>
          {this.props.dateList ? (
            Object.keys(this.props.dateList[curYear]).map(month => (
              <DropdownItem key={month} onClick={() => this.updateMonth(month)}>
                {MONTHS[month]}
              </DropdownItem>
            ))
          ) : (
            <DropdownItem />
          )}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default MonthDropdown;
