import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Signup from './Signup';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLogin } from '../hooks/useLogin';
import { useRef } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Login: React.FC<Props> = ({ open, setOpen }) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { login, isLoading, error } = useLogin();
  const navigate = useNavigate()

  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const notify = () => toast('login successful ');


  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = ref1.current?.value;
    const password = ref2.current?.value;
    await login(email,password)
    // toast.success("successful login")
    notify()
    navigate('/')
    setOpen(false)
   
  }

  const handleClose = () => {
    setOpen(false);
  };

  const signupHandler = () => {
    setOpen(false);
    setVisible(true);
  }

  const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
    maxHeight: 'calc(100vh - 64px)',
    overflow: 'hidden',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  }));

  return (
    <React.Fragment>
      <Signup visible={visible} setVisible={setVisible} />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: submitHandler,
        }}
        sx={{
          width: isMobile ? '100%' : '40rem',
          maxWidth: '100%',
          padding: isMobile ? '1rem' : '2rem',
          margin: "auto"
        }}
      >
        <CustomDialogContent>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Enter your email address here ...."
              type="email"
              fullWidth
              variant="standard"
              inputRef={ref1}
            />
            <TextField
              required
              margin="dense"
              id="password"
              name="password"
              label="Enter your password here ..."
              type="password"
              fullWidth
              variant="standard"
              sx={{ marginTop: theme.spacing(2) }}
              inputRef={ref2}
            />
          </DialogContent>
          <DialogActions sx={{ flexDirection: isMobile ? 'column' : 'row' }}>
            <p style={{ marginRight: isMobile ? '0' : '10rem', marginBottom: isMobile ? '1rem' : '0' }}>
              New user? Click <Button onClick={signupHandler}>Sign Up</Button>
            </p>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              sx={{ backgroundColor: 'red', color: 'white', "&:hover": { backgroundColor: 'blue' } }}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogActions>
        </CustomDialogContent>
      </Dialog>
      {/* <ToastContainer /> */}
      <Toaster  />
    </React.Fragment>
  );
}

export default Login;
