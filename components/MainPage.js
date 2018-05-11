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
          <Route
            path="/flowWright"
            render={() => (
              <Iframe
                url="https://bsc.flowwright.com/cDevWorkflow/LoginPage.aspx?ReturnUrl=%2fcDevWorkflow%2f&header=null"
                title="FlowWright"
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
