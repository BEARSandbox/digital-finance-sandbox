import styled from 'styled-components';

import { linkButtonStyles } from '../CreditCards/Introduction/Introduction.styles';
import { actionButtonStyles } from '../CreditCards/Apply/Apply.styles';

export const StyledTermsAndConditions = styled.div`
  height: 100%;
  background: #f5f6f7;
`;

export const TermsContainer = styled.div`
  padding: 4rem 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50rem;
  margin: 0 auto;
  text-align: left;

  > label {
    width: 100%;
    margin: 0.5rem;
  }

  label.name {
    color: #2d315d;
    font-weight: 700;
  }

  label.title {
    font-size: 2rem;
    font-weight: 700;
  }

  label.subtitle {
    font-weight: 700;
  }

  button.details {
    ${linkButtonStyles};
    margin-right: auto;
    padding-left: 0;
  }

  div.details {
    height: 17rem;
    overflow-y: scroll;
    background: #fff;
    padding: 1rem;
    box-shadow: 0 0 2px 0 rgba(0, 25, 40, 0.12),
      0 2px 2px 0 rgba(0, 25, 40, 0.07);

    > table {
      border: 1px solid #ddd;
    }

    td.important-info-left {
      border: 1px solid #ddd;
      min-width: 8rem;
      vertical-align: top;
      padding: 0 0.5rem;
    }

    td.important-info-right {
      border: 1px solid #ddd;
      padding: 0 0.5rem;
    }
  }

  div.confirm {
    display: flex;
    width: 100%;
    margin-top: 1rem;

    > label {
      margin-left: 0.5rem;
      font-size: 1rem;
      font-weight: 700;
    }
  }
`;

export const FormButtons = styled.div`
  margin-top: auto;
  display: flex;
  width: 100%;
  justify-content: flex-start;

  button.back {
    ${actionButtonStyles};
    margin-left: 0;
    margin-right: auto;
  }

  button.next {
    ${actionButtonStyles};
    margin-left: 0;
    margin-right: 0;
  }

  button.next:disabled {
    background: #ccc;
    cursor: auto;
  }
`;
