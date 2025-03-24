import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login after 2 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-indigo-600">
      <div className="text-center animate-fade-in">
        <i className="fas fa-graduation-cap text-7xl text-white mb-4"></i>
        <h1 className="text-4xl font-bold text-white mb-2">EduApp</h1>
        <p className="text-indigo-200">Connect. Learn. Grow.</p>
      </div>
    </div>
  );
};

export default Splash;