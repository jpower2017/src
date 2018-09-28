import React, { Component } from "react";

//import ThemeDefault from "./theme-default";
//import Stepper from "./Stepper.js";
import { forms } from "./dataContractorConfidentiality";
//import { fetchWrap, getSupervisors, doesUserExist } from "./common/http.js";
import { connect } from "react-redux";
//import { validate } from "./utils/utils";
import App from "./App";

const config = { definitionID: "a543b3c5-b8f9-4fbc-8642-406589766aca" };

class ContractorConfidentiality extends Component {
  constructor(props) {
    console.log("ContractorConfidentiality");
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <App
          forms={forms}
          config={config}
          extraData={this.props.initiatorName}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  initiatorName: {
    initiatorName: `${state.notifications.user.firstName} ${
      state.notifications.user.lastName
    }`
  }
});

const ContractorConfidentiality2 = connect(mapStateToProps)(
  ContractorConfidentiality
);

export default ContractorConfidentiality2;
