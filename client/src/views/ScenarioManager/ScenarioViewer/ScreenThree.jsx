import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { NextButton } from './ScenarioViewer.styles';
import ButtonWrapper from '../../../shared/ButtonWrapper/ButtonWrapper';

import quizActions from '../../../redux/quiz/actions';

function ScreenThree({ onSubmitQuiz }) {
  const selected = useSelector((state) => state.quiz.question2);
  const dispatch = useDispatch();

  const updateQuiz = (event) => {
    dispatch(quizActions.updateQuizAnswer('question2', event.target.value));
  };

  return (
    <>
      <h3>How long do you plan to keep the credit card for?</h3>
      <RadioGroup
        aria-label="card_hold_period"
        name="card_hold_period"
        value={selected}
        onChange={updateQuiz}
      >
        <FormControlLabel value="3" control={<Radio />} label="3 months" />
        <FormControlLabel value="6" control={<Radio />} label="6 months" />
        <FormControlLabel value="9" control={<Radio />} label="9 months" />
        <FormControlLabel value="12" control={<Radio />} label="12 months" />
      </RadioGroup>
      <br />
      <ButtonWrapper
        component={NextButton}
        onClick={onSubmitQuiz}
        disabled={selected === ''}
        text="Submit"
        location="Q2: Bottom of Scenario Viewer Popup"
      />
    </>
  );
}

export default ScreenThree;
