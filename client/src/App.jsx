import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/navigation/NavBar";
import SignUp from "./components/session/SignUp";
import Home from "./components/static/Home";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/signup" element={ <SignUp /> } />
      </Routes>
    </Router>
  );
}

export default App;
