import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Paper } from '@mui/material';


const DatePickerModule = ({ user, onAddEvent }) => {
  const initialState = {
    title: '',
    start: null,
    end: null,
    allDay: false,
    note: '',
    user_id: user.id
  }
  const [formData, setFormData] = useState(initialState)

  const handleChange = (event) => {
    setFormData({...formData,
      [event.target.name]: event.target.value});
  };

  const handleSubmit = async e => {
    e.preventDefault()

    // throw error if date combination is invalid
    if (new Date(formData.start) > new Date(formData.end)) {
      console.log("error")
      return
    }
    console.log("processing")

    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()
    if (response.ok) {
      onAddEvent(data)
      setFormData(initialState)
    } else {
      console.log(data.errors)
    }
  }

  return (
    <Paper elevation={2} sx={{ margin: 1 }}>
      <h4>New Event</h4>
      <form onSubmit={ handleSubmit }>
        <input 
          placeholder='Event Title' 
          name='title'
          value={ formData.title } 
          onChange={ handleChange }
        />
        <DatePicker
          placeholderText='Start Date'
          selected={formData.start}
          dateFormat="M/d/yyyy h:mm:ss a"
          showTimeSelect
          onChange={  (date) => setFormData({...formData, start: date})      }
          selectsStart
          startDate={formData.start}
          endDate={formData.end}
          required
        />
        <DatePicker
          placeholderText='End Date'
          selected={formData.end}
          dateFormat="M/d/yyyy h:mm:ss a"
          showTimeSelect
          onChange={  (date) => setFormData({...formData, end: date})      }
          selectsEnd
          startDate={formData.start}
          endDate={formData.end}
          minDate={formData.start}
          required
        />      
        <FormGroup>
          <FormControlLabel control={<Switch onChange={ () => setFormData({...formData, allDay: !formData.allDay})}/>} label="All Day" />
        </FormGroup>
        <textarea 
          placeholder='Note:'
          name='note'
          value={ formData.note }
          onChange={ handleChange }
        />
        <input type="submit" />
      </form>
    </Paper>
  );
}

export default DatePickerModule