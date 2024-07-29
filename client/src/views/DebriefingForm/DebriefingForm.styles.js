import styled from 'styled-components';
import { actionButtonStyles } from '../CreditCards/Apply/Apply.styles';

export const Container = styled.div`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 10px 40px;
`;

export const Heading = styled.h1`
  text-align: center;
`;

export const HeadingSmall = styled.h3`
  text-align: center;
  font-weight: normal;
`;

export const HeaderImage = styled.img`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

export const Button = styled.button`
  ${actionButtonStyles};
  transition: none;
`;

export const Table = styled.table`
  border: 1px solid black;
  padding: 10px;

  td {
    padding: 5px 15px;
  }
`;
