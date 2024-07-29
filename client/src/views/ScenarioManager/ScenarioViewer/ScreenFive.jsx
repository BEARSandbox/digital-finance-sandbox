import React from 'react';

import { ContinueButton } from './ScenarioViewer.styles';
import ButtonWrapper from '../../../shared/ButtonWrapper/ButtonWrapper';

function ScreenFive({ onClickRetry }) {
  return (
    <>
      <h1>Please try again</h1>
      <p>
        You have not answered both questions correctly. Please re-read the
        scenario.
      </p>
      <br />
      <ButtonWrapper
        component={(props) => <ContinueButton {...props} />}
        onClick={onClickRetry}
        text="Re-read Scenario"
        location="Bottom of Scenario Viewer Popup"
      />
    </>
  );
}

export default ScreenFive;
