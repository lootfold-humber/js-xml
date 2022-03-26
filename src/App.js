import "./App.css";
import React, { Component } from "react";
import Header from "./components/header";
import service from "./service";
import Profile from "./components/profile";
import Projects from "./components/projects";
import Skills from "./components/skills";
import Contact from "./components/contact";

class App extends Component {
  state = {
    profile: {},
    projects: [],
    skills: [],
  };

  componentDidMount() {
    this.getProfile();
    this.getProjects();
    this.getSkills();
  }

  getProfile() {
    const profile = service.getProfile();
    this.setState({ profile });
  }

  getProjects() {
    const projects = service.getProjects();
    this.setState({ projects });
  }

  getSkills() {
    const skills = service.getSkills();
    this.setState({ skills });
  }

  handleContact = (event) => {
    event.preventDefault();
    const { name, email, message } = event.target;
    const data = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    service.postContactRequest(data);
  };

  render() {
    return (
      <React.Fragment>
        <Header profile={this.state.profile} />
        <Profile profile={this.state.profile} />
        <Projects projects={this.state.projects} />
        <Skills skills={this.state.skills} />
        <Contact handleSubmit={this.handleContact} />
      </React.Fragment>
    );
  }
}

export default App;
