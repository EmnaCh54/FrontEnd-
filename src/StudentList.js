import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { Container, Row, Col, Table, Button, Alert } from 'react-bootstrap';
import backgroundImage from './assets/adminback.png'; // Adjust the path as necessary

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:4000/etudiant/all');
            setStudents(response.data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching students:', error);
            setErrorMessage('Error fetching students. Please try again.');
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            let endpoint = '';

            if (currentStatus === 'actif') {
                endpoint = `http://127.0.0.1:4000/etudiant/deactivate/${id}`;
            } else {
                endpoint = `http://127.0.0.1:4000/etudiant/activate/${id}`;
            }

            console.log(`Making request to: ${endpoint} with ID: ${id}`);

            const response = await axios.patch(endpoint);
            console.log('Response:', response);

            setStudents(students.map(student =>
                student.utilisateur_id === id ? { ...student, statut: currentStatus === 'actif' ? 'inactif' : 'actif' } : student
            ));
        } catch (error) {
            console.error('Error updating student status:', error);
            setErrorMessage('Error updating student status. Please try again.');
        }
    };

    return (
        <Container fluid style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: 0,
        }}>
            <Row noGutters>
                <Col xs={2} className="p-0">
                    <Sidebar />
                </Col>
                <Col xs={10} className="p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <h2>Liste des étudiants</h2>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Niveau d'éducation</th>
                                <th>Statut</th>
                                <th>ID Utilisateur</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.utilisateur_id}>
                                    <td>{index + 1}</td>
                                    <td>{student.niveaueducation}</td>
                                    <td>{student.statut}</td>
                                    <td>{student.utilisateur_id}</td>
                                    <td>
                                        <Button 
                                            variant="secondary"
                                            onClick={() => handleToggleStatus(student.utilisateur_id, student.statut)}
                                        >
                                            {student.statut === 'actif' ? <FaToggleOn /> : <FaToggleOff />}
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

export default StudentList;
