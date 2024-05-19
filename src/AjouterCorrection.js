import React, { useState } from 'react';
import backgroundImg from './assets/bh55.png'; // Import de l'image d'arrière-plan
import 'bootstrap/dist/css/bootstrap.min.css'; // Import de Bootstrap CSS

const AjouterCorrection = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [title, setTitle] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name); // Mettre à jour le nom du fichier
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value); // Mettre à jour le titre de la correction
  };

  const handleSaveFile = () => {
    // Vérifier si un fichier et un titre ont été saisis
    if (file && title.trim() !== '') {
      // Sauvegarder le fichier et le titre dans le stockage local
      localStorage.setItem('correctionFile', JSON.stringify(file));
      localStorage.setItem('correctionTitle', title);
      alert('Correction sauvegardée avec succès.');
    } else {
      alert("Veuillez sélectionner un fichier PDF et saisir un titre avant de sauvegarder la correction.");
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="mb-4">Ajouter Correction</h2>
            <div className="mb-3">
              <input type="file" className="form-control" accept=".pdf" onChange={handleFileChange} />
            </div>
            {/* Afficher le nom du fichier sélectionné */}
            {fileName && (
              <div className="mb-3">
                <p><strong>Fichier sélectionné:</strong> {fileName}</p>
              </div>
            )}
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Titre de la correction" value={title} onChange={handleTitleChange} />
            </div>
            <div>
              <button className="btn btn-primary me-2" onClick={handleSaveFile}>Sauvegarder</button>
              <button className="btn btn-secondary" onClick={() => { setFile(null); setTitle(''); }}>Effacer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjouterCorrection;
