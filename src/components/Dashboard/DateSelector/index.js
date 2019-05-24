import React, { Component } from "react";
import { NavItem } from "reactstrap";
import YearDropdown from "./YearDropdown";
import MonthDropdown from "./MonthDropdown";
import DateDropdown from "./DateDropdown";

class DateSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      yearDropdownOpen: false,
      monthDropdownOpen: false,
      dateDropdownOpen: false
    };
  }

  updateErrorMsg = error => {
    this.setState({ error });
  };

  toggleYearDropdown = () => {
    this.setState({ yearDropdownOpen: !this.state.yearDropdownOpen });
  };
  toggleMonthDropdown = () => {
    this.setState({ monthDropdownOpen: !this.state.monthDropdownOpen });
  };
  toggleDateDropdown = () => {
    this.setState({ dateDropdownOpen: !this.state.dateDropdownOpen });
  };

  render() {
    let curDate = this.props.curDate.getDate();
    let curMonth = this.props.curDate.getMonth();
    let curYear = this.props.curDate.getFullYear();
    return (
      <NavItem id="nav_cal">
        {this.props.dateList && (
          <div>
            <span className="error">
              {this.props.dateList[curYear][curMonth][curDate] === false
                ? "There is no data available for this date"
                : this.state.error}
            </span>
            <YearDropdown
              isOpen={this.state.yearDropdownOpen}
              toggle={this.toggleYearDropdown}
              dateList={this.props.dateList}
              curDate={this.props.curDate}
              onChangeDate={this.props.onChangeDate}
              updateErrorMsg={this.updateErrorMsg}
            />
            <MonthDropdown
              isOpen={this.state.monthDropdownOpen}
              toggle={this.toggleMonthDropdown}
              dateList={this.props.dateList}
              curDate={this.props.curDate}
              onChangeDate={this.props.onChangeDate}
              updateErrorMsg={this.updateErrorMsg}
            />
            <DateDropdown
              isOpen={this.state.dateDropdownOpen}
              toggle={this.toggleDateDropdown}
              dateList={this.props.dateList}
              curDate={this.props.curDate}
              onChangeDate={this.props.onChangeDate}
              updateErrorMsg={this.updateErrorMsg}
            />
          </div>
        )}
      </NavItem>
    );
  }
}

export default DateSelector;
