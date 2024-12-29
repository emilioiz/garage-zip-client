// src/pages/Login.tsx
import { FC, useState, FormEvent } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

import { Button, TextField, Container, Typography } from '@mui/material';

import { auth } from '../config/firebase';
import { useAlertContext } from '../context/AlertContext';

const SignIn: FC = () => {
  const [title, setTitle] = useState('Sign in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { setAlert } = useAlertContext();

  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error logging in:', error);
      setAlert('error', 'Failed to log in.');
    }
  };

  const handlePasswordResetRequest = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setAlert('success', 'Password reset email sent.');
      setTitle('Sign in');
      setIsResetPassword(false);
      setEmail('');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setAlert('error', 'Failed to send password reset email.');
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isResetPassword) {
      handlePasswordResetRequest(email);
    } else {
      handleLogin(email, password);
    }
  };

  return (
    <Container maxWidth='xs' sx={{ mt: 3 }}>
      <Typography variant='h5' component='h1' gutterBottom textAlign='center'>
        {title}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Email'
          fullWidth
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isResetPassword && (
          <TextField
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <Button type='submit' variant='contained' color='primary' fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
      {!isResetPassword && (
        <Typography
          variant='body2'
          color='inherit'
          sx={{ mt: 2, cursor: 'pointer', textAlign: 'center' }}
          onClick={() => {
            setTitle('Reset password');
            setIsResetPassword(true);
          }}
        >
          Forgot password?
        </Typography>
      )}
    </Container>
  );
};

export default SignIn;
