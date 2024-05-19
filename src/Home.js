import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import yourPhoto from './assets/test8.png'; // Importez votre photo
import testimonialImage from './assets/test6.png'; // Importez l'image de témoignage
import additionalImage from './assets/tem6.png'; // Importez une image supplémentaire
import testimonialImage2 from './assets/tem2.png'; // Importez l'image du deuxième témoignage
import testimonialImage3 from './assets/tem1.png'; // Importez l'image du troisième témoignage

const Home = () => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedRole, setSelectedRole] = useState(localStorage.getItem('selectedRole') || 'Étudiant');

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    localStorage.setItem('selectedRole', role);
    window.location.href = '/signup'; // Redirige vers /signup
  };

  // Définissez les témoignages
  const testimonials = [
    {
      text: "Ce site m'a vraiment aidé à organiser mes études. Les ressources sont excellentes et faciles à comprendre. Je le recommande vivement !",
      image: testimonialImage2,
    },
    {
      text: "Parascolaire a été un compagnon essentiel dans mon parcours éducatif. J'ai découvert une nouvelle passion pour l'apprentissage grâce à cette plateforme.",
      image: testimonialImage3,
    },
    {
      text: "L'expérience utilisateur de Parascolaire est exceptionnelle. La navigation est fluide, et les informations sont présentées clairement et de manière concise.",
      image: additionalImage,
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        // Récupération des données de cours depuis l'API
        const coursesResponse = await axios.get('http://localhost:4000/enseignantviewcours/cours');
        setCourses(coursesResponse.data);

        // Récupération des données de devoirs depuis l'API
        const assignmentsResponse = await axios.get('http://localhost:4000/enseignantviewdevoir/devoirs');
        setAssignments(assignmentsResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div className="col-md-6 text-center" style={{ marginTop: '5px', paddingLeft: 0, paddingRight: '10px' }}>
          <img src={yourPhoto} alt="Votre Photo" className="img-fluid" style={{ maxWidth: '60%', marginRight: 'auto', marginLeft: 'auto' }} />
        </div>
        <div className="col-md-6 text-center" style={{ marginTop: '150px', paddingLeft: '0px' }}>
          <h1>Bienvenue sur Parascolaire</h1>
          <div className="role-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            {['Étudiant', 'Parent', 'Enseignant'].map((role) => (
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
        </div>
      </div>
      <div className="row">
        <h2 className="col-md-12 text-center mt-5">Cours</h2>
        {Array.isArray(courses) && courses.map((course, index) => (
          <div key={index} className="col-md-4 mt-4" style={{ marginLeft: '10px', marginRight: '10px' }}>
            <div className="card" style={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
              <h3>{course.contenu_id.titre}</h3>
              <p><strong>Trimestre :</strong> {course.contenu_id.trimestre}</p>
              <p><strong>Date :</strong> {new Date(course.contenu_id.date_pub).toLocaleDateString()}</p>
              <div>
                <Link to={`/details/${index}`} className="btn btn-primary mt-3">Plus de détails</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <h2 className="col-md-12 text-center mt-5">Devoirs</h2>
        {Array.isArray(assignments) && assignments.map((assignment, index) => (
          <div key={index} className="col-md-4 mt-4" style={{ marginLeft: '10px', marginRight: '10px' }}>
            <div className="card" style={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
              <h3>{assignment.contenu_id.titre}</h3>
              <p><strong>Trimestre :</strong> {assignment.contenu_id.trimestre}</p>
              <p><strong>Date :</strong> {new Date(assignment.contenu_id.date_pub).toLocaleDateString()}</p>
              <div>
                <Link to={`/details/${index}`} className="btn btn-primary mt-3">Plus de détails</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Section Témoignages */}
      <div className="row mt-5 justify-content-center align-items-center">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="col-md-4 text-center mt-5">
            <div className="testimonial-wrapper" style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', minHeight: '300px' }}>
              <img src={testimonial.image} alt={`Témoignage ${index+2}`} className="img-fluid mt-3" style={{ maxWidth: '50%' }} />
              <div className="testimonial-text">
                <FontAwesomeIcon icon={faQuoteLeft} style={{ fontSize: '2rem', color: '#007bff' }} />
                <p>"{testimonial.text}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Section Image Supplémentaire */}
      <div className="row mt-5">
        <div className="col-md-6 text-center">
          <img src={testimonialImage} alt="Image Supplémentaire" className="img-fluid" style={{ maxWidth: '50%' }} />
        </div>
        <div className="col-md-6" style={{marginTop:'130px'}}>
          <p className="text-center">
            <span style={{fontWeight: 'bold', fontSize: '1.5rem'}}>Vous pouvez apprendre n'importe quoi.</span><br />
            <span style={{color: '#000'}}>Construisez une compréhension approfondie et solide en mathématiques, sciences et bien plus encore.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
