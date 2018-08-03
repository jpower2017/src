export const data1 = [
  {
    id: 1,
    name: "Investments",
    level: 1,
    show: true,
    leaf: false,
    endpoint: "/investments/portfolio"
  },
  {
    id: 2,
    name: "FlowWright Login",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/flowWright"
  },
  {
    id: 3,
    name: "FlowWright Task",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/flowWright2"
  },
  {
    id: 4,
    name: "FlowWright Form",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/flowWright3"
  },
  {
    id: 5,
    name: "New request",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/flowWrightAPI",
    allow: "Work Flow Admin"
  },
  {
    id: 7,
    name: "BoxToken",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/boxtoken"
  },
  {
    id: 9,
    name: "Positive Pay",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/positivePay",
    allow: "PositivePayBanks"
  },
  {
    id: 10,
    name: "Pending List",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/pendingList",
    allow: "CreatePendingSubmission"
  },
  {
    id: 11,
    name: "Addepar",
    level: 1,
    show: true,
    leaf: false,
    endpoint: "/addepar/bloomberg",
    allow: "AddeparBloombergSubmissions"
  },
  {
    id: 12,
    name: "BoxToken Native",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/boxtokenNative"
  },
  {
    id: 13,
    name: "G-log Input",
    level: 1,
    show: true,
    leaf: true,
    favorite: false,
    endpoint: "/glogInput"
  }
];

export const data2 = [
  {
    id: 201,
    name: "Portfolio",
    parentId: 1,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/investments/portfolio",
    parentName: "Investments"
  },
  {
    id: 202,
    name: "Michael",
    parentId: 1,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/investments/michael",
    parentName: "Investments"
  },
  {
    id: 203,
    name: "Tara",
    parentId: 1,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/investments/tara",
    parentName: "Investments"
  },
  {
    id: 204,
    name: "Kaily",
    parentId: 1,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/investments/kaily",
    parentName: "Investments"
  },

  {
    id: 210,
    name: "Export to Bloomberg",
    parentId: 11,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/addepar/bloomberg",
    parentName: "Addepar"
  },
  {
    id: 211,
    name: "Export to Intacct",
    parentId: 11,
    level: 2,
    show: false,
    leaf: true,
    favorite: false,
    endpoint: "/addepar/intacct",
    parentName: "Addepar"
  }
];

export const data3 = [];
