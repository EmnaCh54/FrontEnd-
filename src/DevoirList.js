import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const DevoirList = () => {
    const [devoirs, setDevoirs] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchDevoirs();
    }, []);

    const fetchDevoirs = async () => {
        try {
            const response = await axios.get('http://localhost:4000/enseignantviewdevoir/devoirs');
            setDevoirs(response.data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching devoirs:', error);
            setErrorMessage('Error fetching devoirs. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/enseignantviewdevoir/devoirs/${id}`);
            // Remove the deleted devoir from the state
            setDevoirs(devoirs.filter(devoir => devoir._id !== id));
        } catch (error) {
            console.error('Error deleting devoir:', error);
            setErrorMessage('Error deleting devoir. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Liste des devoirs</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <table className="table table-bordered" style={{ backgroundColor: '#cce5ff' }}>
                <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Type</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {devoirs.map((devoir, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{devoir.contenu_id.type_contenus}</td>
                            <td>{devoir.contenu_id.titre}</td>
                            <td>{devoir.contenu_id.description}</td>
                            <td>
                                <Link to={`/update-devoir/${devoir._id}`} className="btn btn-primary me-2">
                                    <FaEdit />
                                </Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(devoir._id)}>
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

export default DevoirList;
