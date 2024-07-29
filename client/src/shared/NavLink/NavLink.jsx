import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import ButtonWrapper from '../ButtonWrapper/ButtonWrapper';
import { NavButton } from '../Header/Header.styles';

function NavLink({ to, location, children, component: Component = NavButton }) {
  const url = useLocation();
  const history = useHistory();
  const isActive = url.pathname === to;

  return (
    <ButtonWrapper
      component={(props) => (
        <Component
          {...props}
          disabled={isActive}
          className={isActive ? 'active' : ''}
        />
      )}
      onClick={() => history.push(to)}
      text={children}
      location={location}
    />
  );
}

export default NavLink;
