import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/home';
import MainMenu from 'components/_common/mainMenu';
import NotFound from './components/notFound';
import PageLink from 'components/_common/pageLink';
import Examples from 'components/examples';
import './styles/app.css';

function App() {
  // use HashRouter to host in GitHub pages. 
  // BrowserRouter are not supported here
  return (
    <HashRouter basename={`${process.env.PUBLIC_URL}/`}>
      <div className='app'>
        <div className='header'>
          <PageLink to={`/`}>
            <span>Digital</span> Grid Examples
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
              <Redirect to={`/not-found`} />
            </Switch>
          </div>
        </div>
        <div className='footer'>Digital Grid Examples</div>
      </div>
    </HashRouter>
  );
}

export default App;
