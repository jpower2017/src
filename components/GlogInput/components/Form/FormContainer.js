import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { updateForm, addSearch, addSearch2, addNew } from "../../actions";
import Form from "./Form";
import { appLogic } from "../../common/data";

class FormContainer extends Component {
  componentDidMount() {}
  getFields = tab => {
    console.table(R.find(x => x.tab === tab, appLogic));
    console.log(R.prop("fields", R.find(x => x.tab === tab, appLogic)));
    let str = R.prop("fields", R.find(x => x.tab === tab, appLogic));
    return str;
  };
  getData = tab => {
    console.log("getData tab: " + tab);
    console.table(R.find(x => x.tab === tab, appLogic));
    console.log(R.prop("data", R.find(x => x.tab === tab, appLogic)));
    let str = R.prop("data", R.find(x => x.tab === tab, appLogic));
    return str;
  };
  getNext = (obj, selection) => {
    console.log("getnext f selection: " + selection);
    console.table(obj);
    console.log(R.prop("order", R.find(x => x.tab == selection, obj)));
    const ord = R.prop("order", R.find(x => x.tab == selection, obj));
    console.log(
      "getnext f " + R.prop("tab", R.find(x => x.order == ord + 1, appLogic))
    );
    return R.prop("tab", R.find(x => x.order == ord + 1, appLogic));
  };
  onNew = () => {
    this.props.onNew();
    this.props.bubbleNew();
  };
  render() {
    return (
      <div>
        {this.props.node ? (
          <Form
            fields={this.getFields(this.props.node)}
            data={this.props.data}
            onSave={this.props.onSave}
            onHandle={this.props.addSearch}
            //onHandle2={this.props.addSearch2}
            onHandle2={this.props.bubbleUp}
            node={this.props.node}
            onNew={this.onNew}
            showNew={this.props.showNew}
          />
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: R.find(
    x => x.id === state.glogInput.searchID,
    state.glogInput[state.glogInput.node]
  )
    ? R.find(
        x => x.id === state.glogInput.searchID,
        state.glogInput[state.glogInput.node]
      )
    : null,

  node: state.glogInput.node ? state.glogInput.node : null,
  showNew: state.glogInput.searchID === 0.1
  //title: this.props.data ? "Data for item selected" : "Select item"
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: obj => {
    dispatch(updateForm(obj));
  },
  addSearch: () => {
    dispatch(addSearch());
  },
  addSearch2: () => {
    dispatch(addSearch2());
  },
  onNew: () => {
    console.log("calling addNew via FormContainer");
    dispatch(addNew());
  }
});

const FormContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  FormContainer
);

export default FormContainer2;
