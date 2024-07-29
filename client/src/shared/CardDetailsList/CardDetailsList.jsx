import React from 'react';
import { useHistory } from 'react-router-dom';

import { StyledList, ListItem } from './CardDetailsList.styles';

import ButtonWrapper from '../ButtonWrapper/ButtonWrapper';

const CardDetailsList = ({ cardId, details }) => {
  const history = useHistory();

  return (
    <StyledList>
      {details.map((reward, index) => (
        <ListItem key={index}>
          <span>{reward.text}</span>
          <ButtonWrapper
            component={(props) => <span {...props} />}
            onClick={() =>
              history.push({
                pathname: '/terms-and-conditions',
                state: { cardKey: cardId },
              })
            }
            text={reward.superscript}
            location="Card Description"
            data={{
              superscript: reward.superscript,
              text: reward.text,
              card: cardId,
            }}
          />
        </ListItem>
      ))}
    </StyledList>
  );
};

export default CardDetailsList;
