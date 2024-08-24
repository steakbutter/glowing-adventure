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

export const ADD_POST = gql`
  mutation addPost($text: String!, $title: String!, $games: [ID]!) {
    addPost(text: $text, title: $title,, games: $games) {
      _id
      text
      title
      author
      createdAt
      comments {
        _id
        commentText
      }
      games {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      text
      author
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
