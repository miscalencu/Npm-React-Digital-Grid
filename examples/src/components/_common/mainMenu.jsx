import React from 'react';
import PageLink from './pageLink';

const MainMenu = () => {
  return (
    <ul>
      <li>
        <PageLink to={`/`}>Home</PageLink>
      </li>
      <li>
        Basic Features
        <ul>
          <li>
            <PageLink to={`/examples/simple`}>Simple</PageLink>
          </li>
          <li>
            <PageLink to={`/examples/skins`}>Skins</PageLink>
          </li>
          <li>
            <PageLink to={`/paging`}>Paging</PageLink>
          </li>
          <li>
            <PageLink to={`/sorting`}>Sorting</PageLink>
          </li>
        </ul>
      </li>
      <li>
        Advanced Features
        <ul>
          <li>
            <PageLink to={`/events`}>Events</PageLink>
          </li>
          <li>
            <PageLink to={`/selection`}>Selection</PageLink>
          </li>
          <li>
            <PageLink to={`/examples/expandable`}>Expandable content</PageLink>
          </li>
          <li>
            <PageLink to={`/examples/full`}>Full Features</PageLink>
          </li>
        </ul>
      </li>
      <li>
        <PageLink to={`/documentation`}>Documentation</PageLink>
      </li>
    </ul>
  );
};

export default MainMenu;
