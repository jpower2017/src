import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import uuidv4 from "uuid/v4";
import {
  setNode,
  rowSubmit,
  addGiftInstance,
  updateGiftInstance,
  ondelete,
  loadData,
  getData,
  setSearchID,
  setRequestID,
  setAction
} from "../actions";
import Summary from "./Summary";
import { events, registryStatuses } from "../common/data";

const t = "test";

const addEventDayAndMonth = val => {
  console.log("addEventDayandMonth");
  console.log(val);
  if (val.date && val.date.length) {
    let eventMonth = val.date[0].split("/")[0];
    eventMonth = eventMonth.length == 2 ? eventMonth : `0${eventMonth}`;
    let eventDay = val.date[0].split("/")[1];
    eventDay = eventDay.length == 2 ? eventDay : `0${eventDay}`;
    let eventYear = val.date[0].split("/")[2];
    eventYear = eventYear.length == 2 ? eventYear : `0${eventYear}`;
    console.log("addEventDayAndMonth f");
    console.log({
      ...val,
      eventMonth: eventMonth,
      eventDay: eventDay,
      eventYear: eventYear
    });
    return {
      ...val,
      eventMonth: eventMonth,
      eventDay: eventDay,
      eventYear: eventYear
    };
  } else {
    console.log("addEventDayAndMonth ELSE");
    return val;
  }
};

class SummaryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.loadData();
  }
  /*For event dropdown */
  mergeObj(value) {
    console.log("mergeObj f " + value);
    console.log(
      JSON.stringify({
        ...this.props.giftEventInstance,
        event: [events[value].title]
      })
    );
    const newObj = {
      ...this.props.giftEventInstance,
      event: [events[value].title]
    };
    this.props.onEvt(newObj);
  }

  updateToggle(gei) {
    console.log("updatetoggle gei: " + JSON.stringify(gei));
    let recurring = R.prop("recurring", gei)[0];
    console.log("recurring " + recurring);
    recurring = recurring ? [0] : [1];
    console.log("newRecurring " + recurring);
    const newObj = {
      ...gei,
      recurring: recurring
    };
    this.props.onEvt(newObj);
  }

  evt(value) {
    const newObj = {
      ...this.props.giftEventInstance,
      event: [value]
    };
    this.props.onEvt(newObj);
  }
  registry(value) {
    console.log(
      JSON.stringify({
        ...this.props.giftEventInstance,
        registry: [value]
      })
    );
    const newObj = {
      ...this.props.giftEventInstance,
      registry: [value]
    };
    this.props.onEvt(newObj);
  }
  textchange(value, name) {
    console.log("textchange name: " + [value, name]);

    const newObj = {
      ...this.props.giftEventInstance,
      [name]: [value]
    };
    this.props.onEvt(newObj);
  }
  onclick(id) {
    console.log("SC onclick id: " + id);

    console.table(this.props.giftEventInstance);
    const gei = this.props.giftEventInstance;
    const children = [...gei.recipients, ...gei.requests, ...gei.giftHistory];
    console.log(JSON.stringify(children));

    let t = R.find(x => x.id == id, children);
    let node = R.prop("type", t);
    console.log("type/node " + node);
    console.table(t);
    this.props.onSearchRow(id);
    //this.props.setNode(node !== "people" ? `${node}s` : node);

    this.props.setNode(node === "gift" ? `${node}s` : node);
    if (node == "requests") {
      this.props.setRequestID(id);
    }
    this.props.setAction("edit");
    this.props.onclick();
  }
  onAdd(node) {
    this.props.setNode(node);
    this.props.onSearchRow(0.1);
    this.props.setAction("create");
    this.props.onclick();
  }
  render() {
    const { giftEventInstance } = this.props;
    return (
      <div>
        {this.props.dataPeople ? (
          <Summary
            dataPeople={[
              ...this.props.dataPeople,
              ...this.props.dataOrgs,
              ...this.props.dataAnimals,
              ...this.props.dataGroups
            ]}
            dataRequests={this.props.dataRequests}
            giftHistory={this.props.giftHistory}
            evt={this.props.evt}
            gei={this.props.giftEventInstance}
            onEvt={value => this.evt(value)}
            onRegistry={value => this.registry(value)}
            onTextChange={(value, name) => this.textchange(value, name)}
            onclick={value => this.onclick(value)}
            onNew={() => this.props.onselected(uuidv4())}
            onclick2={this.props.setNode}
            onDialog={this.props.onDialog}
            ontoggle={x => this.updateToggle(giftEventInstance)}
            ondelete={this.props.ondelete}
            onAdd={value => this.onAdd(value)}
            //setRequestID={value => this.props.setRequestID(value)}
            //onNew={() => console.log("container on new")}
          />
        ) : null}
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
const convertGifts = (obj, gifts) => {
  const a = R.map(x => x.id, R.path(["giftHistory"], obj));
  return R.filter(x => R.contains(x.id, a), gifts);
};
const convertRequests = (obj, requests) => {
  const a = R.map(x => x.id, R.path(["requests"], obj));
  console.log("convertRequests a " + JSON.stringify(a));
  return R.filter(x => R.contains(x.id, a), requests);
};
const getLocations = (obj, locations) => {
  let r, personLocations;
  const recipInLoc = (recip, loc) => {
    return !!R.find(x => R.contains(x.id, recip), loc.person);
  };
  r = R.map(x => x.id, R.path(["recipients"], obj));

  return R.filter(x => recipInLoc(r, x), locations);
};

const mapStateToProps = (state, ownProps) => ({
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
    ? convertAnimals(
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
  dataRequests: state.glogInput.selectedRow
    ? convertRequests(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.requests
      )
    : null,
  giftHistory: state.glogInput.selectedRow
    ? convertGifts(
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        ),
        state.glogInput.gifts
      )
    : null,
  evt: state.glogInput.selectedRow
    ? R.prop(
        "event",
        R.find(
          x => x.id == state.glogInput.selectedRow,
          state.glogInput.giftEventInstances
        )
      )
    : null,
  instancesLength: state.glogInput.giftEventInstance
    ? state.glogInput.giftEventInstances.length
    : 0,
  giftEventInstance: state.glogInput.selectedRow
    ? R.find(
        x => x.id === state.glogInput.selectedRow,
        state.glogInput.giftEventInstances
      )
    : null
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSearchRow: id => {
    dispatch(setSearchID(id));
  },
  loadData: () => {
    dispatch(loadData());
    dispatch(getData());
  },
  setNode: x => {
    console.log("SC setNode x: " + x);
    dispatch(setNode(x));
  },
  onselected: (id, obj) => {
    //dispatch(rowSubmit(id, obj));
    dispatch(addGiftInstance(id));
  },
  onEvt: val => {
    console.log("onEvt val: " + JSON.stringify(val));

    dispatch(updateGiftInstance(addEventDayAndMonth(val)));
  },
  ondelete: val => {
    dispatch(ondelete(val));
  },
  setRequestID: x => {
    dispatch(setRequestID(x));
  },
  setAction: x => {
    dispatch(setAction(x));
  }
});

const SummaryContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  SummaryContainer
);

export default SummaryContainer2;
