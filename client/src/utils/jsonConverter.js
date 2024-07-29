import dateFormat from 'dateformat';
import { Parser } from 'json2csv';

const convertEpochToDate = (fieldName) => (item) => {
  const newItem = { ...item };
  if (fieldName in newItem) {
    const dateObj = new Date(newItem[fieldName]);
    newItem[fieldName] = dateFormat(dateObj, 'mm/dd/yyyy HH:MM:ss:l Z');
  }
  return newItem;
};

const splitId = (item) => {
  const [userId, createdAt] = item.id.split(' ');
  item.userId = userId;
  item.createdAt = createdAt;
  return item;
};

const convertFactorNumbersToNames = (item) => {
  item.factorOne =
    item.factorOne === 0 ? 'Cost minimization' : 'Reward maximization';

  if (item.factorTwo === 0) item.factorTwo = 'Cost minimization';
  else if (item.factorTwo === 1) item.factorTwo = 'Reward maximization';
  else item.factorTwo = 'Null';

  item.factorThree = item.factorThree === 0 ? 'Undistinguished' : 'Salient';
  return item;
};

const convertStringToBoolean = (item) => {
  if (item.existingCreditCard) {
    item.existingCreditCard = item.existingCreditCard === 'Yes' ? true : false;
  }
  if (item.over18) {
    item.over18 = item.over18 === 'Yes' ? true : false;
  }
  return item;
};

const convertNullToZero = (item) => {
  if (!item.retries) item.retries = 0;
  return item;
};

const addCorrectCard = (item) => {
  if (item.factorOne === 'Cost minimization') {
    item.correctCard = 'Card K';
  } else if (item.factorOne === 'Reward maximization') {
    item.correctCard = 'Card O';
  }
  return item;
};

const convertSideLabels = (item) => {
  if (item.metadata && item.metadata.side) {
    item.metadata.side = item.metadata.side === 'cardOne' ? 'Left' : 'Right';
  }
  return item;
};

const addHumanTime = (item) => {
  item.createdAtHuman = item.createdAt; // will be updated after
  return item;
};

const addDuration = (item) => {
  if (!item.start || !item.end) return item;

  const startDate = new Date(item.start);
  const endDate = new Date(item.end);
  const diff = endDate.getTime() - startDate.getTime();

  const number = diff / 1000;
  item.duration = number.toFixed(3) + 's'; // in seconds to 3 decimal places
  return item;
};

