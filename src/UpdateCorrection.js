import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateCorrectionForm = () => {
    const { id } = useParams();
    const [correction, setCorrection] = useState({});
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchCorrection();
    }, [id]);

    const fetchCorrection = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/enseignantviewcorrection/${id}`);
            const correctionData = response.data;
            setCorrection(correctionData);
            setTitle(correctionData.titre);
            setTeacherId(correctionData.enseignant_id);
            // You might want to populate other fields here as well
        } catch (error) {
            console.error('Error fetching correction details:', error);
            setErrorMessage('Error fetching correction details. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('file', file);
            formData.append('enseignant_id', teacherId);

            await axios.put(`http://localhost:4000/enseignantviewcorrection/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccessMessage('Correction mise à jour avec succès !');
            setTimeout(() => {
                // Redirect to '/courslist' after 2 seconds
                window.location.href = '/courslist';
            }, 2000); // 2 seconds timeout
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la correction :', error);
            setErrorMessage('Erreur lors de la mise à jour de la correction. Veuillez réessayer.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="mb-0">Modifier la correction</h2>
                        </div>
                        <div className="card-body">
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
                                    <label htmlFor="file" className="form-label">Fichier :</label>
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        id="file" 
                                        onChange={(e) => setFile(e.target.files[0])} 
                                    />
                                </div>
                                <input 
                                    type="hidden" 
                                    value={teacherId} 
                                    readOnly 
                                />
                                <button type="submit" className="btn btn-primary">Mettre à jour</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateCorrectionForm;
