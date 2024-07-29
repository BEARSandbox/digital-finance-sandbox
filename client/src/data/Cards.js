export const costMinimizationExtraCosts = [
  {
    superscript: 22,
    text: 'Minimum repayment: The greater of $10 or 5% of your outstanding balance',
  },
  {
    superscript: 15,
    text: 'Overlimit fee: $29',
  },
  {
    superscript: 11,
    text: 'Travel arrangement change or cancellation fee: $39',
  },
];

export const costMinimizationExtraRewards = [
  {
    superscript: 13,
    text: 'Extended warranty on most electronic purchases',
  },
  {
    superscript: 14,
    text: 'Accumulate rewards faster when you add additional cardholders for $50/year',
  },
  {
    superscript: 12,
    text: 'Save 2 cents/liter on fuel purchases',
  },
];

export const rewardMaximizationExtraCosts = [
  {
    superscript: 22,
    text: 'Minimum repayment: The greater of $10 or 5% of your outstanding balance',
  },
  {
    superscript: 15,
    text: 'Overlimit fee: $29',
  },
  {
    superscript: 11,
    text: 'Travel arrangement change or cancellation fee: $9',
  },
];

export const rewardMaximizationExtraRewards = [
  {
    superscript: 12,
    text: 'Save 4 cents/liter on fuel purchases',
  },
  {
    superscript: 13,
    text: 'Mobile device insurance (up to $1000)',
  },
  {
    superscript: 8,
    text: 'Complimentary membership to airport lounges',
  },
];

export const cardValues = {
  'card-m': {
    purchaseInterestRate: 22.99,
    annualFee: 200,
    cashAdvanceInterestRate: 27.99,
    cashback: 4,
    cashbackFirst6Months: 8,
    purchaseInterestRateHike: 92.99,
    cashAdvanceInterestRateHike: 97.99,
  },
  'card-n': {
    purchaseInterestRate: 20.99,
    annualFee: 250,
    cashAdvanceInterestRate: 25.99,
    cashback: 3.5,
    cashbackFirst6Months: 7,
    purchaseInterestRateHike: 90.99,
    cashAdvanceInterestRateHike: 95.99,
  },
  'card-o': {
    purchaseInterestRate: 24.99,
    annualFee: 250,
    cashAdvanceInterestRate: 29.99,
    cashback: 18,
    cashbackFirst6Months: 9,
    purchaseInterestRateHike: 94.99,
    cashAdvanceInterestRateHike: 99.99,
  },
  'card-p': {
    purchaseInterestRate: 26.99,
    annualFee: 300,
    cashAdvanceInterestRate: 31.99,
    cashback: 5,
    cashbackFirst6Months: 10,
    purchaseInterestRateHike: 96.99,
    cashAdvanceInterestRateHike: 101.99,
  },
  'card-i': {
    purchaseInterestRate: 12.99,
    annualFee: 50,
    cashAdvanceInterestRate: 17.99,
    cashback: 1,
    cashbackFirst6Months: 2,
    purchaseInterestRateHike: 82.99,
    cashAdvanceInterestRateHike: 87.99,
  },
  'card-j': {
    purchaseInterestRate: 10.99,
    annualFee: 100,
    cashAdvanceInterestRate: 15.99,
    cashback: 0.5,
    cashbackFirst6Months: 1,
    purchaseInterestRateHike: 80.99,
    cashAdvanceInterestRateHike: 85.99,
  },
  'card-k': {
    purchaseInterestRate: 14.99,
    annualFee: 100,
    cashAdvanceInterestRate: 19.99,
    cashback: 1.5,
    cashbackFirst6Months: 3,
    purchaseInterestRateHike: 21.99,
    cashAdvanceInterestRateHike: 26.99,
  },
  'card-l': {
    purchaseInterestRate: 16.99,
    annualFee: 150,
    cashAdvanceInterestRate: 21.99,
    cashback: 2,
    cashbackFirst6Months: 4,
    purchaseInterestRateHike: 86.99,
    cashAdvanceInterestRateHike: 91.99,
  },
};

