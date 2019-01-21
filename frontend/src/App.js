import React, { Component } from 'react';
import axios from "axios";
import './global.css';
import './App.css';

class App extends Component {
  USERS_URL = "http://localhost:3000/v1/users";

  constructor() {
    super();
    this.state = {
      users: [],
      input: {
        id: "",
        email: "",
        password: "",
      },
      error: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  componentDidMount() {
      this.fetchUsers();
  }

  fetchUsers() {
    console.log("fetching");
    axios.get(this.USERS_URL)
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

  handleSubmit() {
    axios.put(this.USERS_URL, this.state.input)
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
      input : {
        ...prev.input,
        [name]: value,
      },
    }));
  }

  render() {
    return (
      <div>
        <ul>
          List of users
          {this.state.users.map(user => <li key={user.uid}>{user.uid} / {user.id} / {user.email}</li>)}
        </ul>
        <form>
          <h2>Join us!</h2>
          ID : <input type="text" name="id" onChange={this.handleInput}></input>
          E-mail : <input type="email" name="email" onChange={this.handleInput}></input>
          Password : <input type="password" name="password" onChange={this.handleInput}></input>
        </form>
        <p className="error">{this.state.error}</p>
        <button onClick={this.handleSubmit}>제출</button>
      </div>
    );
  }

}

export default App;
