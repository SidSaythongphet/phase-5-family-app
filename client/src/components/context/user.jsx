import React, { useState, createContext, useEffect } from "react";

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      console.log("fetching User")
      const response = await fetch('/api/user')
      const data = await response.json()
      if (response.ok) {
        setUser(data)
      } else {
        console.log("Error")
      }
    }
    
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      { children }
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }