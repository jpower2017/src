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

import { events } from "../common/data";

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
export const GLOG_UPDATE_GIFTREQUEST_GIFT = "GLOG_UPDATE_GIFTREQUEST_GIFT";
export const GLOG_SEARCHTEXT = "GLOG_SEARCHTEXT";
export const GLOG_UPDATE_FIELD = "GLOG_UPDATE_FIELD";
export const GLOG_FILTER_GEIS = "GLOG_FILTER_GEIS";
export const SET_CONFIG_GIFT_LOG = "SET_CONFIG_GIFT_LOG";

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
export const setFilter2 = (val, variable) => ({
  type: GLOG_SET_VAR,
  payload: val,
  variable: variable
});
export const setFilter = (val, variable) => async dispatch => {
  console.log("ACTION setFILTER " + [val, variable]);
  dispatch(setFilter2(val, variable));
  dispatch(getData(val));
};
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
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  const ge = await HTTP_GLOG.createGiftEvent(token, login);
  console.table(ge);
  dispatch(addGiftInstance2(R.prop("uuid", ge.CreateGiftEvent)));
};

export const add2 = (payload, node, addID = true) => ({
  type: GLOG_ADD,
  payload: payload,
  node: node,
  addID: addID
});
export const addToNode = payload => async (dispatch, getState) => {
  let node = getState().glogInput.node;
  dispatch(add2(payload, node, false));
};
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
export const addLocation = (payload, node, addID = true) => async (
  dispatch,
  getState
) => {
  console.log("ACTION addLocation ");
  console.table(payload);
  const token = getState().notifications.token;
  const giftID = getState().glogInput.searchID;

  let formattedAddress = [
    payload.streetAddress1,
    payload.apt,
    `${payload.city},  ${payload.state}`,
    payload.zipcode
  ];
  let newPayload = R.pick(
    ["uuid", "formattedAddress", "latitude", "longitude"],
    {
      ...payload,
      uuid: payload.placeID,
      formattedAddress: R.filter(x => x != null, formattedAddress),
      latitude: payload.latitude,
      longitude: payload.longitude
    }
  );
  let newItem = await HTTP_GLOG.createLocation(token, newPayload);
  console.log("HTTP createLocation received");
  let id = R.prop("uuid", newItem.CreateLocation);
  newItem = await HTTP_GLOG.createGiftLocation(token, giftID, id, {});
  console.log("HTTP_creategiftlocation");
  /* update gift... gift.location */
  let giftObj = R.find(x => x.id === giftID, getState().glogInput.gifts);
  let newGiftObj = { ...giftObj, location: id };
  dispatch(update(newGiftObj, "gifts"));

  dispatch(add2(payload, node, addID));
};

