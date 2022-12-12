import React, { useState, createContext, useEffect } from "react";

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/user')
      const data = await response.json()
      if (response.ok) {
        setUser(data)
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