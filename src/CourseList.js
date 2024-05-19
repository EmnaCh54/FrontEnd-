import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:4000/enseignantviewcours/cours');
            setCourses(response.data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching courses:', error);
            setErrorMessage('Error fetching courses. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/enseignantviewcours/cours/${id}`);
            // Remove the deleted course from the state
            setCourses(courses.filter(course => course._id !== id));
        } catch (error) {
            console.error('Error deleting course:', error);
            setErrorMessage('Error deleting course. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Liste des cours</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <table className="table table-bordered" style={{ backgroundColor: '#cce5ff' }}>
                <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Type</th>
                        <th scope="col">Semestre</th>
                        <th scope="col">Niveau</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{course.contenu_id.titre}</td>
                            <td>{course.contenu_id.type_contenus}</td>
                            <td>{course.contenu_id.trimestre}</td>
                            <td>{course.contenu_id.niveau_scolaire}</td>
                            <td>{course.contenu_id.description}</td>
                            <td>
                                <Link to={`/updatecours/${course._id}`} className="btn btn-primary me-2">
                                    <FaEdit />
                                </Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(course._id)}>
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

export default CourseList;