export const createUserCSV = (users) => {
  const fields = [
    {
      label: 'User Id',
      value: 'id',
    },
    {
      label: 'Created At (Epoch time)',
      value: 'createdAt',
    },
    {
      label: 'Created At (Human time)',
      value: 'createdAtHuman',
    },
    {
      label: 'Admin',
      value: 'isAdmin',
    },
    {
      label: 'Is RA',
      value: 'isRA',
    },
    {
      label: 'Quiz Retries',
      value: 'retries',
    },
    {
      label: 'OS',
      value: 'os',
    },
    {
      label: 'Browser',
      value: 'browser',
    },
    {
      label: 'Device',
      value: 'device',
    },
    {
      label: 'Assignment Id',
      value: 'assignmentId',
    },
    {
      label: 'Survey Code',
      value: 'surveyCode',
    },
    {
      label: 'Consent Given',
      value: 'hasConsented',
    },
    {
      label: 'Factor 1 (Hypothetical Scenario)',
      value: 'factorOne',
    },
    {
      label: 'Factor 2 (Page Emphasis)',
      value: 'factorTwo',
    },
    {
      label: 'Factor 3 (Schumer Box Timing)',
      value: 'factorThree',
    },
    {
      label: 'Card Chosen',
      value: 'card',
    },
    {
      label: 'Correct Card',
      value: 'correctCard',
    },
    {
      label: 'Date of Birth (yyyy-mm)',
      value: 'dob',
    },
    {
      label: 'City',
      value: 'city',
    },
    {
      label: 'Province',
      value: 'province',
    },
    {
      label: 'Housing Status',
      value: 'housingStatus',
    },
    {
      label: 'Housing Expense (Monthly)',
      value: 'housingExpense',
    },
    {
      label: 'Occupation',
      value: 'occupation',
    },
    {
      label: 'Annual Income',
      value: 'annualIncome',
    },
    {
      label: 'Existing Credit Card',
      value: 'existingCreditCard',
    },
    {
      label: 'Over 18',
      value: 'over18',
    },
    {
      label: 'Checkbox - Fees Page',
      value: 'checkbox1',
    },
    {
      label: 'Checkbox - Before Form Submit',
      value: 'checkbox2',
    },
    {
      label: 'Checkbox - Schumer Box',
      value: 'schumerBoxCheckbox',
    },
    {
      label: 'Checkbox - Terms',
      value: 'termsManagerCheckbox',
    },
    {
      label: 'Default Rate Visible (Card I)',
      value: 'defaultRateVisibleI',
    },
    {
      label: 'Default Rate Visible (Card J)',
      value: 'defaultRateVisibleJ',
    },
    {
      label: 'Default Rate Visible (Card K)',
      value: 'defaultRateVisibleK',
    },
    {
      label: 'Default Rate Visible (Card L)',
      value: 'defaultRateVisibleL',
    },
    {
      label: 'Default Rate Visible (Card M)',
      value: 'defaultRateVisibleM',
    },
    {
      label: 'Default Rate Visible (Card N)',
      value: 'defaultRateVisibleN',
    },
    {
      label: 'Default Rate Visible (Card O)',
      value: 'defaultRateVisibleO',
    },
    {
      label: 'Default Rate Visible (Card P)',
      value: 'defaultRateVisibleP',
    },
    {
      label: 'Annual Interest',
      value: 'annualInterest',
    },
    {
      label: 'Annual Interest - No Payment Made',
      value: 'annualInterestNoPayments',
    },
    {
      label: 'Cashback (First 6 Months)',
      value: 'cashback',
    },
    {
      label: 'Cashback (After 6 Months)',
      value: 'cashbackAfter',
    },
    {
      label: 'Confidence Factor (1 to 7)',
      value: 'confidenceInChoice',
    },
    {
      label: 'Card Choice Explanation',
      value: 'cardChoiceExplanation',
    },
    {
      label: 'Money Growth',
      value: 'moneyGrowth',
    },
    {
      label: 'Inflation Impact',
      value: 'inflationImpact',
    },
    {
      label: 'Bond Prices',
      value: 'bondPrice',
    },
    {
      label: 'T/F: Mortgage Interest',
      value: 'mortgageInterest',
    },
    {
      label: 'T/F: Stock Returns',
      value: 'stockReturn',
    },
  ];
  const transforms = [
    addHumanTime,
    convertEpochToDate('createdAtHuman'),
    convertFactorNumbersToNames,
    convertStringToBoolean,
    convertNullToZero,
    addCorrectCard,
  ];
  const excelStrings = true;
  const opts = { fields, transforms, excelStrings };

  try {
    const parser = new Parser(opts);
    const csv = parser.parse(users);
    return csv;
  } catch (err) {
    console.error(err);
  }
};

export const createPageCSV = (pages) => {
  const fields = [
    {
      label: 'User Id',
      value: 'userId',
    },
    {
      label: 'Webpage',
      value: 'webpage',
    },
    {
      label: 'Start Time',
      value: 'start',
    },
    {
      label: 'End Time',
      value: 'end',
    },
  ];

  const transforms = [
    convertEpochToDate('start'),
    convertEpochToDate('end'),
    splitId,
  ];
  const excelStrings = true;
  const opts = { fields, transforms, excelStrings };

  try {
    const parser = new Parser(opts);
    const csv = parser.parse(pages);
    return csv;
  } catch (err) {
    console.error(err);
  }
};

export const createActionCSV = (actions) => {
  const fields = [
    {
      label: 'User Id',
      value: 'userId',
    },
    {
      label: 'Time',
      value: 'time',
    },
    {
      label: 'Type',
      value: 'type',
    },
    {
      label: 'Clicked On (Button Name - Button Location)',
      value: 'clickedOn',
    },
    {
      label: 'Position',
      value: 'position',
    },
    {
      label: 'Checked',
      value: 'changedTo',
    },
    {
      label: 'Webpage',
      value: 'webpage',
    },
    {
      label: 'Start Time',
      value: 'start',
    },
    {
      label: 'End Time',
      value: 'end',
    },
    {
      label: 'Duration',
      value: 'duration',
    },
    {
      label: 'Card Selected',
      value: 'metadata.card',
    },
    {
      label: 'Side',
      value: 'metadata.side',
    },
    {
      label: 'Superscript',
      value: 'metadata.superscript',
    },
    {
      label: 'Text for Superscript',
      value: 'metadata.text',
    },
  ];
  const transforms = [
    addDuration,
    convertEpochToDate('time'),
    convertEpochToDate('start'),
    convertEpochToDate('end'),
    convertSideLabels,
    splitId,
  ];
  const excelStrings = true;
  const opts = { fields, transforms, excelStrings };

  try {
    const parser = new Parser(opts);
    const csv = parser.parse(actions);
    return csv;
  } catch (err) {
    console.error(err);
  }
};
