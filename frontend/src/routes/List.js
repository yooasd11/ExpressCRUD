import React from 'react';
import axios from 'axios';

import { USERS_URL } from '../api/config';
import './List.scss';

class List extends React.Component {
    constructor() {
    super();
        this.state = {
            users: [],
        }
        this.fetchUsers = this.fetchUsers.bind(this);
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        axios.get(USERS_URL)
          .then((res) => {
            this.setState({ users: res.data });
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
          });
      }

    render() {
        return (
            <div className="list-wrapper">
                <h2>List of users</h2>
                <ul>
                    {this.state.users.map(user => <li key={user.uid}>{user.uid} / {user.id} / {user.email}</li>)}
                </ul>
            </div>
        )
    }
}

export default List;