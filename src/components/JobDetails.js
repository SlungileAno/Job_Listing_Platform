import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PageHeader from './PageHeader';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const result = await axios('http://localhost:5000/jobs');
      const foundJob = result.data.find((job) => job.job_id === id); // id is a string
      setJob(foundJob);
    };
    fetchJobDetails();
  }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <PageHeader title="Job Details" />

      <div className="app">
        <h2>{job.vacancy}</h2>
        <p><strong>Field:</strong> {job.field}</p>
        <p><strong>Date Posted:</strong> {job.date_posted}</p>
        <p><strong>Location:</strong> {job.location}</p>
      <br></br>
        <p><strong>Job Details:</strong> {job.job_details}</p>
      </div>
      
    </div>
  );
};

export default JobDetails;
