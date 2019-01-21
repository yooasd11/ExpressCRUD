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
        console.log(res.data);
        this.setState({ users: res.data });
      })
      .catch(() => console.log("error while fetching data"));
  }

  handleSubmit() {
    axios.put(this.USERS_URL, this.state.input)
      .then(res => console.log(res))
      .catch(res => {
        console.log("error while submit : ", res);
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
      }
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
        <button onClick={this.handleSubmit}>제출</button>
      </div>
    );
  }

}

export default App;
