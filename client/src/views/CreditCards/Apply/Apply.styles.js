import styled, { css } from 'styled-components';

import { buttonStyles } from '../../../shared/Header/Header.styles';

export const actionButtonStyles = css`
  ${buttonStyles};
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2d315d;
  color: #f0f0f0;
  border-radius: 5rem;
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem 3rem;
  margin: 1rem auto;
  max-width: 20rem;
`;

export const StyledCreditCardApply = styled.div`
  height: 100%;
  background: #f5f6f7;
`;

export const BeforeYouApply = styled.div`
  padding: 6rem 8rem;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  text-align: center;

  label.title {
    font-size: 2.5rem;
    font-weight: 700;
  }

  label.subtitle {
    display: flex;
    font-weight: 700;
    margin-top: 1rem;
  }

  label.condition {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 1.5rem;

    img {
      width: 2rem;
      margin-right: 0.5rem;
      filter: invert(15%) sepia(22%) saturate(2660%) hue-rotate(206deg)
        brightness(96%) contrast(87%);
    }
  }

  button.continue {
    ${actionButtonStyles};
  }
`;
export const Fees = styled.div`
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

export const ApplicationForm = styled.div`
  padding: 6rem 8rem;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  text-align: center;
`;

export const FormContainer = styled.div`
  width: 30rem;
  min-height: 30rem;
  margin: 0 auto;
  margin-bottom: 4rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label.heading {
    text-align: left;
    font-size: 2rem;
    font-weight: 700;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0.5rem 0;

  label {
    align-self: flex-start;
    text-align: left;
    color: #2d315d;
    font-weight: 700;
  }

  input,
  select {
    font-size: 1rem;
    min-height: 2rem;
    background: transparent;
    outline: none;
    border: none;
    border-bottom: 2px solid #ddd;
    transition: all 0.2s;

    &:focus {
      border-color: #2d315d;
    }

    ::placeholder {
      color: red;
    }
  }

  input.required,
  select.required {
    border-color: red;
  }

  input.optional,
  select.optional {
    border-color: #ff8c00;
  }

  input.disabled,
  select.disabled {
    cursor: not-allowed;
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

export const Review = styled.div`
  padding: 6rem 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 60rem;
  margin: 0 auto;
  text-align: center;

  label.title {
    font-size: 2rem;
    font-weight: 700;
    text-align: left;
  }

  div.terms {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;

    label.heading {
      text-align: left;
      font-size: 1.5rem;
      font-weight: 700;
    }

    div.details {
      height: 17rem;
      overflow-y: scroll;
      background: #fff;
      padding: 1rem;
      margin: 1rem 0;
      box-shadow: 0 0 2px 0 rgba(0, 25, 40, 0.12),
        0 2px 2px 0 rgba(0, 25, 40, 0.07);

      li {
        margin-bottom: 1em;
        line-height: 1.5;
        text-align: left;
      }
    }

    div.confirm {
      display: flex;
      margin-top: 1rem;
      text-align: left;

      > label {
        margin-left: 0.5rem;
        font-size: 1rem;
        font-weight: 700;
      }
    }
  }

  div.buttons {
    display: flex;
    width: 100%;
    justify-content: flex-start;

    button.back {
      ${actionButtonStyles};
      margin-left: 0;
      margin-right: auto;
    }

    button.submit {
      ${actionButtonStyles};
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

export const ReviewableFormsList = styled.div`
  margin: 2rem 0;
`;

export const ReviewableForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;

  label.name {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: left;
  }
`;

export const ThankYou = styled.div`
  padding: 6rem 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-width: 50rem;
  margin: 0 auto;
  text-align: center;

  label.title {
    font-size: 2rem;
    font-weight: 700;
    text-align: left;
  }

  label.subtitle {
    text-align: left;
  }

  button.back {
    ${actionButtonStyles};
  }
`;
