import React, { Component } from "react";
import Paper from "material-ui/Paper";
import * as R from "ramda";
import RaisedButton from "material-ui/RaisedButton";
import FieldText from "./FieldText";
import FieldDropDown from "./FieldDropDown";

class Subform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveEnabled: false,
      title: this.props.title,
      createNewDisabled: false
    };
  }
  componentDidMount() {
    this.state = { data: this.props.data };
  }
  componentWillReceiveProps(nextProps) {
    console.log(" Subform CWRP " + nextProps.selection);
    console.log("CWRP nextprops.data " + nextProps.data);
    this.setState({ tab: nextProps.selection });
  }
  handleChange = event => {
    this.setState({ saveEnabled: true });
    //  console.log(event.target.name);
  };
  showTitle = title => {
    return title;
  };
  change = (val, name) => {
    console.log("change " + [val, name]);
  };
  render() {
    const { data, inputData } = this.props;
    return (
      <Paper zDepth={1}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItem: "center"
            }}
          >
            <div>
              <h5
                style={{
                  color: "#7e7e7e",
                  minHeight: "40px",
                  fontWeight: "lighter",
                  marginLeft: "40px"
                }}
              >
                {this.showTitle(data.title)}
              </h5>
              {data.fields &&
                data.fields.map(
                  (x, i) =>
                    x.uiType ? (
                      <div
                        style={{
                          backgroundColor: "rgba(249,249,249,.3)",
                          margin: "9px"
                        }}
                      >
                        <FieldDropDown
                          options={x.uiOptions}
                          status={
                            inputData[x.name]
                              ? inputData[x.name]
                              : x.uiOptions[0].name
                          }
                          onselect={this.props.onselect}
                          required={x.required}
                          name={x.name}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "rgba(249,249,249,.3)",
                          margin: "8px",
                          padding: "3px"
                        }}
                      >
                        <FieldText
                          obj={x}
                          change={this.props.onselect}
                          type={x.type}
                          inputData={inputData[x.name]}
                        />
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

export default Subform;
