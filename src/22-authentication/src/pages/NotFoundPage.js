import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/notfound', { replace: true });
  }, [navigate]);

  return (
    <div>
      <h1>Page Not Found</h1>
    </div>
  );
};

export default NotFoundPage;
