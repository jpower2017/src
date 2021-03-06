import React, { Component } from "react";
import * as R from "ramda";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

export default class FieldDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { options: this.props.options, status: 0 };
  }
  handleChange = (event, index, value) => {
    console.log("HandlechangeDD  value: " + value);
    this.setState({ status: value });
  };
  showItems = () => {
    if (!this.state.options) {
      return;
    }
    return R.map(
      x => <MenuItem value={x.value} primaryText={x.title} />,
      this.state.options
    );
  };
  render() {
    const { obj } = this.props;
    return (
      <div>
        <DropDownMenu
          value={this.state.status}
          onChange={this.handleChange}
          style={{
            padding: "0px",
            margin: "0px",
            fontSize: "large",
            left: "-20px"
          }}
        >
          {this.showItems()}
        </DropDownMenu>
      </div>
    );
  }
}
