import React from 'react';
import { Link } from 'react-router-dom';
import { faUnlink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>404</h1>
      <div style={{ color: '#aaa', padding: '10px' }}>
        <h2>Oops! Page not found</h2>
        <FontAwesomeIcon icon={faUnlink} size="9x" />
      </div>
      <br />
      <div>
        <Link to='/'>Go Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
