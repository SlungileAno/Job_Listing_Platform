import React, { useState } from 'react';
import axios from 'axios';
import PageHeader from './PageHeader';

const AddJob = ({ onJobAdded }) => {
  const [jobID, setJobID] = useState('');
  const [vacancy, setVacancy] = useState('');
  const [field, setField] = useState('');
  const [date_posted, setDatePosted] = useState('');
  const [job_details, setDetails] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const job = { 
      job_id: jobID, 
      vacancy, 
      field, 
      date_posted,
      job_details, 
      location,       
    };
    try {
      const response = await axios.post('http://localhost:5000/jobs', job);
      alert('Job added successfully!');
      onJobAdded(response.data); 
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };
  
  return (
    <div>
      <PageHeader title="Add Job" />
    
    <div className= "app">
     
      <form onSubmit={handleSubmit} className="job-form"> 
        <label for="jobID">Job ID</label>
        <input 
            type="text" 
            id="jobID"
            placeholder="Job ID" 
            value={jobID} 
            onChange={(e) => setJobID(e.target.value)} 
          />

        <label for="vacancy">Vacancy</label>
        <input 
            type="text" 
            id="vacancy"
            placeholder="Vacancy" 
            value={vacancy} 
            onChange={(e) => setVacancy(e.target.value)} 
          />

        <label for="field">Field</label>
        <input 
            type="text" 
            id="field"
            placeholder="Field" 
            value={field} 
            onChange={(e) => setField(e.target.value)} 
          />

        <label for="date_posted">Date Posted</label>
        <input 
            type="date" 
            id="date_posted"
            value={date_posted} 
            onChange={(e) => setDatePosted(e.target.value)} 
          />

        <label for="job_details">Job Details</label>
        <textarea 
            id="job_details"
            rows="3" 
            placeholder="Details" 
            value={job_details} 
            onChange={(e) => setDetails(e.target.value)} 
          ></textarea>

        <label for="location">Location</label>
        <input 
            type="text" 
            id="location"
            placeholder="Location" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
          />

        <button type="submit">Add Job</button>
      </form>
    </div>
  </div>
  );
};

export default AddJob;
