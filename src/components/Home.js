import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <header className="App-header">
      <h1>Job Listing Portal</h1>
      <div className="button-container">
        <Link to="/jobs"><button><strong>List Jobs</strong></button></Link>
        <Link to="/add-job"><button><strong>Add Jobs</strong></button></Link>
      </div>
    </header>
  );
}

export default Home;
