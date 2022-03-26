import "./App.css";
import React, { Component } from "react";
import Header from "./components/header";
import service from "./service";
import Profile from "./components/profile";
import Projects from "./components/projects";

class App extends Component {
  state = {
    profile: {},
    projects: [],
  };

  componentDidMount() {
    this.getProfile();
    this.getProjects();
  }

  getProfile() {
    const profile = service.getProfile();
    this.setState({ profile });
  }

  getProjects() {
    const projects = service.getProjects();
    this.setState({ projects });
  }

  render() {
    return (
      <React.Fragment>
        <Header profile={this.state.profile} />
        <Profile profile={this.state.profile} />
        <Projects projects={this.state.projects} />
      </React.Fragment>
    );
  }
}

export default App;
