import React from 'react';

import {
  StyledMultiButton,
  FirstOption,
  MiddleOption,
  LastOption,
} from './MultiButton.styles';

const MultiButton = ({
  currentValue = null,
  options = [],
  onClickOption = () => {},
}) => {
  if (options.length === 0) return null;

  const middleOptions = [];
  for (let i = 1; i < options.length - 1; i++) {
    middleOptions.push(
      <MiddleOption
        key={i}
        current={currentValue === options[i].value}
        onClick={() => onClickOption(options[i].value)}
      >
        {options[i].label}
      </MiddleOption>
    );
  }

  return (
    <StyledMultiButton>
      {options.length >= 1 ? (
        <FirstOption
          current={currentValue === options[0].value}
          onClick={() => onClickOption(options[0].value)}
        >
          {options[0].label}
        </FirstOption>
      ) : null}

      {middleOptions}

      {options.length >= 2 ? (
        <LastOption
          current={currentValue === options[options.length - 1].value}
          onClick={() => onClickOption(options[options.length - 1].value)}
        >
          {options[options.length - 1].label}
        </LastOption>
      ) : null}
    </StyledMultiButton>
  );
};

export default MultiButton;
