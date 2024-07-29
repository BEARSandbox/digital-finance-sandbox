import React from 'react';
import { useParams } from 'react-router-dom';

import ApplicationFormTemplate from './ApplicationFormTemplate';

function CreditCardsApplyEmployment() {
  const { cardId } = useParams();

  return (
    <ApplicationFormTemplate
      form="Employment Info"
      back={`/credit-cards/apply/${cardId}/personal-info`}
      forward={`/credit-cards/apply/${cardId}/review`}
    />
  );
}

export default CreditCardsApplyEmployment;
