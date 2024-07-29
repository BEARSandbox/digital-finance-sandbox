import React from 'react';

import { StyledResponsiveBox } from './ResponsiveBox.styles';

function ResponsiveBox({ column = false, children }) {
  return <StyledResponsiveBox column={column}>{children}</StyledResponsiveBox>;
}

export default ResponsiveBox;
