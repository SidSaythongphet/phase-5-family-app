import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from "./components/navigation/NavBar";
import SessionContainer from "./components/session/SessionContainer";
import UserLogin from "./components/session/UserLogin";
import Home from "./components/static/Home";

function App() {
  const [family, setFamily] = useState(null)
  const [familyMembers, setFamilyMembers] = useState(null)
  const [user, setUser] = useState(null)
  const [events, setEvents] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [openUserSelect, setOpenUserSelect] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/family').then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setFamily(data)
          setFamilyMembers(data.users)
          setEvents(data.events)
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

  // const colorCoordinateMembers = (members) => {
  //   let colors = ["grey", "red", "orange", "green", "blue", "purple", "brown"]

  //   return members.map((member, i) => {
  //     member["color"] = colors[i + 1]
  //     return member
  //   })
  // }

  // const addColor = (events, users) => {
  //   if (!events) return
  //   const edit = events.map(ev => {
  //     ev["color"] = users.find(user => user.id === ev.user_id).color
  //     if (new Date(ev.start).toDateString() !== new Date(ev.end).toDateString()) {
  //       ev["textColor"] = "black"
  //       ev["display"] = "background"
  //     }
  //     return ev
  //   })

  //   return edit
  // }

  const handleLogIn = (data) => {
    setFamily(data)
    setFamilyMembers(data.user)
    setEvents(data.events, familyMembers)
    setLoggedIn(true)
    setIsLoading(false)
    setOpenUserSelect(true)
    navigate(`/family/${data.last_name}`)
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

  const handleOpenUserSelect = () => {
    setOpenUserSelect(!openUserSelect)
  }

  return (
    <>
      { loggedIn ? <NavBar onOpenUsers={ handleOpenUserSelect } user={ user } familyMembers={ familyMembers } loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } onLogout={ handleLogout }/> : null}
      <Routes>
        {!isLoading 
        ? <>
          <Route path="/" element={ <Home openUserSelect={ openUserSelect } onOpenUsers={ handleOpenUserSelect } user={ user } family={ family } familyMembers={ familyMembers } setUser={ setUser } onAddMember={ addFamilyMember } events={ events } setEvents={ setEvents } onAddEvent={ addNewEvent } /> } /> 
          <Route path="/family/:last_name" element={ <UserLogin openUserSelect={ openUserSelect } onOpenUsers={ handleOpenUserSelect } user={ user } family={ family } familyMembers={ familyMembers } setUser={ setUser } onAddMember={ addFamilyMember }/> } /> 
        </>
        : null }
        <>
          <Route path="/login" element={ <SessionContainer onLogIn={ handleLogIn } loggedIn={ loggedIn } /> } />
        </>
      </Routes>
    </>
  );
}

export default App;
