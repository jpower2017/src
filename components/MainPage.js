import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
//import InOutdatatable from "../containers/InOutdatatable";
import Dashboard from "../containers/DashboardPage";
import Investments from "../containers/Investments";
import Iframe from "./Iframe.js";
//import Bg from "../images/squares-smallC2.jpg";
import Empty from "./Empty";
import PositivePay from "./PositivePay/GridContainer";
import PendingContainer from "./PendingList/PendingContainer";
import Addepar from "./Addepar/AddeparContainer";
import BoxToken from "./BoxToken/Form.js";
import InOfficeContainer from "./InOffice/InOfficeContainer.js";
import ComingSoon from "./ComingSoon";
import WelcomeScreen from "./WelcomeScreen/WelcomeScreen";
//import FlowWrightIntiateAPI from "./test/FlowWright-initate-api";
import WorkflowHR from "./WorkflowHR/App.js";
import GlogInput from "./GlogInput/App.js";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.setState({});
  }
  componentDidMount() {}
  render() {
    return (
      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          height: "1500px"
        }}
      >
        {this.props.open ? <Empty /> : null}
        {this.props.location.pathname == "/portal/" ? <WelcomeScreen /> : null}
        <Switch>
          <Route path="/presence" component={InOfficeContainer} />
          <Route path="/boxtokenNative" component={BoxToken} />
          <Route path="/positivePay" component={PositivePay} />
          <Route path="/pendingList" component={PendingContainer} />
          <Route path="/addepar/bloomberg" component={Addepar} />
          <Route path="/addepar/intacct" component={ComingSoon} />
          <Route path="/testlevel1" component={Empty} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/investments" component={Investments} />
          <Route path="/flowWrightAPI" component={WorkflowHR} />
          <Route path="/glogInput" component={GlogInput} />
          <Route
            path="/flowWright"
            render={() => (
              <Iframe
                url="https://workflow-qa.bluesprucecapital.net/cDevWorkflow/LoginPage.aspx?ReturnUrl=%2fcDevWorkflow%2f"
                title="FlowWright"
              />
            )}
          />
          <Route
            path="/flowWright2"
            render={() => (
              <Iframe
                url="https://workflow-qa.bluesprucecapital.net/cDevWorkflow/ConfigTasks.aspx?displayHeader=no"
                title="FlowWright General User Task View"
              />
            )}
          />
          <Route
            path="/flowWright3"
            render={() => (
              <Iframe
                url="https://workflow-qa.bluesprucecapital.net/cDevWorkflow/RenderForm.aspx?formDefID=f6e94043-9590-4bd5-9303-6d8ca6135b6d&mode=submit&workflowDefID=c0d6b7f7-ab82-48af-b0be-f61dd8a3f86b&formIDVar=fmJobRequisitionInstId&displayHeader=no"
                title="FlowWright Form to Start FLow"
              />
            )}
          />
          <Route
            path="/pending"
            render={() => (
              <Iframe
                url="https://portal.bluesprucecapital.net/pending/"
                title="Pending"
              />
            )}
          />

          <Route
            path="/boxtoken"
            render={() => (
              <Iframe
                url="https://portal.bluesprucecapital.net/api/boxtoken/"
                title="Box token"
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(MainPage);
