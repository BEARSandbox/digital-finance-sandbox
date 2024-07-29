import styled from 'styled-components';
import { actionButtonStyles } from '../CreditCards/Apply/Apply.styles';

export const HomeButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  font-size: 2rem;
  font-weight: 700;
  color: #2a3979;
  padding: 0;
`;

export const Button = styled.button`
  ${actionButtonStyles};
  margin-top: 40px;
`;

export const Container = styled.div`
  background: #efefef;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  max-width: 40rem;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(0, 25, 40, 0.12), 0 2px 2px 0 rgba(0, 25, 40, 0.07);
  padding: 2rem;
  border-radius: 10px;
`;
