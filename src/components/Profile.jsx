import React, { useContext, useEffect } from 'react';
import noteContext from '../context/Notes/noteContext';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = (props) => {
  const context = useContext(noteContext);
  const { user, getUser, noteCount } = context;
//   const {user} = props;

  const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem('token')) {
//       getUser();
//       console.log('USER');
//       console.log(user);
//     } else {
//       navigate('/login');
//     }
//   }, []);

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-4">

            </div>
            <div className="custom-profile-card mb-3">
      <div className="custom-profile-content">
        <div className="custom-profile-image">
          <img
            className="img-fluid"
            alt=""
            src={user.profileImg}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <h5 className="custom-profile-name text-center my-2">{user.firstName}</h5>
        <p className="custom-profile-designation text-center">Designer</p>
      </div>
      <div className="custom-profile-body">
        <h5 className="custom-profile-welcome">
          Welcome back <span className="custom-profile-highlight text-info">{user.firstName}</span>
        </h5>
        <p className="custom-profile-text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, eveniet? Cum commodi
          odio, corporis animi voluptatibus maiores debitis modi exercitationem dolorem minima,
          nulla. Lorem que, error in molestias quia optio veritatis unde eligendi, modi officiis libero nihil, explicabo nam ex! Labore, reprehenderit magni. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit accusamus ipsum libero, excepturi perferendis nam minima corrupti facere reprehenderit, aspernatur maxime voluptas possimus voluptatum, adipisci quibusdam delectus dolorum fugit! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est eveniet a facere atque, magnam enim id ut nisi. Praesentium facilis quae eaque voluptatum natus, voluptatem officia libero sed porro. Facilis!
        </p>
      </div>
    </div>
    <div className="col-md-3"></div>
        </div>
    </div>

  );
};

export default Profile;
