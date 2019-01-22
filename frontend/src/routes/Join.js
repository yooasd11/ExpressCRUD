import React from 'react';
import axios from 'axios';

import { USERS_URL } from '../api/config';
import './Join.scss';

class Join extends React.Component {
    constructor() {
        super();
        this.state = {
            input: {
                id: "",
                email: "",
                password: "",
            },
            error: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleSubmit() {
        axios.put(USERS_URL, this.state.input)
            .then(res => console.log(res))
            .catch(err => {
                if (err.response) {
                    console.log("error response : ", err.response);
                    this.setState(prev => ({
                        ...prev,
                        error: err.response.data.message,
                    }));
                } else if (err.request) {
                    console.log("error request : ", err.request);
                } else {
                    console.log("error message : ", err.message);
                }
                console.log("error config : ", err.config);
            });
    }

    handleInput(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prev => ({
            ...prev,
            input: {
                ...prev.input,
                [name]: value,
            },
        }));
    }


    render() {
        return (
            <div className="join-wrapper">
                <h2>Join us!</h2>
                <form>
                    ID : <input type="text" name="id" onChange={this.handleInput}></input>
                    E-mail : <input type="email" name="email" onChange={this.handleInput}></input>
                    Password : <input type="password" name="password" onChange={this.handleInput}></input>
                </form>
                <p className="error">{this.state.error}</p>
                <button onClick={this.handleSubmit}>제출</button>
            </div>
        )
    }
}

export default Join;