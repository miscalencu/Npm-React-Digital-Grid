import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MainMenu extends Component {
  render() {
    return (
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          Basic Features
          <ul>
            <li>
              <Link to='/simple'>Simple</Link>
            </li>
            <li>
              <Link to='/templates'>Templates</Link>
            </li>
            <li>
              <Link to='/paging'>Paging</Link>
            </li>
            <li>
              <Link to='/sorting'>Sorting</Link>
            </li>
          </ul>
        </li>
        <li>
          Advanced Features
          <ul>
            <li>
              <Link to='/events'>Events</Link>
            </li>
            <li>
              <Link to='/selection'>Selection</Link>
            </li>
            <li>
              <Link to='/expandable'>Expandable content</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to='/full'>Full Features</Link>
        </li>
      </ul>
    );
  }
}
