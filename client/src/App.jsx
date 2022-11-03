import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from "./components/navigation/NavBar";
import SessionContainer from "./components/session/SessionContainer";
import FamilyHome from "./components/static/FamilyHome";
import Home from "./components/static/Home";

function App() {
  const [family, setFamily] = useState(null)
  const [familyMembers, setFamilyMembers] = useState(null)
  const [user, setUser] = useState(null)
  const [familyEvents, setFamilyEvents] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [openUserSelect, setOpenUserSelect] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFamily = async () => {
      const response = await fetch('/api/family')
      const data = await response.json()
      if (response.ok) {
        console.log(data)
        setFamily(data)
        setFamilyMembers(data.users)
        setLoggedIn(true)
        navigate(`/family/${data.last_name}/${data.id}`)
      } else {
        navigate("/login")
        console.log(data.errors)
      }
    }    

    const fetchUser = async () => {
      const response = await fetch('/api/user')
      const data = await response.json()
      // if (response.ok) {
        setUser(data)
      // }
    }
    
    const fetchEvents = async () => {
      const response = await fetch('/api/events')
      const data = await response.json()
      // if (response.ok) {
        setFamilyEvents(data.map(ev =>  {
          ev["color"] = ev.user.color
          return ev
        }))
      // }
    }

    fetchFamily().then(fetchEvents().then(fetchUser()))
    if (family) fetchUser().catch(console.error)
  }, [])

  console.log("Current Family:", family)
  console.log("Current Family Members:", familyMembers)
  console.log("Current User:", user)
  console.log("Current Family Events:", familyEvents)

  const addFamilyMember = (user) => {
    setFamily([...familyMembers, user])
  }

  const handleLogIn = (data) => {
    setFamily(data)
    setFamilyMembers(data.users)
    setFamilyEvents(data.events.map(ev =>  {
      ev["color"] = ev.user.color
      return ev
    }))
    setLoggedIn(true)
    setOpenUserSelect(true)
    navigate(`/family/${data.last_name}/${data.id}`)
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
      setFamilyEvents(null)
      setLoggedIn(false)
      navigate("/login")
    }
  }

  const handleOpenUserSelect = () => {
    setOpenUserSelect(!openUserSelect)
  }

  return (
    <>
      { loggedIn 
        ? 
        <NavBar 
          onOpenUsers={ handleOpenUserSelect } 
          user={ user } 
          familyMembers={ familyMembers } 
          loggedIn={ loggedIn } 
          setLoggedIn={ setLoggedIn } 
          onLogout={ handleLogout }
        /> 
        : 
        null
      }
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <SessionContainer onLogIn={ handleLogIn } loggedIn={ loggedIn } /> } />
        {
          !family
          ?  <Route path="/" element={ <Home /> } /> 
          :
        <Route 
        path="/family/:last_name/:id" 
        element={ 
          <FamilyHome 
            openUserSelect={ openUserSelect } 
            onOpenUsers={ handleOpenUserSelect } 
            user={ user } 
            family={ family } 
            familyMembers={ familyMembers } 
            setUser={ setUser } 
            onAddMember={ addFamilyMember }
            setFamilyEvents={ setFamilyEvents } 
            familyEvents={ familyEvents } 
          /> 
        }
        />
      }
      </Routes>
    </>
  );
}

export default App;
