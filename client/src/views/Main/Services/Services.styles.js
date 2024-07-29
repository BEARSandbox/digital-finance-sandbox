import styled from 'styled-components';

import { buttonStyles } from '../../../shared/Header/Header.styles';

export const StyledServices = styled.div`
  padding: 3rem 0;
`;

export const PanelsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1;
  grid-gap: 1rem;
`;

export const Panel = styled.div`
  ${buttonStyles};
  justify-self: stretch;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  background: #2d315d;
  color: #f0f0f0;

  img {
    filter: invert(0.9);
    object-fit: cover;
    width: 3.5rem;
    margin-right: 1rem;
  }

  label {
    pointer-events: none;
    font-size: 1.2rem;
  }
`;
