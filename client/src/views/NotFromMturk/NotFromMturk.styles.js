import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
