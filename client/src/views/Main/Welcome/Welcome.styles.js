import styled from 'styled-components';

import { buttonStyles } from '../../../shared/Header/Header.styles';
import { linkButtonStyles } from '../../CreditCards/Introduction/Introduction.styles';

export const StyledWelcome = styled.div`
  background: #f0f0f0;
  padding: 3rem 0;
`;

export const PanelsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1;
  grid-gap: 1rem;
`;

export const Panel = styled.div`
  justify-self: stretch;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  img {
    object-fit: cover;
    width: 100%;
  }

  button {
    ${buttonStyles};
    background: #2a3979;
    color: #f0f0f0;
  }

  ul {
    padding: 0;
    li {
      padding: 0.5rem 1.5rem;
      font-size: 1rem;
      font-weight: 700;
      list-style: none;
      background-image: url('/assets/icons/chevron-right.png');
      background-repeat: no-repeat;
      background-position: left center;
      background-size: 1rem;
      cursor: pointer;
    }
  }

  label {
    margin-auto: auto;
    ${linkButtonStyles};
    padding-left: 0;
  }
`;

export const Link = styled.li``;
export const Label = styled.label``;
