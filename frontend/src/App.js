import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import List from './routes/List';
import Join from './routes/Join';
import Login from './routes/Login';
import MyPage from './routes/MyPage';
import { AUTH_URL } from './api/config';
import './global.css';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
    }
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth() {
    axios.get(AUTH_URL, { withCredentials: true })
      .then(res => {
        this.setState({
          auth: res.data.auth,
          userId: res.data.userId,
        });
      })
      .catch(err => {
        if (err.response) {
          console.log("error response : ", err.response);
        } else if (err.request) {
          console.log("error request : ", err.request);
        } else {
          console.log("error message : ", err.message);
        }
        console.log("error config : ", err.config);
      })
  }


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
                {
                  this.state.auth ? "" :
                    <li>
                      <Link to="/join">Join</Link>
                    </li>
                }
                <li>
                  {this.state.auth ? <Link to="/mypage">My Page</Link> : <Link to="/login">Login</Link>}
                </li>
              </ul>
            </nav>

            <Switch>
              <Redirect exact from='/' to='/list'></Redirect>
              <Route path="/list" component={List}></Route>
              <Route path="/join" component={Join}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/mypage" render={() => <MyPage id={this.state.userId}></MyPage>}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }

}

export default App;
