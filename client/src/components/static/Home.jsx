import React from 'react'
import CalendarModule from '../calendar/CalendarModule'
import DatePickerModule from '../event/DatePickerModule'

const Home = ({ events }) => {
  return (
    <div>
      Home
      <CalendarModule events={ events }/>
      <DatePickerModule />
    </div>
  )
}

export default Home