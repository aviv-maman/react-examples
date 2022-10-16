import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/authSlice';
import classes from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.login());
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        <ul>
          {isAuth && (
            <React.Fragment>
              <li>
                <a href='/'>My Products</a>
              </li>
              <li>
                <a href='/'>My Sales</a>
              </li>
            </React.Fragment>
          )}
          <li>
            {isAuth ? (
              <button onClick={logoutHandler}>Logout</button>
            ) : (
              <button onClick={loginHandler}>Login</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
