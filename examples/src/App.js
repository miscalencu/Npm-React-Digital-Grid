import React from 'react';
import { HashRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import Home from './components/home';
import Simple from './components/simple';
import Full from './components/full';
import MainMenu from 'components/_common/mainMenu';
import Expandable from './components/expandable';
import NotFound from './components/notFound';

import './styles/app.css';

function App() {
  return (
    <HashRouter>
      <div className='app'>
        <div className='header'>
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <span>Digital</span> Grid Examples
          </Link>
        </div>
        <div className='main_container'>
          <div className='left'>
            <MainMenu />
          </div>
          <div className='main'>
            <Switch>
              <Route path={`${process.env.PUBLIC_URL}/`} exact component={Home} />
              <Route path={`${process.env.PUBLIC_URL}/simple`} component={Simple} />
              <Route path={`${process.env.PUBLIC_URL}/full`} component={Full} />
              <Route path={`${process.env.PUBLIC_URL}/expandable`} component={Expandable} />
              <Route path={`${process.env.PUBLIC_URL}/not-found`} component={NotFound} />
              <Redirect to={`${process.env.PUBLIC_URL}/not-found`} />
            </Switch>
          </div>
        </div>
        <div className='footer'>Digital Grid Examples</div>
      </div>
    </HashRouter>
  );
}

export default App;
