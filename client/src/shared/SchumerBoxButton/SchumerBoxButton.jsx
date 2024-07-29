import React from 'react';
import { useHistory } from 'react-router-dom';

import { StyledButton } from './SchumerBoxButton.styles';
import ButtonWrapper from '../ButtonWrapper/ButtonWrapper';

const SchumerBoxButton = ({ styles, card }) => {
  const history = useHistory();
  const cardKey = card.key;
  const cardName = card.name.toUpperCase();

  return (
    <ButtonWrapper
      component={(props) => <StyledButton {...props} styles={styles} />}
      onClick={() => history.push(`/important-fees/${cardKey}`)}
      text={`IMPORTANT FEES FOR ${cardName}`}
      location={cardKey}
      data={{ card: cardKey }}
    />
  );
};

export default SchumerBoxButton;
