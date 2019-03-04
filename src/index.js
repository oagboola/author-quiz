import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import AddAuthor from './AddAuthor.js'
import { shuffle, sample } from 'underscore';

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

function AuthorQuizWrapper() {
  return(
    <AuthorQuiz authors={authors} getTurnData={getTurnData}/>
  )
}

class AddAuthorWrapper extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  addAuthor = (author) => {
    authors.push(author);
    this.props.history.push('/');
  }

  render() {
    return(
      <AddAuthor authors={authors} turnData={getTurnData(authors)} addAuthor={this.addAuthor}/>
    )
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route exact path='/' component={AuthorQuizWrapper} />
          <Route exact path='/add' component={AddAuthorWrapper} />
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
