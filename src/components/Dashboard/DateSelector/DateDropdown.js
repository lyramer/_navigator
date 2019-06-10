import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const BLANK_MONTH = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
  10: false,
  11: false,
  12: false,
  13: false,
  14: false,
  15: false,
  16: false,
  17: false,
  18: false,
  19: false,
  20: false,
  21: false,
  22: false,
  23: false,
  24: false,
  25: false,
  26: false,
  27: false,
  28: false,
  29: false,
  30: false,
  31: false
};

class DateDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  updateDay = day => {
    let curMonth = this.props.curDate.getMonth();
    let curYear = this.props.curDate.getFullYear();
    let newDate = new Date(curYear, curMonth, day);
    this.props.onChangeDate(newDate);
  };
  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    let curDate = this.props.curDate.getDate();
    let curMonth = this.props.curDate.getMonth();
    let curYear = this.props.curDate.getFullYear();
    return (
      <Dropdown
        isOpen={this.state.isOpen}
        toggle={this.toggle}
        className="date-dropdown"
      >
        <DropdownToggle caret>{curDate}</DropdownToggle>
        {!!this.props.dateList && !!this.props.dateList[curYear][curMonth] && (
          <DropdownMenu>
            {Object.keys(this.props.dateList[curYear][curMonth]).map(date => (
              <DropdownItem
                key={date}
                onClick={() => this.updateDay(date)}
                disabled={!this.props.dateList[curYear][curMonth][date]}
              >
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
