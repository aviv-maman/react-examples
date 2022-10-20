import { useContext, useState } from 'react';
import AuthContext from '../../store/authContext';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);

  const [formData, setFormData] = useState({ password: '' });

  const [formValidity, setFormValidity] = useState({
    password: false,
    error: false,
    isLoading: false,
    success: false,
  });

  const validPassword = (value) => value.trim() !== '' && value.trim().length >= 6;

  const validateInput = (name, value) => {
    switch (name) {
      case 'password':
        const isValidPassword = validPassword(value);
        setFormValidity((previousState) => ({
          ...previousState,
          password: isValidPassword,
        }));
        break;
      default:
        break;
    }
  };

  function handleChange(event) {
    setFormData((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
    validateInput(event.target.name, event.target.value);
    setFormValidity((previousState) => ({
      ...previousState,
      error: false,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormValidity((previousState) => ({
      ...previousState,
      isLoading: true,
      success: false,
      error: false,
    }));
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDxsUbERNjp3jDktRAvPCcckF8UEswTjHY';
    try {
      const objToSubmit = {
        idToken: authCtx.idToken,
        password: formData.password,
        returnSecureToken: false,
      };
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(objToSubmit),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setFormValidity((previousState) => ({
          ...previousState,
          success: true,
        }));
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
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type='password'
          id='password'
          name='password'
          minLength={6}
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
        {formValidity.error && <p className=''>{formValidity.error}</p>}
        {formValidity.success && <p className=''>{'Password was successfully changed'}</p>}
      </div>
    </form>
  );
};

export default ProfileForm;
