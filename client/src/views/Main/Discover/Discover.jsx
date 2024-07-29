import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  StyledDiscover,
  PanelsContainer,
  Link,
  Label,
} from './Discover.styles';
import { Panel } from '../Welcome/Welcome.styles';
import ResponsiveBox from '../../../shared/ResponsiveBox/ResponsiveBox';
import ButtonWrapper from '../../../shared/ButtonWrapper/ButtonWrapper';

function Discover() {
  const history = useHistory();

  return (
    <StyledDiscover>
      <ResponsiveBox column>
        <h2>Discover and learn</h2>
        <PanelsContainer>
          <Panel>
            {/* Photo by Andrea Piacquadio from Pexels */}
            <img src="/assets/images/main-discover-mobile.jpg" alt="discuss" />
            <h4>Get started with Choice Research Mobile Banking</h4>
            <ButtonWrapper
              component={Label}
              onClick={() => history.push('/getting-started')}
              text="LEARN MORE &rarr;"
              location="Getting Started"
            />
          </Panel>
          <Panel>
            {/* Photo by Porapak Apichodilok from Pexels */}
            <img src="/assets/images/main-discover-travel.jpg" alt="savings" />
            <h4>Saving up for your next travel</h4>
            <ButtonWrapper
              component={Label}
              onClick={() => history.push('/saving-up')}
              text="LEARN MORE &rarr;"
              location="Saving up"
            />
          </Panel>
          <Panel>
            <h2>Choice Research News</h2>
            <ul>
              <ButtonWrapper
                component={Link}
                onClick={() => history.push('/getting-started')}
                text="How to get started with Choice Research Mobile Banking"
                location="Choice Research News"
              />
              <ButtonWrapper
                component={Link}
                onClick={() => history.push('/deposit-from-mobile')}
                text="How to deposit your cheques from your mobile devices"
                location="Choice Research News"
              />
              <ButtonWrapper
                component={Link}
                onClick={() => history.push('/interac-etransfer')}
                text="Discover what's new with Interac e-Transfer"
                location="Choice Research News"
              />
            </ul>
          </Panel>
        </PanelsContainer>
      </ResponsiveBox>
    </StyledDiscover>
  );
}

export default Discover;
