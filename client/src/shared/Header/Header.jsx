import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyledHeader, HomeButton, NavButton } from './Header.styles';
import ResponsiveBox from '../ResponsiveBox/ResponsiveBox';
import ButtonWrapper from '../ButtonWrapper/ButtonWrapper';
import NavLink from '../NavLink/NavLink';

import authActions from '../../redux/auth/actions';

function Header() {
  const dispatch = useDispatch();
  const { isAdmin, userId } = useSelector((state) => state.auth);

  const onClickLogout = () => {
    dispatch(authActions.logout());
  };

  const location = 'Header';
  return (
    <StyledHeader>
      <ResponsiveBox>
        <NavLink to="/" location={location} component={HomeButton}>
          Choice Research Bank
        </NavLink>
        <NavLink to="/accounts" location={location}>
          Accounts
        </NavLink>
        <NavLink to="/credit-cards" location={location}>
          Credit Cards
        </NavLink>
        <NavLink to="/mortgages" location={location}>
          Mortgages
        </NavLink>
        <NavLink to="/loans" location={location}>
          Loans
        </NavLink>
        <NavLink to="/investments" location={location}>
          Investments
        </NavLink>
        <NavButton className="yellow">User Id: {userId}</NavButton>

        {isAdmin ? (
          <ButtonWrapper
            component={NavButton}
            onClick={onClickLogout}
            text="Logout"
            location={location}
          />
        ) : null}
      </ResponsiveBox>
    </StyledHeader>
  );
}

export default Header;
