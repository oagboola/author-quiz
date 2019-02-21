import React, { Component } from 'react';

class AuthorForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  state = {
    name: '',
    imageUrl: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
       <div>
         <label htmlFor="name">Name</label>
         <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
       </div>
       <div>
         <label htmlFor="imageUrl">Image URL</label>
         <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.handleChange}/>
       </div>
       <button type="submit">Add Author</button>
     </form>
    );
  }
}

function AddAuthor(props) {
  return (
    <div className="container-fluid">
      <p>Add an Author</p>
      <AuthorForm />
    </div>
  )
};

export default AddAuthor;
