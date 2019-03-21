import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Books from './Books';
import AddBook from './AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <h2>Books:</h2>
        <AddBook />
        <Books />
      </ApolloProvider>
    );
  }
}

export default App;
