import React, { useState } from 'react';
import backgroundImage from './assets/logtest.png';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('Etudiant');
  const [userData, setUserData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    role: 'Etudiant',
    adresse: '',
    date_naissance: '',
    niveaueducation: '',
    niveau_educatif: '',
    specialite: '',
    statut: 'actif',
    etudiant_id: '', // This field is specific to the parent role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setUserData({ ...userData, role });
    setStep(2);
  };

  const handleLoginClick = () => {
    // Redirect to login page
    window.location.href = '/login';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('User registered successfully:', data);
        
        // Redirect to login page
        window.location.href = '/login';
        
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="signup-page" style={{ display: 'flex', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ flex: 1, marginTop: '0px' }}>
        <img src={backgroundImage} alt="background" style={{ width: '60%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ flex: 1, padding: '50px' , marginTop: '50px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="signup-form">
                <h2 className="text-center mb-4"><strong>Créer un compte</strong></h2>
                {step === 1 && (
                  <div>
                    <p>Choisissez votre rôle :</p>
                    <div className="role-container" style={{ display: 'flex', marginBottom: '20px' }}>
                      {['Etudiant', 'Parent', 'Enseignant'].map((role) => (
                        <div 
                          key={role} 
                          className={`card role-card ${selectedRole === role ? 'selected' : ''}`} 
                          onClick={() => handleRoleSelect(role)}
                          style={{ cursor: 'pointer', marginRight: '10px', backgroundColor: selectedRole === role ? '#007bff' : '' }}
                        >
                          <div className="card-body text-center">
                            <h3 className="card-title font-weight-bold mb-0" style={{ fontSize: '1rem', color: selectedRole === role ? 'white' : 'black' }}>{role}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p>Veuillez entrer votre date de naissance :</p>
                    <input type="date" name="date_naissance" className="form-control mb-3" value={userData.date_naissance} onChange={handleChange} required />
                    <p>Vous avez déjà un compte ? <span onClick={handleLoginClick} style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}>Connectez-vous ici</span>.</p>
                  </div>
                )}
                {step === 2 && (
                  <form onSubmit={handleSubmit}>
                    <div className="signup-form">
                      <div className="mb-4">
                        <input type="text" name="nom" className="form-control" placeholder="Nom" value={userData.nom} onChange={handleChange} required />
                      </div>
                      <div className="mb-4">
                        <input type="text" name="prenom" className="form-control" placeholder="Prénom" value={userData.prenom} onChange={handleChange} required />
                      </div>
                      <div className="mb-4">
                        <input type="email" name="email" className="form-control" placeholder="Email" value={userData.email} onChange={handleChange} required />
                      </div>
                      <div className="mb-4">
                        <input type="password" name="mot_de_passe" className="form-control" placeholder="Mot de passe" value={userData.mot_de_passe} onChange={handleChange} required />
                      </div>
                      <div className="mb-4">
                        <input type="text" name="adresse" className="form-control" placeholder="Adresse" value={userData.adresse} onChange={handleChange} required />
                      </div>
                      {selectedRole === 'Etudiant' && (
                        <div className="mb-4">
                          <input type="text" name="niveaueducation" className="form-control" placeholder="Niveau d'études" value={userData.niveaueducation} onChange={handleChange} required />
                        </div>
                      )}
                      {selectedRole === 'Parent' && (
                        <div className="mb-4">
                          <input type="text" name="etudiant_id" className="form-control" placeholder="ID de l'étudiant associé" value={userData.etudiant_id} onChange={handleChange} required />
                        </div>
                      )}
                      <div className="mb-4">
                        <button type="submit" className="btn btn-primary btn-block rounded-pill py-2">S'inscrire</button>
                      </div>
                    </div>
                  </form> 
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
