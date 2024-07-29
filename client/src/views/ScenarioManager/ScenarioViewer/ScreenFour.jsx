import React from 'react';

import { GrClose } from 'react-icons/gr';
import { CloseButton, ContinueButton } from './ScenarioViewer.styles';
import ButtonWrapper from '../../../shared/ButtonWrapper/ButtonWrapper';

function ScreenFour({ onClickContinue }) {
  return (
    <>
      <h1>Good job!</h1>
      <p>You have answered both questions correctly.</p>
      <br />
      <ButtonWrapper
        component={(props) => <ContinueButton {...props} />}
        onClick={onClickContinue}
        text="Continue to website"
        location="Bottom of Scenario Viewer Popup"
      />
      <ButtonWrapper
        component={(props) => (
          <CloseButton {...props} title="Close">
            <GrClose />
          </CloseButton>
        )}
        onClick={onClickContinue}
        location="Close - Top Right Corner of Scenario Viewer Popup"
      />
    </>
  );
}

export default ScreenFour;
