import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { GET_BOOKS } from './Books';

class AddBook extends React.Component {
  state = {
    title: '',
    author: '',
    errorMessage: ''
  };

  handleSave = () => {
    const { title, author } = this.state;

    this.props
      .mutate({
        variables: { title, authorName: author },
        refetchQueries: [{ query: GET_BOOKS }]
      })
      .then(() => {
        this.setState({
          title: '',
          author: '',
          errorMessage: ''
        });
      })
      .catch(error => console.log(error.message));
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          name="title"
          value={this.state.title}
          placeholder="Title"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="author"
          value={this.state.author}
          placeholder="Author"
          onChange={this.handleChange}
        />
        <button onClick={this.handleSave}>Add</button>
        {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
      </div>
    );
  }
}

const ADD_BOOK = gql`
  mutation AddBook($title: String, $authorName: String) {
    addBook(title: $title, authorName: $authorName) {
      title
      authorName
      id
    }
  }
`;

const AddBooksWithMutation = graphql(ADD_BOOK)(AddBook);

export default AddBooksWithMutation;
