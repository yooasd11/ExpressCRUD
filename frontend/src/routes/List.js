import React from 'react';
import { connect } from 'react-redux';
import userAction from '../redux/actions/UserAction';
import './List.scss';

const mapStateToProps = (state) => ({
    users: state.user.users,
});

const mapDispatchToProps = {
    fetch: userAction.fetch,
};
class List extends React.Component {

    componentDidMount() {
        this.props.fetch();
    }

    render() {
        return (
            <div className="list-wrapper">
                <h2>List of users</h2>
                <ul>
                    {this.props.users.map(user => <li key={user.uid}>{user.uid} / {user.id} / {user.email}</li>)}
                </ul>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);