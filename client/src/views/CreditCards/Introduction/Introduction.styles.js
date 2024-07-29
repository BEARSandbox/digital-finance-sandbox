import styled, { css } from 'styled-components';

import { buttonStyles } from '../../../shared/Header/Header.styles';

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

  div.services {
    align-self: flex-end;
    padding: 1rem;
    border-radius: 0.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;

    h2 {
      font-size: 2rem;
      grid-column: 1 / -1;
      grid-row: 1 / 2;
      text-align: center;
    }
  }
`;

export const linkButtonStyles = css`
  margin-top: auto;
  ${buttonStyles};
  color: #2d315d;
  font-weight: 700;
  :hover {
    text-decoration: underline;
  }
`;

export const Categories = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  color: #2d315d;

  h1 {
    text-align: center;
  }

  div.categories {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    div.category {
      width: 16rem;
      height: 8rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0.5rem;
      font-size: 1.2rem;
      font-weight: 700;
      color: inherit;
      text-decoration: none;
      cursor: pointer;

      :hover {
        text-decoration: underline;
      }

      img {
        width: 3rem;
        margin-bottom: 1rem;
        /* codepen example to compute filter for target hex color
         * https://codepen.io/sosuke/pen/Pjoqqp
         * current target: #2d315d
         */
        filter: invert(15%) sepia(22%) saturate(2660%) hue-rotate(206deg)
          brightness(96%) contrast(87%);
      }
    }
  }

  div.links {
    display: flex;
    justify-content: center;

    button.view-all-cards {
      ${linkButtonStyles};
    }

    button.compare-cards {
      ${linkButtonStyles};
    }
  }
`;
