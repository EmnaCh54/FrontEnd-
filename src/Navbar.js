import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Added FaSearch icon
import { AiOutlineRobot } from 'react-icons/ai'; // Added AiOutlineRobot icon for the robot

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const renderAuthButton = () => {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    if (userId) {
      if (role === 'Admin') {
        return (
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        );
      } else {
        return (
          <div className="nav-item">
            <button className="btn btn-link nav-link" onClick={handleLogout} style={{ color: 'blue' }}>Déconnexion</button>
            
          </div>
        );
      }
    } else {
      return (
        <div className="nav-item">
          <Link className="nav-link" to="/login" style={{ color: 'blue' }}>Connexion</Link>
         
        </div>
      );
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // Handle search functionality here, e.g., redirect to search results page
    console.log('Searching for:', searchQuery);
  };

  const role = localStorage.getItem('role');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <div className="logo">
            <span className="logo-text">ÉducatioNet</span>
          </div>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {(role === 'Etudiant' || role === 'Parent') && (
              <li className="nav-item">
                <Link className="nav-link" to="/">Accueil</Link>
              </li>
            )}
            {role === 'Enseignant' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/addcontent">Ajouter Contenue</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/updatecontent">Ajouter correction</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/courslist">Liste des Corrections</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cours">Liste des Cours</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/devoirlist">Liste des Devoirs</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/exercicelist">Liste des Exercices</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/listtest">Liste des Tests</Link>
                </li>
                <li className="nav-item">
              <Link className="nav-link" to="/UserProfile">Profile</Link>
              </li>
              </>
            )}
            {(role === 'Etudiant') && (
              <>
              <li className="nav-item">
                <Link className="nav-link" to="/ajoutercorrection">Ajouter Correction</Link>
              </li>

              <li className="nav-item">
              <Link className="nav-link" to="/UserProfile">Profile</Link>
              </li>
              </> 
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

          </ul>
          {/* End of search bar */}
          <div className="d-flex" style={{ marginLeft: 'auto', alignItems: 'center' }}>
            <form style={{ marginRight: '20px' }}>
              <div className="input-group">
                <input 
                  className="form-control form-control-sm" 
                  type="search" 
                  placeholder="Search" 
                  aria-label="Search" 
                  value={searchQuery} 
                  onChange={handleChange} 
                />
                <button className="btn btn-outline-primary btn-sm" type="button" onClick={handleSearch}>
                  <FaSearch style={{ fontSize: '0.8rem' }} />
                </button>
              </div>
            </form>
            <ul className="navbar-nav ml-auto">
              {(role === 'Etudiant' || role === 'Parent') && (
                <li className="nav-item">
                  <div className="dropdown">
                    <button className="btn btn-link nav-link" onClick={toggleDropdown}>
                      <AiOutlineRobot style={{ fontSize: '1.2rem' }} />
                    </button>
                    {isOpen && (
                      <div className="dropdown-menu show" style={{ width: '250px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <input type="text" className="form-control mb-2" placeholder="Search..." />
                        <select className="form-select mb-2" aria-label="Select an option">
                          <option value="cours">Cours</option>
                          <option value="test">Test</option>
                          <option value="devoir_correction">Devoir Correction</option>
                        </select>
                        <button className="btn btn-primary btn-sm">Submit</button>
                      </div>
                    )}
                  </div>
                </li>
              )}
              {(role !== 'Admin') && (
                <li className="nav-item">
                  {renderAuthButton()}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
