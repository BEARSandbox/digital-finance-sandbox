import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import authActions from '../../redux/auth/actions';

import { Panel, StyledLogin } from './Login.styles';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const enterHandler = (e) => {
    const code = e.keyCode || e.which;

    // Enter key code
    if (code === 13) {
      dispatch(authActions.loginRequest(email, password));
    }
  };

  // Redirect to homepage if user is an admin
  useEffect(() => {
    if (isAdmin) {
      history.push('/');
    }
  }, [isAdmin, history]);

  return (
    <StyledLogin onKeyPress={enterHandler}>
      <Panel>
        <h2>Login</h2>
        <div className="field">
          <label>USERNAME OR EMAIL</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label>PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="submit"
          onClick={() => dispatch(authActions.loginRequest(email, password))}
        >
          SUBMIT
        </button>
      </Panel>
    </StyledLogin>
  );
}

export default Login;
