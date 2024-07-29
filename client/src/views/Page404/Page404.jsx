import React from 'react';
import { Container, Hero } from './Page404.styles';
import { useLocation } from 'react-router-dom';

import ResponsiveBox from '../../shared/ResponsiveBox/ResponsiveBox';

/**
 * Remove the slash at the beginning, replace the hyphens
 * with spaces, and uppercase the first character of each word.
 */
function format(url) {
  const temp = url.slice(1);
  const words = temp.split('-');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(' ');
}

function HeroSection() {
  const location = useLocation();

  return (
    <Hero>
      <ResponsiveBox column>
        <label className="title">{format(location.pathname)}</label>
        <label className="subtitle">This page is not implemented yet.</label>
      </ResponsiveBox>
    </Hero>
  );
}

function Page404() {
  return (
    <Container>
      <HeroSection />
    </Container>
  );
}

export default Page404;
