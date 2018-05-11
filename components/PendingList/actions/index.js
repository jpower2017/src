import * as R from "ramda";
import * as HTTP from "../../../common/http";
import { Log, LogTable } from "../../../utils/utils";

//export const SUBMIT_PENDING = "SUBMIT_PENDING";

export const submitPending = (
  teamWorkID,
  possessive,
  dateFormat,
  list
) => async (dispatch, getState) => {
  let result;
  Log(
    "PENDING ACTION submitPending f " +
      [teamWorkID, possessive, dateFormat, list]
  );
  const token = getState().notifications.token;
  const login = getState().notifications.login;
  if (list == "iris") {
    console.log("list eq iris");
    //HTTP.createIrisReport
    return;
  }
  if (list == "pending") {
    result = await HTTP.createPendingSubmission(
      token,
      teamWorkID,
      possessive,
      dateFormat
    );
  } else {
    result = await HTTP.createUpdateSubmission(
      token,
      teamWorkID,
      possessive,
      dateFormat
    );
  }

  console.log("Pending result: " + JSON.stringify(result));
  /*
  const json = {
    id: 33,
    createdTimestamp: "3/8/2018",
    status: "PENDING",
    submittedBy: "You"
  };
  */
  //dispatch(pendingSubmit(json));
};
/*
export const pendingSubmit = json => ({
  type: SUBMIT_PENDING
});
*/
