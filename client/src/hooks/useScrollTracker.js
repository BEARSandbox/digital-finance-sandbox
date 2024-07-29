import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import metricsActions from '../redux/metrics/actions';

function useScrollTracker() {
  const scrollHistory = useRef([]);
  const dispatch = useDispatch();
  const location = useLocation();

  const addScrollPosition = (percentScrolled) => {
    if (
      scrollHistory.current.length === 0 ||
      scrollHistory.current[scrollHistory.current.length - 1].position !==
        percentScrolled
    ) {
      scrollHistory.current.push({
        type: 'scroll',
        webpage: location.pathname,
        position: percentScrolled,
        time: Date.now(),
      });
    }
  };

  const consumeScrollData = () => {
    for (let i = 0; i < scrollHistory.current.length; i++) {
      dispatch(metricsActions.addActionData(scrollHistory.current[i]));
    }
    scrollHistory.current = [];
  };

  return [addScrollPosition, consumeScrollData];
}

export default useScrollTracker;
