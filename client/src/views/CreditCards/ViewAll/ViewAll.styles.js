import styled, { css } from 'styled-components';

import { buttonStyles } from '../../../shared/Header/Header.styles';

import { linkButtonStyles } from '../Introduction/Introduction.styles';

export const StyledCreditCardsViewAll = styled.div`
  background: #f5f6f7;
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

    label.service {
      ${buttonStyles};
      grid-column: span 1 / -1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #2d315d;
      color: #f0f0f0;
      border-radius: 5rem;
      font-size: 1rem;
      font-weight: 700;
      padding: 1rem 2rem;
    }
  }
`;

export const Filters = styled.section`
  color: #2d315d;
  padding: 2rem 0;
`;

export const CategoryFilterItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-right: 2rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  width: 16rem;
  padding: 0.5rem 0.5rem 0.3rem 0.5rem;
  border-radius: 0.2rem;

  :hover {
    text-decoration: underline;
  }

  img {
    width: 2rem;
    margin-right: 1rem;
    /* codepen example to compute filter for target hex color
         * https://codepen.io/sosuke/pen/Pjoqqp
         * current target: #2d315d
         */
    filter: invert(15%) sepia(22%) saturate(2660%) hue-rotate(206deg)
      brightness(96%) contrast(87%);
  }

  ${(props) =>
    props.isCurrentCategory &&
    css`
      cursor: default;
      background: #eaeaea;

      :hover {
        text-decoration: none;
      }
    `}
`;

const crispImages = css`
  image-rendering: crisp-edges;
  image-rendering: -moz-crisp-edges; /* Firefox */
  image-rendering: -o-crisp-edges; /* Opera */
  image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming)*/
  -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
`;

export const Main = styled.section`
  flex: 1;
`;

export const DropdownContainer = styled.div`
  margin-top: 2rem;

  .dropdown-text {
    font-weight: bold;
  }
`;

export const Results = styled.section`
  padding: 2rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  color: #2d315d;

  div.card {
    background: #fff;
    border-radius: 0.2rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;

    box-shadow: 0 0 0.125rem 0 rgba(0, 25, 40, 0.04),
      0 0.125rem 0.125rem 0 rgba(0, 25, 40, 0.04),
      0 0.25rem 0.25rem 0 rgba(0, 25, 40, 0.1);

    img.image {
      border-radius: 0.5rem;
      width: 100%;
      margin-bottom: 1rem;
      ${crispImages};
    }

    div.category {
      display: flex;
      align-items: center;
      font-size: 1.2rem;

      img {
        width: 1.5rem;
        margin-right: 0.5rem;
        filter: invert(15%) sepia(22%) saturate(2660%) hue-rotate(206deg)
          brightness(96%) contrast(87%);
      }

      label {
        margin-top: 0.3rem;
        font-weight: 700;
      }
    }

    label.name {
      padding-top: 1rem;
      border-top: 1px solid #eee;
      font-size: 1.2rem;
      font-weight: 700;
    }

    label.description {
    }

    label.welcomeOffer {
      margin-top: 1rem;
    }

    div.card-buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 1rem;
    }

    button.details {
      ${linkButtonStyles};
    }

    button.apply {
      ${buttonStyles};
      background: #2d315d;
      color: #f0f0f0;
      font-weight: 700;
      padding: 10px 20px;
      margin: 10px;
      flex: 1;
      min-width: 100px;
    }
  }
`;
