import R from "ramda";
import moment from "moment";

export const Log = str => {
  //return console.log(str);
};
export const LogTable = json => {
  //  return console.table(json);
};

export const castEachAsNmbr = str => {
  const arr = str.split(",");
  return R.map(x => Number(x), arr);
};

export const convertTimestamp = str => {
  return moment(Number(str)).format("M/D/YY H:mm A");
};
export const isNumber = str => {
  const pattern = /^\d+$/;
  return pattern.test(str); // returns a boolean
};

export const numberAddCommas = x => {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null;
};
export const prependDollarSign = n => {
  //console.log(" utils prependDollarSign");
  if (n == null) {
    return;
  }
  return R.test(/^[$]/, n) ? n : `$${n}`;
};

export const numberDeleteCommas = x => {
  return x.split(",").join("");
};
export const deleteDollarSign = x => {
  return R.replace("$", "", x);
};

export const filterAndProps = (filterVal, propsVals, arr) => {
  const a = R.filter(x => x.name == filterVal, arr);
  const b = R.props([propsVals], a[0]);
  return b;
};
export const emailName = addy => {
  //console.log("addy ");
  if (addy.indexOf("@") === -1) {
    console.log("indx of -1");
    return addy;
  }
  const user = addy.split("@");
  return user[0] || addy;
};
export const sentenceCase = str => {
  let a = R.toLower(str);
  let b = R.splitAt(1, a);
  let upper = R.toUpper(b[0]);
  return upper + b[1];
};
