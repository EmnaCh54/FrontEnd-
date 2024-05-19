import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCorrectionForm = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [teacherId, setTeacherId] = useState('');

    useEffect(() => {
        // Récupérer l'ID de l'utilisateur depuis localStorage
        const userId = localStorage.getItem('userId');
        setTeacherId(userId);
    }, []); // Le tableau vide [] indique que ce code ne s'exécutera qu'une seule fois, après le rendu initial

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('file', file);
            formData.append('enseignant_id', teacherId);

            await axios.post('http://localhost:4000/enseignantviewcorrection/correction', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setTitle('');
            setFile(null);
            setErrorMessage('');
            alert('Correction ajoutée avec succès !');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la correction :', error);
            setErrorMessage('Erreur lors de l\'ajout de la correction. Veuillez réessayer.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="mb-0">Ajouter une correction</h2>
                        </div>
                        <div className="card-body">
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Titre :</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="title" 
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="file" className="form-label">Fichier :</label>
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        id="file" 
                                        onChange={(e) => setFile(e.target.files[0])} 
                                        required 
                                    />
                                </div>
                                <input 
                                    type="hidden" 
                                    value={teacherId} 
                                    readOnly 
                                />
                                <button type="submit" className="btn btn-primary">Soumettre</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCorrectionForm;
