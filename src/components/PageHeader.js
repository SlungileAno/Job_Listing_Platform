import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

function PageHeader({ title }) {
  return (
    <header className="PageHeader">
        <h1>{title}</h1>
        <Link to="/">
          <button><strong>Back</strong></button>
        </Link>
    </header>
  );
}

export default PageHeader;
