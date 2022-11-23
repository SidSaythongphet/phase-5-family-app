import { Dialog, Drawer, Box, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import { Routes, Route } from 'react-router-dom';
import CalendarContainer from "./components/calendar/CalendarContainer";
import { EventProvider } from "./components/context/event";
import { FamilyContext } from "./components/context/family";
import { UserContext, UserProvider } from "./components/context/user";
import EventContainer from "./components/event/EventContainer";
import NewEventContainer from "./components/event/NewEventContainer";
import NavBar from "./components/navigation/NavBar";
import SideNavigation from "./components/navigation/SideNavigation";
import SessionContainer from "./components/session/SessionContainer";
import UserLogin from "./components/session/UserLogin";
import FamilyHome from "./components/static/FamilyHome";
import Home from "./components/static/Home";
import UserHome from "./components/static/UserHome";
import NewTaskForm from "./components/task/NewTaskForm";
import TaskContainer from "./components/task/TaskContainer";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const App = () => {
  const { family, auth } = useContext(FamilyContext)
  const { user } = useContext(UserContext)

  if (!family) {
    return (
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <SessionContainer /> } />
      </Routes>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/:last_name/users" element={( 
            <Dialog open>
              <UserLogin /> 
            </Dialog>
          )} />
      </Routes>
    )
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: user.color,
      },
    },
  })

  return (
    <>
    <ThemeProvider theme={theme}>
      <EventProvider>
        <NavBar/>
        <SideNavigation/>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', paddingLeft: "20vw", height: "92vh" }}
          >
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={ <SessionContainer /> } />
          <Route path="/:last_name/users" element={( 
            <Dialog open>
              <UserLogin /> 
            </Dialog>
          )} />
          <Route path="/:last_name/:name" element={ <UserHome /> } />
          <Route path="/:last_name/calendar" element={ <CalendarContainer /> } />
          <Route path="/:last_name/events" element={ <EventContainer /> } />
          <Route path="/:last_name/tasks" element={ <TaskContainer /> } >
            <Route
              path="create" 
              element={( 
                <Drawer open>
                  <NewTaskForm /> 
                </Drawer>
                )}
                />
            </Route>
          <Route path="/family/:last_name/:id" element={ <FamilyHome /> } >
            <Route 
              path="users" 
              element={( 
                <Dialog open>
                  <UserLogin /> 
                </Dialog>
              )}
              />
            <Route 
              path="create_event" 
              element={( 
                <Drawer open>
                  <NewEventContainer /> 
                </Drawer>
              )}
              />
            <Route 
              path="create" 
              element={( 
                <Drawer open>
                  <NewTaskForm /> 
                </Drawer>
              )}
              />
          </Route>
        </Routes>
      </Box>
      <Box sx={{ height: "2vh", width: "100%" , bgcolor: "primary.dark", zIndex: (theme) => theme.zIndex.drawer + 1 }}></Box>
      </EventProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
