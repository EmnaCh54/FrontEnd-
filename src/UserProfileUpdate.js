import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaEnvelope, FaGraduationCap, FaIdBadge } from 'react-icons/fa';
import axios from 'axios';

const UserProfileUpdate = () => {
  const [userData, setUserData] = useState({
    nom: '',
    prenom: '',
    email: '',
    niveaueducation: '',
    statut: ''
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Fetch the user data
    axios.get(`http://127.0.0.1:4000/etudiant/${userId}`)
      .then(response => {
        if (response.data) {
          const data = response.data;
          setUserData({
            nom: localStorage.getItem('nom'),
            prenom: localStorage.getItem('prenom'),
            email: localStorage.getItem('email'),
            niveaueducation: data.niveaueducation || '',
            statut: data.statut || ''
          });
        } else {
          console.error('No data found for the user.');
        }
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    axios.put(`http://127.0.0.1:4000/etudiant/update/${userId}`, userData)
      .then(response => {
        console.log('User updated successfully:', response.data);
        // You can also update the local storage if needed
      })
      .catch(error => {
        console.error('There was an error updating the user!', error);
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">Update Profile</h2>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group mb-3">
                <label><FaUser className="me-2" />Nom</label>
                <input type="text" className="form-control" name="nom" value={userData.nom} onChange={handleChange} />
              </div>
              <div className="form-group mb-3">
                <label><FaUser className="me-2" />Prénom</label>
                <input type="text" className="form-control" name="prenom" value={userData.prenom} onChange={handleChange} />
              </div>
              <div className="form-group mb-3">
                <label><FaEnvelope className="me-2" />Email</label>
                <input type="email" className="form-control" name="email" value={userData.email} onChange={handleChange} />
              </div>
              <div className="form-group mb-3">
                <label><FaGraduationCap className="me-2" />Niveau d'éducation</label>
                <input type="text" className="form-control" name="niveaueducation" value={userData.niveaueducation} onChange={handleChange} />
              </div>
              <div className="form-group mb-3">
                <label><FaIdBadge className="me-2" />Statut</label>
                <input type="text" className="form-control" name="statut" value={userData.statut} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 d-flex justify-content-end mt-4">
              <button className="btn btn-primary" onClick={handleUpdate}>Update Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileUpdate;
