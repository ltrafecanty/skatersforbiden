import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Card, Grid, Image, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';

import { FETCH_POST_QUERY } from '../util/graphql';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';

function SinglePost(props) {
   const postID = props.match.params.postID;
   const { user } = useContext(AuthContext);

   const {
      data: { getPost },
   } = useQuery(FETCH_POST_QUERY, { variables: { postID } });
   let postMarkup;
   if (!getPost) {
      postMarkup = <p> Loading </p>;
   } else {
      const {
         id,
         body,
         createdAt,
         username,
         comments,
         likes,
         likeCount,
         commentCount,
      } = getPost;

      postMarkup = (
         <Grid>
            <Grid.Row>
               <Grid.column width={2}>
                  <Image
                     src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                     size='small'
                     float='right'
                  />
               </Grid.column>{' '}
               <Grid.column width={10}>
                  <Card fluid>
                     <Card.Content>
                        <Card.Header>{username}</Card.Header>
                        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                        <Card.Description>{body}</Card.Description>
                     </Card.Content>
                     <hr />
                     <Card.Content extra>
                        <LikeButton
                           user={user}
                           post={{ id, likeCount, likes }}
                        />
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
                     </Card.Content>
                  </Card>
               </Grid.column>
            </Grid.Row>{' '}
         </Grid>
      );
   }
}

export default SinglePost;
