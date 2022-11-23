import React, { useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Toolbar from '@mui/material/Toolbar';
import { UserContext } from '../context/user';
import { Link } from 'react-router-dom';
import { FamilyContext } from '../context/family';

const drawerWidth = "20vw";
const SideNavigation = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { family } = useContext(FamilyContext)
  const { user } = useContext(UserContext)

  if (!user) return null

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const drawer = (
    <>
      <Toolbar />
      <List>
        <ListItem disablePadding >
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            component={ Link } 
            to={ `/${family.last_name.toLowerCase()}/${user.name.toLowerCase()}`}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ color: "white", fontWeight: "bold" }}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
            component={ Link } 
            to={ `/${family.last_name.toLowerCase()}/calendar`}
          >
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" sx={{ color: "white", fontWeight: "bold" }}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}  
            component={ Link } 
            to={ `/${family.last_name.toLowerCase()}/events` }        
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Events" sx={{ color: "white", fontWeight: "bold" }}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}  
            component={ Link } 
            to={ `/${family.last_name.toLowerCase()}/tasks` }        
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" sx={{ color: "white", fontWeight: "bold" }}/>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    // <Box sx={{ display: 'flex' }}>
    <>
      <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: "primary.dark"
            },
          }}
          open
          >
          {drawer}
        </Drawer>
    </>
    // </Box>
  );
}

export default SideNavigation