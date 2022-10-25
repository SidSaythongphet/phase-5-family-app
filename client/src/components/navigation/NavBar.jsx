import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NavBar = ({ loggedIn, setLoggedIn }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            { loggedIn ? "Welcome" : "Please Log In"}
          </Typography>
          <Button color="inherit" onClick={ () => setLoggedIn(false) }>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar