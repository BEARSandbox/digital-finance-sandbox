import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  StyledIntroduction,
  PrimaryHeading,
  SecondaryHeading,
  LearnMoreButton,
} from './Introduction.styles';

import ResponsiveBox from '../../../shared/ResponsiveBox/ResponsiveBox';
import ButtonWrapper from '../../../shared/ButtonWrapper/ButtonWrapper';

function Introduction() {
  const history = useHistory();
  const { factorTwo } = useSelector((state) => state.auth);

  const primaryText = 'Live your best life!';

  let secondaryText;
  switch (factorTwo) {
    case 0:
      secondaryText = 'Low interest and low fee credit cards';
      break;
    case 1:
      secondaryText = 'High rewards credit cards';
      break;
    case 2:
      secondaryText = 'Find the credit card that is right for you';
      break;
    default:
      break;
  }

  const backgroundImageUrl = '/assets/images/main-intro-background.jpg';

  const onClickLearnMore = () => {
    switch (factorTwo) {
      case 0:
        history.push('/credit-cards/view/low-fees');
        break;
      case 1:
        history.push('/credit-cards/view/rewards');
        break;
      case 2:
        history.push('/credit-cards');
        break;
      default:
        break;
    }
  };

  return (
    <StyledIntroduction backgroundImageUrl={backgroundImageUrl}>
      <ResponsiveBox column>
        <PrimaryHeading>{primaryText}</PrimaryHeading>
        <SecondaryHeading>{secondaryText}</SecondaryHeading>
        <ButtonWrapper
          component={LearnMoreButton}
          onClick={onClickLearnMore}
          text="LEARN MORE"
          location="Top"
        />
      </ResponsiveBox>
    </StyledIntroduction>
  );
}

export default Introduction;
