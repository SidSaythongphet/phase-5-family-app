import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from "./components/navigation/NavBar";
import Login from "./components/session/Login";
import SignUp from "./components/session/SignUp";
import Home from "./components/static/Home";

function App() {
  const [family, setFamily] = useState(null)
  const [familyMembers, setFamilyMembers] = useState(null)
  const [user, setUser] = useState(null)
  const [events, setEvents] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/family').then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setFamily(data)
          setFamilyMembers(data.users)
          setEvents(data.events)
          setLoggedIn(true)
        })
      } else {
        navigate("/login")
      }
    })    

    fetch('/api/user').then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setUser(data)
        })
      }
    })    
  }, [])
  console.log("Current Family:", family)
  console.log("Current Family Members:", familyMembers)
  console.log("Current User:", user)
  console.log("Family's Events", events)

  const addNewEvent = (newEvent) => {
    setEvents([...events, newEvent])
  }
  const addFamilyMember = (user) => {
    setFamily([...familyMembers, user])
  }

  return (
    <>
      <NavBar loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } />
      <Routes>
        <Route path="/" element={ <Home user={ user } family={ family } familyMembers={ familyMembers } setUser={ setUser } onAddMember={ addFamilyMember } events={ events } onAddEvent={ addNewEvent } /> } />
        <Route path="/signup" element={ <SignUp loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } setFamily={ setFamily } /> } />
        <Route path="/login" element={ <Login loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } setFamily={ setFamily } /> } />
      </Routes>
    </>
  );
}

export default App;
