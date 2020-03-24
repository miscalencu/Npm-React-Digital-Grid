import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import MainMenu from 'components/_common/mainMenu';
import NotFound from './components/notFound';
import PageLink from 'components/_common/pageLink';
import PageRedirect from 'components/_common/pageRedirect';
import Examples from 'components/examples';
import './styles/app.css';

function App() {
  return (
      <div className='app' id='app'>
        <div className='header'>
          <PageLink to={`/`}>
            <span>Digital</span> Grid
          </PageLink>
        </div>
        <div className='main_container'>
          <div className='left'>
            <MainMenu />
          </div>
          <div className='main'>
            <Switch>
              <Route path={`/`} exact component={Home} />
              <Route path={`/examples/:example`} component={Examples} />
              <Route path={`/not-found`} component={NotFound} />
              <PageRedirect to={`/not-found`} />
            </Switch>
          </div>
        </div>
        <div className='footer'>Digital Grid Examples</div>
      </div>
  );
}

export default App;