export const remove = (id, node) => ({
  type: GLOG_REMOVE,
  id: id,
  node: node
});
export const addNew = (payload = null) => async (dispatch, getState) => {
  console.log("ACTION addNew");
  let id, newItem, newAttach, orgID;
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
    newItem = await HTTP_GLOG.createOrganization(token);
    id = R.prop("uuid", newItem.CreateOrganization);
    newAttach = await HTTP_GLOG.createGiftEventOrganization(
      token,
      login,
      gei,
      id
    );
  } else if (node == "groups") {
    newItem = await HTTP_GLOG.createGroup(token);
    id = R.prop("uuid", newItem.CreateGroup);
    newAttach = await HTTP_GLOG.createGiftEventGroup(token, login, gei, id);
  } else if (node == "requests") {
    newItem = await HTTP_GLOG.createGiftRequest(token);
    id = R.prop("uuid", newItem.CreateGiftRequest);
    newAttach = await HTTP_GLOG.createGiftEventGiftRequest(token, gei, id);
  } else if (node == "gifts") {
    newItem = await HTTP_GLOG.createGift(token, login);
    id = R.prop("uuid", newItem.CreateGift);
    console.table(newItem);
    console.log("newGift uuid " + R.prop("uuid", newItem.CreateGift));
  } else if (node == "animals") {
    newItem = await HTTP_GLOG.createAnimal(token, login);
    id = R.prop("uuid", newItem.CreateAnimal);
    newAttach = await HTTP_GLOG.createGiftEventAnimal(token, login, gei, id);
    console.table(newItem);
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
    { node: "groups", obj: group },
    { node: "gifts", obj: gift },
    { node: "locations", obj: location },
    { node: "requests", obj: request }
  ];
  let newobj = payload
    ? payload
    : R.prop("obj", R.find(x => x.node === node, newObjMapping));

  let newobj2 = { ...newobj, id: id };

  /* change to update
  let newItem = await HTTP_GLOG.createOrganization(token);
  let orgID = R.prop("uuid", newItem.CreateOrganization);
  let newPayload = R.pick(
  ["orderStatus", "orderNumber", "orderDate"],
  payload
  );

  newAttach = await HTTP_GLOG.createGiftVendor(
  token,
  giftID,
  orgID,
  newPayload
  );
  */

  if (node === "gifts") {
    //let newItem = await HTTP_GLOG.createOrganization(token);
    orgID = uuidv4();
    console.log("orgID " + orgID);
    //newAttach = await HTTP_GLOG.createGiftVendor(token, id, orgID, {});

    dispatch(add({ ...vendor, id: orgID }, "vendors", false, false));
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
          vendor: orgID,
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

export const filterGEIs = month => ({
  type: GLOG_FILTER_GEIS,
  month: month
});
export const setConfig = (name, payload) => ({
  type: SET_CONFIG_GIFT_LOG,
  payload: payload,
  name: name
});
export const getData = (filter = null) => async (dispatch, getState) => {
  console.log("GLOGINPUT  ACTION GETDATA");
  const token = getState().notifications.token;
  const ge = await HTTP_GLOG.getGiftEvents(token, filter);
  console.table(ge.GiftEvents);
  let temp = await HTTP.getModuleConfig(token, "Gift Log");
  let enums = temp.ModuleConfiguration.enumerations;
  let et = R.find(x => x.name == "Event Type", enums);
  let etValues = et.metaValues;
  dispatch(setConfig("eventTypes", etValues));
  const changeKey = (obj, type) => {
    return { id: obj.uuid, type: type };
  };
  /* combine all recipients */
  const combineRecipients = obj => {
    //  console.log("ACTION combineRecipients");
    let people = R.map(x => changeKey(x, "people"), obj.eventPersons);
    let groups = R.map(x => changeKey(x, "groups"), obj.eventGroups);
    let orgs = R.map(x => changeKey(x, "orgs"), obj.eventOrganizations);
    let animals = R.map(x => changeKey(x, "animals"), obj.eventAnimals);
    console.log(
      JSON.stringify(Array.prototype.concat(people, groups, orgs, animals))
    );
    return Array.prototype.concat(people, groups, orgs, animals);
  };
  const getGiftEventValue = str => {
    if (Number(str)) {
      return str;
    } else {
      return R.prop("value", R.find(x => x.title == str, events));
    }
  };
  const addKeyID = obj => {
    return { id: obj.uuid, ...obj, type: "requests" };
  };
  const tweakData = obj => {
    return {
      ...obj,
      eventType: [obj.eventType],
      id: obj.uuid,
      date: [`${obj.eventMonth}/${obj.eventDay}/${obj.eventYear}`],
      recipients: combineRecipients(obj),
      giftHistory: [],
      requests: R.map(x => addKeyID(x), obj.eventGiftRequests),
      eventMonth: `${obj.eventMonth}`,
      notes: [obj.notes],
      recurring: [obj.recurring],
      registry: [obj.registryStatus]
    };
  };

  const process = obj => {
    dispatch(add2(tweakData(obj), "giftEventInstances", false));
    let people = R.prop("eventPersons", obj);
    R.map(x => dispatch(add2({ ...x, id: x.uuid }, "people", false)), people);
    let groups = R.prop("eventGroups", obj);
    R.map(x => dispatch(add2({ ...x, id: x.uuid }, "groups", false)), groups);
    let orgs = R.prop("eventOrganizations", obj);
    R.map(x => dispatch(add2({ ...x, id: x.uuid }, "orgs", false)), orgs);
    let animals = R.prop("eventAnimals", obj);
    R.map(x => dispatch(add2({ ...x, id: x.uuid }, "animals", false)), animals);
  };
  R.map(x => process(x), ge.GiftEvents);
  const geiFilter = getState().glogInput.mainFilter;
  if (geiFilter) {
    console.log("geiFilter " + geiFilter);
    dispatch(filterGEIs(geiFilter));
  }
};

export const receiveRows = json => ({
  type: GLOG_RECEIVE_ROWS,
  rows: json
});

export const GEI_add_recip2 = () => ({
  type: UPDATE_GEI_INSTANCE_RECIP
});

export const GEI_add_recip = () => async (dispatch, getState) => {
  let newAttach;
  const token = getState().notifications.token;
  const gei = getState().glogInput.selectedRow;
  const login = getState().notifications.login;
  const id = getState().glogInput.searchID;
  const node = getState().glogInput.node;
  if (node === "people") {
    await HTTP_GLOG.createGiftEventPerson(token, login, gei, id);
  } else if (node === "groups") {
    await HTTP_GLOG.createGiftEventGroup(token, login, gei, id);
  } else if (node === "orgs") {
    await HTTP_GLOG.createGiftEventOrganization(token, login, gei, id);
  }

  dispatch(GEI_add_recip2());
};

export const GEI_add_request = () => ({
  type: UPDATE_GEI_INSTANCE_REQUEST
});
export const updateGiftInstance = payload => async (dispatch, getState) => {
  console.log("ACTION updateGift Instance" + R.prop("id", payload));
  const uuid = R.prop("id", payload);
  /*
  const getGiftEventTitle = n => {
    return R.prop("title", R.find(x => x.value == n, events));
  };
  const payloadWithEventTypeStr = {
    ...payload,
    eventType: getGiftEventTitle(payload.eventType)
  };
  */

  const newPayload = R.pick(
    [
      "active",
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
  const data = R.map(x => (typeof x == "object" ? x[0] : x), newPayload);
  const token = getState().notifications.token;
  const login = getState().notifications.login;

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
  let httpPayload;
  console.log("ACTION updateForm " + node);
  console.table(payload);
  /* HTTP UPDATE BASED ON NODE AND SEARCH ID */
  if (node === "people") {
    httpPayload = R.omit(
      [
        "id",
        "selected",
        "name",
        "reportsTo",
        "roles",
        "submit",
        "worksAt",
        "worksFor",
        "worksIn"
      ],
      payload
    );
    const updatePerson = await HTTP.updatePerson(token, id, httpPayload);
    console.table(updatePerson);
  } else if (node === "orgs") {
    console.log("ACTION if orgs update");
    httpPayload = R.pick(["name", "contactNumber"], payload);
    const updateOrg = await HTTP_GLOG.updateOrganization(
      token,
      id,
      httpPayload
    );
    console.table(updateOrg);
  } else if (node === "groups") {
    console.log("ACTION if groups update");
    httpPayload = R.pick(["name"], payload);
    const updateGroup = await HTTP_GLOG.updateGroup(token, id, httpPayload);
    console.table(updateGroup);
  } else if (node == "requests") {
    console.log("ACTION if requests update");
    console.table(payload);
    httpPayload = R.pick(["registryStatus", "requestNotes", "active"], payload);
    httpPayload = {
      ...httpPayload,
      registryStatus: String(httpPayload.registryStatus[0])
    };
    console.table(httpPayload);
    const updateRequest = await HTTP_GLOG.updateGiftRequest(
      token,
      id,
      httpPayload
    );
  } else if (node == "gifts") {
    console.log("ACTION if gifts update");
    console.table(payload);
    httpPayload = R.prop("value", payload) ? payload : { ...payload, value: 0 };
    console.table(httpPayload);
    httpPayload = R.pick(
      ["value", "giftNotes", "description", "sentiment", "assignedTo"],
      httpPayload
    );
    const updateRequest = await HTTP_GLOG.updateGift(token, id, httpPayload);
  } else if (node == "animals") {
    console.log("ACTION if animals update");
    httpPayload = R.pick(["name", "type"], payload);
    const updateAnimal = await HTTP_GLOG.updateAnimal(token, id, httpPayload);
    console.table(updateAnimal);
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

export const updateGiftRequestGift = (id, payload) => ({
  type: GLOG_UPDATE_GIFTREQUEST_GIFT,
  id: id,
  payload: payload
});
export const updateSecondary2 = (payload, node) => ({
  type: GLOG_UPDATE_SECONDARY,
  payload: payload,
  node: node
});
export const updateField = (field, node, id, payload) => ({
  type: GLOG_UPDATE_FIELD,
  field: field,
  node: node,
  id: id,
  payload: payload
});
export const updateSecondary = (
  payload,
  node,
  x = null,
  giftReqGiftPayload = null
) => async (dispatch, getState) => {
  let newAttach;
  console.log("ACTION updateSecondary " + JSON.stringify(payload));
  console.log("ACTION updateSecondary  node param " + node);
  const token = getState().notifications.token;
  const geis = getState().glogInput.giftEventInstances;
  const geID = getState().glogInput.selectedRow;
  const gei = R.find(x => x.id == geID, geis);

  const requests = R.prop("requests", gei);

  if (node === "requests") {
    let id = R.prop("id", payload);
    newAttach = await HTTP_GLOG.createGiftRequestPerson(token, id, x);
  } else if (node === "gifts") {
    let id = R.prop("id", payload);
    console.log("selection ID " + x);
    console.log("giftID " + id);
    const requestsID = R.map(x => x.id, requests);
    let status = R.prop("status", giftReqGiftPayload);
    const parseGRG = obj => {
      console.log("parseGRG obj " + JSON.stringify(obj));
      let val = obj.status == 1 ? "No" : "Yes";
      return { ...obj, status: val };
    };
    if (R.contains(x, requestsID)) {
      newAttach = await HTTP_GLOG.createGiftRequestGift(
        token,
        x,
        id,
        parseGRG(giftReqGiftPayload)
      );
    } else {
      newAttach = await HTTP_GLOG.createGiftPerson(token, id, x);
    }
    //  dispatch(addGiftRequestGift(x, id, parseGRG(giftReqGiftPayload)));
    dispatch(
      updateGiftRequestGift(x, {
        giftRequestID: x,
        giftID: id,
        ...parseGRG(giftReqGiftPayload)
      })
    );

    console.table(newAttach);
  } else if (node === "orders") {
    console.log(" ACTION orders");
    //  console.table(payload)
    let giftID = getState().glogInput.searchID;
    let giftObj = R.find(x => x.id === giftID, getState().glogInput.gifts);
    let vendorID = R.prop("vendor", giftObj);
    let newPayload = R.omit(["status", "id"], {
      ...payload,
      orderStatus: `${payload.status}`
    });
    HTTP_GLOG.updateGiftVendor(token, giftID, vendorID, newPayload);
  } else if (node === "deliveries") {
    console.log("ACTION deliveries");
    let giftID = getState().glogInput.searchID;
    let giftObj = R.find(x => x.id === giftID, getState().glogInput.gifts);
    let locationID = R.prop("location", giftObj);
    let newPayload = R.omit(["id"], payload);
    HTTP_GLOG.updateGiftLocation(token, giftID, locationID, newPayload);

    //  let giftID = getState().glogInput.searchID;
  } else if (node === "vendors") {
    console.log("action updatesecondary Vendors");
    let giftID = getState().glogInput.searchID;
    let giftObj = R.find(x => x.id === giftID, getState().glogInput.gifts);
    let str = R.prop("name", payload);
    console.log("vendor name search " + str);
    const token = getState().notifications.token;
    let newSearch = await HTTP_GLOG.searchOrganization(token, str);
    if (!R.length(newSearch.SearchOrganization)) {
      console.log("no seach results");

      let vendorID = R.prop("vendor", giftObj);
      let newPayload = R.omit(["id"], payload);
      const updateOrg = await HTTP_GLOG.updateOrganization(
        token,
        vendorID,
        newPayload
      );
      console.table(updateOrg);
    } else {
      console.log("search results");
      let newVendorID = R.prop(
        "uuid",
        R.find(x => x.name == str, newSearch.SearchOrganization)
      );
      console.log("newVendorID " + newVendorID);
      console;
      dispatch(add({ ...payload, id: newVendorID }, "vendors", false, false));

      dispatch(updateField("vendor", "gifts", giftID, newVendorID));
      newAttach = await HTTP_GLOG.createGiftVendor(
        token,
        giftID,
        newVendorID,
        {}
      );
      console.table(newAttach);

      //dispatch(add2(newobj, "gifts", false));
      //  R.map()
      //  dispatch(update(ayload, 'gifts'));
    }
  }
  dispatch(updateSecondary2(payload, node));
};

export const queryGiftEvent = id => async (dispatch, getState) => {
  console.log("ACTION queryGiftEvent id : " + id);
  const token = getState().notifications.token;
  const ge = await HTTP_GLOG.getGiftEvent(token, id);
  console.table(ge.GiftEvent);
  const formatRecips = arr => {
    const formatObj = obj => {
      return { ...obj, id: obj.uuid, name: `${obj.firstName} ${obj.lastName}` };
    };
    return R.map(x => formatObj(x), arr);
  };
  const changeKey = obj => {
    return {
      ...obj,
      id: obj.uuid,
      recipients: formatRecips(obj.requestPersons)
    };
  };
  R.map(
    x => dispatch(add2(changeKey(x), "requests", false)),
    ge.GiftEvent.eventGiftRequests
  );
  /*  add to  gifthistory in GEI  and gifts table */
  const requests = ge.GiftEvent.eventGiftRequests;

  /*  ADD request notes here to gift  */
  const getGifts = arrRequestGifts => {
    console.table(arrRequestGifts);
    const formatGiftObj = reqGift => {
      return {
        ...reqGift.gift,
        requestNotes: reqGift.requestNotes,
        id: reqGift.uuid,
        type: "requests"
      };
    };
    return R.map(x => formatGiftObj(x), arrRequestGifts);
  };
  const gifts = R.map(x => getGifts(x.requestGifts), requests);
  let allGifts = [];
  const formatObj = obj => {
    console.log("formatObj");
    console.log(JSON.stringify(obj));
    allGifts.push(obj);
    return { id: obj[0].uuid, type: "gifts" };
  };
  const formatGiftHistory = R.map(x => formatObj(x), gifts);
  console.table(formatGiftHistory);
  const geis = getState().glogInput.giftEventInstances;
  const geID = getState().glogInput.selectedRow;
  const gei = R.find(x => x.id == geID, geis);
  const newPayload = { ...gei, giftHistory: formatGiftHistory };
  dispatch(updateGiftInstance2(newPayload));
  const formatForGifts = obj => {
    return { ...obj[0], id: obj[0].uuid };
  };
  allGifts = R.map(x => formatForGifts(x), allGifts);

  const addToVendor = gift => {
    const gv = R.prop("giftVendor", gift);
    if (!gv) {
      return;
    }
    const org = R.prop("organization", gv);
    if (!org) {
      return;
    }
    let objFrmt = { ...org, id: org.uuid };
    console.table(objFrmt);
    dispatch(add2(objFrmt, "vendors", false));
    return org.uuid;
  };
  const addToOrder = gift => {
    const gv = R.prop("giftVendor", gift);
    if (!gv) {
      return;
    }
    let objFrmt = { ...gv, id: gv.uuid };
    dispatch(add2(objFrmt, "orders", false));
    return gv.uuid;
  };
  const addToDelivery = gift => {
    console.log("addtodelivery gift " + JSON.stringify(gift));
    const d = R.prop("delivery", gift);
    if (!d) {
      return;
    }
    let objFrmt = { ...d, id: d.uuid };
    dispatch(add2(objFrmt, "deliveries", false));
    return d.uuid;
  };
  const addToTables = gift => {
    console.log("addToTables");
    /* add foreign key */
    let vendorID = addToVendor(gift);
    let orderID = addToOrder(gift);
    let deliveryID = addToDelivery(gift);
    let newObj = {
      ...gift,
      vendor: vendorID,
      order: orderID,
      delivery: deliveryID
    };
    console.log("gift payload ");
    console.log(JSON.stringify(newObj));
    dispatch(add2(newObj, "gifts", false));
  };
  console.log("next addtotables");
  R.map(x => addToTables(x), allGifts);
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
export const searchText = arr => ({
  type: GLOG_SEARCHTEXT,
  payload: arr
});

const changeLabel = x => {
  return R.omit(["uuid"], {
    ...x,
    id: x.uuid
  });
};
export const searchOrganization = (str = "placeh") => async (
  dispatch,
  getState
) => {
  const token = getState().notifications.token;
  let newSearch = await HTTP_GLOG.searchOrganization(token, str);
  let orgs = R.map(x => changeLabel(x), newSearch.SearchOrganization);
  dispatch(searchText(orgs));
};
export const searchPerson = (str = "") => async (dispatch, getState) => {
  console.log("ACTION searchPerson " + str);
  const token = getState().notifications.token;
  let newSearch = await HTTP_GLOG.searchPerson(token, str);
  let peps = R.map(x => changeLabel(x), newSearch.SearchPerson);
  dispatch(searchText(peps));
};
export const searchGroup = (str = "") => async (dispatch, getState) => {
  console.log("ACTION searchGroup " + str);
  const token = getState().notifications.token;
  let newSearch = await HTTP_GLOG.searchGroup(token, str);
  let groups = R.map(x => changeLabel(x), newSearch.SearchGroup);
  dispatch(searchText(groups));
};
export const searchAnimal = (str = "") => async (dispatch, getState) => {
  console.log("ACTION searchAnimal " + str);
  const token = getState().notifications.token;
  let newSearch = await HTTP_GLOG.searchAnimal(token, str);
  let animals = R.map(x => changeLabel(x), newSearch.SearchAnimal);
  dispatch(searchText(animals));
};
export const searchNode = (str = "") => async (dispatch, getState) => {
  const node = getState().glogInput.node;
  if (node == "people") {
    dispatch(searchPerson(str));
  } else if (node == "orgs") {
    dispatch(searchOrganization(str));
  } else if (node == "groups") {
    dispatch(searchGroup(str));
  } else if (node == "animals") {
    dispatch(searchAnimal(str));
  }
};
