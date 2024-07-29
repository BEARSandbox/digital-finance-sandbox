import styled, { css } from 'styled-components';

const optionStyles = css`
  outline: none;
  padding: 0.3rem 0;
  background: transparent;
  color: grey;
  border: 1px solid grey;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  min-width: 3.5rem;
  width: 50%;
  text-align: center;

  ${(props) =>
    props.current &&
    css`
      border-color: transparent;
      background: #2d315d;
      color: #efefef;
    `}
`;

export const StyledMultiButton = styled.div`
  display: flex;
`;
export const FirstOption = styled.button`
  ${optionStyles};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;
export const MiddleOption = styled.button`
  ${optionStyles};
  border-radius: 0px;
`;
export const LastOption = styled.button`
  ${optionStyles};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;
