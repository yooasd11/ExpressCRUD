import React from 'react';
import axios from 'axios';
import { AUTH_URL } from '../api/config';
import './Login.scss';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            status: "",
            input: {
                id: "",
                password: "",
            }
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prev => ({
            ...prev,
            input: {
                ...prev.input,
                [name]: value,
            }
        }));
    }

    handleSubmit() {
        axios.post(AUTH_URL + '/login', this.state.input, { withCredentials: true })
            .then(res => {
                console.log('login result : ', res.data);
                this.setState({
                    status: String(res.data),
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
                this.setState({
                    status: "Login failed!",
                });
            });
    }

    render() {
        return (
            <div className="login-wrapper">
                <h2>Login</h2>
                <form>
                    ID : <input type="text" name="id" onChange={this.handleInput}></input>
                    Password : <input type="password" name="password" onChange={this.handleInput}></input>
                </form>

                <button onClick={this.handleSubmit}>제출</button>

                <p>{this.state.status}</p>
            </div>
        );
    }
}

export default Login;