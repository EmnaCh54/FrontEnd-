import React, { useState } from 'react';
import backgroundImage from './assets//logtest.png';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/login', { email, mot_de_passe: password });
      console.log(response.data); // Handle successful login response

      // Save login data to local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('nom', response.data.nom);
      localStorage.setItem('prenom', response.data.prenom);

      // Redirect user based on role
      const userRole = response.data.role;
      if (userRole === 'Admin') {
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        // Redirect to homepage
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Login failed:', error.response.data);
      setErrorMessage('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="login-page" style={{ display: 'flex' }}>
     <div style={{ flex: 1, marginTop: '0px' }}>
        <img src={backgroundImage} alt="background" style={{ width: '60%', height: '100%', objectFit: 'cover' }} />
      </div>
      {/* Form on the right */}
      <div className="form-container" style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '100px 20px' }}>
        <div className="login-form" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center mb-4">Connecter</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="email" id="email" className="form-control form-control-lg" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="password" id="password" className="form-control form-control-lg" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary btn-block rounded-pill" style={{ backgroundColor: '#007bff', border: 'none', color: 'white', padding: '0.375rem 0.75rem', fontSize: '1rem', lineHeight: '1.5', borderRadius: '0.25rem', transition: 'background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out', width: '100%' }}>Connexion</button>
            </div>
            {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
            <div className="text-center mb-3">
              <a href="#" className="text-decoration-none">Mot de passe oublié?</a>
            </div>
            <hr />
            <div className="text-center">
              <p className="mb-3">Vous n'avez pas de compte?</p>
              <Link to="/signup" className="btn btn-success rounded-pill" style={{ backgroundColor: '#007bff', border: 'none', color: 'white', padding: '0.375rem 0.75rem', fontSize: '1rem', lineHeight: '1.5', borderRadius: '0.25rem', transition: 'background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out', width: '100%' }}>Créer un compte</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
