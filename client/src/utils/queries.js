import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        title
        text
        games{
        _id
        title
      }
        createdAt
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      title
      text
      author
      games{
        _id
        title
      }
      createdAt
    }
  }
`;

export const QUERY_GAMES = gql`
  query getGames {
    games {
      _id
      title
      company
      console
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      title
      text
      author
      createdAt
      games{
        _id
        title
      }
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      posts {
        _id
        title
        text
        games{
          _id
          title
        }
        author
        games{
        _id
        title
      }
        createdAt
      }
    }
  }
`;
