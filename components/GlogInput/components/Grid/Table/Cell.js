import React, { Component } from "react";
import * as R from "ramda";

class Cell extends Component {
  displayCell = arr => {
    return arr.map((x, i) => {
      return (
        <div
          key={i}
          style={{
            display: "flex"
          }}
        >
          <ul>{x}</ul>
        </div>
      );
    });
  };
  render() {
    const { type, data } = this.props;
    return (
      <div style={{ width: "20%", marginLeft: "0px", padding: "0px 2px" }}>
        {this.displayCell(data)}
      </div>
    );
  }
}

export default Cell;
