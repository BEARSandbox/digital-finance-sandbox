import styled from 'styled-components';

export const StyledLogin = styled.div`
  padding: 0.5rem 0;
  background: #efefef;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: auto;
  margin: auto;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(0, 25, 40, 0.12), 0 2px 2px 0 rgba(0, 25, 40, 0.07);
  border-radius: 0.2rem;
  padding: 1rem;

  h2.title {
    color: #2d315d;
  }

  div.field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    label {
      font-size: 0.8rem;
      font-weight: 700;
    }

    input {
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
    }
  }

  button.submit {
    background: #2d315d;
    color: #fff;
    border: none;
    border-radius: 0.2rem;
    height: 2.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;
