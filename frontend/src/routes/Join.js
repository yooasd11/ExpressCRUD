import React from 'react';
import { connect } from 'react-redux';
import authActions from '../redux/actions/AuthAction';
import './Join.scss';

const mapStateToProps = state => ({
    error: state.auth.error,
});

const mapDispatchToProps = {
	join: authActions.join
};

class Join extends React.Component {
    constructor() {
        super();
        this.state = {
            input: {
                id: "",
                email: "",
                password: "",
            },
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleSubmit() {
        this.props.join(this.state.input);
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
                <p className="error">{this.props.error.message}</p>
                <button onClick={this.handleSubmit}>제출</button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join);