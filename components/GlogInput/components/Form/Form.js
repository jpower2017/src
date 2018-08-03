import React, { Component } from "react";
import Paper from "material-ui/Paper";
import * as R from "ramda";
import RaisedButton from "material-ui/RaisedButton";
import FieldText from "./FieldText";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveEnabled: false,
      title: this.props.title,
      createNewDisabled: false
    };
  }
  componentDidMount() {
    if (this.props.showNew) {
      this.props.onNew();
    }

    this.state = { data: this.props.data };
  }
  componentWillReceiveProps(nextProps) {
    console.log(" FORM CWRP " + nextProps.selection);
    console.log("CWRP nextprops.data " + nextProps.data);
    this.setState({ tab: nextProps.selection });
  }
  handleChange = event => {
    this.setState({ saveEnabled: true });
    //  console.log(event.target.name);
  };
  handleSave = () => {
    console.log("Form handleSave  ");
    //console.log(JSON.stringify(this.state.data));
    //  this.props.onNext();
    //this.props.onSave(this.state.data);
  };
  getValue = z => {
    console.log("getValue z " + JSON.stringify(z));
    let field = R.prop("name", z);
    console.log("field " + field);
    console.log(this.props.data);
    console.log(R.prop(field, this.props.data));
    return R.prop(field, this.props.data);
  };
  childChange = (val, name) => {
    console.log("Form childChange ");
    console.log("val name : " + [val, name]);
    console.log(JSON.stringify({ ...this.state.data, [name]: val }));
    //console.log("this.props.data " + this.props.data);
    this.setState({ data: { ...this.props.data, [name]: val } });
    this.props.onSave({ ...this.props.data, [name]: val });
    this.setState({ saveEnabled: true });
  };
  onNew = () => {
    this.setState({
      title: "Enter data for new entry",
      createNewDisabled: true
    });
    this.props.onNew();
  };
  onAdd = () => {
    this.setState({
      saveEnabled: false,
      createNewDisabled: false,
      title: "Showing data"
    });
    this.props.onHandle2();
  };
  render() {
    const { fields, showNew } = this.props;
    return (
      <Paper zDepth={1}>
        <div
          style={{
            display: "flex",
            backgroundColor: "#A4AECB",
            minWidth: "300px"
          }}
        >
          {showNew && (
            <RaisedButton
              label="CREATE NEW"
              backgroundColor="#f58c32"
              labelColor={"#fff"}
              onClick={this.onNew}
              disabled={this.state.saveEnabled}
              style={{ marginLeft: "4px" }}
            />
          )}
          <RaisedButton
            label="Save"
            backgroundColor="#f58c32"
            labelColor={"#fff"}
            onClick={this.onAdd}
            disabled={!this.state.saveEnabled}
          />
        </div>
        <div
          style={{
            display: "flex",
            height: "auto",
            padding: "21px"
          }}
        >
          <div s>
            {fields &&
              this.props.data &&
              fields.map((x, i) => (
                <FieldText
                  obj={x}
                  data={this.getValue(x)}
                  change={this.childChange}
                  type={x.type}
                />
              ))}
          </div>
          <div>
            {!this.props.node === "gifts" && (
              <RaisedButton
                label="SELECT"
                backgroundColor="#f58c32"
                labelColor={"#fff"}
                style={{ marginTop: "15px", marginRight: "20px" }}
                onClick={this.props.onHandle}
                disabled={!this.state.saveEnabled}
              />
            )}
          </div>
        </div>
      </Paper>
    );
  }
}

export default Form;
