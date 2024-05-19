import React from 'react';

const Contact = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f0f0f0', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div className="card" style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '40px', borderRadius: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)' }}>
        <div className="card-body">
          <h5 className="card-title">Nous Contacter</h5>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">Nom</label>
              <input type="text" className="form-control" id="exampleInputName" style={{ height: '50px', fontSize: '20px' }} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">Adresse e-mail</label>
              <input type="email" className="form-control" id="exampleInputEmail" style={{ height: '50px', fontSize: '20px' }} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputMessage" className="form-label">Message</label>
              <textarea className="form-control" id="exampleInputMessage" rows="5" style={{ fontSize: '20px' }}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ fontSize: '20px' }}>Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
