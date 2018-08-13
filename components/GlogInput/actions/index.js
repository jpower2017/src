import * as HTTP from "../../../common/http";
import * as HTTP_GLOG from "../../../common/http_glog";
import * as R from "ramda";
import uuidv4 from "uuid/v4";
import {
  person,
  gift,
  org,
  animal,
  group,
  request,
  location,
  vendor,
  delivery,
  order
} from "./data";

export const GLOG_ON_TYPE = "GLOG_ON_TYPE";
export const GLOG_RECEIVE_ROWS = "GLOG_RECEIVE_ROWS";
export const GLOG_SUBMIT_ROW = "GLOG_SUBMIT_ROW";

export const UPDATE_GEI_INSTANCE_RECIP = "UPDATE_GEI_INSTANCE_RECIP";
export const UPDATE_GEI_INSTANCE_REQUEST = "UPDATE_GEI_INSTANCE_REQUEST";
export const UPDATE_GIFT_INSTANCE = "UPDATE_GIFT_INSTANCE";
export const GLOG_UPDATE = "GLOG_UPDATE";
export const GLOG_UPDATE_SECONDARY = "GLOG_UPDATE_SECONDARY";

export const GLOG_DELETE = "GLOG_DELETE";

export const ADD_ROW_GIFT_INSTANCE = "ADD_ROW_GIFT_INSTANCE";
export const GLOG_ADD = "GLOG_ADD";

export const GLOG_REMOVE = "GLOG_REMOVE";

export const GLOG_ADD_DATA = "GLOG_ADD_DATA";
export const GLOG_SET_VIEW = "GLOG_SET_VIEW";
export const GLOG_SET_STATUS = "GLOG_SET_STATUS";
export const GLOG_SET_NODE = "GLOG_SET_NODE";

export const GLOG_SET_SEARCH_ID = "GLOG_SET_SEARCH_ID";
export const GLOG_ADD_SEARCH = "GLOG_ADD_SEARCH";
export const GLOG_ADD_SEARCH2 = "GLOG_ADD_SEARCH2";
export const GLOG_ADD_NEW = "GLOG_ADD_NEW";
export const GLOG_SET_SELECTED_ROW = "GLOG_SET_SELECTED_ROW";
export const GLOG_LOAD_DATA = "GLOG_LOAD_DATA";
export const GLOG_SET_REQUEST_ID = "GLOG_SET_REQUEST_ID";
export const GLOG_SET_ACTION = "GLOG_SET_ACTION";
export const GLOG_SET_VAR = "GLOG_SET_VAR";

export const onType = payload => ({
  type: GLOG_ON_TYPE,
  payload: payload
});

export const onTypeGift = (item, giftID = null) => async (
  dispatch,
  getState
) => {
  console.log("ACTION ontype x " + JSON.stringify(item));
  console.log(R.prop("id", item));
  console.log("ACTION giftID " + giftID);
  giftID && dispatch(setSearchID(giftID));
  dispatch(updateSecondary(item, "locations"));
};

export const setView = x => async dispatch => {
  console.log("ACTION SET VIEW " + x);
  dispatch(setView2(x));
};
export const setAction = x => ({
  type: GLOG_SET_ACTION,
  payload: x
});
export const setFilter = (val, variable) => ({
  type: GLOG_SET_VAR,
  payload: val,
  variable: variable
});
export const setView2 = x => ({
  type: GLOG_SET_VIEW,
  view: x
});
export const setNode = x => async dispatch => {
  console.log("ACTION SET_NODE " + x);
  dispatch(setNode2(x));
};
export const setNode2 = x => ({
  type: GLOG_SET_NODE,
  node: x
});
export const setStatus = x => async dispatch => {
  console.log("ACTION SET STATUS " + x);
  dispatch(setStatus2(x));
};
export const setStatus2 = x => ({
  type: GLOG_SET_STATUS,
  status: x
});

export const addGiftInstance2 = uuid => ({
  type: ADD_ROW_GIFT_INSTANCE,
  id: uuid
});
export const addGiftInstance = () => async (dispatch, getState) => {
  console.log("GLOGINPUT  ACTION addGiftInstance");
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  const ge = await HTTP_GLOG.createGiftEvent(token, login);
  console.log("HTTP createGiftEvent received");
  console.table(ge);
  console.log("ge uuid " + R.prop("uuid", ge.CreateGiftEvent));
  dispatch(addGiftInstance2(R.prop("uuid", ge.CreateGiftEvent)));
};

export const add2 = (payload, node, addID = true) => ({
  type: GLOG_ADD,
  payload: payload,
  node: node,
  addID: addID
});
export const add = (payload, node, searchID = true, addID = true) => async (
  dispatch,
  getState
) => {
  dispatch(add2(payload, node, addID));
  console.log("ACTION ADD searchID " + searchID);
  if (searchID) {
    dispatch(setSearchID());
  }
};

