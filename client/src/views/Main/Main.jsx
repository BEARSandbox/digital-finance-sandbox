import React from 'react';

import { StyledMain } from './Main.styles';

import Introduction from './Introduction/Introduction';
import Welcome from './Welcome/Welcome';
import Services from './Services/Services';
import Discover from './Discover/Discover';

function Main() {
  return (
    <StyledMain>
      <Introduction />
      <Welcome />
      <Services />
      <Discover />
    </StyledMain>
  );
}

export default Main;
