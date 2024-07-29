import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { NextButton } from './ScenarioViewer.styles';
import ButtonWrapper from '../../../shared/ButtonWrapper/ButtonWrapper';

import quizActions from '../../../redux/quiz/actions';

function ScreenTwo({ onClickNext }) {
  const selected = useSelector((state) => state.quiz.question1);
  const dispatch = useDispatch();

  const updateQuiz = (event) => {
    dispatch(quizActions.updateQuizAnswer('question1', event.target.value));
  };

  return (
    <>
      <h3>How much money is charged to the card each month?</h3>
      <RadioGroup
        aria-label="charge_amount"
        name="charge_amount"
        value={selected}
        onChange={updateQuiz}
      >
        <FormControlLabel value="500" control={<Radio />} label="500" />
        <FormControlLabel value="1000" control={<Radio />} label="1000" />
        <FormControlLabel value="1500" control={<Radio />} label="1500" />
        <FormControlLabel value="2000" control={<Radio />} label="2000" />
      </RadioGroup>
      <br />
      <ButtonWrapper
        component={NextButton}
        onClick={onClickNext}
        disabled={selected === ''}
        text="Next"
        location="Q1: Bottom of Scenario Viewer Popup"
      />
    </>
  );
}

export default ScreenTwo;
