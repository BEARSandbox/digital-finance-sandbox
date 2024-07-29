import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { BeforeYouApply } from './Apply.styles';
import formActions from '../../../redux/form/actions';

function BeforeYouApplyPage() {
  const formData = useSelector((state) => state.form.formData);

  const dispatch = useDispatch();
  const { cardId } = useParams();
  const history = useHistory();

  const onFieldChange = (field, value) => {
    dispatch(formActions.setFormAttribute(field, value));
  };

  return (
    <BeforeYouApply>
      <div className="container">
        <label className="title">Before you apply</label>
        <label className="subtitle">
          Make sure you are eligible for this card.
        </label>
        <label className="condition">
          <img src="/assets/icons/checkmark.png" alt="checkmark" />
          You are an American or Canadian citizen
        </label>
        <label className="condition">
          <img src="/assets/icons/checkmark.png" alt="checkmark" />
          You have a valid Worker ID with M-Turk
        </label>
        <label className="condition">
          Do you already have a credit card with Choice Research Bank?
        </label>
        <RadioGroup
          row
          aria-label="existing_credit_card"
          name="existing_credit_card"
          value={formData.existingCreditCard || ''}
          onChange={(e) => onFieldChange('existingCreditCard', e.target.value)}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
        <label className="condition">Are you at least 18 years of age?</label>
        <RadioGroup
          row
          aria-label="over_18"
          name="over_18"
          value={formData.over18 || ''}
          onChange={(e) => onFieldChange('over18', e.target.value)}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
        <button
          className="continue"
          onClick={() => history.push(`/credit-cards/apply/${cardId}`)}
        >
          CONTINUE TO APPLICATION
        </button>
      </div>
    </BeforeYouApply>
  );
}

export default BeforeYouApplyPage;
