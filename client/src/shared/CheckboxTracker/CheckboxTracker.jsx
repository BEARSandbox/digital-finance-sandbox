import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import metricsActions from '../../redux/metrics/actions';

function CheckboxTracker(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(props.checked || false);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  // Store metadata about the change event to send to the database
  const changeHandler = () => {
    // Only want to store data for regular users, not admins
    if (!isAdmin) {
      const checkboxData = {
        type: 'checkbox',
        webpage: location.pathname,
        clickedOn: props.id,
        changedTo: !isChecked,
        time: Date.now(),
      };

      dispatch(metricsActions.addActionData(checkboxData));
    }

    if (props.onChange) props.onChange(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <input
      type="checkbox"
      name={props.name}
      onChange={changeHandler}
      checked={isChecked}
    />
  );
}

export default CheckboxTracker;
