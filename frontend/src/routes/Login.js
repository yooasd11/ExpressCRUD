import React from 'react';
import { connect } from 'react-redux';
import authActions from '../redux/actions/AuthAction';
import './Login.scss';

const mapDispatchToProps = {
	logIn: authActions.logIn
};

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
        this.props.logIn(this.state.input);
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

export default connect(null, mapDispatchToProps)(Login);