import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router

const CorrectionList = () => {
    const [corrections, setCorrections] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchCorrections();
    }, []);

    const fetchCorrections = async () => {
        try {
            const response = await axios.get('http://localhost:4000/enseignantviewcorrection/correction');
            setCorrections(response.data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching corrections:', error);
            setErrorMessage('Error fetching corrections. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Liste des corrections</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <table className="table table-bordered" style={{ backgroundColor: '#cce5ff' }}>
                <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Fichier</th>
                        <th scope="col">Modifier</th>
                    </tr>
                </thead>
                <tbody>
                    {corrections.map((correction, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{correction.titre}</td>
                            <td>{correction.fichier_joint}</td>
                            <td>
                                {/* Use Link to redirect to the update page */}
                                <Link to={`/update/${correction._id}`}>
                                  <button className="btn btn-primary">Modifier</button>
                                </Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CorrectionList;
