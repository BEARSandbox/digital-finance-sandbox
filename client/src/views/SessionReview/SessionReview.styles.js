import styled, { css } from 'styled-components';

import { actionButtonStyles } from '../CreditCards/Apply/Apply.styles';

export const Container = styled.div`
  background: #efefef;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  width: 40rem;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(0, 25, 40, 0.12), 0 2px 2px 0 rgba(0, 25, 40, 0.07);
  padding: 2rem;
  border-radius: 10px;
`;

export const Header = styled.div``;

export const QuestionsContainer = styled.div``;

export const Question = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  label:first-of-type {
    font-weight: 700;
  }

  input {
    font-size: 1rem;
    border: 1px solid #555;
    border-radius: 3px;
    padding: 7px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 10px;
`;

export const SubmitButton = styled.button`
  ${actionButtonStyles};
  transition: all 0.2s;

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
      background: #efefef;
      color: #bbb;
    `}
`;

export const Label = styled.label`
  font-size: 20px;
  font-weight: 700;
  color: #2a3979;
  margin-bottom: -30px;
`;

export const SmallLabel = styled.p`
  font-weight: 700;
  color: #2a3979;
  margin-bottom: -10px;
  text-align: right;
`;
