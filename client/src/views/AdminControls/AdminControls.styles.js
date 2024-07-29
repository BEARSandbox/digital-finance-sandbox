import styled from 'styled-components';

const offset = 3;

export const StyledAdminControls = styled.div`
  position: fixed;
  bottom: ${(props) => {
    if (props.show) return '2rem';
    if (props.showDeleteButton) return `calc(-27rem - ${offset}rem)`;
    return `calc(-24rem - ${offset}rem)`;
  }};
  right: 2rem;
  width: 22rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  background: #efefef;
  overflow: hidden;
  transition: all 0.2s;
  box-shadow: 0 0 2px 0 rgba(0, 25, 40, 0.12), 0 2px 2px 0 rgba(0, 25, 40, 0.07);
  z-index: 2;
`;

export const ControlsHeader = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  height: 3rem;
  padding: 0 1rem;
  background: #2d315d;
  color: #efefef;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

export const PanelToggleButton = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

export const DatesContainer = styled.div`
  display: flex;
  column-gap: 3rem;
`;

export const DateContainer = styled.div`
  display: flex;
  width: 130px;

  .react-datepicker-wrapper {
    width: 100px;
  }

  .date-picker {
    width: 100px;
  }

  img.clear {
    width: 1.5rem;
    cursor: pointer;
    margin-left: 0.5rem;
  }
`;

export const ControlsButtons = styled.div`
  height: ${(props) => {
    if (props.showDeleteButton) return `calc(27rem + ${offset}rem)`;
    return `calc(24rem + ${offset}rem)`;
  }};
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin: 8px 0;
  background: gray;
`;

export const FactorToggle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.25rem 0;

  label {
    font-size: 0.9rem;
  }
`;

export const FullWidthButton = styled.div`
  padding: 7px;
  margin-top: 10px;
  display: flex;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #2d315d;
  border-color: ${(props) => {
    if (props.disabled) return 'gray';
    return '#2d315d';
  }};
  color: ${(props) => {
    if (props.disabled) return 'gray';
    return '#2d315d';
  }};
  cursor: ${(props) => {
    if (props.disabled) return 'not-allowed';
    return 'pointer';
  }};
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;

  &:hover {
    background: ${(props) => {
      if (props.disabled) return 'none';
      return 'rgba(45, 49, 93, 0.2);';
    }};
  }
`;
