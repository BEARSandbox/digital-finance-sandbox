export default {
  getCardCategoryIcon: (categoryKey) => {
    switch (categoryKey) {
      case 'all':
        return '/assets/icons/credit-cards.png';
      case 'rewards':
        return '/assets/icons/cash-back.png';
      case 'low-fees':
        return '/assets/icons/low-fees.png';
      default:
        return '/assets/icons/credit-cards.png';
    }
  },
  getCardCategoryName: (categoryKey) => {
    switch (categoryKey) {
      case 'all':
        return 'All Cards';
      case 'rewards':
        return 'Cashback Rewards';
      case 'low-fees':
        return 'Low Interest and Fees';
      default:
        return '';
    }
  },
};
