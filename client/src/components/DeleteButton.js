import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { DELETE_POST_MUTATION } from '../util/graphql';

function DeleteButton({ postID }) {
   const [confirmOpen, setConfirmOpen] = useState(false);
   const [deletePost] = useMutation(DELETE_POST_MUTATION, {
      update() {
         setConfirmOpen(false);
         //TODO: remove post from cache
      },
      onError(err) {
         console.log(err);
         console.log(postID);
      },
      variables: postID,
   });

   return (
      <>
         <Button
            as='div'
            color='linkedin'
            size='small'
            floated='right'
            onClick={() => setConfirmOpen(true)}
         >
            <Icon name='trash' style={{ margin: 0 }} />{' '}
         </Button>
         <Confirm
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={deletePost}
         />
      </>
   );
}

export default DeleteButton;
