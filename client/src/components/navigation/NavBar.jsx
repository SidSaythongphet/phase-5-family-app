import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NavBar = ({ user, loggedIn, onLogout }) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            { loggedIn ? "Welcome" : "Please Log In"}
            { user ? user.name : null }
          </Typography>
            { loggedIn 
              ?
              <>
                <Button color="inherit" >Switch User</Button>
                <Button color="inherit" onClick={ onLogout }>Logout</Button>
              </> 
              :
              null
            }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar