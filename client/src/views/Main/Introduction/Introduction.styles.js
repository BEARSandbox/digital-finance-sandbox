import styled from 'styled-components';

import { buttonStyles } from '../../../shared/Header/Header.styles';

/**
 * Background image credit: Photo by bongkarn thanyakij from Pexels
 */
export const StyledIntroduction = styled.div`
  display: flex;
  min-height: 30rem;
  background-image: ${(props) => `url(${props.backgroundImageUrl})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-direction: column;
  justify-content: center;
`;

export const PrimaryHeading = styled.h1`
  font-size: 3rem;
  line-height: 1;
  max-width: 30rem;
`;

export const SecondaryHeading = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
`;

export const LearnMoreButton = styled.button`
  ${buttonStyles};
  color: #eee;
  background: #2d315d;
  padding: 1rem 2rem;
  margin-right: auto;
  font-size: 1rem;
  border-radius: 5rem;
`;
