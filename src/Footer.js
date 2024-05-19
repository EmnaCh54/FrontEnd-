import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-warning text-white p-3 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            &copy; {new Date().getFullYear()} Parascolar Site. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
