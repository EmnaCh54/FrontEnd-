import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateDevoir = () => {
    const { id } = useParams();
    const [devoir, setDevoir] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fichierJoint, setFichierJoint] = useState('');
    const [trimestre, setTrimestre] = useState('');
    const [niveauScolaire, setNiveauScolaire] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchDevoir();
    }, []);

    const fetchDevoir = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/enseignantviewdevoir/devoirs/${id}`);
            setDevoir(response.data);
            setTitle(response.data.contenu_id.titre);
            setDescription(response.data.contenu_id.description);
            setFichierJoint(response.data.contenu_id.fichier_joint);
            setTrimestre(response.data.contenu_id.trimestre);
            setNiveauScolaire(response.data.contenu_id.niveau_scolaire);
        } catch (error) {
            console.error('Error fetching devoir:', error);
            setErrorMessage('Error fetching devoir details. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:4000/enseignantviewdevoir/devoirs/${id}`, {
                titre: title,
                description: description,
                fichier_joint: fichierJoint,
                trimestre: trimestre,
                niveau_scolaire: niveauScolaire
            });
            setSuccessMessage('Devoir mis à jour avec succès !');
            setTimeout(() => {
                window.location.href = '/devoirlist';
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error('Error updating devoir:', error);
            setErrorMessage('Error updating devoir. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Modifier le devoir</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
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
                    <label htmlFor="description" className="form-label">Description :</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        rows="5" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fichierJoint" className="form-label">Fichier joint :</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="fichierJoint" 
                        value={fichierJoint} 
                        onChange={(e) => setFichierJoint(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="trimestre" className="form-label">Trimestre :</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="trimestre" 
                        value={trimestre} 
                        onChange={(e) => setTrimestre(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="niveauScolaire" className="form-label">Niveau scolaire :</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="niveauScolaire" 
                        value={niveauScolaire} 
                        onChange={(e) => setNiveauScolaire(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-5">Mettre à jour</button>
            </form>
        </div>
    );
};

export default UpdateDevoir;
