import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import ScrollTracker from '../../shared/ScrollTracker/ScrollTracker';
import useScrollTracker from '../../hooks/useScrollTracker';
import CheckboxTracker from '../../shared/CheckboxTracker/CheckboxTracker';
import formActions from '../../redux/form/actions';
import ButtonWrapper from '../../shared/ButtonWrapper/ButtonWrapper';

import AllCards from '../../data/Cards';
import CardFees from '../../data/CardFees';

import {
  StyledSchumerBox,
  SchumerBoxContainer,
  FormButtons,
} from './SchumerBox.styles';

function SchumerBox() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cardId } = useParams();
  const [addScrollPosition, consumeScrollData] = useScrollTracker();
  const { schumerBoxCheckbox } = useSelector((state) => state.form.formData);
  const [cardName, setCardName] = useState('');

  // things to do when the page loads
  useEffect(() => {
    const targetCard = AllCards.find((card) => {
      return card.key === cardId;
    });

    setCardName(targetCard.name);
  }, [dispatch, cardId]);

  // things to do when user page unloads
  useEffect(() => {
    return () => {
      consumeScrollData();
    };
  }, [consumeScrollData]);

  return (
    <StyledSchumerBox>
      <SchumerBoxContainer>
        <label className="title">Important Fees for {cardName}</label>
        <div className="confirm">
          <CheckboxTracker
            id="Checkbox - Schumer Box"
            name="confirm"
            checked={schumerBoxCheckbox}
            onChange={(newValue) =>
              dispatch(
                formActions.setFormAttribute('schumerBoxCheckbox', newValue)
              )
            }
          />
          <label htmlFor="confirm">
            I have read the interest rates and fees information provided below.
          </label>
        </div>
        <ScrollTracker onScroll={addScrollPosition} className="details">
          <CardFees cardKey={cardId} />
        </ScrollTracker>

        <FormButtons>
          <ButtonWrapper
            component={(props) => <button {...props} className="back" />}
            onClick={() => history.goBack()}
            text="BACK"
            location="Bottom of page"
          />
        </FormButtons>
      </SchumerBoxContainer>
    </StyledSchumerBox>
  );
}

export default SchumerBox;