export const remove = (id, node) => ({
  type: GLOG_REMOVE,
  id: id,
  node: node
});
export const addNew = (payload = null) => async (dispatch, getState) => {
  console.log("ACTION addNew");
  let id, newItem, newAttach;
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  const node = getState().glogInput.node;
  const gei = getState().glogInput.selectedRow;
  console.log("gei " + gei);
  console.log("node " + node);
  if (node == "people") {
    newItem = await HTTP.createPerson(token, login);
    console.log("HTTP createPerson received");
    id = R.prop("uuid", newItem.CreatePerson);
    console.log("newPerson uuid " + R.prop("uuid", newItem.CreatePerson));
    /* CREATE GIFT EVENT PERSON   current gei?*/
    newAttach = await HTTP_GLOG.createGiftEventPerson(token, login, gei, id);
  } else if (node == "orgs") {
    newItem = await HTTP_GLOG.createOrganization(token, login);
    id = R.prop("uuid", newItem.CreateOrganization);
    newAttach = await HTTP_GLOG.createGiftEventOrganization(
      token,
      login,
      gei,
      id
    );
  } else if (node == "requests") {
    newItem = await HTTP_GLOG.createGiftRequest(token);
    id = R.prop("uuid", newItem.CreateGiftRequest);
    newAttach = await HTTP_GLOG.createGiftEventGiftRequest(token, gei, id);
  } else if (node == "gifts") {
    newItem = await HTTP_GLOG.createGift(token, login);
    id = R.prop("uuid", newItem.CreateGift);
    console.table(newItem);
    //  console.table(payload);

    //id = R.prop("uuid", newItem.CreateGift);

    //console.log(R.prop("requests", payload));
    /*
    if (R.prop("requests", payload)[0].id) {

    }
    */
    console.log("newGift uuid " + R.prop("uuid", newItem.CreateGift));
  }

  console.table(newItem);

  //const id = R.prop("uuid", newGift.CreateGift);
  let uuidVendor = uuidv4();
  console.log("uuidVendor " + uuidVendor);
  let uuidDelivery = uuidv4();
  let uuidOrder = uuidv4();

  console.log("node to call " + node);
  const newObjMapping = [
    { node: "people", obj: person },
    { node: "orgs", obj: org },
    { node: "animals", obj: animal },
    { node: "group", obj: group },
    { node: "gifts", obj: gift },
    { node: "locations", obj: location },
    { node: "requests", obj: request }
  ];
  let newobj = payload
    ? payload
    : R.prop("obj", R.find(x => x.node === node, newObjMapping));

  let newobj2 = { ...newobj, id: id };

  if (node === "gifts") {
    dispatch(add({ ...vendor, id: uuidVendor }, "vendors", false, false));
    dispatch(
      add({ ...delivery, id: uuidDelivery }, "deliveries", false, false)
    );
    dispatch(add({ ...order, id: uuidOrder }, "orders", false, false));
  }
  if (node === "gifts") {
    dispatch(
      add(
        {
          ...newobj2,
          vendor: uuidVendor,
          delivery: uuidDelivery,
          order: uuidOrder
        },
        node
      )
    );
  } else {
    dispatch(
      add(
        {
          ...newobj2
        },
        node
      )
    );
  }
};
export const loadData = () => ({
  type: GLOG_LOAD_DATA
});
export const addData = () => ({
  type: GLOG_ADD_DATA
});

export const getData = () => async (dispatch, getState) => {
  console.log("GLOGINPUT  ACTION GETDATA");
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  const ge = await HTTP_GLOG.getGiftEvents(token, login);
  console.log("action ge received");
  console.table(ge);
  //dispatch(addData());
};
export const receiveRows = json => ({
  type: GLOG_RECEIVE_ROWS,
  rows: json
});

export const GEI_add_recip = () => ({
  type: UPDATE_GEI_INSTANCE_RECIP
});
export const GEI_add_request = () => ({
  type: UPDATE_GEI_INSTANCE_REQUEST
});
export const updateGiftInstance = payload => async (dispatch, getState) => {
  console.log("ACTION updateGift Instance" + R.prop("id", payload));
  const uuid = R.prop("id", payload);
  const newPayload = R.pick(
    [
      "recurring",
      "eventDay",
      "eventMonth",
      "eventYear",
      "eventType",
      "registryStatus",
      "notes"
    ],
    payload
  );
  //const data = R.map(x => (typeof x == "object" ? x[0] : x), newPayload);
  console.table(newPayload);
  const data = R.map(x => (typeof x == "object" ? x[0] : x), newPayload);
  console.log(data);
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  //const uuid = getState().selectedRow;
  const ge = await HTTP_GLOG.updateGiftEvent(token, login, uuid, data);
  console.table(ge);
  dispatch(updateGiftInstance2(payload));
};

