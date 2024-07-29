import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Forms } from './Apply.metadata';
import ResponsiveBox from '../../../shared/ResponsiveBox/ResponsiveBox';
import ScrollTracker from '../../../shared/ScrollTracker/ScrollTracker';
import useScrollTracker from '../../../hooks/useScrollTracker';
import CheckboxTracker from '../../../shared/CheckboxTracker/CheckboxTracker';
import TermsAndConditions from '../../../data/TermsAndConditions';
import formActions from '../../../redux/form/actions';
import metricsActions from '../../../redux/metrics/actions';
import ApplicationFormField from './ApplicationFormField';

import { Review, ReviewableFormsList, ReviewableForm } from './Apply.styles';

function CreditCardsApplyReview() {
  const { cardId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [addScrollPosition, consumeScrollData] = useScrollTracker();
  const formData = useSelector((state) => state.form.formData);
  const checkbox2 = useSelector((state) => state.form.formData.checkbox2);
  const currentStep = useSelector((state) => state.form.currentStep);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const index = Forms.length;

  // Redirect user to main apply page if the user hasn't viewed the
  // previous pages yet
  useEffect(() => {
    if (currentStep < index) {
      history.push(`/credit-cards/apply/${cardId}`);
    }
  }, [cardId, index, currentStep, history]);

  // things to do when user page unloads
  useEffect(() => {
    return () => {
      consumeScrollData();
    };
  }, [consumeScrollData]);

  const onClickSubmit = () => {
    const allKeys = [];
    Forms.forEach((form) => {
      form.fields.forEach((field) => allKeys.push(field.key));
    });

    const fieldsStatus = {};
    allKeys.forEach((key) => {
      // If key doesn't exist in formData or if the field is empty
      if (!(key in formData) || formData[key] === '') {
        fieldsStatus[key] = true;
      } else {
        fieldsStatus[key] = false;
      }
    });

    let foundEmptyFields = false;
    for (const field in fieldsStatus) {
      if (fieldsStatus[field]) {
        foundEmptyFields = true;
        break;
      }
    }

    // If user says No, exit this function and don't submit the form
    // Otherwise, submit the form anyways
    if (
      foundEmptyFields &&
      !window.confirm(
        'Some information is missing. Are you sure you want to submit?'
      )
    ) {
      dispatch(formActions.setOptionalFieldsStatus(fieldsStatus));
      return;
    }

    // Event tracking stops after this point, so manually save any
    // remaining pages or actions
    if (!isAdmin) {
      dispatch(metricsActions.savePageDataToDB(true));
      dispatch(metricsActions.saveActionDataToDB());
    }

    dispatch(formActions.submitApplicationRequest());
  };

  return (
    <Review>
      <ResponsiveBox column>
        <label className="title">Please check if everything is correct.</label>
        <ReviewableFormsList>
          {Forms.map((form, formIndex) => {
            return (
              <ReviewableForm key={formIndex}>
                <label className="name">{form.name}</label>
                {form.fields.map((field, fieldIndex) => (
                  <ApplicationFormField
                    key={fieldIndex}
                    field={field}
                    colorOptional={false}
                    nonEditable
                  />
                ))}
              </ReviewableForm>
            );
          })}
        </ReviewableFormsList>

        <div className="terms">
          <label className="heading">Terms & Conditions</label>
          <div className="confirm">
            <CheckboxTracker
              id="Checkbox - Before Form Submit"
              name="confirm"
              checked={checkbox2}
              onChange={(newValue) =>
                dispatch(formActions.setFormAttribute('checkbox2', newValue))
              }
            />
            <label htmlFor="confirm">
              I have read the terms and conditions information provided below.
            </label>
          </div>
          <ScrollTracker onScroll={addScrollPosition} className="details">
            <TermsAndConditions cardKey={cardId} />
          </ScrollTracker>
        </div>

        <div className="buttons">
          <button
            className="back"
            onClick={() =>
              history.push(`/credit-cards/apply/${cardId}/employment-info`)
            }
          >
            BACK
          </button>
          <button className="submit" onClick={() => onClickSubmit()}>
            SUBMIT
          </button>
        </div>
      </ResponsiveBox>
    </Review>
  );
}

export default CreditCardsApplyReview;
