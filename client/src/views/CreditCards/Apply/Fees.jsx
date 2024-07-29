import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ScrollTracker from '../../../shared/ScrollTracker/ScrollTracker';
import useScrollTracker from '../../../hooks/useScrollTracker';
import CheckboxTracker from '../../../shared/CheckboxTracker/CheckboxTracker';
import formActions from '../../../redux/form/actions';

import { StyledCreditCardApply, Fees, FormButtons } from './Apply.styles';

import AllCards from '../../../data/Cards';
import CardFees from '../../../data/CardFees';

function CreditCardApplyFees() {
  const { cardId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [addScrollPosition, consumeScrollData] = useScrollTracker();
  const currentCard = useSelector((state) => state.form.formData.card);
  const checkbox1 = useSelector((state) => state.form.formData.checkbox1);

  // things to do when the page loads
  useEffect(() => {
    const targetCard = AllCards.find((card) => {
      return card.key === cardId;
    });

    dispatch(formActions.setFormAttribute('card', targetCard));
  }, [dispatch, cardId]);

  // things to do when user page unloads
  useEffect(() => {
    return () => {
      consumeScrollData();
    };
  }, [consumeScrollData]);

  return (
    <StyledCreditCardApply>
      <Fees>
        <label className="title">Important Fees for {currentCard.name}</label>
        <div className="confirm">
          <CheckboxTracker
            id="Checkbox - Fees Page"
            name="confirm"
            checked={checkbox1}
            onChange={(newValue) =>
              dispatch(formActions.setFormAttribute('checkbox1', newValue))
            }
          />
          <label htmlFor="confirm">
            I have read the interest rates and fees information provided below.
          </label>
        </div>
        <ScrollTracker onScroll={addScrollPosition} className="details">
          <CardFees cardKey={currentCard.key} />
        </ScrollTracker>

        <FormButtons>
          <button
            className="back"
            onClick={() =>
              history.push(
                `/credit-cards/apply/${currentCard.key}/before-you-apply`
              )
            }
          >
            BACK
          </button>
          <button
            className="next"
            onClick={() => {
              dispatch(formActions.setCurrentStep(0));
              history.push(
                `/credit-cards/apply/${currentCard.key}/personal-info`
              );
            }}
          >
            NEXT
          </button>
        </FormButtons>
      </Fees>
    </StyledCreditCardApply>
  );
}

export default CreditCardApplyFees;
