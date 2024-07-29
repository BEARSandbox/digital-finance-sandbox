import styled, { css } from 'styled-components';

export const StyledHeader = styled.header`
  padding: 0.5rem 0;
`;

export const buttonStyles = css`
  outline: none;
  border: none;
  background: transparent;
  border-radius: 0.2rem;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 1;
  font-size: 1rem;
  padding: 0.5rem 1rem;

  :hover {
    opacity: 0.9;
  }
`;

export const HomeButton = styled.button`
  ${buttonStyles};
  height: 3rem;
  font-size: 2rem;
  font-weight: 700;
  margin-right: auto;
  color: #2a3979;
  text-align: left;
  padding: 0;
  :hover {
    opacity: 1;
  }
`;

export const NavButton = styled.button`
  ${buttonStyles};
  padding: 0.5rem;
  margin: 0 0.25rem;
  font-size: 1rem;
  font-weight: 700;
  color: #2d315d;
  :hover {
    opacity: 1;
    background: #efefef;
  }

  &.active {
    opacity: 1;
    background: #383d75;
    color: #ffffff;
    cursor: text;
  }

  &.yellow {
    color: #cfac00;
  }
`;
