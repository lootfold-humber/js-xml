import React, { Component } from "react";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      question: null,
      answer: null,
      revealed: false,
    };
  }

  async componentDidMount() {
    // I added a proxy config in package.json because of CORS error
    // https://create-react-app.dev/docs/proxying-api-requests-in-development/
    const response = await fetch("api/random");
    const json = await response.json();

    const data = json.map((j) => {
      return {
        category: j.category.title,
        question: j.question,
        answer: j.answer,
      };
    })[0];

    this.setState(data);
  }

  handleClick = () => {
    this.setState({ revealed: true });
  };

  render() {
    const { category, question, answer, revealed } = this.state;
    return (
      <div>
        <div>{category}</div>
        <h2>{question}</h2>
        {revealed && <div>{answer}</div>}
        <button onClick={this.handleClick}>Reveal answer</button>
      </div>
    );
  }
}

export default Question;
