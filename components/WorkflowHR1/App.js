import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as R from "ramda";
import ThemeDefault from "./theme-default";
import Stepper from "./Stepper.js";
import { forms, subForms2 } from "./data";
import { fetchWrap, getSupervisors } from "./common/http.js";

const getAllReqFields = data => {
  const getReqFields = data => {
    const allFields = R.flatten(R.map(x => x.fields, data));
    return R.filter(x => x.required, allFields);
  };
  const reqObjs = R.flatten(R.map(x => getReqFields(x.form), data));
  return R.map(x => x.name, reqObjs);
};

const getSupervisors2 = async () => {
  const newSup = await getSupervisors();
  const objSup = R.find(x => x.name == "Supervisor", subForms2[0].fields);
  objSup["uiOptions"] = newSup;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      allReqCompleted: false
    };
  }
  componentDidMount() {
    getSupervisors2();
  }

  process(val, name) {
    let newObj = { [name]: val };
    let newData = { ...this.state.data, [name]: val };
    this.setState({ data: newData });
    let reqFields = getAllReqFields(forms);
    let enteredFields = R.keys(this.state.data);
    let bools = R.map(x => R.contains(x, enteredFields), reqFields);
    R.contains(false, bools)
      ? this.setState({ allReqCompleted: false })
      : this.setState({ allReqCompleted: true });
    //R.find(x => console.log(!!R.prop(x, this.state.d), reqFields));
  }
  submit = () => {
    console.log("submit f");
    console.log(JSON.stringify(this.state.data));

    fetchWrap(this.state.data);
  };
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={ThemeDefault}>
          <div style={{}}>
            <Stepper
              data={forms}
              inputData={this.state.data}
              onselect={(name, val) => this.process(name, val)}
              allReqCompleted={this.state.allReqCompleted}
              submit={this.submit}
              clearAll={() => this.setState({ data: {} })}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
