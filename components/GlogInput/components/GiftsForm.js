import React, { Component } from "react";
import Paper from "material-ui/Paper";
import * as R from "ramda";
//import TableContainer from "./Grid/TableContainer";
import FormContainer from "./Form/FormContainer";
import StepperContainer from "./StepperContainer";
import ListWidget from "./ListWidget";
import muiThemeable from "material-ui/styles/muiThemeable";
import PivotContainerGifts from "./PivotContainerGifts";
import ListSingleLevel from "./ListSingleLevel/ListSingleLevel";
import GiftsPartiesContainer from "./GiftsPartiesContainer";
import GiftsRequestsContainer from "./GiftsRequestsContainer";

class GiftsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterStr: "",
      createNew: true
    };
  }
  filterStr = v => {
    console.log("filterStr v " + v);
    this.setState({ filterStr: v });
  };
  formSave = () => {
    this.props.bubbleUp();
    this.setState({ createNew: true });
  };
  getMessage = action => {
    return action === "edit"
      ? `Edit selection or its associations.  Also edit Vendor/Order/Delivery details.`
      : "Enter new gift details.  After saving it,  associate a request or parties to the gift.  Plus add V/O/D dets";
  };
  render() {
    const { fields, title, muiTheme, action } = this.props;
    return (
      <Paper zDepth={1}>
        <h4>{this.getMessage(action)}</h4>
        <div style={{ height: "auto", padding: "21px" }}>
          <h2>{title}</h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              padding: "10px"
            }}
          >
            <div style={{ padding: "10px" }}>
              <FormContainer
                bubbleUp={this.formSave}
                bubbleNew={() => this.setState({ createNew: false })}
              />
            </div>
            <div
              style={{
                padding: "10px",
                opacity: !this.state.createNew ? 0.3 : 1
              }}
            >
              <GiftsRequestsContainer
                onselect={x => this.onSelectParties(x)}
                groups={this.props.requests}
                multiSelect={true}
                title={"Requests"}
              />
            </div>
            <div
              style={{
                padding: "10px",
                opacity: !this.state.createNew ? 0.3 : 1
              }}
            >
              <GiftsPartiesContainer
                onselect={x => this.onSelectParties(x)}
                groups={this.props.groups}
                multiSelect={true}
                title={"Parties"}
              />
            </div>
            <div style={{ padding: "10px" }}>
              <div style={{ opacity: !this.state.createNew ? 0.3 : 1 }}>
                <StepperContainer />
              </div>
            </div>
          </div>
          <div />
        </div>
      </Paper>
    );
  }
}

export default muiThemeable()(GiftsForm);
