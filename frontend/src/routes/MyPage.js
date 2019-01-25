import React from 'react';
import axios from 'axios';
import { AUTH_URL } from '../api/config';
import './MyPage.scss';


class MyPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        axios.get(AUTH_URL + '/logout', { withCredentials: true })
            .then(res => {
                if (res.data.success) {
                    alert('Logout successful!');
                }
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


export default MyPage;