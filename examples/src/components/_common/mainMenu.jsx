import React from 'react';
import PageLink from './pageLink';

const MainMenu = () => {
  return (
    <ul>
      <li>
        <PageLink to={`/`}>Home</PageLink>
      </li>
      <li>
        Simple Examples
        <ul>
          <li>
            <PageLink to={`/examples/simple`}>Simple</PageLink>
          </li>
          <li>
            <PageLink to={`/examples/skins`}>Skins</PageLink>
          </li>
          <li>
            <PageLink to={`/examples/paging`}>Paging</PageLink>
          </li>
          <li>
            <PageLink to={`/examples/sorting`}>Sorting</PageLink>
          </li>
        </ul>
      </li>
      <li>
        Advanced Examples
        <ul>
          <li>
            <PageLink to={`/examples/events`}>Events</PageLink>
          </li>
          <li>
            <PageLink to={`/examples/selection`}>Selection</PageLink>
          </li>
          <li>
            <PageLink to={`/examples/expandable`}>Expandable content</PageLink>
          </li>
          <li>
            <PageLink to={`/examples/full`}>Full Features</PageLink>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default MainMenu;
