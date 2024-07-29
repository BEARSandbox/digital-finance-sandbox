import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ScreenOne from './ScreenOne';
import ScreenTwo from './ScreenTwo';
import ScreenThree from './ScreenThree';
import ScreenFour from './ScreenFour';
import ScreenFive from './ScreenFive';

import { StyledContainer, ScenarioContainer } from './ScenarioViewer.styles';
import ButtonWrapper from '../../../shared/ButtonWrapper/ButtonWrapper';

import quizActions from '../../../redux/quiz/actions';

function ScenarioViewer({ factorOne, showFullScreen, onToggle }) {
  const dispatch = useDispatch();
  const [state, setState] = useState(1);
  const answer1 = useSelector((state) => state.quiz.question1);
  const answer2 = useSelector((state) => state.quiz.question2);
  const completed = useSelector((state) => state.quiz.completed);

  const isAdmin = useSelector((state) => state.auth.isAdmin);

  if (!showFullScreen) return null;

  const next = () => {
    setState(state + 1);
  };

  const submit = () => {
    if (answer1 === '1000' && answer2 === '12') {
      setState(4);
      dispatch(quizActions.completedQuiz());

      // Update local storage so if page is reloaded, user doesn't have to redo quiz
      if (!isAdmin) {
        const userInfoFromStorage = JSON.parse(
          localStorage.getItem('digitalFinanceSandbox_userInfo')
        );

        userInfoFromStorage.quizCompleted = true;

        localStorage.setItem(
          'digitalFinanceSandbox_userInfo',
          JSON.stringify(userInfoFromStorage)
        );
      }
    } else {
      setState(5);
    }
  };

  const restartQuiz = () => {
    setState(1);
    dispatch(quizActions.clearQuizAnswers());
  };

  let CurrentScreen;
  switch (state) {
    case 1:
      CurrentScreen = (
        <ScreenOne
          factorOne={factorOne}
          goToNextPage={next}
          onToggle={onToggle}
        />
      );
      break;
    case 2:
      CurrentScreen = <ScreenTwo onClickNext={next} />;
      break;
    case 3:
      CurrentScreen = <ScreenThree onSubmitQuiz={submit} />;
      break;
    case 4:
      CurrentScreen = <ScreenFour onClickContinue={onToggle} />;
      break;
    case 5:
      CurrentScreen = <ScreenFive onClickRetry={restartQuiz} />;
      break;
    default:
      break;
  }

  return (
    <ButtonWrapper
      component={(props) => (
        <StyledContainer {...props}>
          <ScenarioContainer onClick={(e) => e.stopPropagation()}>
            {CurrentScreen}
          </ScenarioContainer>
        </StyledContainer>
      )}
      onClick={onToggle}
      disabled={!completed}
      location="Close - Outside the Scenario Viewer Popup"
    />
  );
}

export default ScenarioViewer;
