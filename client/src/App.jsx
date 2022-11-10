import { Dialog, Drawer } from "@mui/material";
import React, { useContext } from "react";
import { Routes, Route } from 'react-router-dom';
import { EventProvider } from "./components/context/event";
import { FamilyContext } from "./components/context/family";
import { UserProvider } from "./components/context/user";
import NewEventContainer from "./components/event/NewEventContainer";
import NavBar from "./components/navigation/NavBar";
import SessionContainer from "./components/session/SessionContainer";
import UserLogin from "./components/session/UserLogin";
import FamilyHome from "./components/static/FamilyHome";
import Home from "./components/static/Home";

const App = () => {
  const { family, auth } = useContext(FamilyContext)

  if (!family) {
    return (
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <SessionContainer /> } />
      </Routes>
    )
  }

  return (
    <>
      <UserProvider>
      <EventProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={ <SessionContainer /> } />
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
          </Route>
        </Routes>
      </EventProvider>
      </UserProvider>
    </>
  );
}

export default App;
