import React, { Component } from "react";
import "../App.css";
//import Left from "material-ui/svg-icons/navigation/chevron-left";
//import SubdirectoryArrowLeft from "material-ui/svg-icons/navigation/subdirectory-arrow-left";
//import { white } from "material-ui/styles/colors";
import Arrowback from "material-ui/svg-icons/navigation/arrow-back";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //one: true,
    };
  }
  showNodeIcon(item) {
    return !item.leaf ? (
      <span>
        <Arrowback style={{ color: "white" }} />
      </span>
    ) : null;
  }
  onclick = () => {
    if (!this.props.currentSelection || !this.props.leaf) {
      console.log("bubble up if not currentSelection");
      this.props.onclick(this.props.item);
    } else {
      console.log("NOT bubble up because currentSelection");
    }
  };

  render() {
    return (
      <div
        className={this.props.styl}
        onClick={this.onclick}
        style={{
          lineHeight: "14px",
          margin: "1px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginLeft: "10px",
          cursor: "pointer"
          //backgroundColor: "#333"
        }}
      >
        {this.props.currentParent || this.props.currentSelection
          ? this.showNodeIcon(this.props.item)
          : null}
        {this.props.currentSelection ? (
          <div
            style={{
              fontStyle: "italic",
              fontSize: "110%"
            }}
          >
            {`${this.props.item.name}`}
          </div>
        ) : (
          <div style={{ alignSelf: "center" }}>{`${this.props.item.name}`}</div>
        )}
      </div>
    );
  }
}

export default Item;
