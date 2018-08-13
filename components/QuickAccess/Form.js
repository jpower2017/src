import React, { Component } from "react";
import * as R from "ramda";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import WidgetBase from "../WidgetBase";
import List from "./List/List";

const company = [{ name: "BSCC staff contacts list", link: "" }];
const employee = [
  {
    name: "Payroll/HR website -- TriNet",
    link: "https://trinet.hrpassport.com/"
  },
  {
    name: "PTO request for time-off form",
    link: "https://bluespruce.box.com/s/hfg8o65tnmg8o8hhs08hjjousfcvqm3e"
  },
  {
    name: "Out-of-office process",
    link: "https://bluespruce.box.com/s/etyja4gc22murakqbl7u63q2jge2x6rr"
  }
];
const financial = [
  {
    name: "BSCC expense-report form",
    link: "https://bluespruce.box.com/s/jqm3dx51otuukz1zx1tsbqt0bu8rizg8"
  },
  {
    name: "ExpressToll request/update form",
    link: "https://bluespruce.box.com/s/c0sw7osdsbyutkzffw15nypiamrhpqcb"
  },
  {
    name: "Direct deposit for expense-reimbursement form",
    link: "https://bluespruce.box.com/s/c0sw7osdsbyutkzffw15nypiamrhpqcb"
  },
  {
    name: "Fitness reimbursement",
    link: "https://bluespruce.box.com/s/2f7x9rf8gjr3f4s142iessk7eolvqona"
  }
];
const operations = [
  {
    name: "Request a contractor sign a confidentiality agreement",
    link: "https://bluespruce.box.com/s/c9e1r8f3q4cvs7q2eday55qlfaxzyq0s"
  }
];

const pageJSON = [
  { title: "Company", list: company },
  { title: "Employee", list: employee },
  { title: "Financial", list: financial },
  { title: "Operations", list: operations }
];

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    window.addEventListener("resize", () =>
      this.setState({ width: Math.max(355, window.innerWidth - 280) })
    );
  }
  componentWillUnmount() {
    window.addEventListener("resize", () =>
      this.setState({ width: Math.max(355, window.innerWidth - 280) })
    );
  }
  /*
<div style={{ fontSize: "large", color: "#23A596" }}>TEST</div>
*/
  render() {
    return (
      <WidgetBase title={"Quick Access"}>
        <div
          style={{
            padding: "21px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          {pageJSON.map(x => (
            <div style={{ margin: "10px" }}>
              <List title={x.title} data={x.list} />
            </div>
          ))}
        </div>
      </WidgetBase>
    );
  }
}
