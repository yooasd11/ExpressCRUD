import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route, Switch,
	Link,
	Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

import List from './routes/List';
import Join from './routes/Join';
import Login from './routes/Login';
import MyPage from './routes/MyPage';
import GuardedRoute from './common/GuardedRoute';
import './App.scss';
import authActions from './redux/actions/AuthAction';

const mapStateToProps = (state) => ({
	auth: state.auth.auth,
	userId: state.auth.userId
});

const mapDispatchToProps = {
	checkAuth: authActions.auth
};

class App extends Component {

	componentDidMount() {
		this.props.checkAuth();
	}

	render() {
		return (
			<div className="app-wrapper">
				<Router>
					<div>
						Auth : {String(this.props.auth)} , UserId : {this.props.userId}
						<nav className="links">
							<Link to="/list">List</Link>
							<Link to="/videos" style={{ display: this.props.auth ? 'block': 'none' }}>Videos</Link>
							<Link to="/mypage" style={{ display: this.props.auth ? 'block': 'none' }}>My Page</Link>
							<Link to="/login" style={{ display: this.props.auth ? 'none': 'block' }}>Login</Link>
							<Link to="/join" style={{ display: this.props.auth ? 'none': 'block' }}>Join</Link>
						</nav>
						<Switch>
							<Redirect exact from="/" to="/list" />
							<Route path="/list" component={List} />
							<Route path="/join" component={Join} />
							<GuardedRoute path="/login" guard={!this.props.auth} fallback="/mypage" component={Login} />
							<GuardedRoute path="/mypage" guard={this.props.auth} fallback="/login" render={() => <MyPage id={this.props.userId} />} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
