import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Fichier</th>
                        <th scope="col">ID de l'enseignant</th>
                    </tr>
                </thead>
                <tbody>
                    {corrections.map((correction, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{correction.titre}</td>
                            <td>{correction.fichier_joint}</td>
                            <td>{correction.enseignant_id || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CorrectionList;
