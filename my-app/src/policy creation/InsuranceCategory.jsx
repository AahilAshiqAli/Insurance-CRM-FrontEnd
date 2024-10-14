import React from 'react';
import './insuranceCategory.css'

const InsuranceScreen = () => {
  return (
    <div className="insurance-screen">
      <h1 className="main-heading">Insurance Category</h1>
      
      <div className="dropdown-container">
        <div className="dropdown">
          <label htmlFor="licenseType" className="dropdown-label">License Type</label>
          <select id="licenseType" className="dropdown-select">
            <option value="Islamic">Islamic</option>
            <option value="Conventional">Conventional</option>
            <option value="Outh">Outh</option>
          </select>
        </div>

        <div className="dropdown">
          <label htmlFor="productCategory" className="dropdown-label">Product Category</label>
          <select id="productCategory" className="dropdown-select">
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InsuranceScreen;
