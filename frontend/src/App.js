import React, { Component } from 'react';
import axios from "axios";
import './global.css';
import './App.css';

class App extends Component {
  USERS_URL = "http://localhost:3000/users";

  constructor() {
    super();
    this.state = {
      users: [],
      input: {
        name: "",
        email: "",
        password: "",
      }

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    axios.get(this.USERS_URL)
      .then((res) => {
        console.log(res.data);
        this.setState({ users: res.data });
      })
      .catch(() => console.log("error while fetching data"));
  }

  render() {
    return (
      <div>
        <ul>
          List of users
          {this.state.users.map(user => <li key={user.id}>{user.id}, {user.name}, {user.email}</li>)}
        </ul>
        <form>
          <h2>Join us!</h2>
          Name : <input type="text" name="name" onChange={this.handleInput}></input>
          E-mail : <input type="email" name="email" onChange={this.handleInput}></input>
          Password : <input type="password" name="password" onChange={this.handleInput}></input>
        </form>
        <button onClick={this.handleSubmit}>제출</button>
      </div>
    );
  }

  handleSubmit() {
    axios.put(this.USERS_URL, this.state.input)
      .then(res => console.log(res))
      .catch(() => console.log("error while submit"));
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
}

export default App;
