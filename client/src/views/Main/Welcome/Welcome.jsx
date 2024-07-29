import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  StyledWelcome,
  PanelsContainer,
  Panel,
  Link,
  Label,
} from './Welcome.styles';

import ResponsiveBox from '../../../shared/ResponsiveBox/ResponsiveBox';
import ButtonWrapper from '../../../shared/ButtonWrapper/ButtonWrapper';

function Welcome() {
  const history = useHistory();

  return (
    <StyledWelcome>
      <ResponsiveBox column>
        <h2>Welcome to Choice Research Bank!</h2>
        <PanelsContainer>
          <Panel>
            <h2>Quick Links</h2>
            <ul>
              <ButtonWrapper
                component={Link}
                onClick={() => history.push('/open-account')}
                text="Open an account"
                location="Quick Links"
              />
              <ButtonWrapper
                component={Link}
                onClick={() => history.push('/rates')}
                text="Choice Research Bank Rates"
                location="Quick Links"
              />
              <ButtonWrapper
                component={Link}
                onClick={() => history.push('/fraud-protection')}
                text="Protect yourself from frauds"
                location="Quick Links"
              />
              <ButtonWrapper
                component={Link}
                onClick={() => history.push('/ways-to-bank')}
                text="Ways to Bank"
                location="Quick Links"
              />
            </ul>
            <ButtonWrapper
              component={Label}
              onClick={() => history.push('/book-appointment')}
              text="BOOK AN APPOINTMENT &rarr;"
              location="Quick Links"
            />
          </Panel>
          <Panel>
            {/* Photo by bongkarn thanyakij from Pexels */}
            <img src="/assets/images/main-welcome-discuss.jpg" alt="discuss" />
            <h4>
              Check out our mortgage rate options and choose the rate that's
              right for you
            </h4>
            <ButtonWrapper
              component={Label}
              onClick={() => history.push('/mortgages')}
              text="LEARN MORE &rarr;"
              location="Mortgages"
            />
          </Panel>
          <Panel>
            {/* Photo by Skitterphoto from Pexels */}
            <img src="/assets/images/main-welcome-savings.jpg" alt="savings" />
            <h4>
              Get a premium rate with a Choice Research Premium Savings Account
            </h4>
            <ButtonWrapper
              component={Label}
              onClick={() => history.push('/premium-savings-account')}
              text="LEARN MORE &rarr;"
              location="Premium Savings Account"
            />
          </Panel>
        </PanelsContainer>
      </ResponsiveBox>
    </StyledWelcome>
  );
}

export default Welcome;
