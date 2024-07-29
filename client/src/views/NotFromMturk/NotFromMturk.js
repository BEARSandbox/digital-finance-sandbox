import React from 'react';
import { Container, Hero } from './NotFromMturk.styles';
import ResponsiveBox from '../../shared/ResponsiveBox/ResponsiveBox';

function HeroSection() {
  return (
    <Hero>
      <ResponsiveBox column>
        <label className="title">Please enter using the link from Mturk.</label>
      </ResponsiveBox>
    </Hero>
  );
}

function NotFromMturk() {
  return (
    <Container>
      <HeroSection />
    </Container>
  );
}

export default NotFromMturk;
