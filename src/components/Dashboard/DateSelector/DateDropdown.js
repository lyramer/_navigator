import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class DateDropdown extends Component {
  updateDay = day => {
    let curMonth = this.props.curDate.getMonth();
    let curYear = this.props.curDate.getFullYear();
    let newDate = new Date(curYear, curMonth, day);
    let error = "";
    if (newDate > new Date()) {
      error = "You may not select a date in the future.";
    } else {
      this.props.onChangeDate(newDate);
    }
    this.props.updateErrorMsg(error);
  };

  render() {
    let curDate = this.props.curDate.getDate();
    let curMonth = this.props.curDate.getMonth();
    let curYear = this.props.curDate.getFullYear();
    return (
      <Dropdown
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className="date-dropdown"
      >
        <DropdownToggle caret>{curDate}</DropdownToggle>
        {!!this.props.dateList && !!this.props.dateList[curYear][curMonth] && (
          <DropdownMenu>
            {Object.keys(this.props.dateList[curYear][curMonth]).map(date => (
              <DropdownItem key={date} onClick={() => this.updateDay(date)}>
                {date}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </Dropdown>
    );
  }
}

export default DateDropdown;
