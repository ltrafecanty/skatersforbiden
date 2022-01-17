import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Card, Grid, Image, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { FETCH_POST_QUERY } from '../util/graphql';
import { AuthContext } from '../context/auth';

import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost() {
   const { postID } = useParams();
   const { user } = useContext(AuthContext);
   const { error, loading, data } = useQuery(FETCH_POST_QUERY, {
      variables: { postID },
   });

   if (loading) return 'Loading...';
   if (error) return `Error! ${error.message}`;

   const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
   } = data.getPost;
   return (
      <Grid>
         <Grid.Row>
            <Grid.Column width={2}>
               <Image
                  src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                  size='small'
                  float='right'
               />
            </Grid.Column>{' '}
            <Grid.Column width={10}>
               <Card fluid>
                  <Card.Content>
                     <Card.Header>{username}</Card.Header>
                     <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                     <Card.Description>{body}</Card.Description>
                  </Card.Content>
                  <hr />
                  <Card.Content extra>
                     <LikeButton user={user} post={{ id, likeCount, likes }} />
                     <Button
                        as='div'
                        labelPosition='right'
                        onClick={() => console.log('commento on post')}
                     >
                        <Button basic color='blue'>
                           <Icon name='comments' />
                        </Button>
                        <Label basic color='blue' pointing='left'>
                           {commentCount}
                        </Label>
                     </Button>
                     {user && user.username === username && (
                        <DeleteButton postID={id} callback={deletePost} />
                     )}
                  </Card.Content>
               </Card>
            </Grid.Column>
         </Grid.Row>{' '}
      </Grid>
   );
}

export default SinglePost;
