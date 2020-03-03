import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        Basic Features
        <ul>
          <li>
            <Link to={`${process.env.PUBLIC_URL}/simple`}>Simple</Link>
          </li>
          <li>
            <Link to={`${process.env.PUBLIC_URL}/templates`}>Templates</Link>
          </li>
          <li>
            <Link to={`${process.env.PUBLIC_URL}/paging`}>Paging</Link>
          </li>
          <li>
            <Link to={`${process.env.PUBLIC_URL}/sorting`}>Sorting</Link>
          </li>
        </ul>
      </li>
      <li>
        Advanced Features
        <ul>
          <li>
            <Link to={`${process.env.PUBLIC_URL}/events`}>Events</Link>
          </li>
          <li>
            <Link to={`${process.env.PUBLIC_URL}/selection`}>Selection</Link>
          </li>
          <li>
            <Link to={`${process.env.PUBLIC_URL}/expandable`}>Expandable content</Link>
          </li>
        </ul>
      </li>
      <li>
        <Link to={`${process.env.PUBLIC_URL}/full`}>Full Features</Link>
      </li>
    </ul>
  );
};

export default MainMenu;
