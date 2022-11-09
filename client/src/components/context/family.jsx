import React, { useState, createContext, useEffect } from "react";

const FamilyContext = createContext()

const FamilyProvider = ({ children }) => {
  const [family, setFamily] = useState(null)
  const [members, setMembers] = useState(null)
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const fetchFamily = async () => {
      const response = await fetch('/api/family')
      const data = await response.json()
      if (response.ok) {
        setFamily(data)
        setMembers(data.users)
        setAuth(true)
      } else {
        console.log("Error")
        return
      }
    }   

    fetchFamily()
  }, [])

  return (
    <FamilyContext.Provider value={{ family, setFamily, members, setMembers, auth, setAuth }}>
      { children }
    </FamilyContext.Provider>
  )
}

export { FamilyContext, FamilyProvider }