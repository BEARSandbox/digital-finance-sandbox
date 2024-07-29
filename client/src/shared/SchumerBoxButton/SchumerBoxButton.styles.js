import styled from 'styled-components';

import { linkButtonStyles } from '../../views/CreditCards/Introduction/Introduction.styles';

export const StyledButton = styled.button`
  ${linkButtonStyles};
  text-align: left;
  padding: 0;
  font-weight: 600;
  text-decoration: underline;
  color: red;

  ${(props) => props.styles}
`;
