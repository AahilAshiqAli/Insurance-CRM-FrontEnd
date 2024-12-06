import React, { useState, useEffect } from "react";
import "./InsurableInterest.css";
import Navbar from "../components/navbar";
import ProductSidebar from "../components/product-sidebar";
import { useNavigate } from "react-router-dom";
import { useProductSetup } from "./ProductSetupProvider";

const InsurableInterest = () => {
  const navigate = useNavigate();
  const { productId, productData } = useProductSetup();
  const [asset, setAssetDetails] = useState({
    manufacturer: "",
    model: "",
    imei_serial_number: "",
  });

  const [uniqueRiskDescriptions, setUniqueRiskDescriptions] = useState([]);
  const [documentsUpload, setDocumentsUpload] = useState({
    cnic: "",
    receipt_of_purchase: "",
    warranty_card_picture: "",
    user_picture: "",
    bank_statement: "",
    ntn_number: "",
  });

  useEffect(() => {
    if (productData) {
      setAssetDetails({
        manufacturer: productData.manufacturer || "",
        model: productData.model || "",
        imei_serial_number: productData.imei_serial_number || "",
      });
      setDocumentsUpload({
        cnic: productData.cnic || "",
        receipt_of_purchase: productData.receipt_of_purchase || "",
        warranty_card_picture: productData.warranty_card_picture || "",
        user_picture: productData.user_picture || "",
        bank_statement: productData.bank_statement || "",
        ntn_number: productData.ntn_number || "",
      });
      const uniqueDescriptions = [...new Set(productData.risk_descriptions)];
      setUniqueRiskDescriptions(uniqueDescriptions);
    }
    console.log(productData);
  }, [productData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/product-setup/customer-profile-rules");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssetDetails((prevAssetDetails) => ({
      ...prevAssetDetails,
      [name]: value,
    }));
  };

  const handleDocumentInputChange = (e) => {
    const { name, value } = e.target;
    setDocumentsUpload((prevDocumentsUpload) => ({
      ...prevDocumentsUpload,
      [name]: value,
    }));
  };

  const handleRiskDescriptionChange = (e, index) => {
    const { value } = e.target;
    const updatedDescriptions = [...uniqueRiskDescriptions];
    updatedDescriptions[index] = value;
    setUniqueRiskDescriptions(updatedDescriptions);
  };

  const handleAddRiskDescription = () => {
    setUniqueRiskDescriptions((prevDescriptions) => [
      ...prevDescriptions,
      "", // Add an empty description
    ]);
  };

  const assetDetails = [
    {
      label: "Manufacturer",
      name: "manufacturer",
      placeholder: "Enter Manufacturer (e.g., Apple, Samsung)",
    },
    {
      label: "Model",
      name: "model",
      placeholder: "Enter Model (e.g., iPhone 14, Galaxy S21)",
    },

    {
      label: "IMEI/Serial Number",
      name: "imei_serial_number",
      placeholder: "Enter IMEI or Serial Number",
    },
  ];

  const documentDetails = [
    {
      label: "CNIC",
      name: "cnic",
      placeholder: "Enter CNIC",
    },
    {
      label: "Receipt of Purchase",
      name: "receipt_of_purchase",
      placeholder: "Enter Receipt of Purchase",
    },
    {
      label: "Warranty Card Picture",
      name: "warranty_card_picture",
      placeholder: "Enter Warranty Card Picture",
    },
    {
      label: "User Picture",
      name: "user_picture",
      placeholder: "Enter User Picture",
    },
    {
      label: "Bank Statement",
      name: "bank_statement",
      placeholder: "Enter Bank Statement",
    },
    {
      label: "NTN Number",
      name: "ntn_number",
      placeholder: "Enter NTN Number",
    },
  ];

  return (
    <div className="body">
      <Navbar />
      <ProductSidebar />
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
                <select
                  name={detail.name}
                  value={asset[detail.name]}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="Quote">Quote</option>
                  <option value="TCN">TCN</option>
                  <option value="Policy">Policy</option>
                </select>
              </div>
            </div>
          ))}
        </div>
        <hr className="border-t-2 border-primary-100 my-10" />
        <div>
          <h2 className="font-psemibold text-primary text-3xl text-left m-5">
            Documents Upload
          </h2>
          {documentDetails.map((detail, index) => (
            <div key={index} className="renewal-form-group font-pregular">
              <label>{detail.label}</label>
              <div className="input-group font-pregular">
                <label>is Mandatory</label>
                <select
                  name={detail.name}
                  value={documentsUpload[detail.name]}
                  onChange={handleDocumentInputChange}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="Quote">Quote</option>
                  <option value="TCN">TCN</option>
                  <option value="Policy">Policy</option>
                </select>
              </div>
            </div>
          ))}
        </div>
        <hr className="border-t-2 border-primary-100 my-10" />
        <div>
          <h2 className="font-psemibold text-primary text-3xl text-left m-5">
            Risk Questionnaire
          </h2>
          <div className="renewal-form-container">
            {uniqueRiskDescriptions.length > 0 ? (
              uniqueRiskDescriptions.map((description, index) => (
                <div key={index} className="renewal-form-group font-pregular">
                  <label>Risk Questionnaire {index + 1}</label>

                  <input
                    type="text"
                    value={description} // Set the value of the input field
                    onChange={(e) => handleRiskDescriptionChange(e, index)} // Handle changes
                    className="text-center w-full p-2 border border-gray-300 rounded-md"
                    placeholder={`Risk Questionnaire ${index + 1}`}
                  />
                </div>
              ))
            ) : (
              <p>No risk descriptions available.</p>
            )}
          </div>
          <button className="add-btn" onClick={handleAddRiskDescription}>
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
