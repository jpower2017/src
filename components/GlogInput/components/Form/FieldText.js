import React, { Component } from "react";
import * as R from "ramda";
import TextField from "material-ui/TextField";
import { debounce } from "throttle-debounce";
import { isNumber, emailPattern, dateFormat } from "../../utils/utils";

class FieldText extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.data };
    this.change = debounce(500, this.bubbleUp);
  }
  componentDidMount() {
    this.state = { data: this.props.data };
  }

  componentWillReceiveProps(nextProps) {
    console.log(" FIELD TEXT CWRP " + nextProps.selection);
    console.log("CWRP nextprops.data " + nextProps.data);
    if (this.props.data === nextProps.data) {
      return;
    }
    this.setState({ data: nextProps.data });
  }
  validate = (value, type) => {
    //console.log("switch : " + [type, value]);
    if (!value) {
      return;
    }
    switch (type) {
      case "phone":
        return value.replace(/[-,(,)]/g, "").length != 10;
        break;
      case "email":
        return !emailPattern.test(value);
        break;
      case "date":
        return !dateFormat.test(value);
      case "gender":
        return !R.contains(value, ["M", "m", "Male", "F", "f", "Female"]);
      case "status":
        console.log("status ");

        return !R.contains(
          value,
          R.map(x => R.prop("status", x), this.props.statuses)
        );
      default:
        return false;
    }
  };

  getValue = z => {
    //  return R.prop(z, this.props.data);
  };
  bubbleUp = (value, name) => {
    this.props.change(value, name);
  };
  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ data: value });
    //  this.props.change(event.target.value, event.target.name);
    this.change(value, name);
  };
  render() {
    const { obj, data } = this.props;
    return (
      <div style={{ padding: "2px" }}>
        <TextField
          value={this.state.data}
          hintText={obj.title}
          floatingLabelText={obj.title}
          errorText={this.validate(this.state.data, this.props.type)}
          fullWidth={false}
          multiLine={false}
          onChange={this.handleChange}
          name={obj.name}
          style={{ width: "250px", fontSize: "20px" }}
          floatingLabelStyle={{ color: "#DF5C33" }}
        />
      </div>
    );
  }
}

export default FieldText;
