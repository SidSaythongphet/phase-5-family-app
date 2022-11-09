import { Dialog } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { EventProvider } from "./components/context/event";
import { FamilyContext } from "./components/context/family";
import NavBar from "./components/navigation/NavBar";
import SessionContainer from "./components/session/SessionContainer";
import UserLogin from "./components/session/UserLogin";
import FamilyHome from "./components/static/FamilyHome";
import Home from "./components/static/Home";

function App() {
  const { family, auth } = useContext(FamilyContext)
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    
    const fetchUser = async () => {
      console.log("fetching User")
      const response = await fetch('/api/user')
      const data = await response.json()
      if (response.ok) {
        setUser(data)
      } else {

      }
    }
  
    fetchUser()
  }, [])

  console.log("Current User:", user)

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
      <EventProvider>
        { auth
          ? 
          <NavBar 
            user={ user }
            setUser={ setUser }
          /> 
          : 
          null
        }
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={ <SessionContainer /> } />
          <Route 
            path="/family/:last_name/:id" 
            element={ 
              <FamilyHome 
                user={ user } 
                setUser={ setUser } 
              /> 
            }
          >
            <Route 
              path="users" 
              element={( 
                <Dialog open>
                  <UserLogin user={ user } setUser={ setUser } /> 
                </Dialog>
              )}
            />
          </Route>
        </Routes>
      </EventProvider>
    </>
  );
}

export default App;
