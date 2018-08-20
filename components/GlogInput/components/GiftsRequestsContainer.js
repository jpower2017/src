import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { addNew, onTypeGift, setSearchID, updateSecondary } from "../actions";
import Parties from "./Parties";
import ListSingleLevel from "./ListSingleLevel/ListSingleLevel";

class GiftsRequestsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onselect = id => {
    console.log("return from GiftsPartiesContainer");
    return;
    this.props.bubbleSelect();
    this.props.onselected(id);
  };
  /*
  parse1 = (people, orgs, animals, selectedGroups, allGroups) => {
    console.log("parse parties container");
    let temp = [...people, ...orgs, ...animals, ...selectedGroups];
    let children = R.flatten(R.map(x => x.children, selectedGroups));
    temp = [...temp, ...children];
    console.table(temp);
    return temp;
  };
  */
  parse = (people, orgs, animals, selectedGroups, allGroups) => {
    console.log("parse parties container");
    let rows = [...people, ...orgs, ...animals, ...selectedGroups];
    const addRowAndChild = row => {
      rows = [...rows, { ...row.children[0], level: 1 }];
    };
    R.map(x => (x.children ? addRowAndChild(x) : x), rows);
    //  console.table(rows);
    return rows;
  };
  onSelectRequest = (x, obj) => {
    console.log("onSelectRequest x,obj " + [x, JSON.stringify(obj)]);
    console.log(
      "giftRequestGiftPayload " +
        JSON.stringify(this.props.giftRequestGiftPayload)
    );
    let newRecips;
    const tempRequest = this.props.request;
    const add = () => {
      console.log("add");
      const objRequest = R.pick(["id", "name"], obj);
      newRecips = [...tempRequest.requests, objRequest];
    };
    const remove = () => {
      console.log("remove");
      newRecips = R.filter(y => y.id != x, tempRequest.requests);
    };
    R.contains(x, R.map(x => x.id, tempRequest.requests)) ? remove() : add();
    //  console.log(R.contains(x, R.map(x => x.id, tempRequest.recipients)));

    tempRequest.requests = newRecips;
    this.props.updateSecondary(
      tempRequest,
      "gifts",
      x,
      this.props.giftRequestGiftPayload
    );
  };
  render() {
    return (
      <div>
        {this.props.dataPeople ? (
          <ListSingleLevel
            data={this.props.requests}
            title={this.props.title}
            onselect={(x, obj) => this.onSelectRequest(x, obj)}
            groups={this.props.allGroups}
            multiSelect={true}
            request={this.props.request}
            field={"requests"}
          />
        ) : (
          <div>no requests yet</div>
        )}
      </div>
    );
  }
}

const convertRecipients = (obj, people) => {
  const a = R.map(x => x.id, R.path(["recipients"], obj));
  return R.filter(x => R.contains(x.id, a), people);
};
const convertOrgs = (obj, orgs) => {
  const a = R.map(x => x.id, R.path(["recipients"], obj));
  return R.filter(x => R.contains(x.id, a), orgs);
};
const convertAnimals = (obj, animals) => {
  const a = R.map(x => x.id, R.path(["recipients"], obj));
  return R.filter(x => R.contains(x.id, a), animals);
};
const convertGroups = (obj, groups) => {
  const a = R.map(x => x.id, R.path(["recipients"], obj));
  return R.filter(x => R.contains(x.id, a), groups);
};
const getGiftRequestID = arrRequest => {
  return arrRequest[0].id;
};
const convertRequests = (obj, requests) => {
  const a = R.map(x => x.id, R.path(["requests"], obj));
  return R.filter(x => R.contains(x.id, a), requests);
};
const mapStateToProps = (state, ownProps) => ({
  selection: state.glogInput.searchID ? state.glogInput.searchID : null,
  data: state.glogInput.selectedRow
    ? state.glogInput[state.glogInput.node]
    : state.glogInput[state.glogInput.node][0],

  node: state.glogInput.node ? state.glogInput.node : null,
  //  showSubSelect:state.glogInput.node === "people"
  showSubSelect: R.contains(state.glogInput.node, [
    "people",
    "orgs",
    "animals"
  ]),
  dataPeople: state.glogInput.selectedRow
    ? convertRecipients(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.people
      )
    : null,
  dataOrgs: state.glogInput.selectedRow
    ? convertOrgs(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.orgs
      )
    : null,
  dataAnimals: state.glogInput.selectedRow
    ? convertOrgs(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.animals
      )
    : null,
  dataGroups: state.glogInput.selectedRow
    ? convertGroups(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.groups
      )
    : null,
  allGroups: state.glogInput.selectedRow ? state.glogInput.groups : null,
  request1: state.glogInput.requestID
    ? R.find(x => x.id === state.glogInput.requestID, state.glogInput.requests)
    : null,
  request: state.glogInput.searchID
    ? R.find(x => x.id == state.glogInput.searchID, state.glogInput.gifts)
    : null,
  requests: state.glogInput.selectedRow
    ? convertRequests(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.requests
      )
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSecondary: (payload, node, assocID, giftRequestGiftPayload) => {
    dispatch(updateSecondary(payload, node, assocID, giftRequestGiftPayload));
  },
  onNew: payload => {
    dispatch(addNew(payload));
  },
  onType: (payload, giftID) => {
    dispatch(onTypeGift(payload, giftID));
  }
  /*
  onselected: id => {
    dispatch(setSearchID(id));
    //  dispatch(setSelectedRow(id));
  },*/
});

const GiftsRequestsContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  GiftsRequestsContainer
);

export default GiftsRequestsContainer2;
