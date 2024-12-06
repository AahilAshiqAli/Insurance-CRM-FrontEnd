import React from "react";
import Navbar from "../components/navbar";
import ProductSidebar from "../components/product-sidebar";
import "./CustomerProfileRules.css";
import { useNavigate } from "react-router-dom";

const CustomerProfileRules = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/product-setup/rules-for-renewal");
  };

  return (
    <div className="body">
      <Navbar />
      <ProductSidebar /> {/* Sidebar inside the body */}
      <div className="content-container">
        <h2 className="font-psemibold text-primary text-3xl text-left m-5">
          Customer Profile Rules
        </h2>

        <form>
          {/* Form structure with rows */}
          <div className="form-row">
            <div className="input-radio-container">
              <div className="input-group font-pregular">
                <label>City</label>
                <select>
                  <option value="" disabled selected>
                    Select City
                  </option>
                  <option value="new-york">New York</option>
                  <option value="los-angeles">Los Angeles</option>
                  <option value="chicago">Chicago</option>
                </select>
              </div>
              <div className="radio-group">
                <label>Select</label>
                <div className="radio-buttons">
                  <label>
                    <input
                      type="radio"
                      name="city"
                      value="include"
                      defaultChecked
                    />
                    Include
                  </label>
                  <label>
                    <input type="radio" name="city" value="exclude" />
                    Exclude
                  </label>
                </div>
              </div>
            </div>

            <div className="input-radio-container">
              <div className="input-group font-pregular">
                <label>Age</label>
                <input type="number" placeholder="Enter age" />
              </div>
              <div className="radio-group">
                <label>Select</label>
                <div className="radio-buttons">
                  <label>
                    <input
                      type="radio"
                      name="age"
                      value="include"
                      defaultChecked
                    />
                    Include
                  </label>
                  <label>
                    <input type="radio" name="age" value="exclude" />
                    Exclude
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-radio-container">
              <div className="input-group font-pregular">
                <label>Profession</label>
                <select>
                  <option value="" disabled selected>
                    Select Profession
                  </option>
                  <option value="doctor">Doctor</option>
                  <option value="engineer">Engineer</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <div className="radio-group">
                <label>Select</label>
                <div className="radio-buttons">
                  <label>
                    <input
                      type="radio"
                      name="profession"
                      value="include"
                      defaultChecked
                    />
                    Include
                  </label>
                  <label>
                    <input type="radio" name="profession" value="exclude" />
                    Exclude
                  </label>
                </div>
              </div>
            </div>

            <div className="input-radio-container">
              <div className="input-group font-pregular">
                <label>Income Category</label>
                <select>
                  <option value="" disabled selected>
                    Select Income Category
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="radio-group">
                <label>Select</label>
                <div className="radio-buttons">
                  <label>
                    <input
                      type="radio"
                      name="income"
                      value="include"
                      defaultChecked
                    />
                    Include
                  </label>
                  <label>
                    <input type="radio" name="income" value="exclude" />
                    Exclude
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="input-radio-container">
              <div className="input-group font-pregular">
                <label>Business Type</label>
                <select>
                  <option value="" disabled selected>
                    Select Business Type
                  </option>
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                </select>
              </div>
              <div className="radio-group">
                <label>Select</label>
                <div className="radio-buttons">
                  <label>
                    <input
                      type="radio"
                      name="business"
                      value="include"
                      defaultChecked
                    />
                    Include
                  </label>
                  <label>
                    <input type="radio" name="business" value="exclude" />
                    Exclude
                  </label>
                </div>
              </div>
            </div>

            <div className="input-radio-container">
              <div className="input-group font-pregular">
                <label>Customer Badge</label>
                <select>
                  <option value="" disabled selected>
                    Select Customer Badge
                  </option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="bronze">Bronze</option>
                </select>
              </div>
              <div className="radio-group">
                <label>Select</label>
                <div className="radio-buttons">
                  <label>
                    <input
                      type="radio"
                      name="badge"
                      value="include"
                      defaultChecked
                    />
                    Include
                  </label>
                  <label>
                    <input type="radio" name="badge" value="exclude" />
                    Exclude
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-16">
            <button
              type="submit"
              className="py-4 px-10 bg-primary text-white font-psemibold rounded-md hover:bg-secondary transition duration-300"
              onClick={handleSubmit}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerProfileRules;
