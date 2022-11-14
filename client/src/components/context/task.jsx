import React, { useState, createContext, useEffect } from "react";

const TaskContext = createContext()

const TaskProvider = ({ children }) => {
  const [familyTasks, setFamilyTasks] = useState([])
  const [userTasks, setUserTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks')
      const data = await response.json()
      // if (response.ok) {
        setFamilyTasks(data.family_tasks)
        setUserTasks(data.user_tasks)
        // }
    }
    fetchTasks()
  }, [])

  return (
    <TaskContext.Provider value={{ familyTasks, setFamilyTasks, userTasks, setUserTasks }}>
      { children }
    </TaskContext.Provider>
  )
}

export { TaskContext, TaskProvider }