import styled, { css } from 'styled-components';
import { buttonStyles } from '../../../shared/Header/Header.styles';

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const ScenarioContainer = styled.div`
  width: 40rem;
  height: auto;
  max-height: 80%;
  background: white;
  border-radius: 10px;
  padding: 2rem;
  position: relative;
`;

export const Button = css`
  ${buttonStyles};
  text-align: center;
  background: #2d315d;
  color: #f0f0f0;
  font-weight: 700;

  :disabled {
    background: #ccc;
    cursor: auto;
  }

  :hover:disabled {
    opacity: 1;
  }
`;

export const NextButton = styled.button`
  ${Button};
  width: 120px;
`;

export const ContinueButton = styled.button`
  ${Button};
  width: 200px;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;
