import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <h1>404</h1>
        <h2>Oops! Page not found</h2>
      </div>
      <Link to='/'>Go to Home</Link>
    </div>
  );
};

export default NotFound;
