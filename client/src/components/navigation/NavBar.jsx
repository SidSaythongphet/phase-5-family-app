import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  ButtonGroup from '@mui/material/ButtonGroup';
import { FamilyContext } from '../context/family';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ onOpenUsers, user, loggedIn, onLogout }) => {
  const { family, setFamily, setMembers, setAuth } = useContext(FamilyContext)
  const navigate = useNavigate()
  if (!user) return null

  const theme = createTheme({
    palette: {
      primary: {
        main: user.color,
      },
    },
  })

  const handleLogout = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/logout', {
      method: 'DELETE'
    })
    if (response.ok) {
      setFamily(null)
      setMembers(null)
      setAuth(false)
      navigate("/login")
    }
  }

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'primary.dark' }}>
        <Toolbar>
          <Box sx={{ marginRight: "19vw"}}>
            <Typography variant="h4">Plannr</Typography>
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            { loggedIn ? "Hello, " : null}
            { user ? user.name : null }
          </Typography>
            { loggedIn 
              ?
              <>
                <ButtonGroup>
                  <Button variant="contained" color="primary">{ family.last_name }</Button>
                  <Button variant="contained" color="primary" onClick={ onOpenUsers }>Switch User</Button>
                  <Button variant="contained" color="primary" onClick={ handleLogout }>Logout</Button>
                </ButtonGroup>
              </> 
              :
              null
            }
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  );
}

export default NavBar