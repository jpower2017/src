import React, { Component } from "react";
import Paper from "material-ui/Paper";
import * as R from "ramda";
import FieldDropDown from "./FieldDropDown";
import FieldText from "./FieldText";

class FormOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { saveEnabled: false };
  }
  componentDidMount() {
    this.state = { data: this.props.data };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ tab: nextProps.selection });
  }

  getValue = z => {
    console.log("getValue z " + JSON.stringify(z));
    let field = R.prop("name", z);
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
  render() {
    const { fields, data } = this.props;
    return (
      <Paper zDepth={2}>
        <div>
          {fields &&
            fields.map(
              (x, i) =>
                x.uiType ? (
                  data.status && (
                    <FieldDropDown
                      options={this.props.statuses}
                      status={data.status}
                      //data={ }
                      onselect={value => this.childChange(value, "status")}
                    />
                  )
                ) : (
                  <FieldText
                    obj={x}
                    data={this.getValue(x)}
                    change={this.childChange}
                    type={x.type}
                  />
                )
            )}
        </div>
      </Paper>
    );
  }
}

export default FormOrder;
