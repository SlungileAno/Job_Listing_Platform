import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [sortField, setSortField] = useState('job_id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(0);
  const [jobsPerPage] = useState(5);

  const fetchJobs = async () => {
    const result = await axios('http://localhost:5000/jobs');
    setJobs(result.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
    const sortedJobs = [...jobs].sort((a, b) => {
      if (field === 'date_posted') {
        return order === 'asc' ? new Date(a[field]) - new Date(b[field]) : new Date(b[field]) - new Date(a[field]);
      } else {
        return order === 'asc' ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field]);
      }
    });
    setJobs(sortedJobs);
  };

  const handleJobAdded = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]); // Update state with new job
  };

  const indexOfLastJob = (currentPage + 1) * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
  <div>
    <PageHeader title="Available Vacancies"/>
    
    <div className="app">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('job_id')}>Job ID</th>
            <th onClick={() => handleSort('vacancy')}>Vacancy</th>
            <th onClick={() => handleSort('location')}>Location</th>
          </tr>
        </thead>
        <tbody>
          {currentJobs.map((job) => (
            <tr key={job.job_id}>
              <td>{job.job_id}</td>
              <td>
                <Link to={`/job/${job.job_id}`}>
                  {job.vacancy}
                </Link>
              </td>
              <td>{job.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0}>
          &#8656;
        </button>
        <span>  Page {currentPage + 1} of {totalPages}  </span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))} disabled={currentPage === totalPages - 1}>
          &#8658;
        </button>
      </div>
    </div>
  </div>
    
  );
};

export default JobList;
