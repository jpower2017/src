import React, { Component } from "react";
import TextField from "material-ui/TextField";

class FieldText extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }
  handleChange = event => {
    this.setState({
      value: event.target.value
    });
    this.props.ontext(event.target.value);
  };
  render() {
    const { obj } = this.props;
    return (
      <div style={{ padding: "2px" }}>
        <TextField
          value={this.state.value}
          hintText={
            this.props.hintText ? this.props.hintText : "Search people here"
          }
          floatingLabelText={obj ? obj.title : null}
          fullWidth={false}
          multiLine={false}
          onChange={this.handleChange}
          name={obj ? obj.name : null}
          style={{ width: "600px", fontSize: "20px", backgroundColor: "#eee" }}
          underlineShow={true}
          //underlineFocusStyle={{ borderColor: "#f58c32" }}
        />
      </div>
    );
  }
}

export default FieldText;
