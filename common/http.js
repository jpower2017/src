import { createApolloFetch } from "apollo-fetch";
import { Log } from "../utils/utils";
//const uri = "https://api.graph.cool/simple/v1/cj799ixxo0sy80132jecpv6zr";
//const uri = "http://devhost:8080/api/gql-portal/graphql";
///const uri = "/api/gql-portal/graphql";

const uri = "/api/graphql";

//const uri = "http://rod.bluesprucecapital.net/api/graphql";

/*
const requestHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json"
};
*/

export const getRows = (jwt, uuid) => {
  Log("GETROWS JWT : " + jwt);

  const query = `
  query PortalUser {
    portalUserNotifications(uuid:$uuid) {
     message
    }
  }
`;
  //  const query = `query {portalUserNotifications{message}}`;
  const variables = {
    uuid: uuid
  };

  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    //credentials: "include"
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const setPreferences = (jwt, uuid, login, input) => {
  //const query = `mutation{deleteDeal(id:${rowId}){id}}`;
  const query = `
     mutation updatePortalUser($login:String!,$input:PortalUserInput!) {
      UpdatePortalUser(login:$login,input:$input)  }`;
  const variables = {
    login: login,
    input: input
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const getUser = (jwt, login) => {
  const query = `
  query {
    PortalUser {
      uuid
      firstName
      lastName
      preferences
      permissions {
        queries
        mutations
        subscriptions
      }
      notifications {
        uuid
        title
        message
        urgent
        channel
      }
    }
  }
`;
  //  const query = `query {portalUserNotifications{message}}`;
  const variables = {
    login: login
  };

  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};
/**
 * FRONT END DELETE == SET FIELD READMESSAGE TO TRUE
 */
export const deleteRow = (jwt, uuid, rows) => {
  Log("HTTP deleteRow " + [jwt, uuid, rows]);
  //const query = `mutation{deleteDeal(id:${rowId}){id}}`;
  const query = `
  mutation dismissPortalUserNotifications($uuid:String!,$notificationUUIDs: [String!]!) {
         DismissPortalUserNotifications(userUUID:$uuid,notificationUUIDs:$notificationUUIDs)  } `;
  const variables = {
    uuid: uuid,
    notificationUUIDs: rows
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

//CreatePositivePaySubmission(bankUUID: String, retryUUID: String)
export const createPositivePaySubmission = (jwt, bankUUID, retryUUID) => {
  Log("HTTP " + bankUUID + ",  " + retryUUID);
  const query = `
     mutation createPP($bankUUID:String,$retryUUID:String) {
      CreatePositivePaySubmission(bankUUID:$bankUUID,retryUUID:$retryUUID) {
                 uuid
                 fileID
                 createdTimestamp
                 submittedTimestamp
                 status
                 submittedBy
                 nonVoidAmount
                 nonVoidCount
                 voidAmount
                 voidCount
                 statusMessage
                 manualFile64
                 autoFile64
    }
  }
  `;
  const variables = {
    bankUUID: bankUUID,
    retryUUID: retryUUID ? retryUUID : null
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createManualPositivePaySubmission = (jwt, bankUUID, retryUUID) => {
  Log("HTTP " + bankUUID + ",  " + retryUUID);
  const query = `
     mutation createManualPP($bankUUID:String,$retryUUID:String) {
      CreateManualPositivePaySubmission(bankUUID:$bankUUID,retryUUID:$retryUUID) {
                 uuid
                 fileID
                 createdTimestamp
                 submittedTimestamp
                 status
                 submittedBy
                 nonVoidAmount
                 nonVoidCount
                 voidAmount
                 voidCount
                 statusMessage
                 manualFile64
                 autoFile64
    }
  }
  `;
  const variables = {
    bankUUID: bankUUID,
    retryUUID: retryUUID ? retryUUID : null
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const createAddeparBloombergSubmission = jwt => {
  Log("HTTP CreateAddeparBloombergSubmission");
  const query = `
     mutation createAB {
      CreateAddeparBloombergSubmission {
        uuid
        createdTimestamp
        status
        submittedBy
    }
  }
  `;
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query }).then(res => res.data);
};

export const createPendingSubmission = (jwt, a, b, c) => {
  console.log("HTTP createPendingSubmission");
  const query = `
     mutation createPendingSubmission {
      CreatePendingSubmission {
      uuid
    }
  }
  `;
  const variables = {
    teamWorkID: a,
    possessive: b,
    date: c
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};
export const createUpdateSubmission = (jwt, a, b, c) => {
  console.log("HTTP createUpdateSubmission");
  const query = `
     mutation createUpdateSubmission {
      CreateUpdateSubmission {
      uuid
    }
  }
  `;
  const variables = {
    teamWorkID: a,
    possessive: b,
    date: c
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

//UpdatePresence(userUUID: String, input: PresenceInput)
//var query = `mutation CreateMessage($input: MessageInput) {
//  createMessage(input: $input) {
//  id
//  }
//}`;
export const updatePresence = (jwt, userUUID, input) => {
  Log("HTTP updatePresence " + userUUID + ",  " + JSON.stringify(input));
  //const jsn = { returnMessage: "test" };
  const query = `
     mutation updatePresence($userUUID:String,$input:PresenceInput) {
      UpdatePresence(userUUID:$userUUID,input:$input)  }`;
  const variables = {
    userUUID: userUUID,
    input: input
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const updatePerson = (jwt, userUUID, input) => {
  Log("HTTP updatePerson " + userUUID + ",  " + JSON.stringify(input));
  //const jsn = { returnMessage: "test" };
  const query = `
     mutation updatePerson($userUUID:String,$input:PersonInput) {
      UpdatePerson(userUUID:$userUUID,input:$input) {
        uuid
        isInvisible
        presenceToken
      } }`;
  const variables = {
    userUUID: userUUID,
    input: input
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query, variables }).then(res => res.data);
};

export const getBanks = (jwt, login) => {
  const query = `
  query {
    PositivePayBanks {
      uuid
      name
      positivePaySubmissions {
        uuid
        fileID
        createdTimestamp
        submittedTimestamp
        status
        submittedBy
        nonVoidAmount
        nonVoidCount
        voidAmount
        voidCount
        statusMessage
      }
    }
  }
`;
  const variables = {
    login: login
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query }).then(res => res.data);
};

export const getAddepar = (jwt, login) => {
  const query = `
  query {
    AddeparBloombergSubmissions {
      uuid
      createdTimestamp
      status
      submittedBy
    }
  }
`;
  const variables = {
    login: login
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query }).then(res => res.data);
};

export const getPortalUsers = (jwt, login) => {
  const query = `
  query {
    PortalUsers {
      uuid
      firstName
      lastName
      lastSeenTimestamp
      returnTimestamp
      returnMessage
      presenceToken
      isInvisible
    }
  }
`;
  const variables = {
    login: login
  };
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers["x-auth-jwt"] = jwt;
    options.credentials = "include";
    next();
  });
  return apolloFetch({ query }).then(res => res.data);
};
