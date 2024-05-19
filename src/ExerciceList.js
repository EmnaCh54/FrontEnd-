import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ExerciceList = () => {
    const [exercices, setExercices] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchExercices();
    }, []);

    const fetchExercices = async () => {
        try {
            const response = await axios.get('http://localhost:4000/enseignantviewexercice/exercices');
            setExercices(response.data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching exercices:', error);
            setErrorMessage('Error fetching exercices. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/enseignantviewexercice/exercices/${id}`);
            // Remove the deleted exercice from the state
            setExercices(exercices.filter(exercice => exercice._id !== id));
        } catch (error) {
            console.error('Error deleting exercice:', error);
            setErrorMessage('Error deleting exercice. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Liste des exercices</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type de Contenu</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercices.map((exercice, index) => (
                        <tr key={exercice._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{exercice.contenu_id?.titre}</td>
                            <td>{exercice.contenu_id?.description}</td>
                            <td>{exercice.contenu_id?.type_contenus}</td>
                            <td>
                                <Link to={`/update-exercice/${exercice._id}`} className="btn btn-primary me-2">
                                    <FaEdit />
                                </Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(exercice._id)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExerciceList;
