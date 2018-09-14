import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import Form from "./Form";
import { pageJSON } from "./data";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* ROLES == 'adminSubmitter" || "submitter"'*/
      json: pageJSON
    };
  }
  filterPageJSON(json, locations) {
    console.log("FC filterPageJSON ");
    console.log(JSON.stringify(json));
    console.table(locations);
    /*   ,R.map(x=>R.prop('name',x.location ) ,  locations)*/

    /* temporary */
    return json;
  }
  render() {
    return (
      <div>
        {this.props.locations ? (
          <Form
            pageJSON={this.filterPageJSON(pageJSON, this.props.locations)}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  locations: state.notifications.user
    ? state.notifications.user.locations
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  /* NONE */
});

const FormContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  FormContainer
);

export default FormContainer2;
