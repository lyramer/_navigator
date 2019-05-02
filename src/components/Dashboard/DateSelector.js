import React, { Component } from "react";
import { NavItem, Button } from "reactstrap";

const years = [2019, 2018, 2017, 2016, 2015];
const months = [
  { val: 0, name: "January" },
  { val: 1, name: "February" },
  { val: 2, name: "March" },
  { val: 3, name: "April" },
  { val: 4, name: "May" },
  { val: 5, name: "June" },
  { val: 6, name: "July" },
  { val: 7, name: "August" },
  { val: 8, name: "September" },
  { val: 9, name: "October" },
  { val: 10, name: "November" },
  { val: 11, name: "December" }
];
const DateOption = props => <option value={props.val}>{props.name}</option>;

class DateSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
  }

  updateYear(e) {
    let curDay = this.props.curDate.getDate();
    let curMonth = this.props.curDate.getMonth();
    let newDate = new Date(e.target.value, curMonth, curDay);
    if (newDate > new Date()) {
      this.setState({ error: "You may not select a date in the future." });
    } else {
      this.props.onChangeDate(newDate);
      this.setState({ error: "" });
    }
  }

  updateMonth(e) {
    let curDay = this.props.curDate.getDate();
    let curYear = this.props.curDate.getFullYear();
    let newDate = new Date(curYear, e.target.value, curDay);
    if (newDate > new Date()) {
      this.setState({ error: "You may not select a date in the future." });
    } else {
      this.props.onChangeDate(newDate);
      this.setState({ error: "" });
    }
  }

  updateDay(e) {
    let curMonth = this.props.curDate.getMonth();
    let curYear = this.props.curDate.getFullYear();
    let newDate = new Date(curYear, curMonth, e.target.value);
    if (newDate > new Date()) {
      this.setState({ error: "You may not select a date in the future." });
    } else {
      this.props.onChangeDate(newDate);
      this.setState({ error: "" });
    }
  }

  renderDays(month, year) {
    const days = [];
    let monthLength = new Date(year, month + 1, 0).getDate();
    for (var i = 1; i <= monthLength; i++) {
      days.push(<DateOption val={i} key={i} name={i} />);
    }
    return days;
  }

  render() {
    let curDay = this.props.curDate.getDate();
    let curMonth = this.props.curDate.getMonth();
    let curYear = this.props.curDate.getFullYear();
    console.log(curYear);
    return (
      <NavItem id="nav_cal">
        <form id="date">
          <select
            id="year"
            className="dropdown year"
            onChange={e => this.updateYear(e)}
            value={curYear}
          >
            {years.map(year => (
              <DateOption val={year} key={year} name={year} />
            ))}
          </select>
          <select
            id="month"
            className="dropdown month"
            onChange={e => this.updateMonth(e)}
            value={curMonth}
          >
            {months.map(month => (
              <DateOption val={month.val} key={month.name} name={month.name} />
            ))}
          </select>
          <select
            id="day"
            className="dropdown day"
            onChange={e => this.updateDay(e)}
            value={curDay}
          >
            {this.renderDays(curMonth, curYear)}
          </select>
        </form>
        <span className="error">{this.state.error}</span>
      </NavItem>
    );
  }
}

export default DateSelector;
