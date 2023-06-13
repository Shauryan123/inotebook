import React, { useState, useEffect } from 'react';
import './about.css';
import { Link } from 'react-router-dom';

const About = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openNav = () => {
    document.getElementById('mySidebar').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
    setSidebarOpen(true);
  };

  const closeNav = () => {
    document.getElementById('mySidebar').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
    setSidebarOpen(false);
  };

  useEffect(() => {
    const openBtn = document.getElementById('openBtn');
    const closeBtn = document.getElementById('closeBtn');

    openBtn.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);

    return () => {
      openBtn.removeEventListener('click', openNav);
      closeBtn.removeEventListener('click', closeNav);
    };
  }, []);

  return (
    <div>
      <div id="mySidebar" className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <a href="javascript:void(0)" id="closeBtn" className="closebtn" onClick={closeNav}>
          <i className="fa-solid fa-angles-left"></i>
        </a>
        <Link to="#">Data Discovery and Integration</Link>
        <Link to="#">Lets Simulate</Link>
        <Link to="#">Lets Analyze</Link>
        <Link to="#">My Reports</Link>
        <Link to="#">Quality and Assurance</Link>
        <Link to="#">ESG Targets</Link>
      </div>

      <div id="main">
        {!sidebarOpen && (
          <button id="openBtn" className="openbtn" onClick={openNav}>
            <i className="fa-solid fa-angles-right"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default About;
