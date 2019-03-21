import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const Books = ({ data: { loading, error, books } }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <ul>
      {books.map(item => (
        <li key={item.id}>
          Title: {item.title} | Author: {item.authorName}
        </li>
      ))}
    </ul>
  );
};

export const GET_BOOKS = gql`
  query BooksQuery {
    books {
      id
      title
      authorName
    }
  }
`;

export default graphql(GET_BOOKS)(Books);
