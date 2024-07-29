import styled, { css } from 'styled-components';

import { buttonStyles } from '../../../shared/Header/Header.styles';

import { linkButtonStyles } from '../Introduction/Introduction.styles';

export const StyledCreditCardCompare = styled.div``;

const heroStyles = css`
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
      grid-column: span 1;
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

// Photo by Johannes Plenio from Pexels
export const Hero = styled.section`
  background-image: url('/assets/images/credit-cards-intro-background.jpg');
  padding: 6rem 8rem;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;

  ${heroStyles};

  div.services {
    grid-template-columns: repeat(3, auto);
  }
`;

export const Selection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f0f0f0;

  div.cardSlots {
    width: 100%;
    margin: 2rem 0;
    border: 2px solid #e5e5e5;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CardSlot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border: 2px solid #e5e5e5;
  color: #2d315d;

  img.remove {
    width: 2rem;
    margin: 1rem;
    align-self: flex-end;
    cursor: pointer;
    visibility: ${(props) => (props.cardSelected ? 'default' : 'hidden')};
  }

  div.image {
    width: 24rem;
    height: 14rem;
    cursor: pointer;

    img.card {
      width: 100%;
      border-radius: 0.5rem;
    }

    div.placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3rem;
      border: 0.1rem solid #2d315d;
      border-radius: 0.5rem;
    }
  }

  label.title {
    font-size: 1.2rem;
    width: 100%;
    padding: 0 6rem;
    text-align: center;
    margin: 2rem 0;
    font-weight: 700;
  }

  label.subtitle {
    font-size: 1.2rem;
    padding: 0 6rem;
    margin: 1rem 0;
    margin-bottom: -0.5rem;
    font-weight: 700;
  }

  div.details {
    display: ${(props) => (props.noCardsSelected ? 'none' : 'initial')};
    box-sizing: border-box;
    display: flex;
    flex: 1;
    align-self: stretch;
    flex-direction: column;

    div.details__list {
      padding: 0 6rem;
      flex: 1;
    }

    button {
      ${linkButtonStyles};
      background: #f0f0f0;
      width: 100%;
      padding: 1rem;
    }
  }
`;

export const SelectionModal = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;

  div.content {
    width: 80%;
    height: min-content;
    margin: 4rem;
    background: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
    position: relative;

    h1 {
      margin: 0;
    }

    img.remove {
      width: 2rem;
      position: absolute;
      top: 2rem;
      right: 2rem;
      cursor: pointer;
    }
  }
`;

export const Filters = styled.section`
  color: #2d315d;
  padding-top: 2rem;
  display: flex;
`;

export const CategoryFilterItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  width: auto;
  padding: 0.5rem 0.5rem 0.3rem 0.5rem;
  margin-right: 0.5rem;

  :hover {
    text-decoration: underline;
  }

  ${(props) =>
    props.isCurrentCategory &&
    css`
      cursor: default;
      text-decoration: underline;
    `}
`;

export const Results = styled.section`
  flex-grow: 1;
  padding: 2rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
  color: #2d315d;
`;

export const CardPreview = styled.div`
  background: #fff;
  border-radius: 0.2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #eee;

  :hover {
    box-shadow: 0 0 0.125rem 0 rgba(0, 25, 40, 0.04),
      0 0.125rem 0.125rem 0 rgba(0, 25, 40, 0.04),
      0 0.25rem 0.25rem 0 rgba(0, 25, 40, 0.1);
  }

  img.image {
    border-radius: 0.5rem;
    width: 100%;
    margin-bottom: 1rem;
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
    padding: 1rem 0;
    border-top: 1px solid #eee;
    font-size: 1.2rem;
    font-weight: 700;
  }

  label.description {
  }

  ${(props) =>
    props.isSelected &&
    css`
      border: 3px solid #2d315d;
    `}
`;

export const StillNotSure = styled.div`
  padding: 3rem 8rem;
  display: flex;
  flex-direction: column;
  ${heroStyles};

  label.subtitle {
    align-self: center;
  }

  div.services {
    align-self: center;
    grid-template-columns: repeat(4, auto);
  }
`;
