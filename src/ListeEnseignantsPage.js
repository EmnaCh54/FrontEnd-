import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { Container, Row, Col, Table, Button, Alert } from 'react-bootstrap';

const EnseignantList = () => {
    const [enseignants, setEnseignants] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchEnseignants();
    }, []);

    const fetchEnseignants = async () => {
        try {
            const response = await axios.get('http://localhost:4000/enseignant/enseignants');
            setEnseignants(response.data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching enseignants:', error);
            setErrorMessage('Error fetching enseignants. Please try again.');
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'actif' ? 'inactif' : 'actif';
            const url = currentStatus === 'actif'
                ? `http://localhost:4000/enseignant/${id}/desactiver`
                : `http://localhost:4000/enseignant/${id}/reactiver`;
            
            await axios.put(url);
            setEnseignants(enseignants.map(enseignant =>
                enseignant.utilisateur_id._id === id ? { ...enseignant, statut: newStatus } : enseignant
            ));
        } catch (error) {
            console.error('Error updating enseignant status:', error);
            setErrorMessage('Error updating enseignant status. Please try again.');
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col xs={2} className="p-0">
                    <Sidebar />
                </Col>
                <Col xs={10} className="p-4" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/background.jpg)`, backgroundSize: 'cover' }}>
                    <h2>Liste des enseignants</h2>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Email</th>
                                <th>Spécialité</th>
                                <th>Niveau éducatif</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enseignants.map((enseignant, index) => (
                                <tr key={enseignant.utilisateur_id._id}>
                                    <td>{index + 1}</td>
                                    <td>{enseignant.utilisateur_id.nom}</td>
                                    <td>{enseignant.utilisateur_id.prenom}</td>
                                    <td>{enseignant.utilisateur_id.email}</td>
                                    <td>{enseignant.specialite}</td>
                                    <td>{enseignant.niveau_educatif}</td>
                                    <td>{enseignant.statut}</td>
                                    <td>
                                        <Button 
                                            variant="secondary"
                                            onClick={() => handleToggleStatus(enseignant.utilisateur_id._id, enseignant.statut)}
                                        >
                                            {enseignant.statut === 'actif' ? <FaToggleOn /> : <FaToggleOff />}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default EnseignantList;
