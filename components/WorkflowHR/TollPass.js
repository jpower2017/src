import React, { Component } from "react";

//import ThemeDefault from "./theme-default";
//import Stepper from "./Stepper.js";
import { forms } from "./dataTollPass";
//import { fetchWrap, getSupervisors, doesUserExist } from "./common/http.js";
import { connect } from "react-redux";
//import { validate } from "./utils/utils";
import App from "./App";

const config = { definitionID: "b1f23067-b7f1-4b4f-9e54-baf182c146d8" };

class WorkflowHR extends Component {
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
        <App forms={forms} config={config} authUserFW={false} />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  //login: state.notifications.login ? state.notifications.login : "nologin"
});

const WorkflowHR2 = connect(mapStateToProps)(WorkflowHR);

export default WorkflowHR2;
