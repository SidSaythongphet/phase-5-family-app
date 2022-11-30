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
import { UserContext } from '../context/user';
import { Skeleton } from '@mui/material';


const NavBar = () => {
  const { family, setFamily, setMembers, auth, setAuth } = useContext(FamilyContext)
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  if (!user) return <Skeleton sx={{ height: "80px" }}/>

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
      setUser(null)
      setAuth(false)
      navigate("/login")
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "6vh" }}>
        <AppBar position="fixed" sx={{ height: "6vh", bgcolor: 'primary.dark', zIndex: (theme) => theme.zIndex.drawer + 1 }} elevation={0}>
          <Toolbar disableGutters sx={{ height: "100%", alignItems: "center" }} >
            <Typography variant="h3" component="div" sx={{ height: "100%", width: "25vw" }} textAlign="center">- P l a n n r -</Typography>
            <Typography variant="h6" component="div" sx={{ height: "100%", flexGrow: 1 }}>
              { auth ? "Hello, " : null}
              { user ? user.name : null }
            </Typography>
              { auth 
                ?
                <>
                  <ButtonGroup >
                    <Button variant="contained" sx={{ backgroundColor: "primary.dark" }} >{ family.last_name }</Button>
                    <Button variant="contained" sx={{ backgroundColor: "primary.light" }} onClick={ () => navigate(`/family/${family.last_name}/${family.id}/users`) }>Switch User</Button>
                    <Button variant="contained" sx={{ backgroundColor: "primary.light" }} onClick={ handleLogout }>Logout</Button>
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