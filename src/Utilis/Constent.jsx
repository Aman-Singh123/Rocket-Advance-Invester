export const rootName = "/";

export const newDealsColoms = [
  {
    title: "Number",
    dataIndex: "unique_deal_number1",
    key: "unique_deal_number1",
    fixed: "left",
  },
  {
    title: "City",
    dataIndex: "Property_Citys",
    key: "Property_Citys",
  },
  {
    title: "Per Day Income",
    dataIndex: "Inv_Income_per_Day",
    key: "Inv_Income_per_Day",
  },
  {
    title: <span></span>,
    dataIndex: "click",
    key: "click",
  },
];

export const classes = {
  "Awaiting to Upload": "yellowText",
  Rejected: "redText",
  Approved: "seaGreenText",
  "Pending Approval": "greenText",
  "Under Review": "yellowText",
  "New Deal": "skyBlueText",
  "More Information Needed":"yellowText",
  // "New Deal": "seaGreenText",
  Underwriting: "orangeText",
  "Closed Won": "greenText",
  Funded: "greenText",
  "Deal Fully Closed": "purpleText",
  Denied: "redText",
  "Closed Lost": "redText",

};

export const renameValue = {
  "New Deal": "New",
  "More Information Needed": "Information Required",
  Underwriting: "Under Review",
  Approved: "Approved",
  "Closed Won": "Funded",
  Funded: "Funded",
  "Deal Fully Closed": "Completed",
  Denied: "Denied",
  "Closed Lost": "Denied",
};

export const stateClass = (value) => classes[value] || "grayText";
export const renameStatus = (val) => renameValue[val] || val;

export const isValue = (value) => {
  if (!value) return "-";
  return value;
};

export const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getDate = (date) =>
  `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;

export function formatDate(inputDate) {
  var dateParts = inputDate.split("-");
  var year = dateParts[0];
  var m = dateParts[1];
  var day = dateParts[2];

  var monthName = month[parseInt(m) - 1];

  var formattedDate = monthName + " " + day + ", " + year;
  return formattedDate;
}


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}