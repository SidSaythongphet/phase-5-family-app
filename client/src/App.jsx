import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from "./components/navigation/NavBar";
import Login from "./components/session/Login";
import SignUp from "./components/session/SignUp";
import UserLogin from "./components/session/UserLogin";
import Home from "./components/static/Home";

function App() {
  const [family, setFamily] = useState(null)
  const [familyMembers, setFamilyMembers] = useState(null)
  const [user, setUser] = useState(null)
  const [events, setEvents] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/family').then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setFamily(data)
          setFamilyMembers(data.users)
          setEvents(addColor(data.events))
          setLoggedIn(true)
          setIsLoading(false)
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

  const addColor = (events) => {
    let colors = ["grey", "red", "orange", "green", "blue", "purple", "brown"]

    const edit = events.map(ev => {
      ev["color"] = colors[ev.user_id]
      if (new Date(ev.start).toDateString() !== new Date(ev.end).toDateString()) {
        ev["textColor"] = "black"
        ev["display"] = "background"
      }
      return ev
    })

    return edit
  }

  const handleLogIn = (data) => {
    setFamily(data)
    setFamilyMembers(data.users)
    setEvents(data.events)
    navigate("/family/:last_name")
    setLoggedIn(true)
    setIsLoading(false)
  }

  const handleLogout = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/logout', {
      method: 'DELETE'
    })
    if (response.ok) {
      setFamily(null)
      setFamilyMembers(null)
      setUser(null)
      setEvents(null)
      setLoggedIn(false)
      navigate("/login")
    }
  }

  return (
    <>
      <NavBar user={ user } loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } onLogout={ handleLogout }/>
      <Routes>
        {!isLoading 
        ? <>
          <Route path="/" element={ <Home user={ user } family={ family } familyMembers={ familyMembers } setUser={ setUser } onAddMember={ addFamilyMember } events={ events } setEvents={ setEvents } onAddEvent={ addNewEvent } /> } /> 
          <Route path="/family/:last_name" element={ <UserLogin user={ user } family={ family } familyMembers={ familyMembers } setUser={ setUser } onAddMember={ addFamilyMember }/> } /> 
        </>
        : null }
        <>
          <Route path="/signup" element={ <SignUp onLogIn={ handleLogIn } loggedIn={ loggedIn } /> } />
          <Route path="/login" element={ <Login onLogIn={ handleLogIn } loggedIn={ loggedIn } /> } />
        </>
      </Routes>
    </>
  );
}

export default App;
