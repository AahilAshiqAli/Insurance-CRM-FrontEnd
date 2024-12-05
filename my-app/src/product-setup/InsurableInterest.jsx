import React, { useState } from "react";
import "./InsurableInterest.css";
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import { useNavigate } from "react-router-dom";

const InsurableInterest = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/product-setup/customer-profile-rules");
  };
  const assetDetails = [
    {
      label: "Manufacturer",
      placeholder: "Enter Manufacturer (e.g., Apple, Samsung)",
    },
    {
      label: "Model",
      placeholder: "Enter Model (e.g., iPhone 14, Galaxy S21)",
    },
    { label: "Variant", placeholder: "Enter Variant (e.g., Pro, Ultra)" },
    { label: "IMEI/Serial Number", placeholder: "Enter IMEI or Serial Number" },
    {
      label: "Storage Capacity",
      placeholder: "Enter Storage Capacity (e.g., 64GB, 128GB)",
    },
  ];
  const [counter, setCounter] = useState(1);
  return (
    <div className="body">
      <Navbar />
      <PolicySidebar />
      <div className="content-container">
        <div>
          <h2 className="font-psemibold text-primary text-3xl text-left m-5">
            Asset Details
          </h2>
          {assetDetails.map((detail, index) => (
            <div key={index} className="renewal-form-group font-pregular">
              <label>{detail.label}</label>

              <div className="input-group font-pregular">
                <label>is Mandatory</label>
                <select>
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="quote">Quote</option>
                  <option value="tcn">TCN</option>
                  <option value="tcn">Policy</option>
                </select>
              </div>
            </div>
          ))}
        </div>
        <hr class="border-t-2 border-primary-100 my-10" />
        <div>
          <h2 className="font-psemibold text-primary text-3xl text-left m-5">
            Documents Upload
          </h2>
          {assetDetails.map((detail, index) => (
            <div key={index} className="renewal-form-group font-pregular">
              <label>{detail.label}</label>

              <div className="input-group font-pregular">
                <label>is Mandatory</label>
                <select>
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="quote">Quote</option>
                  <option value="tcn">TCN</option>
                  <option value="tcn">Policy</option>
                </select>
              </div>
            </div>
          ))}
        </div>
        <hr class="border-t-2 border-primary-100 my-10" />
        <div>
          <h2 className="font-psemibold text-primary text-3xl text-left m-5">
            Risk Questionaire
          </h2>
          <div className="renewal-form-container">
            {Array.from({ length: counter }).map((_, index) => (
              <div key={index} className="renewal-form-group font-pregular">
                <label>Risk Questionnaire {index + 1}</label>

                <input
                  type="text"
                  placeholder={`Risk Questionnaire ${index + 1}`}
                  className="text-center w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
          </div>
          <button className="add-btn" onClick={() => setCounter(counter + 1)}>
            Add More
          </button>
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
      </div>
    </div>
  );
};

export default InsurableInterest;
