import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import List from './routes/List';
import Join from './routes/Join';
import Login from './routes/Login';
import MyPage from './routes/MyPage';
import './App.scss';
import authActions from './redux/actions/AuthAction';

const mapStateToProps = state => ({
  auth: state.auth.auth,
  userId: state.auth.userId,
});


const mapDispatchToProps = {
  checkAuth: authActions.auth
};

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {

  componentDidMount() {
    // action dispatch
    this.props.checkAuth();
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
                  this.props.auth ? "" :
                    <li>
                      <Link to="/join">Join</Link>
                    </li>
                }
                <li>
                  {this.props.auth ? <Link to="/mypage">My Page</Link> : <Link to="/login">Login</Link>}
                </li>
              </ul>
            </nav>

            <Switch>
              <Redirect exact from='/' to='/list'></Redirect>
              <Route path="/list" component={List}></Route>
              <Route path="/join" component={Join}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/mypage" render={() => <MyPage id={this.props.userId}></MyPage>}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }

}

export default App;
