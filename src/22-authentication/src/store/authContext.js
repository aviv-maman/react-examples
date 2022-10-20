import { createContext, useCallback, useEffect, useState } from 'react';

let logoutTimer;

const AuthContext = createContext({
  idToken: '',
  email: '',
  refreshToken: '',
  expiresIn: '',
  localId: '',
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const remainingTime = expirationTime - currentTime;
  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedIdToken = localStorage.getItem('idToken');
  const storedExpirationTime = localStorage.getItem('expirationTime');
  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 60) {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return { idToken: storedIdToken, remainingTime: remainingTime };
};

export const AuthContextProvider = (props) => {
  // const initialIdToken = localStorage.getItem('idToken');
  // const [user, setUser] = useState({ idToken: initialIdToken || null });
  const tokenData = retrieveStoredToken();
  const initialIdToken = tokenData?.idToken;

  const [user, setUser] = useState({ idToken: initialIdToken || null });
  const userIsLoggedIn = !!user?.idToken;

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('idToken'); //another option is to use clear
    localStorage.removeItem('expirationTime');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const handleLogin = (data) => {
    setUser((previousState) => ({
      ...previousState,
      ...data,
    }));
    localStorage.setItem('idToken', data.idToken);
    localStorage.setItem('expirationTime', new Date().getTime() + +data.expiresIn * 1000);
    const remainingTime = calculateRemainingTime(new Date().getTime() + +data.expiresIn * 1000);
    logoutTimer = setTimeout(handleLogout, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.remainingTime);
      logoutTimer = setTimeout(handleLogout, tokenData.remainingTime);
    }
  }, [tokenData, handleLogout]);

  const contextValue = {
    idToken: user?.idToken || '',
    email: user?.email || '',
    refreshToken: user?.refreshToken || '',
    // expiresIn: user?.expiresIn || '',
    localId: user?.localId || '',
    isLoggedIn: userIsLoggedIn || false,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={contextValue} {...props} />;
};

export default AuthContext;
