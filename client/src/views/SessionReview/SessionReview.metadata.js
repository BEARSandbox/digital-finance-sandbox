const Questions = {
  1: [
    {
      key: 'confidenceInChoice',
      primaryText:
        'On a scale of 1 to 7, how confident are you that you chose the best possible credit card from the available offers?',
      secondaryText: '(1: very uncertain, 7: very confident)',
      type: 'number',
      min: 1,
      max: 7,
    },
  ],
  2: [
    {
      key: 'cardChoiceExplanation',
      primaryText: 'Explain why you chose %s.',
      args: (props) => [props.cardName],
      type: 'constrainedTextarea',
      minWordCount: 50,
      maxWordCount: 250,
    },
  ],
  3: [
    {
      labelText: 'For the card that you chose:',
      type: 'label',
    },
    {
      key: 'annualInterest',
      primaryText: 'What was the annual interest rate?',
      type: 'radio',
      options: [
        '10.99%',
        '12.99%',
        '14.99%',
        '16.99%',
        '20.99%',
        '22.99%',
        '24.99%',
        '26.99%',
        'Do not know',
        'Refuse to answer',
      ],
    },
    {
      key: 'annualInterestNoPayments',
      primaryText:
        'What was the annual interest rate changed to if you missed two or more minimum monthly payments?',
      type: 'radio',
      options: [
        '21.99%',
        '80.99%',
        '82.99%',
        '86.99%',
        '90.99%',
        '92.99%',
        '94.99%',
        '96.99%',
        'Do not know',
        'Refuse to answer',
      ],
    },
    {
      key: 'cashback',
      primaryText: 'What was the cashback rate for the first 6 months?',
      type: 'radio',
      options: [
        '1%',
        '2%',
        '3%',
        '4%',
        '7%',
        '8%',
        '9%',
        '10%',
        'Do not know',
        'Refuse to answer',
      ],
    },
    {
      key: 'cashbackAfter',
      primaryText: 'What was the cashback rate after the first 6 months?',
      type: 'radio',
      options: [
        '0.5%',
        '1%',
        '1.5%',
        '2%',
        '3.5%',
        '4%',
        '5%',
        '18%',
        'Do not know',
        'Refuse to answer',
      ],
    },
  ],
  4: [
    {
      key: 'moneyGrowth',
      primaryText:
        'Suppose you had $100 in a savings account and the interest rate was 2% per year. After 5 years, how much do you think you would have in the account if you left the money to grow?',
      type: 'radio',
      options: [
        'More than $102',
        'Exactly $102',
        'Less than $102',
        'Do not know',
        'Refuse to answer',
      ],
    },
    {
      key: 'inflationImpact',
      primaryText:
        'Imagine that the interest rate on your savings account was 1% per year and inflation was 2% per year. After 1 year, how much would you be able to buy with the money in this account?',
      type: 'radio',
      options: [
        'More than today',
        'Exactly the same',
        'Less than today',
        'Do not know',
        'Refuse to answer',
      ],
    },
    {
      key: 'bondPrice',
      primaryText:
        'If interest rates rise, what will typically happen to bond prices?',
      type: 'radio',
      options: [
        'They will rise',
        'They will fall',
        'They will stay the same',
        'There is no relationship between bond prices and the interest rates',
        'Do not know',
        'Refuse to answer',
      ],
    },
    {
      key: 'mortgageInterest',
      primaryText:
        'True or False: A 15-year mortgage typically requires higher monthly payments than a 30-year mortgage, but the total interest paid over the life of the loan will be less.',
      type: 'radio',
      options: ['True', 'False', 'Do not know', 'Refuse to answer'],
    },
    {
      key: 'stockReturn',
      primaryText:
        "True or False: Buying a single company's stock usually provides a safer return than a stock mutual fund.",
      type: 'radio',
      options: ['True', 'False', 'Do not know', 'Refuse to answer'],
    },
  ],
};

export default Questions;
