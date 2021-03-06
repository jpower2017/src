import React, { Component } from "react";
import * as R from "ramda";
import { events, registryStatuses } from "../common/data";
import FieldDropDown from "./FieldDropDown";
import FieldText from "./FieldText";
import RaisedButton from "material-ui/RaisedButton";
import Toggle from "material-ui/Toggle";
import TextField from "material-ui/TextField";

const styles = {
  block: {
    maxWidth: 150,
    marginLeft: "6px"
  },
  toggle: {
    marginBottom: 16
  },
  thumbOff: {
    backgroundColor: "#ffcccc"
  },
  trackOff: {
    backgroundColor: "#ff9d9d"
  },
  thumbSwitched: {
    backgroundColor: "red"
  },
  trackSwitched: {
    backgroundColor: "#ff9d9d"
  },
  labelStyle: {
    color: "#DF5C33"
  }
};

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log("1151 " + this.props.gei.registry[0]);
  }
  handleChange = event => {
    //this.props.onTextChange(event.value, e.name)
    this.setState({
      value: event.target.value
    });
  };
  render() {
    const { gei } = this.props;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#A4AECB",
          //backgroundColor: "rgba(173, 216, 230, 0.3)",
          borderBottom: "4px ridge grey"
        }}
      >
        <RaisedButton
          label="NEW"
          backgroundColor={this.props.color}
          labelColor={"#fff"}
          style={{ margin: "15px" }}
          onClick={this.props.onNew}
        />
        <div>
          <FieldDropDown
            options={events}
            status={gei.event[0]}
            data={this.props.data[0]}
            onselect={this.props.onEvt}
          />
          <Toggle
            label="Recurring"
            labelStyle={styles.labelStyle}
            defaultToggled={this.props.gei.recurring[0]}
            style={styles.block}
            onToggle={(event, isInputChecked) =>
              this.props.ontoggle([isInputChecked])
            }
          />
        </div>
        <div>
          <FieldText
            obj={{ name: "date", title: "Event date: MM/DD/YY" }}
            data={this.props.gei.date[0]}
            change={this.props.onTextChange}
            type={"date"}
          />
          <FieldDropDown
            options={registryStatuses}
            status={gei.registry[0]}
            //data={ }
            onselect={this.props.onRegistry}
          />
        </div>
        <div>
          <TextField
            hintText="Text here"
            floatingLabelText="GIFT EVENT NOTES: (multi line)   "
            multiLine={true}
            rows={2}
            style={{
              width: "500px",
              backgroundColor: "#ddd",
              border: "1px ridge grey",
              padding: "10px"
            }}
            onChange={event =>
              this.props.onTextChange(event.target.value, "notes")
            }
            value={gei.notes[0]}
          />
        </div>
      </div>
    );
  }
}
