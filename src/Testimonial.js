// Testimonial.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

const Testimonial = () => {
  return (
    <div className="testimonial-container">
      <div className="testimonial-icon">
        <FontAwesomeIcon icon={faQuoteLeft} />
      </div>
      <div className="testimonial-text">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna ac justo convallis vehicula. Nullam varius nec sem non cursus. Aliquam erat volutpat. Nulla facilisi.</p>
      </div>
    </div>
  );
}

export default Testimonial;
