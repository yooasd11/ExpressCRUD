import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import List from './routes/List';
import Join from './routes/Join';
import Login from './routes/Login';
import MyPage from './routes/MyPage';
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
						<nav>
							<ul className="links">
								<li>
									<Link to="/list">List</Link>
								</li>
								{this.props.auth ? (
									''
								) : (
										<li>
											<Link to="/join">Join</Link>
										</li>
									)}
								<li>
									{this.props.auth ? (
										<Link to="/mypage">My Page</Link>
									) : (
											<Link to="/login">Login</Link>
										)}
								</li>
							</ul>
						</nav>
						<Switch>
							<Redirect exact from="/" to="/list" />
							{ this.props.auth ? <Redirect from="/login" to="/mypage" /> : <Redirect from="/mypage" to="/login" />}
							<Route path="/list" component={List} />
							<Route path="/join" component={Join} />
							<Route path="/login" component={Login} />
							<Route path="/mypage" render={() => <MyPage id={this.props.userId} />} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
