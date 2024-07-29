import React from 'react';
import { useHistory } from 'react-router-dom';

import { StyledServices, PanelsContainer, Panel } from './Services.styles';
import ResponsiveBox from '../../../shared/ResponsiveBox/ResponsiveBox';
import ButtonWrapper from '../../../shared/ButtonWrapper/ButtonWrapper';

const buttonData = [
  {
    img: { src: '/assets/icons/account.png', alt: 'opening account' },
    label: 'Opening an account',
    linkTo: '/accounts',
  },
  {
    img: { src: '/assets/icons/house.png', alt: 'mortgage options' },
    label: 'Mortgage options',
    linkTo: '/mortgages',
  },
  {
    img: { src: '/assets/icons/card.png', alt: 'credit cards' },
    label: 'Credit cards',
    linkTo: '/credit-cards',
  },
  {
    img: { src: '/assets/icons/invest.png', alt: 'investments' },
    label: 'Investments',
    linkTo: '/investments',
  },
  {
    img: { src: '/assets/icons/piggy-bank.png', alt: 'savings' },
    label: 'Savings',
    linkTo: '/savings',
  },
  {
    img: { src: '/assets/icons/exchange-rate.png', alt: 'exchange rates' },
    label: 'Exchange rates',
    linkTo: '/exchange-rates',
  },
];

function Services() {
  const history = useHistory();

  return (
    <StyledServices>
      <ResponsiveBox column>
        <h2>What can we help you with today?</h2>
        <PanelsContainer>
          {/* Icons from Icons8 */}
          {buttonData.map((button, index) => (
            <ButtonWrapper
              key={index}
              component={(props) => (
                <Panel {...props}>
                  <img src={button.img.src} alt={button.img.alt} />
                  {props.children}
                </Panel>
              )}
              onClick={() => history.push(button.linkTo)}
              text={button.label}
              location="Services"
            />
          ))}
        </PanelsContainer>
      </ResponsiveBox>
    </StyledServices>
  );
}

export default Services;
