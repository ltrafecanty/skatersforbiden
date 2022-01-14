import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
   const { user } = useContext(AuthContext);
   const { data, loading, error } = useQuery(FETCH_POSTS_QUERY);
   // cache seems to be properly updating when createPost is triggered but posts are not displayed unless page is refreshed
   if (data) {
      const { getPosts: posts } = data;
      return (
         <Grid columns={3}>
            <Grid.Row className='page-title'>
               <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
               {user && (
                  <Grid.Column>
                     <PostForm />
                  </Grid.Column>
               )}
               {loading ? (
                  <h1>Loading posts..</h1>
               ) : (
                  <Transition.Group>
                     {posts &&
                        posts.map((post) => (
                           <Grid.Column
                              key={post.id}
                              style={{ marginBottom: 20 }}
                           >
                              <PostCard post={post} />
                           </Grid.Column>
                        ))}
                  </Transition.Group>
               )}
            </Grid.Row>
         </Grid>
      );
   }
   if (error) {
      console.log(error);
      return 'error'; // blocks rendering
   }
}

export default Home;
