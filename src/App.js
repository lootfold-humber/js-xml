import "./App.css";
import React, { Component } from "react";
import Header from "./components/header";
import service from "./service";
import Profile from "./components/profile";

class App extends Component {
  state = {
    profile: {},
  };

  componentDidMount() {
    this.getProfile();
  }

  getProfile() {
    const profile = service.getProfile();
    this.setState({ profile });
  }

  render() {
    return (
      <React.Fragment>
        <Header profile={this.state.profile} />
        <Profile profile={this.state.profile} />
      </React.Fragment>
    );
  }
}

export default App;
