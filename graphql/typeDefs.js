const { gql } = require('apollo-server');

module.exports = gql `
   input RegisterInput {
      username: String!
      password: String!
      confirmPassword: String!
      email: String!
   }

   type User {
      id: ID!
      email: String!
      token: String!
      username: String!
      createdAt: String!
   }
   type Comment {
      id: ID!
      body: String!
      username: String!
      createdAt: String!
   }

   type Like {
      id: ID!
      username: String!
      createdAt: String!
   }

   type Post {
      id: ID!
      body: String!
      createdAt: String!
      username: String!
      comments: [Comment]!
      likes: [Like]!
      likeCount: Int!
      commentCount: Int!
   }
   type Query {
      getPost(postID: ID!): Post
      getPosts: [Post]
   }
   type Mutation {
      register(registerInput: RegisterInput): User!
      login(username: String, password: String): User!
      createPost(body: String!): Post!
      deletePost(postID: ID!): String!
      createComment(postID: ID!, body: String!): Post!
      deleteComment(postID: String!, commentID: ID!): Post!
      likePost(postID: ID!): Post!
   }
   type Subscription {
      newPost: Post!
   }
`;