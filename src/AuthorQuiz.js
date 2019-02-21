import React, { Component } from 'react';
import './App.css';
import { shuffle, sample } from 'underscore';
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

function Continue() {
  return (
    <div>Let's continue with this!</div>
  )
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

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'avatar.png',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Huckleberry Finn', 'Solomon Grandy\'s Mysterious Life', 'The Boy who walked to London']
  },
  {
    "name": "Carpenter Buck",
    "imageUrl": "avatar.png",
    "imageSource": "labore sit",
    "books": [
      "eu velit incididunt nisi dolore",
      "culpa non cillum cupidatat velit",
      "tempor esse in eiusmod Lorem",
      "veniam tempor sunt velit consectetur",
      "quis non esse do commodo"
    ]
  },
  {
    "name": "Patel Alford",
    "imageUrl": "avatar.png",
    "imageSource": "culpa exercitation",
    "books": [
      "ea irure magna laboris ea",
      "laboris anim qui enim excepteur",
      "mollit commodo exercitation esse excepteur",
      "ut et esse cupidatat irure",
      "ex duis laboris laboris esse"
    ]
  },
  {
    "name": "Webster Wall",
    "imageUrl": "avatar.png",
    "imageSource": "labore Lorem",
    "books": [
      "dolore occaecat deserunt ea quis",
      "non sint sint aliquip eiusmod",
      "et est velit dolor laborum",
      "laboris minim ex veniam deserunt",
      "nisi veniam consequat duis Lorem"
    ]
  },
  {
    "name": "Fowler Sears",
    "imageUrl": "avatar.png",
    "imageSource": "dolore do",
    "books": [
      "ipsum do sunt culpa sit",
      "occaecat elit laboris laboris incididunt",
      "qui non ipsum aliquip culpa",
      "ex laborum nulla fugiat anim",
      "exercitation ea exercitation tempor elit"
    ]
  },
  {
    "name": "Hallie Gutierrez",
    "imageUrl": "avatar.png",
    "imageSource": "mollit in",
    "books": [
      "ullamco culpa eu consectetur voluptate",
      "mollit fugiat ex voluptate veniam",
      "deserunt qui magna quis culpa",
      "aliquip fugiat sit id pariatur",
      "consequat esse est voluptate cillum"
    ]
  },
  {
    "name": "Sherry Camacho",
    "imageUrl": "avatar.png",
    "imageSource": "enim amet",
    "books": [
      "culpa tempor pariatur eiusmod do",
      "Lorem tempor consequat ullamco sit",
      "quis amet nulla amet cillum",
      "sit officia nisi culpa aute",
      "pariatur incididunt reprehenderit quis elit"
    ]
  },
  {
    "name": "Minerva Christian",
    "imageUrl": "avatar.png",
    "imageSource": "est cillum",
    "books": [
      "irure elit dolore minim non",
      "qui nulla nulla non cillum",
      "ullamco commodo magna consectetur occaecat",
      "amet non dolore exercitation velit",
      "consequat aute irure elit irure"
    ]
  },
  {
    "name": "Bessie Henderson",
    "imageUrl": "avatar.png",
    "imageSource": "sint Lorem",
    "books": [
      "adipisicing culpa ad laboris et",
      "exercitation non proident ex eiusmod",
      "mollit nulla occaecat elit commodo",
      "magna ipsum duis irure culpa",
      "dolor mollit consectetur officia ex"
    ]
  },
  {
    "name": "Monica Bradshaw",
    "imageUrl": "avatar.png",
    "imageSource": "officia ea",
    "books": [
      "consectetur qui elit adipisicing aliqua",
      "minim ullamco non dolor anim",
      "id cupidatat enim eiusmod consectetur",
      "eu sit sit consectetur velit",
      "fugiat laboris commodo elit culpa"
    ]
  },
  {
    "name": "Zelma Leblanc",
    "imageUrl": "avatar.png",
    "imageSource": "ad esse",
    "books": [
      "ut ad cupidatat non ullamco",
      "laborum do voluptate in cillum",
      "sit commodo ad elit cillum",
      "reprehenderit minim adipisicing incididunt dolore",
      "duis nulla excepteur ut ea"
    ]
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce((acc, curr, i) => {
    return acc.concat(curr.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);
  return {
    books: fourRandomBooks,
    author: authors.find(author => author.books.some((title) => title == answer))
  }
}

class AuthorQuiz extends Component {
  // state = {
  //   turnData: getTurnData(authors),
  //   highlight: ''
  // }

  checkAnswer = (selectedAnswer) => {
    console.log('author')
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
        <Continue />
        <Footer />
      </div>
    );
  }
}

export default AuthorQuiz;
