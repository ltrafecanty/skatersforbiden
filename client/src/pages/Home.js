import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
function Home() {
   const { loading, data, error } = useQuery(FETCH_POSTS_QUERY);
   if (error) {
      console.log(error);
   }
   const posts = data && data.getPosts ? data.getPosts : [];

   return (
      <Grid columns={2}>
         <Grid.Row className='page-title'>
            <h1>Recent Posts</h1>
         </Grid.Row>
         <Grid.Row>
            {loading ? (
               <h1> Loading posts...</h1>
            ) : (
               posts &&
               posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 15 }}>
                     <PostCard post={post} />
                  </Grid.Column>
               ))
            )}
         </Grid.Row>
      </Grid>
   );
}

const FETCH_POSTS_QUERY = gql`
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
export default Home;