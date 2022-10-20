import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/authContext';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formValidity, setFormValidity] = useState({
    email: false,
    password: false,
    error: false,
    isLoading: false,
  });

  const [formIsTouched, setFormIsTouched] = useState({
    email: false,
    password: false,
  });

  const isNotEmpty = (value) => value.trim() !== '';
  const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const validateInput = (name, value) => {
    switch (name) {
      case 'email':
        const isValidEmail = isEmail(value);
        setFormValidity((previousState) => ({
          ...previousState,
          email: isValidEmail,
        }));
        break;
      case 'password':
        const isValidPassword = isNotEmpty(value);
        setFormValidity((previousState) => ({
          ...previousState,
          password: isValidPassword,
        }));
        break;
      default:
        break;
    }
  };

  // const validateForm = () => {
  //   const isValidForm = formValidity.email && formValidity.password;
  //   setFormValidity((previousState) => ({
  //     ...previousState,
  //     error: isValidForm,
  //   }));
  // };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  function handleChange(event) {
    setFormData((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
    validateInput(event.target.name, event.target.value);
    // validateForm();
    setFormValidity((previousState) => ({
      ...previousState,
      error: false,
    }));
  }

  const handleBlur = (event) => {
    setFormIsTouched((previousState) => ({
      ...previousState,
      [event.target.name]: true,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setFormValidity((previousState) => ({
      ...previousState,
      isLoading: true,
    }));
    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxsUbERNjp3jDktRAvPCcckF8UEswTjHY';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxsUbERNjp3jDktRAvPCcckF8UEswTjHY';
    }
    try {
      const objToSubmit = { ...formData, returnSecureToken: true };
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(objToSubmit),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        authCtx.login(data);
        navigate('/', { replace: true });
      } else {
        let errorMessage = 'Authentication failed';
        if (data?.error?.message) {
          errorMessage = data.error.message;
          setFormValidity((previousState) => ({
            ...previousState,
            error: errorMessage,
          }));
        }
      }
    } catch (error) {
      console.log(error.message);
      setFormValidity((previousState) => ({
        ...previousState,
        error: 'Error: Something went wrong',
      }));
    }
    setFormValidity((previousState) => ({
      ...previousState,
      isLoading: false,
    }));
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {!formValidity.email && formIsTouched.email && (
            <p className=''>Please enter a valid email.</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {!formValidity.password && formIsTouched.password && (
            <p className=''>Please enter a valid password.</p>
          )}
        </div>
        <div className={classes.actions}>
          <button
            disabled={!formValidity.email || !formValidity.password || formValidity.isLoading}>
            {isLogin ? 'Login' : 'Create Account'}
          </button>
          <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          {formValidity.error && <p className=''>{formValidity.error}</p>}
          {formValidity.isLoading && <p className=''>Loading....</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
