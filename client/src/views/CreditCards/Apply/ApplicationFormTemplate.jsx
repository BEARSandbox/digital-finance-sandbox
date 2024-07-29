import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Forms } from './Apply.metadata';

import formActions from '../../../redux/form/actions';
import { FormButtons, ApplicationForm, FormContainer } from './Apply.styles';
import ApplicationFormField from './ApplicationFormField';

function ApplicationFormTemplate({
  form: formName,
  back: backURL,
  forward: forwardURL,
}) {
  const index = Forms.findIndex((formObj) => formObj.name === formName);
  const currentForm = Forms[index];

  const [isFormIncomplete, setIsFormIncomplete] = useState(false);
  const { cardId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const formData = useSelector((state) => state.form.formData);
  const requiredFieldsIncomplete = useSelector(
    (state) => state.form.requiredFieldsIncomplete
  );
  const currentStep = useSelector((state) => state.form.currentStep);

  // Redirect user to main apply page if the user hasn't viewed the
  // previous pages yet
  useEffect(() => {
    if (currentStep < index) {
      history.push(`/credit-cards/apply/${cardId}`);
    }
  }, [cardId, index, currentStep, history]);

  // If the form data changed, check if all required fields are valid now
  useEffect(() => {
    const currentFormFields = currentForm.fields;

    let isIncomplete = false;
    for (let i = 0; i < currentFormFields.length; i++) {
      const key = currentFormFields[i].key;
      if (
        // If field is marked as required, a non-empty and valid value
        // has to be present.
        currentFormFields[i].required &&
        (!(key in requiredFieldsIncomplete) ||
          requiredFieldsIncomplete[key] === true)
      ) {
        isIncomplete = true;
      } else if (
        // If field is marked as validate and a value exists for
        // the field, it has to be a valid value. If no value
        // exists, it is also valid.
        currentFormFields[i].validate &&
        key in requiredFieldsIncomplete &&
        requiredFieldsIncomplete[key] === true
      ) {
        isIncomplete = true;
      }
    }

    setIsFormIncomplete(isIncomplete);
  }, [formData, currentForm, requiredFieldsIncomplete]);

  return (
    <ApplicationForm>
      <FormContainer>
        <label className="heading">{currentForm.heading}</label>
        {currentForm.fields.map((field, fieldIndex) => (
          <ApplicationFormField key={fieldIndex} field={field} />
        ))}
        <FormButtons>
          <button className="back" onClick={() => history.push(backURL)}>
            BACK
          </button>

          <button
            disabled={isFormIncomplete}
            className="next"
            onClick={() => {
              dispatch(formActions.setCurrentStep(index + 1));
              history.push(forwardURL);
            }}
          >
            NEXT
          </button>
        </FormButtons>
      </FormContainer>
    </ApplicationForm>
  );
}

export default ApplicationFormTemplate;
