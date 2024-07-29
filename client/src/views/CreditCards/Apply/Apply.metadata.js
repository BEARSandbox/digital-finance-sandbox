// const validEmail = (email) => {
//   return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
//     email
//   );
// };

const validNumber = (value) => {
  value = value.replace(/,/g, '');
  return !isNaN(value);
};

const validYearMonth = (date) => {
  if (date === '') return true;
  const tokens = date.trim().split('-');
  if (tokens.length !== 2) return false;
  if (tokens[0].length !== 4) return false;
  if (tokens[1].length !== 2) return false;

  const isYearDigits = /^\d+$/.test(tokens[0]);
  const isMonthDigits = /^\d+$/.test(tokens[1]);
  if (!isYearDigits) return false;
  if (!isMonthDigits) return false;

  return true;
};

const Personal = {
  name: 'Personal Info',
  heading: 'Tell us about yourself',
  fields: [
    {
      key: 'dob',
      text: 'When were you born? (yyyy-mm)',
      type: 'text',
      validate: true,
      isValid: validYearMonth,
    },
    // {
    //   key: 'email',
    //   text: 'What is your email address?',
    //   type: 'text',
    //   required: true,
    //   isValid: validEmail,
    // },
    {
      key: 'city',
      text: 'City',
      type: 'text',
    },
    {
      key: 'province',
      text: 'Province or State',
      type: 'text',
    },
    {
      key: 'housingStatus',
      text: 'Housing Status',
      type: 'dropdown',
      options: ['Own', 'Rent', 'Other'],
    },
    {
      key: 'housingExpense',
      text: 'How much do you pay for your rent/mortgage? (monthly)',
      type: 'text',
      validate: true,
      isValid: validNumber,
    },
  ],
};
const Employment = {
  name: 'Employment Info',
  heading: 'Tell us what you do for a living',
  fields: [
    {
      key: 'occupation',
      text: 'Occupation',
      type: 'dropdown',
      options: ['Employed', 'Student', 'Unemployed', 'Retired'],
    },
    {
      key: 'annualIncome',
      text: 'What is your estimated annual income?',
      type: 'text',
      validate: true,
      isValid: validNumber,
    },
  ],
};

export const Forms = [Personal, Employment];
