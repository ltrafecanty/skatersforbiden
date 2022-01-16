import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY, CREATE_POST_MUTATION } from '../util/graphql';

function PostForm() {
   const { values, onChange, onSubmit } = useForm(createPostCallback, {
      body: '',
   });

   const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
      variables: values,
      update(cache, result) {
         const data = cache.readQuery({
            query: FETCH_POSTS_QUERY,
         });
         cache.writeQuery({
            query: FETCH_POSTS_QUERY,
            data: { getPosts: [result.data.createPost, ...data.getPosts] },
         });
         values.body = '';
      },
      onError: (err) => {
         console.log(err);
      },
   });

   function createPostCallback() {
      createPost();
   }

   return (
      <>
         <Form onSubmit={onSubmit}>
            <h2> Create a post: </h2>{' '}
            <Form.Field>
               <Form.Input
                  placeholder='Hello skaters'
                  name='body'
                  onChange={onChange}
                  value={values.body}
                  error={error ? true : false}
               />{' '}
               <Button type='submit' color='teal'>
                  Submit{' '}
               </Button>{' '}
            </Form.Field>{' '}
         </Form>{' '}
         {error && (
            <div className='ui error message' style={{ marginBottom: 20 }}>
               <ul className='list'>
                  <li> {error.graphQLErrors[0].message} </li>{' '}
               </ul>{' '}
            </div>
         )}{' '}
      </>
   );
}

export default PostForm;
