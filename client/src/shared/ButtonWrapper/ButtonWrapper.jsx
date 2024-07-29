import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import metricsActions from '../../redux/metrics/actions';

function ButtonWrapper(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const showButtonId = useSelector((state) => state.auth.buttonId);

  const Component = props.component;
  const buttonId = (props.text ? props.text + ' - ' : '') + props.location;
  const displayText = showButtonId ? buttonId : props.text;
  const metaData = props.data;

  // Store metadata about the click event to send to the database
  const clickHandler = () => {
    if (props.disabled) return;

    // Only want to store data for regular users, not admins
    if (!isAdmin) {
      const clickData = {
        type: 'click',
        webpage: location.pathname,
        clickedOn: buttonId,
        time: Date.now(),
        metadata: metaData,
      };

      dispatch(metricsActions.addActionData(clickData));
    }

    if (props.onClick) props.onClick();
  };

  // The component is modified with a new clickHandler and text
  return (
    <Component onClick={clickHandler} disabled={props.disabled}>
      {displayText}
    </Component>
  );
}

export default ButtonWrapper;
