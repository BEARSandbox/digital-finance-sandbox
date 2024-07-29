import styled from 'styled-components';

export const StyledFooter = styled.footer`
  padding: 0.5rem 0;
  background: #555;
  color: #f0f0f0;
`;

export const QuickLinks = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  border-bottom: 0.1rem solid grey;
`;

export const QuickLink = styled.div`
  margin-right: 2rem;
  div {
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
`;

export const Copyright = styled.h4``;
