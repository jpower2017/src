import React, { Component } from "react";
import * as R from "ramda";
import { registryStatuses, activeStatuses } from "../common/data";
import FieldDropDown from "./FieldDropDown";
import AutoComplete from "material-ui/AutoComplete";
import FieldText from "./FieldText";
import RaisedButton from "material-ui/RaisedButton";
import Toggle from "material-ui/Toggle";
import TextField from "material-ui/TextField";
import { debounce } from "throttle-debounce";

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
  },
  textAreaStyle: {
    backgroundColor: "#ff9d9d"
  }
};

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.giftEventTypes) {
      return;
    }
    if (this.state.events) {
      return;
    }
    this.state = {
      events: R.map(x => x.name, nextProps.giftEventTypes)
    };
    console.log("nextProps.data(event) " + nextProps.data);
  }
  handleChange = event => {
    //this.props.onTextChange(event.value, e.name)
    this.setState({
      value: event.target.value
    });
  };
  handleUpdateInput = searchText => {
    this.setState({
      searchText: searchText
    });
  };
  handleNewRequest = x => {
    this.props.onEvt(x);

    //this.props.onSave({ ...this.props.data, name: x });
  };
  onNew = () => {
    this.setState({ searchText: "" });
    this.props.onNew();
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
          onClick={this.onNew}
        />
        <div style={{ padding: "10px" }}>
          <div style={{ marginLeft: "5px", marginBottom: "16px" }}>
            <FieldText
              obj={{ name: "date", title: "Event date: MM/DD" }}
              data={this.props.gei.date[0]}
              change={this.props.onTextChange}
            />
          </div>
          <Toggle
            label="Recurring"
            labelStyle={styles.labelStyle}
            defaultToggled={this.props.gei.recurring[0]}
            style={styles.block}
            onToggle={(event, isInputChecked) =>
              this.props.ontoggle([isInputChecked])
            }
          />
          <div style={{ marginLeft: "10px" }}>
            {this.state.events && (
              <AutoComplete
                hintText="Select gift event type"
                searchText={this.state.searchText}
                onUpdateInput={this.handleUpdateInput}
                onNewRequest={this.handleNewRequest}
                dataSource={this.state.events}
                //filter={(searchText, key) => key.indexOf(searchText) !== -1}
                filter={AutoComplete.fuzzyFilter}
                openOnFocus={true}
              />
            )}
          </div>
        </div>
        <div>
          <div>
            <div style={{ color: "#DF5C33", fontSize: "small" }}>
              Registry status{" "}
            </div>
            <FieldDropDown
              options={registryStatuses}
              status={gei.registry[0]}
              //data={ }
              onselect={this.props.onRegistry}
            />
          </div>
          <div>
            <div style={{ color: "#DF5C33", fontSize: "small" }}>Active</div>
            <FieldDropDown
              options={activeStatuses}
              status={gei.active ? 1 : 0}
              //data={ }
              onselect={this.props.onActive}
            />
          </div>
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
            textAreaStyle={styles.textAreaStyle}
          />
        </div>
      </div>
    );
  }
}
