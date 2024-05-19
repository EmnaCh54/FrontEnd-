import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = useState({
        type_contenus: '',
        titre: '',
        description: '',
        trimestre: '',
        niveau_scolaire: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchTest();
    }, []);

    const fetchTest = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/enseignantviewtest/tests/${id}`);
            const { contenu_id } = response.data;
            setTest({
                type_contenus: contenu_id.type_contenus,
                titre: contenu_id.titre,
                description: contenu_id.description,
                trimestre: contenu_id.trimestre,
                niveau_scolaire: contenu_id.niveau_scolaire
            });
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching test:', error);
            setErrorMessage('Error fetching test. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTest(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/enseignantviewtest/tests/${id}`, test);
            setSuccessMessage('Test updated successfully.');
            setTimeout(() => {
                navigate('/listtest');  // Redirect to the test list page after a delay
            }, 2000);
        } catch (error) {
            console.error('Error updating test:', error);
            setErrorMessage('Error updating test. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Update Test</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="type_contenus" className="form-label">Type de Contenus</label>
                    <input
                        type="text"
                        className="form-control"
                        id="type_contenus"
                        name="type_contenus"
                        value={test.type_contenus}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="titre" className="form-label">Titre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="titre"
                        name="titre"
                        value={test.titre}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={test.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="trimestre" className="form-label">Trimestre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="trimestre"
                        name="trimestre"
                        value={test.trimestre}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="niveau_scolaire" className="form-label">Niveau Scolaire</label>
                    <input
                        type="text"
                        className="form-control"
                        id="niveau_scolaire"
                        name="niveau_scolaire"
                        value={test.niveau_scolaire}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mb">Update</button>
            </form>
        </div>
    );
};

export default UpdateTest;
