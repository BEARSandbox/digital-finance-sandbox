import styled from "styled-components";

export const StyledResponsiveBox = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 75rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
`;
