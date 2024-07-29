import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FormField } from './Apply.styles';
import formActions from '../../../redux/form/actions';

function ApplicationFormField({ field, nonEditable, colorOptional = true }) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const requiredFieldsIncomplete = useSelector(
    (state) => state.form.requiredFieldsIncomplete
  );
  const onSubmitIncompleteFields = useSelector(
    (state) => state.form.onSubmitIncompleteFields
  );

  let input;
  let className = '';
  if (requiredFieldsIncomplete[field.key]) {
    className = 'required';
  } else if (onSubmitIncompleteFields[field.key] && colorOptional) {
    className = 'optional';
  }

  if (nonEditable) className += ' disabled';

  const onFieldChange = (field, value) => {
    dispatch(formActions.setFormAttribute(field.key, value));

    if (field.required || field.validate)
      dispatch(
        formActions.validateRequiredField(field.key, value, field.isValid)
      );

    // If the user hasn't clicked the submit button yet, we don't want to mark this yet
    if (Object.keys(onSubmitIncompleteFields).length > 0)
      dispatch(formActions.setOptionalFieldStatus(field.key, value));
  };

  if (field.type === 'text' || field.type === 'date') {
    input = (
      <input
        type={field.type}
        className={className}
        disabled={nonEditable}
        placeholder={
          field.required && requiredFieldsIncomplete[field.key]
            ? 'Required'
            : ''
        }
        value={formData[field.key] || ''}
        onChange={(e) => onFieldChange(field, e.target.value)}
      />
    );
  } else if (field.type === 'dropdown') {
    input = (
      <select
        className={className}
        disabled={nonEditable}
        value={formData[field.key] || ''}
        onChange={(e) => onFieldChange(field, e.target.value)}
      >
        <option value={''}>Please select an option</option>
        {field.options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    );
  }

  return (
    <FormField className="field" editable={!nonEditable}>
      <label>
        {field.text}{' '}
        <span style={{ color: 'red' }}>{field.required ? '*' : ''}</span>
      </label>
      {input}
    </FormField>
  );
}

export default ApplicationFormField;
