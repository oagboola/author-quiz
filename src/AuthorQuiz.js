import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>The Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
}


function Turn(props) {
  const highlight_bg = (highlight) => {
    const mapping = {
      none: '',
      wrong: 'red',
      correct: 'green'
    };
    return mapping[highlight];
  }

  return (
    <div className="row turn" style={{backgroundColor: highlight_bg(props.highlight)}}>
      <div className="col-4 offset-1">
        <img src={props.author.imageUrl} className="authorImage" alt="author"/>
      </div>
      <div className="col-6">
        {props.books.map((title, i) => <Book title={title} key={i} checkAnswer={props.checkAnswer}/>)}
      </div>
      <div className="col-6 offset-5">
        <p><Link to="/add">Add more Authors</Link></p>
      </div>
    </div>
  )
}

function Continue(props) {
  const handleContinue = (event) => {
    event.preventDefault();
    props.resetState(props.authors);
  }
  switch(props.highlight) {
    case 'correct':
      return (
         <button onClick={handleContinue}>Continue</button>
      )
      break;
     case 'wrong':
       return ''
       break;
      default:
        return ''
  }
}

function Footer() {
  return (
    <div className="row">
      <div className="col-12">
        <p>I'm the footer</p>
      </div>
    </div>
  )
}

function Book(props) {
  return (
    <div className="book" onClick={() => props.checkAnswer(props.title)}>
      <p>{props.title}</p>
    </div>
  );
}

class AuthorQuiz extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  state = {
    turnData: this.props.getTurnData(this.props.authors),
    highlight: ''
  }

  resetState = (authors) => {
    this.setState({
      turnData: this.props.getTurnData(this.props.authors),
      highlight: ''
    });
  }

  checkAnswer = (selectedAnswer) => {
    console.log('turnData: ', this.state.turnData)
    const isCorrect = this.state.turnData.author.books.some(title => title == selectedAnswer);
    this.setState({
      highlight: isCorrect ? 'correct' : 'wrong'
    });
  }

  render() {
    const { turnData, highlight } = this.state;
    return (
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} checkAnswer={this.checkAnswer} />
        <Continue highlight={highlight} authors={this.props.authors} resetState={this.resetState}/>
        <Footer />
      </div>
    );
  }
}

export default AuthorQuiz;
