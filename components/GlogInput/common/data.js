export const statuses = [
  { status: "discovery", title: "Discovery", color: "#9FA8DA", value: 1 },
  { status: "accounting", title: "Accounting", color: "#FFF59D", value: 2 },
  {
    status: "awaitApproval",
    title: "Awaiting approval",
    color: "#FFCC80",
    value: 3
  },
  { status: "approved", title: "Approved", color: "", value: 4 },
  { status: "vendor", title: "Vendor", color: "#A5D6A7", value: 5 },
  { status: "wrap", title: "Wrap", color: "#EF9A9A", value: 6 },
  { status: "received", title: "Received", color: "#9E9E9E", value: 7 }
];
export const columnsGiftEventInstance = [
  { name: "event", title: "EVENT", type: "string", order: 1 },
  { name: "date", title: "DATE", type: "string", order: 2 },
  { name: "recipients", title: "RECIPIENTS", type: "string", order: 3 }
];

export const columnsPerson = [
  { name: "placeholder", title: "", type: "string", order: 1 },
  { name: "name", title: "NAME", type: "string", order: 2 },
  { name: "phone", title: "PHONE", type: "string", order: 4 },
  { name: "dob", title: "DOB", type: "date", order: 5 }
];

export const columnsOrg = [
  { name: "placeholder", title: "", type: "string", order: 1 },
  { name: "name", title: "Name", type: "string", order: 2 },
  { name: "name", title: "Number", type: "string", order: 3 }
];

export const columnsAnimal = [
  { name: "placeholder", title: "", type: "string", order: 1 },
  { name: "name", title: "Name", type: "string", order: 2 }
];
export const columnsGroup = [
  { name: "placeholder", title: "", type: "string", order: 1 },
  { name: "name", title: "Name", type: "string", order: 2 }
];
export const columnsGift = [
  { name: "person", title: "PERSON", type: "string", order: 1 },
  { name: "address", title: "ADDRESS", type: "string", order: 2 },
  { name: "due", title: "DUE DATE", type: "date", order: 3 },
  { name: "occasion", title: "OCCASION", type: "string", order: 4 },
  { name: "status", title: "STATUS", type: "string", order: 5 },
  { name: "groupStatus", title: "GROUP STATUS", type: "string", order: 6 }
];

export const columnsLocation = [
  { name: "placeholder", title: "", type: "string", order: 1 },
  { name: "street", title: "STREET", type: "string", order: 2 },
  { name: "city", title: "CITY", type: "string", order: 3 },
  { name: "state", title: "STATE", type: "string", order: 4 },
  { name: "zip", title: "ZIP", type: "string", order: 5 }
];

