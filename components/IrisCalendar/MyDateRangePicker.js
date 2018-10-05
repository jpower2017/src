import React, { Component } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format, addDays, parse } from "date-fns";
import { DateRange } from "react-date-range";
import R from "ramda";
import RaisedButton from "material-ui/RaisedButton";
import { white } from "material-ui/styles/colors";

/**
dateRange.selection is initial range that shows
**/
class MyDateRangePicker extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dateRange: {
        selection: {
          startDate: new Date(),
          endDate: addDays(new Date(), 14),
          key: "selection"
        }
      },
      dateRangeWithDisabled: {
        selection: {
          startDate: addDays(new Date(), 4),
          endDate: null,
          key: "selection"
        }
      },
      definedRange: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
        }
      },
      dateRangePickerI: {
        selection: {
          startDate: new Date(),
          endDate: null,
          key: "selection"
        },
        compare: {
          startDate: new Date(),
          endDate: addDays(new Date(), 3),
          key: "compare"
        }
      },
      multipleRanges: {
        selection1: {
          startDate: addDays(new Date(), 1),
          endDate: null,
          key: "selection1"
        },
        selection2: {
          startDate: addDays(new Date(), 4),
          endDate: addDays(new Date(), 8),
          key: "selection2"
        },
        selection3: {
          startDate: addDays(new Date(), 8),
          endDate: addDays(new Date(), 10),
          key: "selection3",
          showDateDisplay: false,
          autoFocus: false
        }
      },
      datePickerInternational: null,
      locale: "ja",
      dateRangePicker: {
        selection: {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: "selection"
        }
      }
    };
  }
  onSubmit = (start, end) => {
    console.log("onSubmit f  " + [start, end]);
    this.props.onSubmit(start, end);
  };
  handleRangeChange(which, payload) {
    console.log(which, payload);
    console.log(
      "selection start date " + R.path(["selection", "startDate"], payload)
    );
    const strtDt = R.path(["selection", "startDate"], payload);
    const endDt = R.path(["selection", "endDate"], payload);
    const objStart = parse(strtDt);
    const objEnd = parse(endDt);
    //  this.onSubmit(objStart, objEnd);

    console.log(format(objStart, "YYYYMMDD"));
    console.log(format(objEnd, "YYYYMMDD"));
    console.table(payload);

    this.setState({
      [which]: {
        ...this.state[which],
        ...payload
      }
    });
  }
  render() {
    return (
      <div style={{ zoom: "150%" }}>
        <h2> Iris calendar: date range </h2>
        <div style={{ paddng: "8px", margin: "10px" }}>
          <div>Select start and end dates of calendar.</div>
          <div>Then submit request.</div>
        </div>
        <DateRange
          onChange={this.handleRangeChange.bind(this, "dateRange")}
          moveRangeOnFirstSelection={false}
          ranges={[this.state.dateRange.selection]}
          className={"PreviewArea"}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RaisedButton
            onClick={this.onSubmit}
            label={"Submit request"}
            style={{ marginLeft: 20 }}
            backgroundColor="#f58c32"
            labelColor={white}
          />
        </div>
      </div>
    );
  }
}

export default MyDateRangePicker;
