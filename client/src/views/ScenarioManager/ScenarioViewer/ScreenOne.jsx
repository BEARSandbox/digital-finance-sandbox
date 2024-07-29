import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { GrClose } from 'react-icons/gr';
import { NextButton, CloseButton } from './ScenarioViewer.styles';
import ButtonWrapper from '../../../shared/ButtonWrapper/ButtonWrapper';

function ScreenOne({ factorOne, goToNextPage, onToggle }) {
  const { completed } = useSelector((state) => state.quiz);

  const timeout = process.env.NODE_ENV === 'development' ? 2 : 15;

  const [timer, setTimer] = useState(timeout);
  const [timeInterval, setTimeInterval] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);

    setTimeInterval(interval);

    return () => clearInterval(interval);
  }, []);

  if (timer === 0) clearInterval(timeInterval);

  let scenario;
  if (factorOne === 0) {
    // factor 1 === 0 --> Show Scenario A (Cost minimization)
    scenario = (
      <>
        <p>Each month for 12 months, you will:</p>
        <ul style={{ paddingLeft: 20 }}>
          <li>Spend $1000 using the card</li>
          <li>
            Not make any monthly payments (i.e., you will not pay off any credit
            card debt)
          </li>
          <li>Not take out any cash advances</li>
        </ul>
      </>
    );
  } else {
    // factor 1 === 1 --> Show Scenario B (Reward maximization)
    scenario = (
      <>
        <p>Each month for 12 months, you will:</p>
        <ul style={{ paddingLeft: 20 }}>
          <li>Spend $1000 using the card</li>
          <li>
            Pay off your balance in full by the due date (i.e., you will pay off
            all credit card debt on time)
          </li>
          <li>Not take out any cash advances</li>
        </ul>
      </>
    );
  }

  return (
    <>
      <h3>Please read carefully</h3>
      <p>
        You’re in the market for a credit card. Your goal is to choose the
        credit card that is in your best financial interest, given the
        circumstances below.
      </p>
      {scenario}
      <strong>Sidenotes: </strong>
      <ul style={{ paddingLeft: 20 }}>
        <li>
          You will be awarded an additional $4 US for selecting the best
          possible credit card, given the circumstances above
        </li>
        <li>
          You can return to this scenario at any time by clicking on the yellow
          “Read Scenario” button in the bottom left corner
        </li>
      </ul>

      {/* If the quiz is complete, show the X button, otherwise the next button to go to the quiz */}
      {completed ? (
        <ButtonWrapper
          component={(props) => (
            <CloseButton {...props} title="Close">
              <GrClose />
            </CloseButton>
          )}
          onClick={onToggle}
          location="Close - Top Right Corner of Scenario Viewer Popup"
        />
      ) : (
        <ButtonWrapper
          component={NextButton}
          onClick={goToNextPage}
          disabled={timer > 0}
          text={timer > 0 ? timer : 'Next'}
          location="Bottom of Scenario Viewer Popup"
        />
      )}
    </>
  );
}

export default ScreenOne;
