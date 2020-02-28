import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Simple from './components/Simple';
import Full from './components/Full';
import MainMenu from 'components/_common/MainMenu';
import Expandable from './components/expandable';
import './styles/app.css';

function App() {
  return (
    <div className='app'>
      <div className='header'>
        <span>Digital</span> Grid Examples
      </div>
      <div className='main_container'>
        <div className='left'>
          <MainMenu />
        </div>
        <div className='main'>
          <Switch>
            <Route path='/simple' component={Simple} />
            <Route path='/full' component={Full} />
            <Route path='/expandable' component={Expandable} />
            <Route path='/' exact component={Home} />
          </Switch>
        </div>
      </div>
      <div className='footer'>Digital Grid Examples</div>
    </div>
  );
}

export default App;
