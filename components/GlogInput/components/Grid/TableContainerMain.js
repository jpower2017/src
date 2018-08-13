import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { rowSubmit, setView, setSelectedRow } from "../../actions";

import Table from "./Table/Table";
import { columnsGiftEventInstance, events } from "../../common/data";

/* could R.pick row obj keys from here instand of RowMain */

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      col: null,
      ascend: null,
      page: 0,
      perPage: 3,
      totalRows: null,
      bPaginated: true,
      people: this.props.people,
      gifts: this.props.gifts
    };
  }
  componentDidMount() {
    console.log("TableContainerMain CDM");
    this.props.getDataForComp();
  }
  componentWillRecieveProps(nextProps) {
    console.log("TC CWRP nextProps.rows " + nextProps.rows);
  }
  sortColumns = columns => {
    return R.sort(R.ascend(R.prop("order")), columns);
  };
  removeSubmitColumn = columns => {
    return R.filter(x => x.name !== "override", columns);
  };
  byDate = (a, b) => {
    const c = new Date(a.date);
    const d = new Date(b.date);
    return this.state.ascend ? c - d : d - c;
  };
  onSort = (col, ascend) => {
    this.setState({ col: col, ascend: ascend });
    this.tcSort(this.props.rows);
  };
  tcSort = rows => {
    let col = this.state.col;
    /* hack column as name = firstName +lastName */
    col = "id";
    let ascend = this.state.ascend;
    let newRows, byStatus;
    if (col == "date") {
      newRows = R.sort(this.byDate, rows);
    } else {
      byStatus = ascend ? R.descend(R.prop(col)) : R.ascend(R.prop(col));
      newRows = R.sort(byStatus, rows);
    }
    return newRows;
  };
  paginated = i => {
    console.log("TC paginated");
    const newRow = (this.state.page + i) * this.state.perPage;
    const page = this.state.page + i;
    const start = 0;
    const end = start + this.state.perPage;

    let id = R.prop("id", this.props.rows[newRow]);
    let a = R.map(
      x => (x.id !== id ? { ...x, selected: false } : x),
      this.props.rows
    );
    let b = R.map(x => (x.id === id ? { ...x, selected: true } : x), a);
    let c = R.find(x => x.id === id, b);
    this.setState({
      page: page
      //showRows: R.slice(0, this.state.perPage, this.state.rows)
    });
    this.onSelected(id, this.props.rows[newRow]);
  };
  /* UPDATING FOR PREVIOUS PERSON SELECT AS WELL CURRENT SELECTION */
  /* NOT ACCOUNTING FOR MULTI-SELECT */
  onSelected = (id, item, edit) => {
    console.log("TC onSelected " + id, JSON.stringify(item));
    this.props.onselected(id, item);
    edit && this.props.setView("details");
  };
  onSelected2 = (id, item) => {
    console.log("TC onSelected2 " + id, JSON.stringify(item));
    this.props.onselected(id, item);
  };
  paginateRows = rows => {
    const start = this.state.perPage * this.state.page;
    return R.slice(start, start + this.state.perPage, rows);
  };
  getColumns = node => {
    return columnsGiftEventInstance;
  };

  render() {
    console.log("TC render f");
    return (
      <div>
        {this.props.rows ? (
          <Table
            columns={
              !this.props.submittable
                ? R.compose(this.sortColumns, this.removeSubmitColumn)(
                    this.getColumns(this.props.node)
                  )
                : this.sortColumns(this.getColumns(this.props.node))
            }
            rows={
              this.state.bPaginated
                ? this.paginateRows(this.tcSort(this.props.rows))
                : this.tcSort(this.props.rows)
            }
            rollOverColor="#9ccc65"
            stripeRows={true}
            stripeRowsColor="#A4AECB"
            sortable={true}
            selectable={true}
            multiselect={false}
            selectColor="#f58c32"
            paginated={this.state.bPaginated}
            onPaginated={this.paginated}
            page={this.state.page}
            perPage={this.state.perPage}
            onselected={this.onSelected}
            onselected2={this.onSelected2}
            submittable={this.props.submittable}
            onSort={this.onSort}
            totalRows={this.props.totalRows}
            onUpdate={this.props.onUpdate}
            rowType="RowMain"
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
const filteredStatuses = (status, gifts) => {
  const byDate = (a, b) => {
    const c = new Date(a.date);
    const d = new Date(b.date);
    return d - c;
  };
  //console.table(R.filter(x => x.status === "preapproved", gifts));
  let tableAction;
  if (R.contains("preapproved", status)) {
    return R.filter(x => x.statusGroup === "preapproved", gifts);
  } else if (R.contains("approved", status)) {
    return R.filter(x => x.statusGroup === "approved", gifts);
  } else if (R.contains("activity", status)) {
    return R.sort(byDate, gifts);
  } else if (R.contains("date", status)) {
    return R.sort(byDate, gifts);
  }
};

const convertRecipients = (obj, people, orgs, groups, animals) => {
  const recipients = obj.recipients;
  console.table(obj.recipients);
  const getFirstName = a =>
    R.prop("firstName", R.find(x => x.id == a.id, people));
  const getLastName = a =>
    R.prop("lastName", R.find(x => x.id == a.id, people));
  const getName = id => {
    return getFirstName(id) + " " + getLastName(id);
  };
  const getOrg = a => {
    return R.prop("name", R.find(x => x.id == a.id, orgs));
  };
  const getGroup = a => {
    console.table(R.prop("name", R.find(x => x.id == a.id, groups)));
    return R.prop("name", R.find(x => x.id == a.id, groups));
  };
  const getAnimal = a => {
    console.table(R.prop("name", R.find(x => x.id == a.id, animals)));
    return R.prop("name", R.find(x => x.id == a.id, animals));
  };

  const getPartyName = x => {
    switch (x.type) {
      case "people":
        console.log("switch x.type " + x.type);
        return getName(x);
        break;
      case "orgs":
        console.log("switch x.type " + x.type);
        return getOrg(x);
        break;
      case "groups":
        console.log("switch x.type " + x.type);
        return getGroup(x);
        break;
      case "animals":
        console.log("switch x.type " + x.type);
        return getAnimal(x);
        break;
      default:
        console.log("NO SWITCH CASE");
    }
  };

  return {
    ...obj,
    recipients: R.map(x => getPartyName(x), recipients)
  };
};

const getGiftCount = obj => {
  console.log("getLoctionCOunt");
  console.log(JSON.stringify({ ...obj, giftHistory: obj.giftHistory.length }));
  return { ...obj, giftHistory: [obj.giftHistory.length] };
};
const getEventName = obj => {
  const title = R.prop("title", R.find(x => x.value === obj.event[0], events));
  return {
    ...obj,
    event: [title]
  };
};
const clean = (instances, people, orgs, groups, animals, mainFilter) => {
  console.log("TCM clean f");
  console.log("instances");
  console.table(instances);
  console.log("people");
  console.table(people);
  console.log("orgs");
  console.log(orgs);
  const giftInstances = R.map(R.compose(getEventName, getGiftCount), instances);
  const wholeList = R.map(
    x => convertRecipients(x, people, orgs, groups, animals),
    giftInstances
  );
  console.table(
    R.map(
      x => convertRecipients(x, people, orgs, groups, animals),
      giftInstances
    )
  );
  const filterList = (mainFilter, wholeList) => {
    return !mainFilter
      ? wholeList
      : R.filter(x => x.eventMonth === mainFilter, wholeList);
  };

  return filterList(mainFilter, wholeList);
};
const mapStateToProps = (state, ownProps) => ({
  node: state.glogInput.node ? state.glogInput.node : null,
  people: state.glogInput.people ? state.glogInput.people : null,
  groups: state.glogInput.groups ? state.glogInput.groups : null,
  animals: state.glogInput.animals ? state.glogInput.animals : null,
  orgs: state.glogInput.orgs ? state.glogInput.orgs : null,
  gifts: state.glogInput.gifts ? state.glogInput.gifts : null,
  rows: state.glogInput.node
    ? clean(
        state.glogInput.giftEventInstances,
        state.glogInput.people,
        state.glogInput.orgs,
        state.glogInput.groups,
        state.glogInput.animals,
        state.glogInput.mainFilter
      )
    : null,
  totalRows: state.glogInput.giftEventInstances
    ? state.glogInput.giftEventInstances.length
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getDataForComp: x => {
    //dispatch(getData());
  },
  onselected: (id, obj) => {
    dispatch(rowSubmit(id, obj));
    dispatch(setSelectedRow(id));
  },
  setView: x => {
    dispatch(setView(x));
  },
  onUpdate: (id, obj) => {
    //  dispatch(updateRow(obj));
  }
});

const TableContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  TableContainer
);

export default TableContainer2;
