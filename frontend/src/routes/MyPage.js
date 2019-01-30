import React from 'react';
import { connect } from 'react-redux';
import authActions from '../redux/actions/AuthAction';
import './MyPage.scss';

const mapDispatchToProps = {
	logOut: authActions.logOut
};

class MyPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logOut();
    }

    render() {
        return (
            <div className="mypage-wrapper">
                <h2>My Page</h2>
                <section>
                    id : {this.props.id}
                </section>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(MyPage);