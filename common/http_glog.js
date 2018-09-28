import { createApolloFetch } from "apollo-fetch";
import { Log } from "../utils/utils";

const uri = "/api/graphql";

//const uri = "http://rod.bluesprucecapital.net/api/graphql";

/******************GLOG ***************************/
export const getGiftEvents = (jwt, filter) => {
  let monthFilter = filter ? filter : "06";
  const query = `
  query giftEvents($eventMonth:String){
     GiftEvents(eventMonth:$eventMonth) {
      uuid
      active
      recurring
      addedDate
      eventDay
      eventMonth
      eventType
      notes
      registryStatus
      createdTimestamp
      eventPersons{
        uuid,
        firstName,
        lastName
      }
      eventGroups{
        uuid,
        name
      }
      eventOrganizations{
        uuid,
        name
      }
      eventAnimals{
        uuid,
        name
      }
      eventGiftRequests{
        uuid
      }
    }
  }
`;
  const variables = {
    eventMonth: monthFilter
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

export const getGiftEvent = (jwt, id) => {
  const query = `
  query giftEvent($giftEventUUID:String){
     GiftEvent(giftEventUUID:$giftEventUUID) {
      uuid
      eventPersons{
        uuid,
        firstName,
        lastName,
        middleName,
        legalFirstName,
        legalLastName,
        personalMobile,
        personalEmail,
        alternateEmail,
        gender,
        birthDate,
        birthSurname,
        prefix,
        suffix,
        notes,

      }
      eventGroups{
        uuid,
        name
      }
      eventOrganizations{
        uuid,
        name
      }
      eventAnimals{
        uuid,
        name
      }
      eventGiftRequests{
        uuid
        registryStatus
        requestNotes
        requestGifts{
          giftYear,
          status,
          gift{
            uuid,
            value,
            description,
            giftNotes,
            sentiment,
            assignedTo,
            recipientPersons{
              uuid
            }
            delivery{
              uuid
              attentionTo
              deliveryContactNumber
              deliveryTrackingNumber
              confirmedDeliveryDate
              location{
                uuid
                name
                formattedAddress
              }
            }
            giftVendor{
              uuid
              orderStatus
              orderNumber
              orderDate
              vendorRepresentativeName
              vendorRepresentativePhone
              vendorRepresentativeEmail
              organization{
                uuid
                name
                contactNumber
              }
            }
          }
        }
        requestPersons{
          uuid,
          firstName,
          lastName
        }
      }
    }
  }
`;
  const variables = {
    giftEventUUID: id
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
    eventMonth: "01",
    eventType: "01",
    recurring: "Yes",
    registryStatus: "Yes",
    active: true
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

export const createOrganization = jwt => {
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
                   name
                   contactNumber
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
    requestNotes: `placeholder${Math.random()}`,
    active: true
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

export const createGiftRequestGift = (jwt, giftRequestID, giftID, payload) => {
  console.log("HTTP createGiftRequestGift " + [giftRequestID, giftID]);
  /*
  const tempJSON = {
    giftYear: "1969",
    status: "status one"
  };
  */
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

export const createGiftVendor = (jwt, giftID, orgID, payload) => {
  console.log("HTTP createGiftVendor " + [giftID, orgID]);
  /*
  const tempJSON = {
    giftYear: "1969",
    status: "status one"
  };
  */
  const query = `
       mutation createGiftVendor( $giftUUID:String,$organizationUUID:String,$input:GiftVendorInput) {
        CreateGiftVendor(giftUUID:$giftUUID,organizationUUID:$organizationUUID,input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    giftUUID: giftID,
    organizationUUID: orgID,
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

export const updateGiftVendor = (jwt, giftUUID, organizationUUID, payload) => {
  console.log("HTTP updateGiftVendor payload" + JSON.stringify(payload));
  const query = `
       mutation updateGiftVendor($giftUUID:String,$organizationUUID:String,$input:GiftVendorInput) {
        UpdateGiftVendor(giftUUID:$giftUUID,organizationUUID:$organizationUUID,input:$input) {
                   uuid
      }  }`;
  const variables = {
    giftUUID: giftUUID,
    organizationUUID: organizationUUID,
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

export const createLocation = (jwt, input) => {
  console.log("HTTP createLocation");

  const query = `
       mutation createLocation($input:LocationInput) {
        CreateLocation(input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
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

export const createGiftLocation = (jwt, giftID, locationID, payload) => {
  console.log("HTTP createGiftVendor " + [giftID, locationID]);
  /*
  const tempJSON = {
    giftYear: "1969",
    status: "status one"
  };
  */
  const query = `
       mutation createGiftLocation( $giftUUID:String,$locationUUID:String,$input:GiftLocationInput) {
        CreateGiftLocation(giftUUID:$giftUUID,locationUUID:$locationUUID,input:$input) {
                   uuid
      }
    }
    `;
  const variables = {
    giftUUID: giftID,
    locationUUID: locationID,
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
export const updateGiftLocation = (jwt, giftUUID, locationUUID, payload) => {
  console.log("HTTP updateGiftLocation payload" + JSON.stringify(payload));
  const query = `
       mutation updateGiftLocation($giftUUID:String,$locationUUID:String,$input:GiftLocationInput) {
        UpdateGiftLocation(giftUUID:$giftUUID,locationUUID:$locationUUID,input:$input) {
                   uuid
      }  }`;
  const variables = {
    giftUUID: giftUUID,
    locationUUID: locationUUID,
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

export const searchOrganization = (jwt, str) => {
  const query = `
  query searchOrganization($searchText:String){
     SearchOrganization(searchText:$searchText) {
      uuid,
      name,
      contactNumber
    }
  }
`;
  const variables = {
    searchText: str
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

export const searchPerson = (jwt, str) => {
  const query = `
  query searchPerson($searchText:String){
     SearchPerson(searchText:$searchText) {
      uuid,
      firstName,
      middleName,
      lastName,
      personalMobile,
      personalEmail,
      gender,
      birthDate,
      birthSurname,
      legalLastName,
      suffix
    }
  }
`;
  const variables = {
    searchText: str
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

export const searchGroup = (jwt, str) => {
  const query = `
  query searchGroup($searchText:String){
     SearchGroup(searchText:$searchText) {
      uuid,
      name
    }
  }
`;
  const variables = {
    searchText: str
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

export const searchAnimal = (jwt, str) => {
  const query = `
  query searchAnimal($searchText:String){
     SearchAnimal(searchText:$searchText) {
      uuid,
      name,
      type
    }
  }
`;
  const variables = {
    searchText: str
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

export const createGroup = jwt => {
  console.log("HTTP createGroup ");
  const tempJSON = {
    name: `placeholder${Math.random()}`
  };
  const query = `
       mutation createGroup($input:GroupInput) {
        CreateGroup(input:$input) {
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

export const updateGroup = (jwt, uuid, payload) => {
  console.log("HTTP updateGroup payload" + JSON.stringify(payload));
  console.log("HTTP updateGroup uuid: " + uuid);
  const query = `
       mutation updateGroup($groupUUID:String,$input: GroupInput) {
        UpdateGroup(groupUUID:$groupUUID,input:$input) {
                   uuid
                   name
      }  }`;
  const variables = {
    groupUUID: uuid,
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

export const createGiftEventGroup = (jwt, login, geiID, groupID) => {
  console.log("HTTP createGiftEventGroup gei, group " + [geiID, groupID]);
  const query = `
       mutation createGiftEvenGroup($giftEventUUID:String,$groupUUID:String) {
        CreateGiftEventGroup(giftEventUUID:$giftEventUUID,groupUUID:$groupUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftEventUUID: geiID,
    groupUUID: groupID
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

export const createAnimal = jwt => {
  console.log("HTTP createAnimal ");
  const tempJSON = {
    name: `placeholder${Math.random()}`,
    type: "TBD"
  };
  const query = `
       mutation createAnimal($input:AnimalInput) {
        CreateAnimal(input:$input) {
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

export const createGiftEventAnimal = (jwt, login, geiID, animalID) => {
  console.log("HTTP createGiftEventAnimal gei, animal " + [geiID, animalID]);
  const query = `
       mutation createGiftEventAnimal($giftEventUUID:String,$animalUUID:String) {
        CreateGiftEventAnimal(giftEventUUID:$giftEventUUID,animalUUID:$animalUUID) {
                   uuid
      }
    }
    `;
  const variables = {
    giftEventUUID: geiID,
    animalUUID: animalID
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

export const updateAnimal = (jwt, uuid, payload) => {
  console.log("HTTP updateAnimal payload" + JSON.stringify(payload));
  console.log("HTTP updateAnimal uuid: " + uuid);
  const query = `
       mutation updateAnimal($animalUUID:String,$input:AnimalInput) {
        UpdateAnimal(animalUUID:$animalUUID,input:$input) {
                   uuid
                   name
                  type
      }  }`;
  const variables = {
    animalUUID: uuid,
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

export const removeGiftRequestGift = (jwt, giftRequestUUID, giftUUID) => {
  console.log("HTTP removeGiftRequestGift ");

  const query = `
       mutation removeGiftRequestGift($giftRequestUUID:String,$giftUUID:String) {
        RemoveGiftRequestGift(giftRequestUUID:$giftRequestUUID,giftUUID:$giftUUID)  }`;
  const variables = {
    giftRequestUUID: giftRequestUUID,
    giftUUID: giftUUID
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

export const removeGiftEventPerson = (jwt, giftEventUUID, personUUID) => {
  console.log("HTTP removeGiftEventPerson ");
  const query = `
       mutation removeGiftEventPerson($giftEventUUID:String,$personUUID:String) {
        RemoveGiftEventPerson(giftEventUUID:$giftEventUUID,personUUID:$personUUID)  }`;
  const variables = {
    giftEventUUID: giftEventUUID,
    personUUID: personUUID
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

export const removeGiftEventOrganization = (
  jwt,
  giftEventUUID,
  organizationUUID
) => {
  console.log("HTTP removeGiftEventOrg");
  const query = `
       mutation removeGiftEventOrganization($giftEventUUID:String,$organizationUUID:String) {
        RemoveGiftEventOrganization(giftEventUUID:$giftEventUUID,organizationUUID:$organizationUUID)  }`;
  const variables = {
    giftEventUUID: giftEventUUID,
    organizationUUID: organizationUUID
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
