import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AuthContext from './store/authContext';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route element={<ProtectedRoute isAuthenticated={!!!authCtx.isLoggedIn} />}>
          <Route path='/auth' element={<AuthPage />} />
        </Route>

        <Route element={<ProtectedRoute isAuthenticated={!!authCtx.isLoggedIn} />}>
          <Route path='/profile' element={<UserProfile />} />
        </Route>
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
