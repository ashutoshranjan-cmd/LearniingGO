import * as React from 'react';
import { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import { useSignup } from '../hooks/useSignup';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Input } from '@mui/material';

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const Signup: React.FC<Props> = ({ visible, setVisible }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const { signup, isLoading, error } = useSignup();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is mobile size

  const submitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    const phone = numberRef.current?.value;
    const photo = photoRef.current?.files?.[0]; // Get the file from the input


    // console.log(username,email,password,phone,photo);
    

    if (!username || !email || !password || !confirmPassword || !phone || !photo) {
      toast.error('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      // Create FormData to handle file uploads
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone', phone);
      formData.append('photo', photo);
      console.log(formData);
      

      // Call the signup function with FormData
      await signup(formData);

      toast.success('Signup successful');
      setVisible(false);
    } catch (error) {
      toast.error('Signup failed');
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={visible}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: submitHandle, // Use submitHandle here
        }}
        sx={{ 
          width: isMobile ? '100%' : '36rem',
          maxWidth: '100%', // Ensure it doesn't exceed screen width
          padding: isMobile ? '1rem' : '2rem', // Adjust padding for mobile
          margin:"auto"
        }}
      >
        <DialogTitle>Sign up</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Enter your name ..."
            type="text"
            fullWidth
            variant="standard"
            inputRef={nameRef}
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Enter your email ..."
            type="email"
            fullWidth
            variant="standard"
            inputRef={emailRef}
          />
          <TextField
            margin="dense"
            id="password"
            name="password"
            label="Enter your password ..."
            type="password"
            fullWidth
            variant="standard"
            inputRef={passwordRef}
          />
          <TextField
            margin="dense"
            id="confirm_password"
            name="confirm_password"
            label="Confirm your password ..."
            type="password"
            fullWidth
            variant="standard"
            inputRef={confirmPasswordRef}
          />
          <TextField
            margin="dense"
            id="number"
            name="number"
            label="Enter your phone no ..."
            type="text"
            fullWidth
            variant="standard"
            inputRef={numberRef}
          />
          <Input
            type="file"
            inputRef={photoRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            type="submit" 
            disabled={isLoading}
            sx={{ 
              backgroundColor: 'red', 
              color: 'white', 
              "&:hover": { backgroundColor: "blue" }
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Signup;
