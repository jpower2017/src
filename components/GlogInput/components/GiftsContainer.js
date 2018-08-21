import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { setNode, addSearch, addSearch2, addNew, onTypeGift } from "../actions";
import GiftsForm from "./GiftsForm";
import { getGiftRequestGift } from "../reducers/index.js";

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
<<<<<<< HEAD
=======
            giftRequestGift={this.props.giftRequestGift}
>>>>>>> b0e0b1bb13f799c25bcb8ba95d65f0766c1198b6
          />
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}

/*

 
 state.glogInput.gifts[state.glogInput.searchID].request[0]
 
*/
const test = (giftObj, requestsNode) => {
  //const a = R.map(x => x.id, R.path(["recipients"], obj));
  console.log("GC test    ");

  if (giftObj == null) {
    return;
  }
  if (giftObj["requests"].length) {
    console.log("giftObj.requests true");
    const requestID = R.prop("id", giftObj.requests[0]);
    console.log("requestID " + requestID);
    return R.prop(
      "requestGifts",
      R.find(x => x.id === requestID, requestsNode)
    );
  }
};
const mapStateToProps = (state, ownProps) => ({
  requests: state.glogInput.requests ? state.glogInput.requests : null,
  node: state.glogInput.node ? state.glogInput.node : null,
  searchID: state.glogInput.searchID ? state.glogInput.searchID : null,
  action: state.glogInput.action ? state.glogInput.action : null,
  giftRequestGift:
    state.glogInput.searchID !== 0.1
      ? test(
          R.find(x => x.id == state.glogInput.searchID, state.glogInput.gifts),
          state.glogInput.requests
        )
      : { giftYear: "2020" }
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
