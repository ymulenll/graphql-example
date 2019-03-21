const { ApolloServer, gql } = require('apollo-server');

const books = [
  {
    id: 1,
    title: 'Harry Potter and the Chamber of Secrets',
    authorName: 'J.K. Rowling',
    authorId: 1
  },
  {
    id: 2,
    title: 'Jurassic Park',
    authorName: 'Michael Crichton',
    authorId: 2
  }
];

const authors = [
  {
    id: 1,
    firstName: 'J.K.',
    lastName: 'Rowling'
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Crichton'
  }
];

const typeDefs = gql`
  type Book {
    id: Int!
    title: String
    authorName: String @deprecated(reason: "please use author")
    author: Author
  }

  type Author {
    id: Int
    firstName: String
    lastName: String
  }

  # Root types
  type Query {
    books: [Book]
    book(id: Int!): Book
    authors: [Author]
  }

  type Mutation {
    addBook(title: String, authorName: String): Book
  }
`;

const resolvers = {
  Query: {
    books: (parent, args, context, info) => books,
    book: (parent, args, context, info) =>
      books.find(item => item.id === args.id),
    authors: () => authors
  },
  Mutation: {
    addBook: (parent, { title, authorName }, context, info) => {
      const newBook = {
        title,
        authorName,
        id: Math.floor(Math.random() * 101)
      };

      books.push(newBook);

      return newBook;
    }
  },
  Book: {
    author: ({ authorId }) => authors.find(item => item.id === authorId)
  }
};

const server = new ApolloServer({ typeDefs, resolvers, mocks: false });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
