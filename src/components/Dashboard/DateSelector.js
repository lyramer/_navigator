import React, { Component } from "react";
import { NavItem, Button } from "reactstrap";

class DateSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dd: this.props.curDate.getDate(),
      mm: this.props.curDate.getMonth(), //January is 0!
      yyyy: this.props.curDate.getFullYear(),
      error: ""
    };
  }

  updateYear(x) {
    let newYear = Number(this.state.yyyy) + x;
    if (isNaN(newYear)) {
      newYear = new Date().getFullYear();
    }

    let newDate = new Date(newYear, this.state.mm, this.state.dd);
    let dd = newDate.getDate();
    let mm = newDate.getMonth();
    let yyyy = newDate.getFullYear();
    this.setState({ dd, mm, yyyy });
    this.props.onChangeDate(newDate);
  }

  updateMonth(x) {
    let newMonth = Number(this.state.mm) + x; //January is 0!
    if (isNaN(newMonth)) newMonth = new Date().getMonth();
    let newDate = new Date(this.state.yyyy, newMonth, this.state.dd);
    let dd = newDate.getDate();
    let mm = newDate.getMonth(); //January is 0!
    let yyyy = newDate.getFullYear();
    this.setState({ dd, mm, yyyy });
    this.props.onChangeDate(newDate);
  }

  updateDay(x) {
    let newDay = Number(this.state.dd) + x;
    if (isNaN(newDay)) newDay = new Date().getDay();

    let newDate = new Date(this.state.yyyy, this.state.mm, newDay);
    let dd = newDate.getDate();
    let mm = newDate.getMonth(); //January is 0!
    let yyyy = newDate.getFullYear();
    this.setState({ dd, mm, yyyy });
    this.props.onChangeDate(newDate);
  }

  updateDate = e => {
    let thisYear = new Date().getFullYear();
    let thisMonth = new Date().getMonth() + 1;
    let thisDay = new Date().getMonth() + 1;
    let error = "";
    switch (e.target.id) {
      case "year":
        let newYear = Number(e.target.value);
        if (!newYear || newYear < 1990 || newYear > thisYear) {
          error = "The year you choose must be between 1990 and " + thisYear;
        }
        this.setState({
          yyyy: Number(e.target.value),
          error: error
        });
        break;
      case "month":
        let newMonth = Number(e.target.value);
        if (!newMonth || newMonth < 1 || newMonth > 12) {
          error = "Please pick a valid month";
        } else if (this.state.yyyy === thisYear && thisMonth < newMonth) {
          error = "Data is not available for future dates";
        }
        this.setState({
          mm: Number(e.target.value - 1),
          error: error
        });
        break;
      case "day":
        let newDay = Number(e.target.value);
        if (!newDay || newDay < 0 || newDay > 31) {
          error = "Please pick a valid date";
        } else if (
          this.state.yyyy === thisYear &&
          thisMonth === this.state.month &&
          newDay > thisDay
        ) {
          error = "Data is not available for future dates";
        }
        this.setState({
          dd: Number(e.target.value),
          error: error
        });
        break;
      default:
        this.setState({
          error: "Uh oh, something went wrong. Please try again."
        });
        break;
    }
    if (!error || error === "") {
      let date = new Date(this.state.yyyy, this.state.mm - 1, this.state.dd);
      this.props.onChangeDate(date);
    }
  };

  render() {
    return (
      <NavItem id="nav_cal">
        <form id="date">
          <span className="arrows">
            <Button
              color="secondary"
              className="arrow"
              onClick={() => this.updateYear(-1)}
              type="button"
            >
              {"<<<"}
            </Button>
            <Button
              color="secondary"
              className="arrow"
              onClick={() => this.updateMonth(-1)}
              type="button"
            >
              {"<<"}
            </Button>
            <Button
              color="secondary"
              className="arrow"
              onClick={() => this.updateDay(-1)}
              type="button"
            >
              {"<"}
            </Button>
          </span>
          <span className="cal-item">
            <input
              type="text"
              id="year"
              pattern="[0-9]{4}"
              value={this.state.yyyy}
              onChange={e => this.updateDate(e)}
            />
          </span>
          <span className="cal-item">
            <input
              type="text"
              id="month"
              pattern="[0-9]{1,2}"
              value={this.state.mm + 1}
              onChange={e => this.updateDate(e)}
            />
          </span>
          <span className="cal-item">
            <input
              type="text"
              id="day"
              value={this.state.dd}
              onChange={e => this.updateDate(e)}
            />
          </span>
          <span className="arrows">
            <Button
              color="secondary"
              className="arrow"
              pattern="[0-9]{1,2}"
              onClick={() => this.updateDay(1)}
              type="button"
            >
              {">"}
            </Button>
            <Button
              color="secondary"
              className="arrow"
              onClick={() => this.updateMonth(1)}
              type="button"
            >
              {">>"}
            </Button>
            <Button
              color="secondary"
              className="arrow"
              onClick={() => this.updateYear(1)}
              type="button"
            >
              {">>>"}
            </Button>
          </span>
        </form>
        <span className="error">{this.state.error}</span>
      </NavItem>
    );
  }
}

export default DateSelector;
