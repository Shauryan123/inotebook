import React, { Component } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import './module.css'

const Module = (props) => {
  let navigate = useNavigate();
  let { title, description, imageUrl } = props;

  const handleClick = () => {
    navigate("/about");
  };
  return (
    <div className="custom-card mb-2">
    <img className="custom-card-image" alt="" src={imageUrl} />
    <div className="custom-card-content">
      <h5 className="custom-card-title">{title}</h5>
      <p className="custom-card-description">{description}</p>
      <div className="custom-card-footer">
        <i className="fa-sharp fa-solid fa-arrow-right" onClick={handleClick}></i>
      </div>
    </div>
  </div>



  );
};

export default Module;
