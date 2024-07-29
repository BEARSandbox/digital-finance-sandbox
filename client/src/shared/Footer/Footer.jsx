import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  StyledFooter,
  QuickLinks,
  QuickLink,
  Copyright,
} from './Footer.styles';

import ResponsiveBox from '../ResponsiveBox/ResponsiveBox';
import ButtonWrapper from '../ButtonWrapper/ButtonWrapper';

const quickLinkSectionsData = [
  {
    heading: 'Services',
    items: [
      {
        title: 'Accounts',
        linkTo: '/accounts',
      },
      {
        title: 'Credit Cards',
        linkTo: '/credit-cards',
      },
      {
        title: 'Mortgages',
        linkTo: '/mortgages',
      },
      {
        title: 'Loans',
        linkTo: '/loans',
      },
      {
        title: 'Investments',
        linkTo: '/investments',
      },
    ],
  },
  {
    heading: 'Contact Us',
    items: [
      {
        title: 'Phone',
        linkTo: '/phone',
      },
      {
        title: 'Email',
        linkTo: '/email',
      },
      {
        title: 'Branch & ATM Locator',
        linkTo: '/branch-locator',
      },
      {
        title: 'Book an Appointment',
        linkTo: '/book-appointment',
      },
      {
        title: 'Report Lost/Stolen Card',
        linkTo: '/report-lost-card',
      },
    ],
  },
  {
    heading: 'About Choice Research',
    items: [
      {
        title: 'Investor Relations',
        linkTo: '/investor-relations',
      },
      {
        title: 'Newsroom',
        linkTo: '/newsroom',
      },
      {
        title: 'Privacy & Security',
        linkTo: '/privacy-and-security',
      },
      {
        title: 'Legal',
        linkTo: '/legal',
      },
      {
        title: 'Careers',
        linkTo: '/careers',
      },
    ],
  },
];

function QuickLinkSection({ section }) {
  const history = useHistory();

  return (
    <QuickLink>
      <h3>{section.heading}</h3>
      {section.items.map((item) => (
        <ButtonWrapper
          key={item.title}
          component={QuickLink}
          onClick={() => history.push(item.linkTo)}
          text={item.title}
          location={'Footer'}
        />
      ))}
    </QuickLink>
  );
}

function Footer() {
  return (
    <StyledFooter>
      <ResponsiveBox column>
        <QuickLinks>
          {quickLinkSectionsData.map((section) => (
            <QuickLinkSection key={section.heading} section={section} />
          ))}
        </QuickLinks>
        <Copyright>
          Copyright © 2021 Choice Research Bank, All rights reserved.
          <br />
          105 St. George Street, Toronto, ON Canada M5S 3E6
        </Copyright>
      </ResponsiveBox>
    </StyledFooter>
  );
}

export default Footer;
