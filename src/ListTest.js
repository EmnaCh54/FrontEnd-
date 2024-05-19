import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListTest = () => {
    const [tests, setTests] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const response = await axios.get('http://localhost:4000/enseignantviewtest/tests');
            setTests(response.data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching tests:', error);
            setErrorMessage('Error fetching tests. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/enseignantviewtest/tests/${id}`);
            // Remove the deleted test from the state
            setTests(tests.filter(test => test._id !== id));
        } catch (error) {
            console.error('Error deleting test:', error);
            setErrorMessage('Error deleting test. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Liste des tests</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Type de Contenus</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope="col">Trimestre</th>
                        <th scope="col">Niveau Scolaire</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map((test, index) => (
                        <tr key={test._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{test.contenu_id.type_contenus}</td>
                            <td>{test.contenu_id.titre}</td>
                            <td>{test.contenu_id.description}</td>
                            <td>{test.contenu_id.trimestre}</td>
                            <td>{test.contenu_id.niveau_scolaire}</td>
                            <td>
                                <Link to={`/update-test/${test._id}`} className="btn btn-primary me-2">
                                    <FaEdit />
                                </Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(test._id)}>
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

export default ListTest;
