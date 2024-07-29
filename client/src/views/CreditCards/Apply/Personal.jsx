import React from 'react';
import { useParams } from 'react-router-dom';

import ApplicationFormTemplate from './ApplicationFormTemplate';

function CreditCardsApplyPersonal() {
  const { cardId } = useParams();

  return (
    <ApplicationFormTemplate
      form="Personal Info"
      back={`/credit-cards/apply/${cardId}`}
      forward={`/credit-cards/apply/${cardId}/employment-info`}
    />
  );
}

export default CreditCardsApplyPersonal;
