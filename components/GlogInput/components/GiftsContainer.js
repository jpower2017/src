import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { setNode, addSearch, addSearch2, addNew, onTypeGift } from "../actions";
import GiftsForm from "./GiftsForm";

class GiftsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>GIFT HISTORY</div>
        {this.props.requests ? (
          <GiftsForm
            requests={this.props.requests}
            onNew={() => this.props.onNew(this.props.node)}
            onType={this.props.onType}
            bubbleUp={this.props.addSearch2}
            action={this.props.action}
            searchID={this.props.searchID}
            data={{ status: null }}
          />
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  requests: state.glogInput.requests ? state.glogInput.requests : null,
  node: state.glogInput.node ? state.glogInput.node : null,
  searchID: state.glogInput.searchID ? state.glogInput.searchID : null,
  action: state.glogInput.action ? state.glogInput.action : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setNode: x => {
    dispatch(setNode(x));
  },
  addSearch: () => {
    dispatch(addSearch());
  },
  onNew: () => {
    dispatch(addNew());
  },
  onType: payload => {
    dispatch(onTypeGift(payload));
  },
  addSearch2: () => {
    dispatch(addSearch2());
  }
});

const GiftsContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  GiftsContainer
);

export default GiftsContainer2;
