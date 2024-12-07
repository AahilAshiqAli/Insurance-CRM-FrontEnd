import React, { useState, useEffect } from "react";
import "./InsurableInterest.css";
import Navbar from "../components/navbar";
import ProductSidebar from "../components/product-sidebar";
import { useNavigate } from "react-router-dom";
import { useProductSetup } from "./ProductSetupProvider";

const InsurableInterest = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { productId, productData, setProductData } = useProductSetup();
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
      const riskQuestionnaireData = uniqueDescriptions.map((description) => ({
        status: "unchanged", // default status for each description
        description,
      }));
      setUniqueRiskDescriptions(riskQuestionnaireData);
    }
  }, [productData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productId) {
      const updatedData = {
        ...productData, // Spread all properties of productData
        manufacturer: asset.manufacturer,
        model: asset.model,
        imei_serial_number: asset.imei_serial_number,
        cnic: documentsUpload.cnic,
        receipt_of_purchase: documentsUpload.receipt_of_purchase,
        warranty_card: documentsUpload.warranty_card,
        user_picture: documentsUpload.user_picture,
        bank_statement: documentsUpload.bank_statement,
        ntn_number: documentsUpload.ntn_number,
        risk_descriptions: uniqueRiskDescriptions.map(
          (risk) => risk.description
        ),
      };

      // Set the updated product data
      setProductData(updatedData);
    }
    // Token for authorization (replace with actual token retrieval logic)
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMzI0MzYwOSwiZXhwIjoxNzM2ODQzNjA5fQ.P_jHI1g8jST9T5sHppb36gh0ZBV14M9lzbxx9ZkU88A";

    // Filter the risk descriptions where the status is "updated" and "inserted"
    const updatedRiskDescriptions = uniqueRiskDescriptions.filter(
      (risk) => risk.status === "updated"
    );
    const insertedRiskDescriptions = uniqueRiskDescriptions.filter(
      (risk) => risk.status === "inserted"
    );

    // If there are no updated risk descriptions, skip deletion
    if (
      updatedRiskDescriptions.length === 0 &&
      insertedRiskDescriptions.length === 0
    ) {
      console.log("No updated or inserted risk descriptions to handle.");
      navigate("/product-setup/customer-profile-rules");
      return;
    }

    setLoading(true);

    // Function to handle POST request for risk descriptions
    const postRiskDescriptions = (riskDescriptions) => {
      const requestBody = {
        data: riskDescriptions.map((risk) => ({
          productId, // The productId to associate with the risk descriptions
          riskDescription: risk.description, // The actual risk description
        })),
      };

      return fetch(`http://localhost:3000/api/risk/${productId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }).then((response) => {
        return response.json().then((data) => {
          if (!response.ok) {
            throw new Error(data.error || "Failed to insert risk descriptions");
          }
          return data;
        });
      });
    };

    // If there are updated risk descriptions, delete them first
    if (updatedRiskDescriptions.length > 0) {
      fetch(`http://localhost:3000/api/risk/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json().then((data) => {
            if (!response.ok) {
              throw new Error(
                data.error || "Failed to delete risk descriptions"
              );
            }
            console.log("Risk descriptions deleted successfully:", data);
            return postRiskDescriptions(updatedRiskDescriptions); // Proceed to insert updated risk descriptions
          });
        })
        .then((data) => {
          console.log("Risk descriptions updated successfully:", data);
          // If there are inserted risk descriptions, insert them as well
          if (insertedRiskDescriptions.length > 0) {
            return postRiskDescriptions(insertedRiskDescriptions);
          }
        })
        .then((data) => {
          console.log("Risk descriptions inserted successfully:", data);
          setLoading(false);
          navigate("/product-setup/customer-profile-rules");
        })
        .catch((err) => {
          console.log(err); // Logs the actual error message from the backend
          setError(err.message || "Failed to handle risk descriptions");
          setLoading(false);
        });
    } else if (insertedRiskDescriptions.length > 0) {
      // If there are no updated risk descriptions, just insert the "inserted" ones
      postRiskDescriptions(insertedRiskDescriptions)
        .then((data) => {
          console.log("Risk descriptions inserted successfully:", data);
          setLoading(false);
          navigate("/product-setup/customer-profile-rules");
        })
        .catch((err) => {
          console.log(err); // Logs the actual error message from the backend
          setError(err.message || "Failed to insert risk descriptions");
          setLoading(false);
        });
    }

    console.log("prit");
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
    updatedDescriptions[index] = {
      ...updatedDescriptions[index],
      description: value,
      status:
        updatedDescriptions[index].status === "inserted"
          ? "inserted"
          : "updated", // Mark as updated or inserted
    };
    setUniqueRiskDescriptions(updatedDescriptions);
  };

  const handleAddRiskDescription = () => {
    setUniqueRiskDescriptions((prevDescriptions) => [
      ...prevDescriptions,
      { description: "", status: "inserted" }, // Add a new description with empty fields
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
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <h2 className="font-psemibold text-primary text-3xl text-left m-5">
              Risk Questionnaire
            </h2>
            <div className="renewal-form-container">
              {uniqueRiskDescriptions.length > 0 ? (
                uniqueRiskDescriptions.map((risk, index) => (
                  <div key={index} className="renewal-form-group font-pregular">
                    <label>Risk Questionnaire {index + 1}</label>
                    <input
                      type="text"
                      value={risk.description}
                      onChange={(e) => handleRiskDescriptionChange(e, index)}
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
        )}
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

// For now, I have done that all risk Questionaire for a particular product are removed and then all are inserted. But if in future, if
// i want to delete only selected risk ids whose status = updated, then i can do that as well because there is status key. But then risk ids would be added to
// productData and all those which are updated wold be send in delete api in body having alll risk_ids.
