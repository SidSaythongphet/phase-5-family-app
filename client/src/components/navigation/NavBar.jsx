import React from 'react'

const NavBar = ({ loggedIn, setLoggedIn }) => {
  return (
    <div>
      NavBar
      { loggedIn ? "Welcome" : "Please Log In"}
      <button onClick={ () => setLoggedIn(false) } >Logout</button>
    </div>
  )
}

export default NavBar