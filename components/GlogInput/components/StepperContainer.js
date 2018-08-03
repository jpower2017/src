import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { findAndProp } from "../utils/utils";
import {
  setNode,
  tabSelection,
  rowSubmit,
  addGiftInstance,
  updateGiftInstance
} from "../actions";
import Stepper from "./Stepper";

const t = "test";
class StepperContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Stepper
          vendors={this.props.vendors}
          delivery={this.props.delivery}
          order={this.props.order}
        />
      </div>
    );
  }
}
/*
.filter(
  x =>
    x.id == findAndProp(state.data.selectedRow, "delivery",state.glogInput.gifts),
 state.glogInput.dataDeliveries
)
*/
const getLookup = (vdo, data, row, data2) => {
  const lookup = findAndProp(row, vdo, data);
  return R.find(x => x.id === lookup, data2)
    ? R.find(x => x.id === lookup, data2)
    : vdo[0];
};

const mapStateToProps = (state, ownProps) => ({
  vendors: getLookup(
    "vendor",
   state.glogInput.gifts,
   state.glogInput.searchID,
   state.glogInput.vendors
  ),
  delivery: getLookup(
    "delivery",
   state.glogInput.gifts,
   state.glogInput.searchID,
   state.glogInput.deliveries
  ),
  order: getLookup(
    "order",
   state.glogInput.gifts,
   state.glogInput.searchID,
   state.glogInput.orders
  )
});
const mapDispatchToProps = (dispatch, ownProps) => ({});

const StepperContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  StepperContainer
);

export default StepperContainer2;
