import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const DatePickerModule = () => {
  const [formData, setFormData] = useState({
    title: '',
    startDate: null,
    endDate: null,
    allDay: false,
    note: ''
  })

  const handleChange = (event) => {
    setFormData({...formData,
      [event.target.name]: event.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault()

    // throw error if date combination is invalid
    new Date(formData.startDate) > new Date(formData.endDate) ? console.log("error") : console.log("correct") 
    console.log(formData)
  }

  return (
    <form onSubmit={ handleSubmit }>
      <input 
        placeholder='Event Title' 
        name='title'
        value={ formData.title } 
        onChange={ handleChange }
      />
      <DatePicker
        placeholderText='Start Date'
        selected={formData.startDate}
        dateFormat="M/d/yyyy h:mm:ss a"
        showTimeSelect
        onChange={  (date) => setFormData({...formData, startDate: date})      }
        selectsStart
        startDate={formData.startDate}
        endDate={formData.endDate}
        required
      />
      <DatePicker
        placeholderText='End Date'
        selected={formData.endDate}
        dateFormat="M/d/yyyy h:mm:ss a"
        showTimeSelect
        onChange={  (date) => setFormData({...formData, endDate: date})      }
        selectsEnd
        startDate={formData.startDate}
        endDate={formData.endDate}
        minDate={formData.startDate}
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
  );
}

export default DatePickerModule