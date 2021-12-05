import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Register(props) {
   const [errors, setErrors] = useState({});
   const [values, setValues] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
   });
   const onChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
   };
   const onSubmit = (event) => {
      event.preventDefault();
      if (Object.keys(errors).length === 0) {
         addUser();
      }
   };

   const [addUser, { loading }] = useMutation(REGISTER_USER, {
      update(_, result) {
         console.log(result);
         this.props.history.push('/');
      },
      onError(err) {
         console.log(err.graphQLErrors[0].extensions.exception.errors);
         setErrors(err.graphQLErrors[0].extensions.exception.errors);
      },
      variables: values,
   });
   return (
      <div className='form-container'>
         <Form
            onSubmit={onSubmit}
            noValidate
            className={loading ? 'loading' : ''}
         >
            <h1> Register </h1>
            <Form.Input
               label='Username'
               placeholder='username'
               name='username'
               value={values.username}
               errors={errors.username ? true : false}
               onChange={onChange}
            />
            <Form.Input
               label='Email'
               placeholder='email'
               name='email'
               value={values.email}
               errors={errors.email ? true : false}
               onChange={onChange}
            />
            <Form.Input
               label='Password'
               placeholder='password'
               name='password'
               type='password'
               value={values.password}
               errors={errors.password ? true : false}
               onChange={onChange}
            />
            <Form.Input
               label='Confirm Password'
               placeholder='confirm password'
               name='confirmPassword'
               type='password'
               value={values.confirmPassword}
               errors={errors.confirmPassword ? true : false}
               onChange={onChange}
            />
            <Button type='submit' primary>
               Register
            </Button>
         </Form>
         {Object.keys(errors).length > 0 && (
            <div className='ui error message'>
               <ul classname='list'>
                  {Object.values(errors).map((value) => (
                     <li key={value}>{value}</li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
}
const REGISTER_USER = gql`
   mutation register(
      $username: String!
      $email: String!
      $password: String!
      $confirmPassword: String!
   ) {
      register(
         registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
         }
      ) {
         id
         email
         username
         createdAt
         token
      }
   }
`;
export default Register;