export const AllCards = [
  {
    key: 'card-m',
    category: 'rewards',
    image: '/assets/images/card-m.png',
    name: 'Card M',
    description: '',
    baseCosts: [
      {
        superscript: 23,
        name: 'Purchase interest rate',
        text: `Purchase interest rate: ${cardValues['card-m'].purchaseInterestRate}%`,
      },
      {
        superscript: 24,
        name: 'Annual fee',
        text: `Annual fee: $${cardValues['card-m'].annualFee}`,
      },
      {
        superscript: 4,
        name: 'Cash advance interest rate',
        text: `Cash advance interest rate: ${cardValues['card-m'].cashAdvanceInterestRate}%`,
      },
    ],
    baseRewards: [
      {
        superscript: 1,
        name: 'Initial cashback offer',
        text: `Earn up to ${cardValues['card-m'].cashbackFirst6Months}% cashback on all purchases in the first 6 months`,
      },
      {
        superscript: 1,
        name: 'Adjusted cashback offer',
        text: `Earn ${cardValues['card-m'].cashback}% cashback on all purchases after the first 6 months`,
      },
      {
        superscript: 3,
        text: `Waiver of annual fee in first year`,
      },
    ],
  },
  {
    key: 'card-n',
    category: 'rewards',
    image: '/assets/images/card-n.png',
    name: 'Card N',
    description: '',
    baseCosts: [
      {
        superscript: 23,
        name: 'Purchase interest rate',
        text: `Purchase interest rate: ${cardValues['card-n'].purchaseInterestRate}%`,
      },
      {
        superscript: 24,
        name: 'Annual fee',
        text: `Annual fee: $${cardValues['card-n'].annualFee}`,
      },
      {
        superscript: 4,
        name: 'Cash advance interest rate',
        text: `Cash advance interest rate: ${cardValues['card-n'].cashAdvanceInterestRate}%`,
      },
    ],
    baseRewards: [
      {
        superscript: 1,
        name: 'Initial cashback offer',
        text: `Earn up to ${cardValues['card-n'].cashbackFirst6Months}% cashback on all purchases in the first 6 months`,
      },
      {
        superscript: 1,
        name: 'Adjusted cashback offer',
        text: `Earn ${cardValues['card-n'].cashback}% cashback on all purchases after the first 6 months`,
      },
      {
        superscript: 3,
        text: `Waiver of annual fee in first year`,
      },
    ],
  },
  {
    key: 'card-o',
    category: 'rewards',
    image: '/assets/images/card-o.png',
    name: 'Card O',
    description: '',
    baseCosts: [
      {
        superscript: 23,
        name: 'Purchase interest rate',
        text: `Purchase interest rate: ${cardValues['card-o'].purchaseInterestRate}%`,
      },
      {
        superscript: 24,
        name: 'Annual fee',
        text: `Annual fee: $${cardValues['card-o'].annualFee}`,
      },
      {
        superscript: 4,
        name: 'Cash advance interest rate',
        text: `Cash advance interest rate: ${cardValues['card-o'].cashAdvanceInterestRate}%`,
      },
    ],
    baseRewards: [
      {
        superscript: 1,
        name: 'Initial cashback offer',
        text: `Earn up to ${cardValues['card-o'].cashbackFirst6Months}% cashback on all purchases in the first 6 months`,
      },
      {
        superscript: 1,
        name: 'Adjusted cashback offer',
        text: `Earn ${cardValues['card-o'].cashback}% cashback on all purchases after the first 6 months`,
      },
      {
        superscript: 3,
        text: `Waiver of annual fee in first year`,
      },
    ],
  },
  {
    key: 'card-p',
    category: 'rewards',
    image: '/assets/images/card-p.png',
    name: 'Card P',
    description: '',
    baseCosts: [
      {
        superscript: 23,
        name: 'Purchase interest rate',
        text: `Purchase interest rate: ${cardValues['card-p'].purchaseInterestRate}%`,
      },
      {
        superscript: 24,
        name: 'Annual fee',
        text: `Annual fee: $${cardValues['card-p'].annualFee}`,
      },
      {
        superscript: 4,
        name: 'Cash advance interest rate',
        text: `Cash advance interest rate: ${cardValues['card-p'].cashAdvanceInterestRate}%`,
      },
    ],
    baseRewards: [
      {
        superscript: 1,
        name: 'Initial cashback offer',
        text: `Earn up to ${cardValues['card-p'].cashbackFirst6Months}% cashback on all purchases in the first 6 months`,
      },
      {
        superscript: 1,
        name: 'Adjusted cashback offer',
        text: `Earn ${cardValues['card-p'].cashback}% cashback on all purchases after the first 6 months`,
      },
      {
        superscript: 3,
        text: `Waiver of annual fee in first year`,
      },
    ],
  },
  {
    key: 'card-i',
    category: 'low-fees',
    image: '/assets/images/card-i.png',
    name: 'Card I',
    description: '',
    baseCosts: [
      {
        superscript: 23,
        name: 'Purchase interest rate',
        text: `Purchase interest rate: ${cardValues['card-i'].purchaseInterestRate}%`,
      },
      {
        superscript: 24,
        name: 'Annual fee',
        text: `Annual fee: $${cardValues['card-i'].annualFee}`,
      },
      {
        superscript: 4,
        name: 'Cash advance interest rate',
        text: `Cash advance interest rate: ${cardValues['card-i'].cashAdvanceInterestRate}%`,
      },
    ],
    baseRewards: [
      {
        superscript: 1,
        name: 'Initial cashback offer',
        text: `Earn up to ${cardValues['card-i'].cashbackFirst6Months}% cashback on all purchases in the first 6 months`,
      },
      {
        superscript: 1,
        name: 'Adjusted cashback offer',
        text: `Earn ${cardValues['card-i'].cashback}% cashback on all purchases after the first 6 months`,
      },
      {
        superscript: 3,
        text: `Waiver of annual fee in first year`,
      },
    ],
  },
  {
    key: 'card-j',
    category: 'low-fees',
    image: '/assets/images/card-j.png',
    name: 'Card J',
    description: '',
    baseCosts: [
      {
        superscript: 23,
        name: 'Purchase interest rate',
        text: `Purchase interest rate: ${cardValues['card-j'].purchaseInterestRate}%`,
      },
      {
        superscript: 24,
        name: 'Annual fee',
        text: `Annual fee: $${cardValues['card-j'].annualFee}`,
      },
      {
        superscript: 4,
        name: 'Cash advance interest rate',
        text: `Cash advance interest rate: ${cardValues['card-j'].cashAdvanceInterestRate}%`,
      },
    ],
    baseRewards: [
      {
        superscript: 1,
        name: 'Initial cashback offer',
        text: `Earn up to ${cardValues['card-j'].cashbackFirst6Months}% cashback on all purchases in the first 6 months`,
      },
      {
        superscript: 1,
        name: 'Adjusted cashback offer',
        text: `Earn ${cardValues['card-j'].cashback}% cashback on all purchases after the first 6 months`,
      },
      {
        superscript: 3,
        text: `Waiver of annual fee in first year`,
      },
    ],
  },
  {
    key: 'card-k',
    category: 'low-fees',
    image: '/assets/images/card-k.png',
    name: 'Card K',
    description: '',
    baseCosts: [
      {
        superscript: 23,
        name: 'Purchase interest rate',
        text: `Purchase interest rate: ${cardValues['card-k'].purchaseInterestRate}%`,
      },
      {
        superscript: 24,
        name: 'Annual fee',
        text: `Annual fee: $${cardValues['card-k'].annualFee}`,
      },
      {
        superscript: 4,
        name: 'Cash advance interest rate',
        text: `Cash advance interest rate: ${cardValues['card-k'].cashAdvanceInterestRate}%`,
      },
    ],
    baseRewards: [
      {
        superscript: 1,
        name: 'Initial cashback offer',
        text: `Earn up to ${cardValues['card-k'].cashbackFirst6Months}% cashback on all purchases in the first 6 months`,
      },
      {
        superscript: 1,
        name: 'Adjusted cashback offer',
        text: `Earn ${cardValues['card-k'].cashback}% cashback on all purchases after the first 6 months`,
      },
      {
        superscript: 3,
        text: `Waiver of annual fee in first year`,
      },
    ],
  },
  {
    key: 'card-l',
    category: 'low-fees',
    image: '/assets/images/card-l.png',
    name: 'Card L',
    description: '',
    baseCosts: [
      {
        superscript: 23,
        name: 'Purchase interest rate',
        text: `Purchase interest rate: ${cardValues['card-l'].purchaseInterestRate}%`,
      },
      {
        superscript: 24,
        name: 'Annual fee',
        text: `Annual fee: $${cardValues['card-l'].annualFee}`,
      },
      {
        superscript: 4,
        name: 'Cash advance interest rate',
        text: `Cash advance interest rate: ${cardValues['card-l'].cashAdvanceInterestRate}%`,
      },
    ],
    baseRewards: [
      {
        superscript: 1,
        name: 'Initial cashback offer',
        text: `Earn up to ${cardValues['card-l'].cashbackFirst6Months}% cashback on all purchases in the first 6 months`,
      },
      {
        superscript: 1,
        name: 'Adjusted cashback offer',
        text: `Earn ${cardValues['card-l'].cashback}% cashback on all purchases after the first 6 months`,
      },
      {
        superscript: 3,
        text: `Waiver of annual fee in first year`,
      },
    ],
  },
];

export default AllCards;
