import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from "./components/navigation/NavBar";
import Login from "./components/session/Login";
import SignUp from "./components/session/SignUp";
import Home from "./components/static/Home";

function App() {
  const [family, setFamily] = useState(null)
  const [events, setEvents] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/family').then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setFamily(data)
          setLoggedIn(true)
          setEvents(data.events)
        })
      } else {
        navigate("/login")
      }
    })    
  }, [])
  console.log(family)
  console.log(events)

  return (
    <>
      <NavBar loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } />
      <Routes>
        <Route path="/" element={ <Home events={ events }/> } />
        <Route path="/signup" element={ <SignUp loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } setFamily={ setFamily } /> } />
        <Route path="/login" element={ <Login loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } setFamily={ setFamily } /> } />
      </Routes>
    </>
  );
}

export default App;
