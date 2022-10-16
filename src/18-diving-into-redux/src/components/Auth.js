import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import classes from './Auth.module.css';

const Auth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.login());
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
  };

  return (
    <main className={classes.auth}>
      <section>
        <form>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          {!isAuthenticated ? (
            <button onClick={loginHandler}>Login</button>
          ) : (
            <button onClick={logoutHandler}>Logout</button>
          )}
        </form>
      </section>
    </main>
  );
};

export default Auth;
