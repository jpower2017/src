import React, { Component } from "react";
import Paper from "material-ui/Paper";
import * as R from "ramda";
import RaisedButton from "material-ui/RaisedButton";
import FieldText from "./FieldText";
import FieldDropDown from "./FieldDropDown";

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
  getValue = (z, data) => {
    console.log("data...");
    console.table(data);
    console.log("getValue " + JSON.stringify(z));
    let field = R.prop("name", z);
    console.log("field " + field);
    console.log(R.prop(field, this.props.data));
    return R.prop(field, this.props.data);
  };
  getValueDD = (z, data) => {
    let v = this.getValue(z, data);
    console.log("v " + v);
    console.table(z);
    console.table(z.options);
    if (!z.options || v == "undefined") {
      return;
    }
    if (Number(v)) {
      return v;
    }
    console.log(R.prop("value", R.find(x => x.name == v, z.options)));
    return R.prop("value", R.find(x => x.name == v, z.options));
  };
  childChange = (val, name) => {
    console.log("Form childChange ");
    console.log("val name : " + [val, name]);
    console.log(JSON.stringify({ ...this.state.data, [name]: val }));
    //console.log("this.props.data " + this.props.data);
    let newObj = { ...this.props.data, [name]: val };
    if (name == "firstName") {
      newObj = { ...newObj, name: `${val} ${this.props.data["lastName"]}` };
    } else if (name == "lastName") {
      newObj = { ...newObj, name: `${this.props.data["firstName"]} ${val}` };
    }
    this.setState({ data: newObj });

    this.props.onSave(newObj);
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
  showOptions = options => {
    console.log("showOptions");
    console.log(JSON.stringify(options));
    return options;
  };
  render() {
    const { fields, showNew } = this.props;
    return (
      <Paper zDepth={1}>
        <div
          style={{
            display: "flex",
            backgroundColor: "#A4AECB",
            minWidth: "400px"
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
          <div>
            {fields &&
              this.props.data &&
              fields.map(
                (x, i) =>
                  x.uiType === "dropDown" ? (
                    <div>
                      <div
                        style={{
                          color: "#DF5C33",
                          fontSize: "small",
                          marginLeft: "4px",
                          marginTop: "10px"
                        }}
                      >
                        {x.title}
                      </div>
                      <FieldDropDown
                        options={x.options}
                        status={
                          this.getValueDD(x, this.props.data)
                            ? this.getValueDD(x, this.props.data)
                            : 1
                        }
                        //data={ }
                        onselect={value => this.childChange(value, x.name)}
                      />
                    </div>
                  ) : (
                    <FieldText
                      obj={x}
                      data={this.getValue(x, this.props.data)}
                      change={this.childChange}
                      type={x.type}
                      multiLine={x.uiType}
                    />
                  )
              )}
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
