import React, { useState } from "react";
import Navbar from "../components/navbar"; // Ensure Navbar is correctly imported
import "./risk-questionaire.css";

const RiskQuestionnaire = () => {
  return (
    <div>
      <Navbar /> {/* Navbar on top */}
      <div className="risk-questionnaire-container">
        <h2 className="heading font-psemibold text-primary">
          Risk Questionnaire
        </h2>

        {/* Risk Questionnaire Inputs */}
        <div className="questionnaire-grid font-pregular">
          <div className="input-group">
            <label htmlFor="question1">Predefined Question 1</label>
            <input
              type="text"
              id="question1"
              placeholder="Enter details here"
            />
          </div>
          <div className="input-group">
            <label htmlFor="question2">Predefined Question 2</label>
            <input
              type="text"
              id="question2"
              placeholder="Enter details here"
            />
          </div>
          <div className="input-group">
            <label htmlFor="question3">Predefined Question 3</label>
            <input
              type="text"
              id="question3"
              placeholder="Enter details here"
            />
          </div>
        </div>

        {/* Add On Section */}
        <div className="add-on-section my-10">
          <h2 className="heading font-psemibold text-primary">Add Ons</h2>
          <div className="add-on-grid font-pregular">
            {[1, 2, 3].map((num) => (
              <div className="add-on-row" key={num}>
                <div className="add-on-group">
                  <label htmlFor={`addon${num}`}>Add On {num}</label>
                  <input
                    type="text"
                    id={`addon${num}`}
                    placeholder="Add on details"
                  />
                </div>
                <button className="addon-btn view-btn font-pregular">
                  View
                </button>
                <button className="addon-btn edit-btn font-pregular">
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusions Section */}
        <div className="exclusions-section">
          <h2 className="heading font-psemibold text-primary">Exclusions</h2>
          <div className="exclusions-grid font-pregular">
            {[1, 2, 3].map((num) => (
              <div className="exclusion-row" key={num}>
                <div className="exclusion-group">
                  <label htmlFor={`exclusion${num}`}>Exclusions {num}</label>
                  <input
                    type="text"
                    id={`exclusion${num}`}
                    placeholder="Exclusion details"
                  />
                </div>
                <button className="exclusion-btn view-btn font-pregular">
                  View
                </button>
                <button className="exclusion-btn edit-btn font-pregular">
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskQuestionnaire;
