import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

function ScrollTracker({ children, onScroll, className }) {
  const feesScrollable = useRef(null);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const checkScrollPosition = () => {
    // This can happen if the next button is clicked before this callback is called
    // since it is throttled
    if (!feesScrollable.current) return;

    const maxScroll =
      feesScrollable.current.scrollHeight - feesScrollable.current.clientHeight;

    // Clip between [0, maxScroll]
    const currScroll = Math.min(
      maxScroll,
      Math.max(0, feesScrollable.current.scrollTop)
    );

    const percentScrolled = Math.round((currScroll / maxScroll) * 100);

    // Send the current scroll percentage back to the parent component using the ScrollTracker
    onScroll(percentScrolled);
  };

  return (
    <div
      ref={feesScrollable}
      className={className}
      onScroll={!isAdmin ? _.throttle(checkScrollPosition, 500) : null}
    >
      {children}
    </div>
  );
}

export default ScrollTracker;
