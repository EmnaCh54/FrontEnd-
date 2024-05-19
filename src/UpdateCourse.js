import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [trimester, setTrimester] = useState('');
    const [schoolLevel, setSchoolLevel] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchCourse();
    }, []);

    const fetchCourse = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/enseignantviewcours/cours/${id}`);
            setCourse(response.data);
            setTitle(response.data.contenu_id.titre);
            setType(response.data.contenu_id.type_contenus);
            setTrimester(response.data.contenu_id.trimestre);
            setSchoolLevel(response.data.contenu_id.niveau_scolaire);
            setDescription(response.data.contenu_id.description);
            setFile(response.data.contenu_id.fichier_joint);
        } catch (error) {
            console.error('Error fetching course:', error);
            setErrorMessage('Error fetching course details. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make PUT request to update the course
            await axios.put(`http://localhost:4000/enseignantviewcours/cours/${id}`, {
                titre: title,
                type_contenus: type,
                trimestre: trimester,
                niveau_scolaire: schoolLevel,
                description: description,
                fichier_joint: file
                // Add other fields as needed
            });

            // Show success message
            setSuccessMessage('Course updated successfully.');

            // Redirect to course list after successful update
            setTimeout(() => {
                window.location.href = '/cours';
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error('Error updating course:', error);
            setErrorMessage('Error updating course. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Modifier le cours</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit} style={{  padding: '20px', borderRadius: '8px' , marginBottom:'10px'}}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titre :</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">Type :</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="type" 
                        value={type} 
                        onChange={(e) => setType(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="trimester" className="form-label">Semestre :</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="trimester" 
                        value={trimester} 
                        onChange={(e) => setTrimester(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="schoolLevel" className="form-label">Niveau scolaire :</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="schoolLevel" 
                        value={schoolLevel} 
                        onChange={(e) => setSchoolLevel(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description :</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        rows="5" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">Fichier joint :</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="file" 
                        value={file} 
                        onChange={(e) => setFile(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Mettre à jour</button>
                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
            </form>
        </div>
    );
};

export default UpdateCourse;
