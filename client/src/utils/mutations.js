import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addPost($text: String!) {
    addPost(text: $text) {
      _id
      text
      author
      createdAt
      comments {
        _id
        text
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($commentId: ID!, $text: String!) {
    addComment(commentId: $commentId, text: $text) {
      _id
      text
      author
      createdAt
      comments {
        _id
        text
        createdAt
      }
    }
  }
`;
