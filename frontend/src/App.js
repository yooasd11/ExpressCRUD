import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

import List from './routes/List';
import Join from './routes/Join';
import Login from './routes/Login';
import './global.css';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <Router>
          <div>
            <nav>
              <ul className="links">
                <li>
                  <Link to="/list">List</Link>
                </li>
                <li>
                  <Link to="/join">Join</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <Redirect exact from='/' to='/list'></Redirect>
              <Route path="/list" component={List}></Route>
              <Route path="/join" component={Join}></Route>
              <Route path="/login" component={Login}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }

}

export default App;
