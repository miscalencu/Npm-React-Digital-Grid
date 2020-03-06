import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import Home from './components/home';
import Simple from './components/simple';
import Full from './components/full';
import MainMenu from 'components/_common/mainMenu';
import Expandable from './components/expandable';
import NotFound from './components/notFound';

import './styles/app.css';

function App() {
  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
      <div className='app'>
        <div className='header'>
          <Link to={`/`}>
            <span>Digital</span> Grid Examples
          </Link>
        </div>
        <div className='main_container'>
          <div className='left'>
            <MainMenu />
          </div>
          <div className='main'>
            <Switch>
              <Route path={`/`} exact component={Home} />
              <Route path={`/simple`} component={Simple} />
              <Route path={`/full`} component={Full} />
              <Route path={`/expandable`} component={Expandable} />
              <Route path={`/not-found`} component={NotFound} />
              <Redirect to={`/not-found`} />
            </Switch>
          </div>
        </div>
        <div className='footer'>Digital Grid Examples</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
