import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import {
  updateForm,
  addSearch,
  addSearch2,
  addNew,
  updateSecondary
} from "../actions";
import Form from "./Form";
import { appLogic } from "../common/data";

class FormContainer extends Component {
  componentDidMount() {}
  getFields = tab => {
    console.table(R.find(x => x.tab === tab, appLogic));
    console.log(R.prop("fields", R.find(x => x.tab === tab, appLogic)));
    let str = R.prop("fields", R.find(x => x.tab === tab, appLogic));
    return str;
  };

  render() {
    return (
      <div>
        <Form
          fields={this.getFields("vendor")}
          data={this.props.data}
          onSave={this.props.onSave}
          //  onHandle={this.props.addSearch}
          //  onHandle2={this.props.addSearch2}

          //  title={this.props.title}
          //onNew={() => this.props.onNew(this.props.node)}
        />
      </div>
    );
  }
}

const getVendor = (gifts, searchID, vendors) => {
  console.log("getOrder");
  const gift = R.find(x => x.id === searchID, gifts);
  const vendorID = R.prop("vendor", gift);

  console.table(R.find(x => x.id === vendorID, vendors));
  return R.find(x => x.id === vendorID, vendors);
};
const mapStateToProps = (state, ownProps) => ({
  data: state.glogInput.searchID
    ? getVendor(
        state.glogInput.gifts,
        state.glogInput.searchID,
        state.glogInput.vendors
      )
    : null

  //title: this.props.data ? "Data for item selected" : "Select item"
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: obj => {
    dispatch(updateSecondary(obj, "vendors"));
  }
  /*
  addSearch: () => {
    dispatch(addSearch());
  },
  addSearch2: () => {
    dispatch(addSearch2());
  },
  onNew: () => {
    dispatch(addNew());
  }
  */
});

const FormContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  FormContainer
);

export default FormContainer2;
