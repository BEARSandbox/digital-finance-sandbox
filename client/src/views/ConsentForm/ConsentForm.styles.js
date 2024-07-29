import styled from 'styled-components';
import { actionButtonStyles } from '../CreditCards/Apply/Apply.styles';

export const Container = styled.div`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 10px 40px;
`;

export const Heading = styled.h1`
  text-align: center;
`;

export const HeadingSmall = styled.h3`
  text-align: center;
  font-weight: normal;
`;

export const HeaderImage = styled.img`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

export const Button = styled.button`
  ${actionButtonStyles};
`;

// Photo by Johannes Plenio from Pexels
export const Hero = styled.section`
  background-image: url('/assets/images/credit-cards-intro-background.jpg');
  padding: 6rem 8rem;
  display: flex;
  flex-direction: column;

  label.title {
    align-self: flex-start;
    font-size: 3rem;
    color: #2d315d;
  }

  label.subtitle {
    align-self: flex-start;
    font-size: 2rem;
    color: #2d315d;
  }
`;
