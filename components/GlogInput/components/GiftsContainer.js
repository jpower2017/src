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

        {this.props.data ? (
          <GiftsForm
            requests={this.props.requests}
            onNew={() => this.props.onNew(this.props.node)}
            onType={this.props.onType}
            bubbleUp={this.props.addSearch2}
            requestID={this.props.requestID}
            action={this.props.action}
          />
        ) : (
          <div>No data</div>
        )}
      </div>
    );
  }
}
const getLocations = (obj, locations) => {
  let r, personLocations;
  const recipInLoc = (recip, loc) => {
    return !!R.find(x => R.contains(x.id, recip), loc.person);
  };
  r = R.map(x => x.id, R.path(["recipients"], obj));
  return R.filter(x => recipInLoc(r, x), locations);
};
const getGiftRequestID = arrRequest => {
  if (!arrRequest) {
    return;
  }
  return arrRequest[0] ? arrRequest[0].id : null;
};
const mapStateToProps = (state, ownProps) => ({
  requests: state.glogInput.requests ? state.glogInput.requests : null,
  data: state.glogInput[state.glogInput.node][state.glogInput.selectedRow - 1]
    ? state.glogInput[state.glogInput.node][state.glogInput.selectedRow - 1]
    : state.glogInput[state.glogInput.node][0],
  node: state.glogInput.node ? state.glogInput.node : null,

  searchID: state.glogInput.searchID ? state.glogInput.searchID : null,
  requestID: state.glogInput.searchID
    ? getGiftRequestID(
        R.prop(
          ["requests"],
          R.find(x => x.id == state.glogInput.searchID, state.glogInput.gifts)
        )
      )
    : null,
  action: state.glogInput.action ? state.glogInput.action : "create"
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
