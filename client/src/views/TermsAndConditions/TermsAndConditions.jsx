import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import TermsAndConditionsData from '../../data/TermsAndConditions';
import ScrollTracker from '../../shared/ScrollTracker/ScrollTracker';
import useScrollTracker from '../../hooks/useScrollTracker';
import CheckboxTracker from '../../shared/CheckboxTracker/CheckboxTracker';
import formActions from '../../redux/form/actions';
import ButtonWrapper from '../../shared/ButtonWrapper/ButtonWrapper';

import {
  StyledTermsAndConditions,
  TermsContainer,
  FormButtons,
} from './TermsAndConditions.styles';

function TermsAndConditions() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [addScrollPosition, consumeScrollData] = useScrollTracker();
  const { termsManagerCheckbox } = useSelector((state) => state.form.formData);

  const cardKey = (location.state && location.state.cardKey) || 'card-m';

  // things to do when user page unloads
  useEffect(() => {
    return () => {
      consumeScrollData();
    };
  }, [consumeScrollData]);

  return (
    <StyledTermsAndConditions>
      <TermsContainer>
        <label className="title">Terms And Conditions</label>
        <div className="confirm">
          <CheckboxTracker
            id="Checkbox - Terms"
            name="confirm"
            checked={termsManagerCheckbox}
            onChange={(newValue) =>
              dispatch(
                formActions.setFormAttribute('termsManagerCheckbox', newValue)
              )
            }
          />
          <label htmlFor="confirm">
            I have read the terms and conditions information provided below.
          </label>
        </div>
        <ScrollTracker onScroll={addScrollPosition} className="details">
          <TermsAndConditionsData cardKey={cardKey} />
        </ScrollTracker>

        <FormButtons>
          <ButtonWrapper
            component={(props) => <button {...props} className="back" />}
            onClick={() => history.goBack()}
            text="BACK"
            location="Bottom of page"
          />
        </FormButtons>
      </TermsContainer>
    </StyledTermsAndConditions>
  );
}

export default TermsAndConditions;
