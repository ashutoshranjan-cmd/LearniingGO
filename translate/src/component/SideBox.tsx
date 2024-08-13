import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Cookies from 'js-cookie';
import { Button, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DarkModeSwitch from './DarkModeSwitch';
import { useTheme } from '@mui/material/styles';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const SideBox = (props: SimpleDialogProps) => {
  const { onClose, open } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Adjust based on screen size
  
  let user: { username: string } | null = null;
  try {
    user = Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : null;
  } catch (error) {
    console.error('Failed to parse user from cookies', error);
  }

  const handleListItemClick = () => {
    Cookies.remove('user');
    navigate('/'); // Navigate to home page
    onClose(''); // Close the dialog
  };

  return (
    <Dialog 
      onClose={() => onClose('')} 
      open={open} 
      fullWidth={isMobile} // Make dialog full width on mobile
      maxWidth="xs" // Set maximum width for better control
      PaperProps={{
        style: {
          margin: isMobile ? '0' : '1rem',
          marginLeft:isMobile?'0':'105rem', // Adjust margins for mobile view
          marginTop:isMobile?'0':'-38rem', // Adjust margins for mobile view
          width: isMobile ? '70%' : 'auto', // Ensure it takes full width on mobile
          maxWidth: '95%', // Ensure it's not too wide on mobile
        },
      }}
    >
      <DialogTitle sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', paddingLeft: isMobile ? '1rem' : '2rem' }}>
        {user ? user.username : null}
      </DialogTitle>
      <List sx={{ pt: 0, paddingLeft: isMobile ? '1rem' : '2rem', paddingRight: isMobile ? '1rem' : '2rem' }}>
        <ListItem disableGutters>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DarkModeSwitch />
            <span style={{ marginLeft: '0.5rem' }}>Theme</span>
          </div>
        </ListItem>
        <ListItem disableGutters>
          <Button fullWidth={isMobile}>Profile</Button>
        </ListItem>
        <ListItem disableGutters>
          <Button fullWidth={isMobile} onClick={handleListItemClick}>
            Logout
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
};

export default SideBox;
