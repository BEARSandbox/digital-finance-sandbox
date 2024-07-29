import styled from 'styled-components';

export const FeesContainer = styled.div`
  border: 1px solid black;
  border-bottom: none;
`;

export const FeeSection = styled.div`
  display: grid;
  grid-template-columns: 6rem 1fr;
  border-bottom: 1px solid black;
`;
export const FeeName = styled.div`
  border-right: 1px solid black;
  padding: 0.5rem;
`;
export const FeeDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;
export const FeeDetail = styled.div``;

export const Bold = styled.span`
  font-weight: 700;
`;
export const BoldBig = styled.span`
  font-weight: 700;
  font-size: 18px;
`;

export const Underline = styled.span`
  text-decoration: underline;
`;

export const QuickLink = styled.div`
  display: inline;
  color: #2d315d;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export const Logo = styled.div`
  height: 3rem;
  font-size: 2rem;
  font-weight: 700;
  margin-right: auto;
  color: #2a3979;
  text-align: left;
  padding: 0;
`;
