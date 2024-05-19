import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('nom');
    const userFirstName = localStorage.getItem('prenom');
    const userEmail = localStorage.getItem('email');
    const userRole = localStorage.getItem('role');
    const userToken = localStorage.getItem('token');
    const correctionFile = localStorage.getItem('correctionFile');

    if (userId && userName && userFirstName && userEmail && userRole && userToken) {
      const user = {
        userId,
        nom: userName,
        prenom: userFirstName,
        email: userEmail,
        role: userRole,
        token: userToken,
        correctionFile,
      };
      setUserData(user);
    } else {
      console.error('User data is incomplete or missing in local storage.');
    }
  }, []);

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">User Profile</h2>
          {userData ? (
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <FaUser className="me-2" />
                  <strong>Nom:</strong> {userData.nom}
                </div>
                <div className="d-flex align-items-center mb-3">
                  <FaUser className="me-2" />
                  <strong>Prénom:</strong> {userData.prenom}
                </div>
                <div className="d-flex align-items-center mb-3">
                  <FaEnvelope className="me-2" />
                  <strong>Email:</strong> {userData.email}
                </div>
              </div>
              <div className="col-md-6 d-flex flex-column justify-content-end align-items-end">
                <Link to="/updateProfile" className="btn btn-primary mt-5">Update Profile</Link>
              </div>
            </div>
          ) : (
            <p>No user data found in local storage.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
