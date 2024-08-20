const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]!
  }

  type Post {
    _id: ID
    text: String
    author: String
    gameList: [Game]!
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    text: String
    author: String
    createdAt: String
  }

  type Game {
    _id: ID
    title: String
    company: String
    console: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    comment(commentId: ID!): Comment
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(text: String!): Post
    addComment(commentId: ID!, text: String!): Comment
    removePost(postId: ID!): Post
    removeComment(commentId: ID!): Comment
  }
`;

module.exports = typeDefs;
