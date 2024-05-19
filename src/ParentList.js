import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import Sidebar from './Sidebar'; // Import Sidebar component
import { Container, Row, Col } from 'react-bootstrap'; // Import Container, Row, Col from react-bootstrap

const ParentList = () => {
    const [parents, setParents] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchParents();
    }, []);

    const fetchParents = async () => {
        try {
            const response = await axios.get('http://localhost:4000/parent/parents');
            setParents(response.data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching parents:', error);
            setErrorMessage('Error fetching parents. Please try again.');
        }
    };

    const toggleParentStatus = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:4000/parent/${id}/${newStatus}`);
            setParents(parents.map(parent =>
                parent._id === id ? { ...parent, statut: newStatus } : parent
            ));
        } catch (error) {
            console.error('Error toggling parent status:', error);
            setErrorMessage('Error toggling parent status. Please try again.');
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'actif' ? 'desactiver' : 'reactiver';
        await toggleParentStatus(id, newStatus);
    };

    return (
        <Container fluid>
            <Row>
                <Col xs={2} className="p-0">
                    <Sidebar /> {/* Sidebar component */}
                </Col>
                <Col xs={10} className="p-4">
                    <h2>Liste des Parents</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parents.map(parent => (
                                <tr key={parent._id}>
                                    <td>{parent._id}</td>
                                    <td>{parent.utilisateur_id.nom}</td>
                                    <td>{parent.utilisateur_id.prenom}</td>
                                    <td>{parent.statut}</td>
                                    <td>
                                        <button 
                                            className="btn btn-secondary"
                                            onClick={() => handleToggleStatus(parent._id, parent.statut)}
                                        >
                                            {parent.statut === 'actif' ? <FaToggleOn /> : <FaToggleOff />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    );
};

export default ParentList;
