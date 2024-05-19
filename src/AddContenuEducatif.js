import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API calls

const AddContenuEducatif = () => {
  const [typeContenus, setTypeContenus] = useState('');
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [fichierJoint, setFichierJoint] = useState('');
  const [trimestre, setTrimestre] = useState('');
  const [datePub, setDatePub] = useState('');
  const [niveauScolaire, setNiveauScolaire] = useState('');
  const [reporteur, setReporteur] = useState('');
  const [image, setImage] = useState(null); // Store image as a File object

  useEffect(() => {
    // Set the date field to the current date when the component mounts
    const currentDate = new Date().toISOString().split('T')[0];
    setDatePub(currentDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if reporteur and image are not empty
    if (!reporteur || !image) {
      // If either reporteur or image is empty, display an error message
      console.error('Reporteur and Image fields are required');
      return;
    }

    // If reporteur and image are not empty, proceed with form submission
    const formData = new FormData();
    formData.append('type_contenus', typeContenus);
    formData.append('titre', titre);
    formData.append('description', description);
    formData.append('fichier_joint', fichierJoint);
    formData.append('trimestre', trimestre);
    formData.append('date_pub', datePub);
    formData.append('niveau_scolaire', niveauScolaire);
    formData.append('reporteur', reporteur);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:4000/enseignantcontenueducatif/contenuseducatif', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); // Handle the response from the server
      // Reset form fields after successful submission
      setTypeContenus('');
      setTitre('');
      setDescription('');
      setFichierJoint('');
      setTrimestre('');
      setNiveauScolaire('');
      setReporteur('');
      setImage(null);
      // Set the date field back to the current date
      const currentDate = new Date().toISOString().split('T')[0];
      setDatePub(currentDate);
    } catch (error) {
      console.error('Error:', error);
      // Handle error if the API call fails
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f0f0f0', backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div className="row justify-content-center mb-5">
        <div className="col-md-6 ">
          <div className="card mt-5 ">
            <div className="card-body ">
              <h2 className="card-title text-center mb-4">Add Educational Content</h2>
              <form onSubmit={handleSubmit} className="mb-5">
                <div className="mb-3">
                  <label htmlFor="typeContenus" className="form-label">Type of Content:</label>
                  <select className="form-select" id="typeContenus" value={typeContenus} onChange={(e) => setTypeContenus(e.target.value)}>
                    <option value="">Select Type of Content</option>
                    <option value="Cours">Cours</option>
                    <option value="Tests">Tests</option>
                    <option value="Exercice">Exercice</option>
                    <option value="Devoir">Devoir</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="titre" className="form-label">Title:</label>
                  <input type="text" className="form-control" id="titre" value={titre} onChange={(e) => setTitre(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description:</label>
                  <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="fichierJoint" className="form-label">Attached File:</label>
                  <input type="file" className="form-control" id="fichierJoint" onChange={(e) => setFichierJoint(e.target.files[0])} />
                </div>
                <div className="mb-3">
                  <label htmlFor="trimestre" className="form-label">Trimester:</label>
                  <select className="form-select" id="trimestre" value={trimestre} onChange={(e) => setTrimestre(e.target.value)}>
                    <option value="">Select Trimester</option>
                    <option value="s1">S1</option>
                    <option value="s2">S2</option>
                    <option value="s3">S3</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="datePub" className="form-label">Publication Date:</label>
                  <input type="date" className="form-control" id="datePub" value={datePub} onChange={(e) => setDatePub(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="niveauScolaire" className="form-label">Educational Level:</label>
                  <input type="text" className="form-control" id="niveauScolaire" value={niveauScolaire} onChange={(e) => setNiveauScolaire(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="reporteur" className="form-label">Reporter:</label>
                  <input type="text" className="form-control" id="reporteur" value={reporteur} onChange={(e) => setReporteur(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image:</label>
                  <input type="file" className="form-control" id="image" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary btn-block">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContenuEducatif;
