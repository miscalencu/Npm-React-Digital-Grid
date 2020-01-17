import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './styles/app.css';

import Home from './components/Home';
import Simple from './components/Simple';
import Full from './components/Full';
import MainMenu from 'components/_common/MainMenu';

function App() {
  return (
    <div className="app">
      <div className="header"><span>Digital</span> Grid Examples</div>
      <div className="main_container">
        <div className="left"><MainMenu /></div>
        <div className="main">
          <BrowserRouter>
              <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/simple" component={Simple} />
                  <Route path="/full" component={Full} />
              </Switch>
            </BrowserRouter>
        </div>
      </div>
      <div className="footer">Digital Grid Examples</div>
    </div>
  );
  }

export default App;
