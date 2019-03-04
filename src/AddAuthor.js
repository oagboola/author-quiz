import React, { Component } from 'react';

class AuthorForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  state = {
    name: '',
    imageUrl: '',
    books: [],
    bookTemp: ''
  }


  handleSubmit = (event) => {
    // this.props.addAuthor()
    event.preventDefault();
    const {name, imageUrl, books} = this.state;
    this.props.addAuthor({name, imageUrl, books}, this.props.history);
    this.setState({
      name: '',
      imageUrl: '',
      books: []
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  addBook = (event) => {
    event.preventDefault();
    this.setState(prevState => ({
      books:  prevState.books.concat(this.state.bookTemp),
      bookTemp: ''
    }))
  }

  render() {
    return (
      <div className="row">
        <div className="col-4 offset-2">
          <form onSubmit={this.handleSubmit}>
           <div>
             <label htmlFor="name">Name</label>
             <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
           </div>
           <div>
             <label htmlFor="imageUrl">Image URL</label>
             <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.handleChange}/>
           </div>
           <div>
             <label htmlFor="bookTemp">Add Book</label>
             <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.handleChange}/>
             <button onClick={this.addBook}>+</button>
           </div>
           <button type="submit">Add Author</button>
         </form>
        </div>
        <div className="col-5 offset-1">
          {this.state.books.map((title, i) => <p key={i}>{title}</p>)}
        </div>
      </div>
    );
  }
}

export default AuthorForm;
