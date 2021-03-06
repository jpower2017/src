import React from "react";
import Paper from "material-ui/Paper";
import { Step, Stepper, StepButton, StepContent } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Form from "./Form";

import * as R from "ramda";
/**
 * A basic vertical non-linear implementation
 */
class VerticalNonLinear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainData: [("a": "one")],
      stepIndex: 0,
      submitted: false
    };
  }
  /*
  requiredFormFields = data => {
    console.log("requiredFormFields");
    console.log(JSON.stringify(data[this.state.stepIndex].form));
    let formData = data[this.state.stepIndex].form;
    //let flat = R.flatten(data[this.state.stepIndex].form);
    console.log(R.map(x => x.name, R.flatten(R.map(x => x.fields, formData))));
  };
  */
  handleNext = () => {
    const { stepIndex } = this.state;
    //this.requiredFormFields(this.props.data);
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };
  handleSubmit = () => {
    this.setState({ submitted: true });
    this.props.submit();
  };
  handleClearAll = () => {
    this.props.clearAll(),
      this.setState({
        stepIndex: 0,
        submitted: false
      });
  };
  showEmptyFieldHeader = arr => {
    return arr && arr.length ? "The following fields are not valid:" : "";
  };
  showEmptyFieldText = arr => {
    return arr ? R.map(x => <div>{x}</div>, arr) : "";
  };
  renderStepActions(step, emptyReqFields) {
    return (
      <div style={{ margin: "12px 0", padding: "2px" }}>
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
        {step < 2 && (
          <RaisedButton
            label="Next"
            disabled={step === 2}
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onClick={this.handleNext}
            style={{ marginRight: 12 }}
          />
        )}

        {step == 2 && (
          <div>
            <RaisedButton
              label="Submit"
              backgroundColor="#f58c32"
              labelColor="#fff"
              disableTouchRipple={true}
              disableFocusRipple={true}
              onClick={this.handleSubmit}
              disabled={!this.props.allReqCompleted || this.state.submitted}
            />
            <h4>{this.showEmptyFieldHeader(emptyReqFields)}</h4>
            <div>{this.showEmptyFieldText(emptyReqFields)}</div>
          </div>
        )}
        {this.state.submitted && (
          <span>
            <span style={{ marginLeft: "20px", marginRight: "20px" }}>
              <span style={{ color: "#f58c32", fontSize: "larger" }}>
                Form submitted.
              </span>
              <span style={{ fontStyle: "italic", marginLeft: "6px" }}>
                Clear form for new submission.
              </span>
            </span>
            <RaisedButton
              label="Clear form"
              disableTouchRipple={true}
              disableFocusRipple={true}
              primary={true}
              onClick={this.handleClearAll}
              style={{ marginRight: 12 }}
            />
          </span>
        )}
      </div>
    );
  }

  render() {
    const { stepIndex } = this.state;
    const { data, emptyReqFields } = this.props;

    return (
      <Paper zDepth={2}>
        <div>
          <Stepper activeStep={stepIndex} linear={false} orientation="vertical">
            {data.map((x, i) => {
              return (
                <Step>
                  <StepButton onClick={() => this.setState({ stepIndex: i })}>
                    <h2 style={{ color: "#455464", fontVariant: "small-caps" }}>
                      {x.title}
                    </h2>
                  </StepButton>
                  <StepContent>
                    <Form
                      data={x}
                      onselect={this.props.onselect}
                      inputData={this.props.inputData}
                    />
                    {this.renderStepActions(i, emptyReqFields)}
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </div>
      </Paper>
    );
  }
}

export default VerticalNonLinear;
