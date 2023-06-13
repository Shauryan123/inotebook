import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../context/Notes/noteContext';
import { useNavigate } from 'react-router-dom';
import './resetPassword.css';

const ResetPassword = () => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { showAlert, alert } = context;
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reset, setReset] = useState(false);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  useEffect(() => {
    if (reset === true) {
      navigate('/');
    }
  }, [reset, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = 'http://localhost:5000/api/auth/resetpassword';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (data.success === true) {
        showAlert('Password has been changed successfully!', 'success');
        setReset(true);
      } else {
        showAlert('No user found with this email', 'danger');
      }
    } catch (error) {
      console.error(error);
      showAlert('Some error occurred!', 'danger');
    }
  };

  return (
    <div className="container1 mt-5">
      <h2>Reset Password</h2>
      {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword" className="form-label">
            New Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
