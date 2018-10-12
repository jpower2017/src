const subForms1 = [
  {
    name: "subform",
    title: "",
    fields: [
      {
        name: "contractorLegalEntity",
        title: "Contractor Legal Entity",
        required: true
      },
      {
        name: "contractorRepresentative",
        title: "Contractor Representative Name"
      },
      {
        name: "contractorPhone",
        title: "Representative Phone Number",
        type: "number"
      },
      {
        name: "contractorEmail",
        title: "Representative Email"
      },
      {
        name: "contractInPlace",
        title:
          "Is there a contract in place or will there be a signed contract in place?",
        type:
          "Is there a contract in place or will there be a signed contract in place?",
        required: true,
        uiType: "dd",
        uiOptions: [
          {
            name: "Yes",
            title: "Yes",
            value: "Yes"
          },
          {
            name: "No",
            title: "No",
            value: "No"
          }
        ]
      },
      {
        name: "contractBeginDate",
        title: "What is the first day of the contract work?",
        type: "date"
      },
      {
        name: "corporateOrPropertyFamily",
        title: "Corporate Function or Property/Family Function",
        type: "corporateOrPropertyFamily",
        required: true,
        uiType: "dd",
        uiOptions: [
          {
            name: "Corporate Function",
            title: "Corporate Function",
            value: "Corporate Function"
          },
          {
            name: "Property or Family Function",
            title: "Property or Family Function",
            value: "Property or Family Function"
          }
        ]
      },
      {
        name: "familyMember",
        title: "Which family member is primarily contracting?",
        type: "familyMember",
        uiType: "dd",
        required: true,
        uiOptions: [
          {
            name: "Mrs. and/or Mr. Smith",
            title: "Mrs. and/or Mr. Smith",
            value: "Mrs. and/or Mr. Smith"
          },
          {
            name: "Mrs. and/or Mr. Smith/Westbrook",
            title: "Mrs. and/or Mr. Smith/Westbrook",
            value: "Mrs. and/or Mr. Smith/Westbrook"
          },
          {
            name: "Mrs. and/or Mr. Smith/Swibel",
            title: "Mrs. and/or Mr. Smith/Swibel",
            value: "Mrs. and/or Mr. Smith/Swibel"
          },
          { name: "Corporate", title: "Corporate", value: "Corporate" }
        ]
      },
      {
        name: "LegalEntity",
        title: "Which of our legal entities pays the contractor?"
      },
      {
        name: "property",
        title: "At which property will work be performed?"
      },
      {
        name: "standardORshort",
        title:
          "Will the contractor have direct or potential access confidential family information?",
        uiType: "dd",
        required: true,
        uiOptions: [
          {
            name: "one",
            title:
              "Contractor will have or potentially have direct access to confidential family information.",
            value:
              "Contractor will have or potentially have direct access to confidential family information."
          },
          {
            name: "two",
            title:
              "Contractor will not have direct access to confidential family information.",
            value:
              "Contractor will not have direct access to confidential family information."
          }
        ]
      }
    ]
  }
];
export const forms = [
  {
    title: "Contractor Confidentiality Agreement Request Form",
    form: subForms1
  }
];
