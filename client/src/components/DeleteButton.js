import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

import MyPopup from '../util/MyPopup';
import {
   DELETE_POST_MUTATION,
   DELETE_COMMENT_MUTATION,
   FETCH_POSTS_QUERY,
} from '../util/graphql';

function DeleteButton({ postID, commentID, callback }) {
   const [confirmOpen, setConfirmOpen] = useState(false);
   const navigate = useNavigate();

   const mutation = commentID ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
   const [deletePosting] = useMutation(mutation, {
      variables: { postID, commentID },

      update(cache) {
         setConfirmOpen(false);
         if (!commentID) {
            const data = cache.readQuery({
               query: FETCH_POSTS_QUERY,
            });
            cache.writeQuery({
               query: FETCH_POSTS_QUERY,
               data: {
                  getPosts: data.getPosts.filter((p) => p.id !== postID),
               },
            });
         }
         if (callback) navigate('/');
      },
      onError(err) {
         console.log(err);
         console.log(commentID);
         console.log(postID);
      },
   });

   return (
      <>
         <MyPopup content={commentID ? 'Delete comment' : 'Delete post'}>
            <Button
               as='div'
               color='linkedin'
               floated='right'
               onClick={() => setConfirmOpen(true)}
            >
               <Icon name='trash' style={{ margin: 0 }} />
            </Button>
         </MyPopup>
         <Confirm
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={deletePosting}
         />
      </>
   );
}

export default DeleteButton;
