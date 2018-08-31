import { combineReducers } from "redux";
import R from "ramda";
import { Log } from "../utils/utils";

/**
 *to do .... add selector pattern to index reducer
 * this is the getters that Containers will use in mapStateToProps
 **/

import {
  REQUEST_NOTIFICATIONS,
  RECEIVE_NOTIFICATIONS,
  DELETE_NOTIFICATION,
  DELETE_ALL_NOTIFICATIONS,
  REQUEST_USER,
  RECEIVE_USER,
  SAVE_FAVS,
  SAVE_TOKEN_AND_LOGIN,
  SET_FLOWWRIGHT_URL
} from "../actions";

import { banks } from "../components/PositivePay/reducers";
import { addepar } from "../components/Addepar/reducers";
import { presence } from "../components/InOffice/reducers";
import { glogInput } from "../components/GlogInput/reducers";

/* ROD hack  TEMPORARY */
/*
const verifyPreferences = str => {
  Log("verifyPreferences str: " + str);
  Log("DELETE THIS F WHEN DB UPDATED from reducers/notifications.js");

  let arr = str.split(",");
  Log("arr[0].length " + arr[0].length);
  if (arr[0].length > 2) {
    return null;
  } else {
    return str;
  }
};
*/

const notifications = (state = [], action) => {
  switch (action.type) {
    case REQUEST_NOTIFICATIONS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_NOTIFICATIONS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        notifications: action.notifications,
        lastUpdated: action.receivedAt,
        select: 1
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: R.filter(x => x.uuid !== action.id, state.notifications)
      };

    case DELETE_ALL_NOTIFICATIONS:
      Log("DELETE_ALL_NOTIFICATIONS reducer f ");
      return {
        ...state,
        notifications: []
      };

    case REQUEST_USER:
      return {
        ...state
      };
    case RECEIVE_USER:
      return {
        ...state,
        user: action.user.PortalUser,
        notifications: action.user.PortalUser.notifications,
        preferences: action.user.PortalUser.preferences,
        //authorizations: action.user.portalUser.authorizations,
        lastUpdated: Date.now()
      };
    case SAVE_FAVS:
      return {
        ...state,
        preferences: action.favs
      };
    case SAVE_TOKEN_AND_LOGIN:
      return {
        ...state,
        token: action.token,
        login: action.login
      };
    case "ADD_NOTIFICATION":
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          message: action.message,
          messageType: action.messageType,
          priority: action.priority,
          delet: action.delet,
          showNew: action.showNew,
          time: action.time
        }
      ];

    case "MODIFY_NOTIFICATION":
      Log("MODIFY_NOTIFICATION reducer f action.id " + action.id);
      return state.map(
        x => (x.id === action.id ? { ...x, showNew: false } : x)
      );
    case "SET_FLOWWRIGHT_URL":
      return {
        ...state,
        flowWrightURL: action.payload
      };

    default:
      return state;
  }
};
const rootReducer = combineReducers({
  notifications,
  banks,
  addepar,
  presence,
  glogInput
});
export default rootReducer;
//export default notifications;
