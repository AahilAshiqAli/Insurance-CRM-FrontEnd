import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import ProductSidebar from "../components/product-sidebar";
import "./CustomerProfileRules.css";
import { useNavigate } from "react-router-dom";
import { useProductSetup } from "./ProductSetupProvider";

const CustomerProfileRules = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { productId, productData, setProductData } = useProductSetup();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productId) {
      const updatedData = {
        ...productData, // Spread all properties of productData
        City: userDetails.City,
        Profession: userDetails.Profession,
        IncomeCategory: userDetails.IncomeCategory,
        Business_Type: userDetails.Business_Type,
        Customer_Badge: userDetails.Customer_Badge,
        Age: userDetails.Age,
      };

      // Set the updated product data
      setProductData(updatedData);
    }
    navigate("/product-setup/rules-for-renewal");
  };

  const [userDetails, setUserDetails] = useState({
    City: "",
    Profession: "",
    IncomeCategory: "",
    Business_Type: "",
    Customer_Badge: "",
    Age: "",
  });

  // Handle the change in dropdown values
  const handleSelectChange = (e, field) => {
    const { value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  // Handle the change in radio button values
  const handleRadioChange = (e, field) => {
    const { value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value === "include" ? prevDetails[field] : "", // Set to "" if "exclude"
    }));
  };

  useEffect(() => {
    if (productData) {
      setUserDetails({
        City: productData.City || "",
        Profession: productData.Profession || "",
        IncomeCategory: productData.IncomeCategory || "",
        Business_Type: productData.Business_Type || "",
        Customer_Badge: productData.Customer_Badge || "",
        Age: productData.Age || "",
      });
      console.log(userDetails);
    }
  }, [productData]);

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
            {/* City input group */}
            <div className="input-radio-container">
              <div className="input-group font-pregular">
                <label>City</label>
                <select
                  value={userDetails.City}
                  onChange={(e) => handleSelectChange(e, "City")}
                >
                  <option value="" disabled>
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
                      checked={userDetails.City !== ""}
                      onChange={(e) => handleRadioChange(e, "City")}
                    />
                    Include
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="city"
                      value="exclude"
                      checked={userDetails.City === ""}
                      onChange={(e) => handleRadioChange(e, "City")}
                    />
                    Exclude
                  </label>
                </div>
              </div>
            </div>

            {/* Age input group */}
            <div className="input-radio-container">
              <div className="input-group font-pregular">
                <label>Age</label>
                <input
                  type="number"
                  placeholder="Enter age"
                  value={userDetails.Age}
                  onChange={(e) => {
                    setUserDetails((prevDetails) => ({
                      ...prevDetails,
                      Age: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="radio-group">
                <label>Select</label>
                <div className="radio-buttons">
                  <label>
                    <input
                      type="radio"
                      name="age"
                      value="include"
                      checked={userDetails.Age !== ""}
                      onChange={(e) => handleRadioChange(e, "Age")}
                    />
                    Include
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="age"
                      value="exclude"
                      checked={userDetails.Age === ""}
                      onChange={(e) => handleRadioChange(e, "Age")}
                    />
                    Exclude
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Other input groups for Profession, Income Category, Business Type, and Customer Badge */}
          <div className="form-row">
            {/* Profession input group */}
            <div className="input-radio-container">
              <div className="input-group font-pregular">
                <label>Profession</label>
                <select
                  value={userDetails.Profession}
                  onChange={(e) => handleSelectChange(e, "Profession")}
                >
                  <option value="" disabled>
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
                      checked={userDetails.Profession !== ""}
                      onChange={(e) => handleRadioChange(e, "Profession")}
                    />
                    Include
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="profession"
                      value="exclude"
                      checked={userDetails.Profession === ""}
                      onChange={(e) => handleRadioChange(e, "Profession")}
                    />
                    Exclude
                  </label>
                </div>
              </div>
            </div>

            {/* Income Category input group */}
            <div className="input-radio-container">
              <div className="input-group font-pregular">
                <label>Income Category</label>
                <select
                  value={userDetails.IncomeCategory}
                  onChange={(e) => handleSelectChange(e, "IncomeCategory")}
                >
                  <option value="" disabled>
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
                      checked={userDetails.IncomeCategory !== ""}
                      onChange={(e) => handleRadioChange(e, "IncomeCategory")}
                    />
                    Include
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="income"
                      value="exclude"
                      checked={userDetails.IncomeCategory === ""}
                      onChange={(e) => handleRadioChange(e, "IncomeCategory")}
                    />
                    Exclude
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-row">
            {/* Business Type input group */}
            <div className="input-radio-container">
              <div className="input-group font-pregular">
                <label>Business Type</label>
                <select
                  value={userDetails.Business_Type}
                  onChange={(e) => handleSelectChange(e, "Business_Type")}
                >
                  <option value="" disabled>
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
                      checked={userDetails.Business_Type !== ""}
                      onChange={(e) => handleRadioChange(e, "Business_Type")}
                    />
                    Include
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="business"
                      value="exclude"
                      checked={userDetails.Business_Type === ""}
                      onChange={(e) => handleRadioChange(e, "Business_Type")}
                    />
                    Exclude
                  </label>
                </div>
              </div>
            </div>

            {/* Customer Badge input group */}
            <div className="input-radio-container">
              <div className="input-group font-pregular">
                <label>Customer Badge</label>
                <select
                  value={userDetails.Customer_Badge}
                  onChange={(e) => handleSelectChange(e, "Customer_Badge")}
                >
                  <option value="" disabled>
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
                      checked={userDetails.Customer_Badge !== ""}
                      onChange={(e) => handleRadioChange(e, "Customer_Badge")}
                    />
                    Include
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="badge"
                      value="exclude"
                      checked={userDetails.Customer_Badge === ""}
                      onChange={(e) => handleRadioChange(e, "Customer_Badge")}
                    />
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