export const updateGiftInstance2 = payload => ({
  type: UPDATE_GIFT_INSTANCE,
  giftInstance: payload
});
export const update = (payload, node) => ({
  type: GLOG_UPDATE,
  payload: payload,
  node: node
});

export const updateForm = payload => async (dispatch, getState) => {
  const node = getState().glogInput.node;
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  const id = getState().glogInput.searchID;
  console.log("ACTION updateForm " + node);
  /* HTTP UPDATE BASED ON NODE AND SEARCH ID */
  if (node === "people") {
    let httpPayload = R.pick(["firstName", "lastName"], payload);
    const updatePerson = await HTTP.updatePerson(token, id, httpPayload);
    console.table(updatePerson);
  } else if (node === "orgs") {
    console.log("ACTION if orgs update");
    let httpPayload = R.pick(["name"], payload);
    const updateOrg = await HTTP_GLOG.updateOrganization(
      token,
      id,
      httpPayload
    );
    console.table(updateOrg);
  } else if (node == "requests") {
    console.log("ACTION if requests update");
    console.table(payload);
    let httpPayload = R.pick(["registryStatus", "requestNotes"], payload);
    const updateRequest = await HTTP_GLOG.updateGiftRequest(
      token,
      id,
      httpPayload
    );
  } else if (node == "gifts") {
    console.log("ACTION if gifts update");
    console.table(payload);
    let httpPayload = R.pick(["value", "giftNotes", "description"], payload);
    const updateRequest = await HTTP_GLOG.updateGift(token, id, httpPayload);
  }
  dispatch(update(payload, node));
};

export const delet = (id, node) => ({
  type: GLOG_DELETE,
  id: id,
  node: node
});
/* delete from Gift event instance */
export const ondelete = id => async (dispatch, getState) => {
  console.log("ACTION ondelete ");
  const geis = getState().glogInput.giftEventInstances;
  const selectedRow = getState().glogInput.selectedRow;
  let recipients = R.prop(
    "recipients",
    R.find(x => x.id === selectedRow, geis)
  );
  let giftHistory = R.prop(
    "giftHistory",
    R.find(x => x.id === selectedRow, geis)
  );
  let giftRequests = R.prop(
    "requests",
    R.find(x => x.id === selectedRow, geis)
  );
  let arr = [];
  arr.push(...recipients, ...giftHistory, ...giftRequests);
  const gei = R.find(x => x.id === selectedRow, geis);
  const geiID = R.prop("id", R.find(x => x.id === id, arr));
  const geiType = R.prop("type", R.find(x => x.id === id, arr));
  console.log("geiId " + geiID);
  if (geiType == "gift") {
    gei.giftHistory = R.filter(x => x.id !== id, gei.giftHistory);
    dispatch(update(gei, "giftEventInstances"));
  } else if (geiType == "requests") {
    gei.requests = R.filter(x => x.id !== id, gei.requests);
    dispatch(update(gei, "giftEventInstances"));
  } else {
    gei.recipients = R.filter(x => x.id !== id, gei.recipients);
    dispatch(update(gei, "giftEventInstances"));
  }
};
export const updateSecondary2 = (payload, node) => ({
  type: GLOG_UPDATE_SECONDARY,
  payload: payload,
  node: node
});
export const updateSecondary = (payload, node, x = null) => async (
  dispatch,
  getState
) => {
  let newAttach;
  console.log("ACTION updateSecondary " + JSON.stringify(payload));
  const token = getState().notifications.token;
  const gifts = getState().glogInput.gifts;
  if (node === "requests") {
    let id = R.prop("id", payload);
    newAttach = await HTTP_GLOG.createGiftRequestPerson(token, id, x);
  } else if (node === "gifts") {
    let id = R.prop("id", payload);
    console.log("selection ID " + x);
    console.log("giftID " + id);
    if (!!R.find(x => x.id === x, gifts)) {
      newAttach = await HTTP_GLOG.createGiftRequestGift(token, x, id);
    } else {
      newAttach = await HTTP_GLOG.createGiftPerson(token, id, x);
    }

    console.table(newAttach);
  }
  dispatch(updateSecondary2(payload, node));
};
export const rowSubmit = (id, fileId = null) => ({
  type: GLOG_SUBMIT_ROW,
  id: id,
  fileId: fileId
});
export const setSearchID = id => ({
  type: GLOG_SET_SEARCH_ID,
  id: id
});
export const setSelectedRow = (id, value = true) => ({
  type: GLOG_SET_SELECTED_ROW,
  id: id
});
export const addSearch = () => ({
  type: GLOG_ADD_SEARCH
});
export const addSearch2 = () => ({
  type: GLOG_ADD_SEARCH2
});
export const setRequestID = x => ({
  type: GLOG_SET_REQUEST_ID,
  id: x
});
