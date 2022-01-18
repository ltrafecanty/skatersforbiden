import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql `
   {
      getPosts {
         id
         body
         createdAt
         username
         likeCount
         likes {
            username
         }
         commentCount
         comments {
            id
            username
            createdAt
            body
         }
      }
   }
`;

export const FETCH_POST_QUERY = gql `
   query ($postID: ID!) {
      getPost(postID: $postID) {
         id
         body
         createdAt
         username
         likeCount
         likes {
            username
         }
         commentCount
         comments {
            id
            username
            createdAt
            body
         }
      }
   }
`;

export const CREATE_POST_MUTATION = gql `
   mutation createPost($body: String!) {
      createPost(body: $body) {
         id
         body
         createdAt
         username
         likes {
            id
            username
            createdAt
         }
         likeCount
         comments {
            id
            body
            username
            createdAt
         }
         commentCount
      }
   }
`;

export const CREATE_COMMENT_MUTATION = gql `
   mutation ($postID: ID!, $body: String!) {
      createComment(postID: $postID, body: $body) {
         id
         comments {
            id
            body
            createdAt
            username
         }
         commentCount
      }
   }
`;

export const DELETE_POST_MUTATION = gql `
   mutation deletePost($postID: ID!) {
      deletePost(postID: $postID)
   }
`;

export const DELETE_COMMENT_MUTATION = gql `
   mutation deleteComment($postID: ID!, $commentID: ID!) {
      deleteComment(postID: $postID, commentID: $commentID) {
         id
         comments {
            id
            username
            createdAt
            body
         }
         commentCount
      }
   }
`;

export const LIKE_POST_MUTATION = gql `
   mutation likePost($postID: ID!) {
      likePost(postID: $postID) {
         id
         likes {
            id
            username
         }
         likeCount
      }
   }
`;