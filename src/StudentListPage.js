import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import Sidebar from './Sidebar'; // Adjust the import path as necessary

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
            const newStatus = currentStatus === 'actif' ? 'inactif' : 'actif';
            await axios.put(`http://127.0.0.1:4000/etudiant/status/${id}`, { statut: newStatus });
            setStudents(students.map(student =>
                student.utilisateur_id === id ? { ...student, statut: newStatus } : student
            ));
        } catch (error) {
            console.error('Error updating student status:', error);
            setErrorMessage('Error updating student status. Please try again.');
        }
    };

    return (
        <div className="main-container">
            <Sidebar />
            <div className="content-container">
                <h2>Liste des étudiants</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Niveau d'éducation</th>
                            <th scope="col">Statut</th>
                            <th scope="col">ID Utilisateur</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.utilisateur_id}>
                                <th scope="row">{index + 1}</th>
                                <td>{student.niveaueducation}</td>
                                <td>{student.statut}</td>
                                <td>{student.utilisateur_id}</td>
                                <td>
                                    <button 
                                        className="btn btn-secondary"
                                        onClick={() => handleToggleStatus(student.utilisateur_id, student.statut)}
                                    >
                                        {student.statut === 'actif' ? <FaToggleOn /> : <FaToggleOff />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
