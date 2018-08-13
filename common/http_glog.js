import { createApolloFetch } from "apollo-fetch";
import { Log } from "../utils/utils";

const uri = "/api/graphql";

//const uri = "http://rod.bluesprucecapital.net/api/graphql";

/******************GLOG ***************************/
export const getGiftEvents = (jwt, login) => {
  const query = `
  query giftEvents($eventMonth:String){
     GiftEvents(eventMonth:$eventMonth) {
      uuid
      recurring
      addedDate
      eventDay
      eventMonth
      eventYear
      eventType
      notes
      registryStatus
      createdTimestamp
      eventPersons{
        uuid,
        firstName,
        lastName
      }
      eventOrganizations{
        uuid,
        name
      }
      eventGiftRequests{
        uuid
        registryStatus
        requestNotes
        requestGifts{
          uuid
          gift{
            uuid
            value
            description
            recipientPersons{
              uuid
            }
          }
        }
      }
    }
  }
`;
  const variables = {
    login: login,
    eventMonth: "02"
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

export const createGiftEvent = (jwt, login) => {
  console.log("HTTP createGiftEvent");
  const tempJSON = {
    eventDay: "01",
    eventMonth: "02",
    eventYear: "01",
    eventType: "01",
    recurring: "Yes",
    registryStatus: "Active"
  };
  const query = `
       mutation createGiftEvent($input:GiftEventInput) {
        CreateGiftEvent(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    input: tempJSON
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
export const updateGiftEvent = (jwt, login, uuid, payload) => {
  console.log("HTTP updateGiftEvent payload" + JSON.stringify(payload));
  console.log("HTTP updateGiftEvent uuid: " + uuid);
  const query = `
       mutation updateGiftEvent($giftEventUUID:String,$input:GiftEventInput) {
        UpdateGiftEvent(giftEventUUID:$giftEventUUID,input:$input) {
                   uuid
      }  }`;
  const variables = {
    giftEventUUID: uuid,
    input: payload
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

export const createGiftEventPerson = (jwt, login, geiID, personID) => {
  console.log("HTTP createGiftEventPerson gei, person " + [geiID, personID]);
  const query = `
       mutation createGiftEventPerson($giftEventUUID:String,$personUUID:String) {
        CreateGiftEventPerson(giftEventUUID:$giftEventUUID,personUUID:$personUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftEventUUID: geiID,
    personUUID: personID
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

export const createGift = (jwt, login) => {
  console.log("HTTP createGift");
  const tempJSON = {
    value: 0,
    description: "placeholder",
    giftNotes: ""
  };
  const query = `
       mutation createGift($input:GiftInput) {
        CreateGift(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    input: tempJSON
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
export const updateGift = (jwt, uuid, payload) => {
  console.log("HTTP updateGift  payload" + JSON.stringify(payload));
  console.log("HTTP updateGift  uuid: " + uuid);
  const query = `
       mutation updateGift($giftUUID:String,$input:GiftInput) {
        UpdateGift(giftUUID:$giftUUID,input:$input) {
                   uuid
      }  }`;
  const variables = {
    giftUUID: uuid,
    input: payload
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

export const createOrganization = (jwt, login) => {
  console.log("HTTP createOrganization ");
  const tempJSON = {
    name: `placeholder${Math.random()}`
  };
  const query = `
       mutation createOrganization($input:OrganizationInput) {
        CreateOrganization(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    input: tempJSON
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

export const createGiftEventOrganization = (jwt, login, geiID, orgID) => {
  console.log("HTTP createGiftEventOrganization gei, org " + [geiID, orgID]);
  const query = `
       mutation createGiftEventOrganization($giftEventUUID:String,$organizationUUID:String) {
        CreateGiftEventOrganization(giftEventUUID:$giftEventUUID,organizationUUID:$organizationUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftEventUUID: geiID,
    organizationUUID: orgID
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

export const updateOrganization = (jwt, uuid, payload) => {
  console.log("HTTP updateOrganization payload" + JSON.stringify(payload));
  console.log("HTTP updateOrganization uuid: " + uuid);
  const query = `
       mutation updateOrganization($organizationUUID:String,$input:OrganizationInput) {
        UpdateOrganization(organizationUUID:$organizationUUID,input:$input) {
                   uuid
      }  }`;
  const variables = {
    organizationUUID: uuid,
    input: payload
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

export const createGiftRequest = jwt => {
  console.log("HTTP createGiftRequest");
  const tempJSON = {
    registryStatus: `placeholder${Math.random()}`,
    requestNotes: `placeholder${Math.random()}`
  };
  const query = `
       mutation createGiftRequest($input:GiftRequestInput) {
        CreateGiftRequest(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    input: tempJSON
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

export const createGiftEventGiftRequest = (jwt, geiID, grID) => {
  console.log("HTTP createGiftEventGiftRequest gei, org " + [geiID, grID]);
  const query = `
       mutation createGiftEventGiftRequest($giftEventUUID:String,$giftRequestUUID:String) {
        CreateGiftEventGiftRequest(giftEventUUID:$giftEventUUID,giftRequestUUID:$giftRequestUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftEventUUID: geiID,
    giftRequestUUID: grID
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

export const updateGiftRequest = (jwt, uuid, payload) => {
  console.log("HTTP updateGiftRequest payload" + JSON.stringify(payload));
  console.log("HTTP updateGiftRequest uuid: " + uuid);
  const query = `
       mutation updateGiftRequest($giftRequestUUID:String,$input:GiftRequestInput) {
        UpdateGiftRequest(giftRequestUUID:$giftRequestUUID,input:$input) {
                   uuid
      }  }`;
  const variables = {
    giftRequestUUID: uuid,
    input: payload
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

export const createGiftRequestPerson = (jwt, geiID, personID) => {
  console.log("HTTP createGiftRequestPerson " + [geiID, personID]);
  const query = `
       mutation createGiftRequestPerson($giftRequestUUID:String,$personUUID:String) {
        CreateGiftRequestPerson( giftRequestUUID:$giftRequestUUID,personUUID:$personUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftRequestUUID: geiID,
    personUUID: personID
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

export const createGiftRequestGift = (jwt, giftRequestID, giftID) => {
  console.log("HTTP createGiftRequestGift " + [giftRequestID, giftID]);
  const tempJSON = {
    giftYear: "1969",
    status: "status one"
  };
  const query = `
       mutation createGiftRequestGift($giftRequestUUID:String,$giftUUID:String,$input:GiftRequestGiftInput) {
        CreateGiftRequestGift( giftRequestUUID:$giftRequestUUID,giftUUID:$giftUUID,input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    giftRequestUUID: giftRequestID,
    giftUUID: giftID,
    input: tempJSON
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

export const createGiftPerson = (jwt, giftID, personID) => {
  console.log("HTTP createGiftPerson  " + [giftID, personID]);
  const query = `
       mutation createGiftPerson($giftUUID:String,$personUUID:String) {
        CreateGiftPerson(giftUUID:$giftUUID,personUUID:$personUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftUUID: giftID,
    personUUID: personID
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
