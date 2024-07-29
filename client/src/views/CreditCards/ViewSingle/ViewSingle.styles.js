import styled, { css } from 'styled-components';

import { actionButtonStyles } from '../Apply/Apply.styles';

import { linkButtonStyles } from '../Introduction/Introduction.styles';

export const StyledCreditCardsViewSingle = styled.div`
  background: #f5f6f7;
`;

export const CardDetails = styled.div`
  border: 1px solid #eee;
  margin: 4rem auto;
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: repeat(3, min-content);
  background: #fff;
  border-radius: 0.5rem;

  div.meta {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    display: flex;
    flex-direction: column;

    div.category {
      display: flex;
      align-items: center;
      padding: 0 2rem;
      padding-top: 1rem;
      font-size: 1.2rem;
      border-top: 1px solid #eee;

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
      padding: 0 2rem;
      padding-top: 1rem;
      font-size: 1.2rem;
      font-weight: 700;
    }

    label.description {
      padding: 0 2rem;
      padding-bottom: 1rem;
    }
  }

  img.image {
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
    max-width: 20rem;
    margin: 1rem;
    border-radius: 0.5rem;
  }

  div.details {
    grid-column: 1 / -1;
    grid-row: 3 / span 1;
    box-sizing: border-box;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    color: #2d315d;
    border-top: 2px solid #eee;
    border-bottom: 2px solid #eee;

    div:first-of-type {
      border-bottom: 2px solid #eee;
    }
  }

  button.more {
    ${linkButtonStyles};
    align-self: flex-start;
    font-weight: 400;
    font-size: 0.9rem;
  }

  button.apply {
    ${actionButtonStyles};
    grid-column: 1 / -1;
    grid-row: 4 / span 1;
  }
`;

const listStyles = css`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;

  label {
    margin-top: 1rem;
    font-weight: 600;
  }

  ul {
    margin: 0;
  }
`;

export const CostsList = styled.div`
  ${listStyles};
`;

export const RewardsList = styled.div`
  ${listStyles};
`;
