import React, { useContext, useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
   Card,
   Grid,
   Form,
   Image,
   Button,
   Icon,
   Label,
} from 'semantic-ui-react';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { FETCH_POST_QUERY, CREATE_COMMENT_MUTATION } from '../util/graphql';
import { AuthContext } from '../context/auth';

import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../util/MyPopup';

function SinglePost() {
   const { postID } = useParams();
   const { user } = useContext(AuthContext);
   const commentInputRef = useRef(null);
   const [comment, setComment] = useState('');

   const { error, loading, data } = useQuery(FETCH_POST_QUERY, {
      variables: { postID },
   });

   const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
      update() {
         setComment('');
         comment.InputRef.current.blur();
      },
      variables: {
         postID,
         body: comment,
      },
   });

   if (loading) return 'Loading...';
   if (error) return `Error! ${error.message}`;
   // TODO: Fix this extremely jank workaround
   function deletePostCallback() {}

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
                     <MyPopup content='Make a comment'>
                        <Button as='div' labelPosition='right'>
                           <Button basic color='blue'>
                              <Icon name='comments' />
                           </Button>
                           <Label basic color='blue' pointing='left'>
                              {commentCount}
                           </Label>
                        </Button>
                     </MyPopup>
                     {user && user.username === username && (
                        <DeleteButton
                           postID={id}
                           callback={deletePostCallback}
                        />
                     )}
                  </Card.Content>
               </Card>
               {user && (
                  <Card fluid>
                     <Card.Content>
                        <p>Add a comment</p>
                        <Form>
                           <div className='ui action input fluid'>
                              <input
                                 type='text'
                                 placeholder='Hello...'
                                 name='comment'
                                 value={comment}
                                 onChange={(event) =>
                                    setComment(event.target.value)
                                 }
                                 ref={commentInputRef}
                              />
                              <button
                                 type='submit'
                                 className='ui button teal'
                                 disabled={comment.trim() === ''}
                                 onClick={createComment}
                              >
                                 Submit
                              </button>
                           </div>
                        </Form>
                     </Card.Content>
                  </Card>
               )}
               {comments.map((comment) => (
                  <Card fluid key={comment.id}>
                     <Card.Content>
                        {user && user.username === comment.username && (
                           <DeleteButton postID={id} commentID={comment.id} />
                        )}
                        <Card.Header>{comment.username}</Card.Header>
                        <Card.Meta>
                           {moment(comment.createtAt).fromNow()}
                        </Card.Meta>
                        <Card.Description>{comment.body}</Card.Description>
                     </Card.Content>
                  </Card>
               ))}
            </Grid.Column>
         </Grid.Row>{' '}
      </Grid>
   );
}

export default SinglePost;
