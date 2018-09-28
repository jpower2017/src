import React, { Component } from "react";

//import ThemeDefault from "./theme-default";
//import Stepper from "./Stepper.js";
import { forms } from "./data";
//import { fetchWrap, getSupervisors, doesUserExist } from "./common/http.js";
import { connect } from "react-redux";
//import { validate } from "./utils/utils";
import App from "./App";

const config = { definitionID: "e9b65dfb-532c-4c17-bb38-cdc4fdd77069" };

class TollPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <App forms={forms} config={config} />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  //login: state.notifications.login ? state.notifications.login : "nologin"
});

const TollPass2 = connect(mapStateToProps)(TollPass);

export default TollPass2;
