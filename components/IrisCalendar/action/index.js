import * as R from "ramda";
import * as HTTP from "../../../common/http";

export const submitCalendar = (startDateID, endDateID) => async (
  dispatch,
  getState
) => {
  let result;
  console.log("SUBMIT CALENDAR ACTION " + [startDateID, endDateID]);
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  result = await HTTP.submitCalendar(token, startDateID, endDateID);
  console.log("HTTP result: " + JSON.stringify(result));
};
