import React from 'react';

import { FullScreenToggle } from './ScenarioToggle.styles';
import ButtonWrapper from '../../../shared/ButtonWrapper/ButtonWrapper';

function ScenarioToggle(props) {
  return (
    <ButtonWrapper
      component={FullScreenToggle}
      onClick={props.onToggle}
      text="READ SCENARIO"
      location="Bottom Left Corner"
    />
  );
}

export default ScenarioToggle;
