import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddJob from './components/AddJob';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/job/:id" element={<JobDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
