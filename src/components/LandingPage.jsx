import React, { useEffect, useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Simulate a delay before showing the Login component
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`landing-page ${showLogin ? 'hide' : ''}`}>
      <h1 className='text-white'>Welcome to Our App!</h1>
      {/* Add any desired content for the landing page */}
    </div>
  );
};

export default LandingPage;
