import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { setNode, GEI_add_recip, setSearchID, searchNode } from "../actions";
import RecipientsForm from "./RecipientsForm";

class RecipientsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log("RecipientsContainer CDM");
  }
  onSelect(node) {
    this.props.setNode(node);
    //this.props.setSearchID(0.1);
  }
  render() {
    return (
      <div>
        <div>PARTIES</div>
        <RecipientsForm
          onselect={node => this.onSelect(node)}
          onSearchText={this.props.onSearchNode}
          //  onHandle={this.props.GEI_add_recip}
          node={this.props.node}
          bubbleUp={this.props.GEI_add_recip}
          action={this.props.action}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  node: state.glogInput.node ? state.glogInput.node : null,
  action: state.glogInput.action ? state.glogInput.action : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setNode: x => {
    console.log("RC setNode");
    dispatch(setNode(x));
  },
  GEI_add_recip: () => {
    dispatch(GEI_add_recip());
  },
  setSearchID: x => {
    dispatch(setSearchID(x));
  },
  onSearchNode: str => {
    dispatch(searchNode(str));
  }
});

const RecipientsContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  RecipientsContainer
);

export default RecipientsContainer2;
