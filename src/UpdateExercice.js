import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateExercice = () => {
    const { id } = useParams();
    const [exercice, setExercice] = useState({
        titre: '',
        description: '',
        fichier_joint: '',
        trimestre: '',
        reporteur: '',
        niveau_scolaire: '',
        image: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchExercice();
    }, []);

    const fetchExercice = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/enseignantviewexercice/exercices/${id}`);
            setExercice(response.data.contenu_id);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching exercice:', error);
            setErrorMessage('Error fetching exercice. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExercice(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/enseignantviewexercice/exercices/${id}`, exercice);
            setSuccessMessage('Exercice updated successfully.');
            setTimeout(() => {
                window.location.href = '/exercicelist';
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error('Error updating exercice:', error);
            setErrorMessage('Error updating exercice. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Update Exercice</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="titre" className="form-label">Titre</label>
                    <input type="text" className="form-control" id="titre" name="titre" value={exercice.titre} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={exercice.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="fichier_joint" className="form-label">Fichier Joint</label>
                    <input type="text" className="form-control" id="fichier_joint" name="fichier_joint" value={exercice.fichier_joint} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="trimestre" className="form-label">Trimestre</label>
                    <input type="text" className="form-control" id="trimestre" name="trimestre" value={exercice.trimestre} onChange={handleChange} />
                </div>
                {/* Add other fields here */}
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default UpdateExercice;