export const parties = [
  { name: "people", title: "People", value: "people" },
  { name: "orgs", title: "Organization", value: "orgs" },
  { name: "animals", title: "Animals", value: "animals" },
  { name: "group", title: "Groups", value: "groups" }
];
export const events = [
  { name: "adminDay", title: "Admin Professionals Day", date: "", value: 0 },
  { name: "easter", title: "Easter", date: "", value: 1 },
  { name: "fathersDay", title: "Father's Day", date: "", value: 2 },
  { name: "halloween", title: "Halloween", date: "", value: 3 },
  { name: "mothersDay", title: "Mother's Day", date: "", value: 4 },
  { name: "passover", title: "Passover", date: "", value: 5 },
  { name: "rosh", title: "Rosh Hashanah", date: "", value: 6 },
  { name: "thanksgiving", title: "Thanksgiving", date: "", value: 7 },
  { name: "valentines", title: "Valentine's Day", date: "", value: 8 },
  { name: "xmas", title: "Christmas/Chanukah", date: "12/25", value: 9 },
  { name: "birthday", title: "Birthday", date: "", value: 10 },
  { name: "work", title: "Work Anniversary", date: "", value: 11 },
  { name: "marriage", title: "Marriage Anniversary", date: "", value: 12 },
  { name: "death", title: "Death Anniversary", date: "", value: 13 },
  { name: "holidayCard", title: "Holiday Card", date: "", value: 14 }
];
export const registryStatuses = [
  { name: "active", title: "Active", value: 0 },
  { name: "noList", title: "No list", value: 1 },
  { name: "removed", title: "Removed", value: 2 }
];
export const fieldsPerson = [
  { name: "firstName", title: "First name" },
  { name: "lastName", title: "Last name" },
  { name: "gender", title: "Gender", type: "gender" },
  { name: "dob", title: "Date of birth", type: "date" },
  { name: "email", title: "Personal email", type: "email" },
  { name: "phone", title: "Person phone #", type: "phone" },
  { name: "pob", title: "Place of birth" },
  { name: "dod", title: "Date of death", type: "date" }
];
export const fieldsOrgs = [{ name: "name", title: "Name" }];
export const fieldsAnimals = [
  { name: "name", title: "Animal name" },
  { name: "type", title: "Animal type" }
];
export const fieldsGroups = [{ name: "name", title: "Name" }];
export const fieldsRequests = [
  { name: "registryStatus", title: "Registry status" },
  { name: "requestNotes", title: "Request Notes", uiType: "textArea" }
];
export const fieldsLog = [
  { name: "logField1", title: "Log Field 1" },
  { name: "logField2", title: "Log Field 2" }
];
export const fieldsGift = [
  { name: "value", title: "Value", type: "string", order: 1 },
  { name: "giftNotes", title: "Gift Notes", type: "string", order: 2 },
  { name: "description", title: "Description", type: "string", order: 3 }
];
export const fieldsLocation = [
  {
    name: "streetAddress1",
    title: "Street address 1",
    type: "string",
    order: 1
  },
  {
    name: "streetAddress2",
    title: "Street address 2",
    type: "string",
    order: 2
  },
  { name: "city", title: "City", type: "string", order: 3 },
  { name: "state", title: "State", type: "string", order: 4 },
  { name: "zipcode", title: "Zip code", type: "string", order: 5 },
  { name: "country", title: "Country", type: "string", order: 6 }
];

export const fieldsVendor = [
  { name: "name", title: "Name" },
  { name: "work", title: "Work number" }
];
export const fieldsDelivery = [
  { name: "attentionTo", title: "Attention to" },
  { name: "trackingNum", title: "Tracking number" },
  { name: "deliveryDate", title: "Delivery date" }
];
export const fieldsOrder = [
  { name: "status", title: "Status", uiType: "dropDown" },
  { name: "orderNumber", title: "Order number" },
  { name: "orderDate", title: "Order date", type: "date" },
  { name: "repName", title: "Rep name" },
  { name: "repPhone", title: "Rep phone", type: "phone" },
  { name: "repEmail", title: "Rep email" }
];
export const dataLog = [
  { id: 1, logField1: "lf1" },
  { id: 2, logField2: "lf2" }
];
export const dataVendor = [{ id: 1, vendorField1: "vf1" }];
export const dataGift = [{ id: 1, person: "p1" }];
export const dataDelivery = [{ id: 1, deliveryField1: "df1" }];
export const dataPeople = [
  {
    id: 1,
    person: "person1",
    address: "addy1",
    dob: "1/2/19",
    selected: true
  },
  {
    id: 2,
    person: "person2",
    address: "addy2",
    dob: "1/22/19",
    selected: true
  },
  {
    id: 3,
    person: "person3",
    address: "addy3",
    dob: "1/24/19",
    selected: true
  },
  {
    id: 4,
    person: "person4",
    address: "addy4",
    dob: "1/25/19",
    selected: true
  }
];

export const appLogic = [
  { tab: "people", order: 1, fields: fieldsPerson, data: dataPeople },
  { tab: "log", order: 2, fields: fieldsLog, data: dataLog },
  { tab: "gifts", order: 3, fields: fieldsGift, data: dataGift },
  { tab: "locations", order: 4, fields: fieldsLocation, data: "" },
  { tab: "vendor", order: 5, fields: fieldsVendor, data: "" },
  { tab: "delivery", order: 6, fields: fieldsDelivery, data: "" },
  { tab: "order", order: 7, fields: fieldsOrder, data: "" },
  { tab: "orgs", order: 8, fields: fieldsOrgs, data: "" },
  { tab: "animals", order: 9, fields: fieldsAnimals, data: "" },
  { tab: "groups", order: 10, fields: fieldsGroups, data: "" },
  { tab: "requests", order: 11, fields: fieldsRequests, data: "" }
];
