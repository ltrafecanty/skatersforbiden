import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
   const { user } = useContext(AuthContext);
   const { loading, data, error } = useQuery(FETCH_POSTS_QUERY);
   if (error) {
      console.log(error);
      console.log('ERROR IN HOME');
   }

   const posts = data && data.getPosts ? data.getPosts : [];
   return (
      <Grid columns={2}>
         <Grid.Row className='page-title'>
            <h1> Recent Posts </h1>{' '}
         </Grid.Row>{' '}
         <Grid.Row>
            {' '}
            {user && (
               <Grid.Column>
                  <PostForm />
               </Grid.Column>
            )}{' '}
            {loading ? (
               <h1> Loading posts... </h1>
            ) : (
               posts &&
               posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 15 }}>
                     <PostCard post={post} />{' '}
                  </Grid.Column>
               ))
            )}{' '}
         </Grid.Row>{' '}
      </Grid>
   );
}

export default Home;
