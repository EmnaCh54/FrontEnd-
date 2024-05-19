import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import backgroundImage from './assets/details3.png'; // Import your background image

const Details = ({ staticData }) => {
  const { index } = useParams(); // Access the index parameter from the URL
  const content = staticData[index]; // Get the content item based on the index

  if (!content) {
    return <div>No content found</div>; // Display a message if content is not found
  }

  const handleDownload = () => {
    // Implement download logic here
    // For example, if content.image is the URL of the image, you can create an anchor element and trigger a download
    const link = document.createElement('a');
    link.href = content.image; // Assuming content.image is the URL of the image/file
    link.download = 'downloaded_image'; // You can set the default filename here
    link.click();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'contain', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div className="card" style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <img src={content.image} className="card-img-top" alt={content.titre} />
        <div className="card-body">
          <h5 className="card-title">{content.titre}</h5>
          <p className="card-text">{content.description}</p>
          <p className="card-text">Trimestre: {content.trimestre}</p>
          <p className="card-text">Niveau Scolaire: {content.niveau_scolaire}</p>
          <p className="card-text">Reporteur: {content.reporteur}</p>
          <button className="btn btn-primary" onClick={handleDownload}>Télécharger</button>
        </div>
      </div>
    </div>
  );
}

export default Details;
